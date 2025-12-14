export type HealthStatus = "healthy" | "warning" | "error";

export interface Profile {
  id: string;
  name: string;
  distro: string;
  workspacePath: string;
  domainId: number;
  rmw: string;
  lastUsed: string;
}

export interface NodeInfo {
  name: string;
  namespace: string;
  health: HealthStatus;
  lastSeenMs: number;
}

export interface TopicInfo {
  name: string;
  type: string;
  rateHz: number;
  lastMessageMs: number;
}

export interface LaunchInfo {
  id: string;
  name: string;
  status: "running" | "stopped" | "error";
  launchFile: string;
  startedAgo: string;
  namespace: string;
}

export interface RecordingInfo {
  id: string;
  name: string;
  sizeMb: number;
  durationSec: number;
  status: "recording" | "complete";
  topics: number;
}

export interface GraphMetrics {
  nodes: number;
  topics: number;
  services: number;
  actions: number;
}

export interface StatusSnapshot {
  profileName: string;
  agentStatus: "online" | "offline";
  domain: string;
}

