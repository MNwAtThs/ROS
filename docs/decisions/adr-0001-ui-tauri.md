## ADR 0001: UI built with Tauri

### Context
We need a desktop UI that ships on macOS/Windows/Linux with a modern web UX.

### Decision
Use Tauri + React/TypeScript.

### Consequences
- Smaller footprint vs Electron
- Rust toolchain required for UI build
