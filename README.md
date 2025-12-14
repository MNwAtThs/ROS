## Riggr (Robotics Desktop)

Cross-platform robotics desktop tooling: profiles, launch control, graph explorer, logs, and recording—built as a **Tauri UI** talking to a local **Rust agent** over **gRPC**, with ROS 2 support via a separate **ros-adapter** process.

### Monorepo layout

- **`apps/`**: end-user apps
  - **`apps/riggr-ui/`**: Tauri + React UI
  - **`apps/riggr-agent/`**: local Rust daemon (gRPC API)
  - **`apps/riggr-cli/`**: optional CLI companion
- **`services/`**: integration boundaries / system services
  - **`services/ros-adapter/`**: ROS 2 integration boundary (separate process)
- **`proto/`**: Protobuf IDL shared by UI/agent/adapter
- **`docs/`**: architecture, vision, ADRs
- **`scripts/`**: dev + CI helper scripts
- **`tools/`**: formatting, proto tooling configs

### Status

This repo currently contains the **project scaffold** (structure + placeholders). Next step is Phase 0: define protos, implement `GetVersion`, and wire UI → agent.
