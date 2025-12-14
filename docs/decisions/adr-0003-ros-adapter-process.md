## ADR 0003: ROS integration via separate adapter process

### Context
Embedding ROS directly in the desktop app or agent creates ABI/build headaches across OSes and distros.

### Decision
Keep ROS integration behind a separate `ros-adapter` process boundary.

### Consequences
- UI/agent can ship without ROS build coupling
- Adapter can be swapped or upgraded independently
