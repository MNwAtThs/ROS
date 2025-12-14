use std::net::SocketAddr;

use tonic::{transport::Server, Request, Response, Status};
use tonic_web::GrpcWebLayer;
use tower::ServiceBuilder;
use tower_http::cors::{Any, CorsLayer};
use tracing_subscriber::{fmt, EnvFilter};

pub mod pb {
    pub mod riggr {
        pub mod common {
            tonic::include_proto!("riggr.common.v1");
        }
        pub mod agent {
            tonic::include_proto!("riggr.agent.v1");
        }
    }
}

use pb::riggr::agent::agent_service_server::{AgentService, AgentServiceServer};
use pb::riggr::common::{Empty, Version};

#[derive(Default)]
struct AgentVersionService;

#[tonic::async_trait]
impl AgentService for AgentVersionService {
    async fn get_version(&self, _request: Request<Empty>) -> Result<Response<Version>, Status> {
        let version = Version {
            name: env!("CARGO_PKG_NAME").to_string(),
            version: env!("CARGO_PKG_VERSION").to_string(),
            git_sha: option_env!("GIT_SHA").unwrap_or("dev").to_string(),
        };

        Ok(Response::new(version))
    }
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    init_tracing();

    let addr: SocketAddr = "127.0.0.1:50051".parse()?;
    tracing::info!("Starting riggr-agent gRPC server on {}", addr);

    let cors = CorsLayer::new().allow_methods(Any).allow_origin(Any);
    let grpc_web = GrpcWebLayer::new();

    let service = AgentServiceServer::new(AgentVersionService::default());
    let service = ServiceBuilder::new()
        .layer(grpc_web)
        .layer(cors)
        .service(service);

    Server::builder()
        .accept_http1(true) // needed for gRPC-Web (UI)
        .add_service(service)
        .serve(addr)
        .await?;

    Ok(())
}

fn init_tracing() {
    let env_filter = EnvFilter::try_from_default_env()
        .unwrap_or_else(|_| EnvFilter::new("info,tower_http=warn"));

    fmt::Subscriber::builder()
        .with_env_filter(env_filter)
        .with_target(false)
        .compact()
        .init();
}
