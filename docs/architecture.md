## Architecture

- **UI (`apps/riggr-ui`)**: Tauri shell + React frontend
- **Agent (`apps/riggr-agent`)**: Rust daemon exposing gRPC
- **ROS adapter (`services/ros-adapter`)**: Separate process that talks ROS 2 and exposes a stable API to the agent

Data flow:
UI ⇄ gRPC ⇄ Agent ⇄ (local gRPC/IPC) ⇄ ROS adapter ⇄ ROS 2
