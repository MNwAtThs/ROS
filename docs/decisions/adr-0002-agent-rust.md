## ADR 0002: Local agent built in Rust

### Context
We need a local daemon to orchestrate processes, manage config, and expose APIs reliably.

### Decision
Use Rust for the agent.

### Consequences
- Strong concurrency + reliability
- Clear packaging story later
