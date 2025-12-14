import {
  GraphMetrics,
  LaunchInfo,
  NodeInfo,
  Profile,
  RecordingInfo,
  StatusSnapshot,
  TopicInfo,
} from "./types";

export const statusSnapshot: StatusSnapshot = {
  profileName: "agv_r3 (humble)",
  agentStatus: "online",
  domain: "domain: 23 / RMW: rmw_fastrtps_cpp",
};

export const profiles: Profile[] = [
  {
    id: "profile-1",
    name: "agv_r3",
    distro: "humble",
    workspacePath: "~/ws/agv_r3",
    domainId: 23,
    rmw: "rmw_fastrtps_cpp",
    lastUsed: "2h ago",
  },
  {
    id: "profile-2",
    name: "arm_dev",
    distro: "jazzy",
    workspacePath: "~/ws/arm_dev",
    domainId: 10,
    rmw: "rmw_cyclonedds_cpp",
    lastUsed: "yesterday",
  },
];

export const graphMetrics: GraphMetrics = {
  nodes: 14,
  topics: 32,
  services: 6,
  actions: 2,
};

export const nodes: NodeInfo[] = [
  { name: "nav2_controller", namespace: "/nav2", health: "healthy", lastSeenMs: 220 },
  { name: "lidar_driver", namespace: "/sensors", health: "warning", lastSeenMs: 4200 },
  { name: "map_server", namespace: "/nav2", health: "healthy", lastSeenMs: 150 },
  { name: "bag_recorder", namespace: "/", health: "healthy", lastSeenMs: 800 },
];

export const topics: TopicInfo[] = [
  { name: "/scan", type: "sensor_msgs/LaserScan", rateHz: 9.7, lastMessageMs: 210 },
  { name: "/cmd_vel", type: "geometry_msgs/Twist", rateHz: 10.0, lastMessageMs: 120 },
  { name: "/tf", type: "tf2_msgs/TFMessage", rateHz: 30.0, lastMessageMs: 80 },
  { name: "/pose", type: "geometry_msgs/PoseWithCovarianceStamped", rateHz: 5.0, lastMessageMs: 260 },
];

export const launches: LaunchInfo[] = [
  {
    id: "launch-1",
    name: "bringup_nav2",
    status: "running",
    launchFile: "bringup/bringup_launch.py",
    startedAgo: "6m ago",
    namespace: "/",
  },
  {
    id: "launch-2",
    name: "lidar_stack",
    status: "stopped",
    launchFile: "sensors/lidar_launch.py",
    startedAgo: "stopped 10m ago",
    namespace: "/sensors",
  },
];

export const recordings: RecordingInfo[] = [
  {
    id: "rec-1",
    name: "warehouse_run_001",
    sizeMb: 512,
    durationSec: 480,
    status: "recording",
    topics: 6,
  },
  {
    id: "rec-2",
    name: "docking_debug",
    sizeMb: 128,
    durationSec: 210,
    status: "complete",
    topics: 4,
  },
];

