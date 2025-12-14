import { launches } from "../lib/mockData";

export function LaunchesPage() {
  return (
    <section className="section">
      <div className="section-header">
        <h2>Launches</h2>
        <button className="btn" type="button">
          Start launch
        </button>
      </div>
      <p className="muted">Mocked data; wire to agent gRPC in Phase 0.</p>
      <div className="list" style={{ marginTop: 10 }}>
        {launches.map((launch) => (
          <div key={launch.id} className="list-item">
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <div>
                <div className="title">{launch.name}</div>
                <div className="meta">
                  {launch.launchFile} · {launch.namespace}
                </div>
                <div style={{ marginTop: 6 }}>
                  <span className={`pill ${statusToClass(launch.status)}`}>{launch.status}</span>{" "}
                  <span className="muted">{launch.startedAgo}</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, alignSelf: "center" }}>
                <button className="btn" type="button">
                  View logs
                </button>
                <button className="btn" type="button">
                  {launch.status === "running" ? "Stop" : "Start"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function statusToClass(status: string) {
  if (status === "running") return "success";
  if (status === "error") return "danger";
  return "warning";
}

