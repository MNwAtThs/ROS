import { useEffect, useState } from "react";
import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import { DashboardPage } from "../pages/Dashboard";
import { ProfilesPage } from "../pages/Profiles";
import { GraphPage } from "../pages/Graph";
import { LaunchesPage } from "../pages/Launches";
import { LogsPage } from "../pages/Logs";
import { statusSnapshot } from "../lib/mockData";
import { agentClient, agentEndpoint } from "../lib/api/client";
import { Empty } from "../lib/api/proto";

const navItems = [
  { path: "/", label: "Dashboard", icon: "🏠" },
  { path: "/profiles", label: "Profiles", icon: "🧭" },
  { path: "/graph", label: "Graph", icon: "🛰️" },
  { path: "/launches", label: "Launches", icon: "🚀" },
  { path: "/logs", label: "Logs & Bags", icon: "📜" },
];

export function App() {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main">
        <Topbar />
        <main className="content">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/profiles" element={<ProfilesPage />} />
            <Route path="/graph" element={<GraphPage />} />
            <Route path="/launches" element={<LaunchesPage />} />
            <Route path="/logs" element={<LogsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="sidebar">
      <div>
        <div className="logo">Riggr</div>
        <div className="version">ROS Desktop Toolkit</div>
      </div>
      <nav className="nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `nav-item${isActive ? " active" : ""}`
            }
            end={item.path === "/"}
          >
            <span className="icon">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="muted" style={{ fontSize: 12, lineHeight: 1.4 }}>
        UI → Agent → ROS adapter
        <br />
        (Phase 0 scaffold)
      </div>
    </aside>
  );
}

function Topbar() {
  const status = statusSnapshot;
  const [agentStatus, setAgentStatus] = useState<
    "checking" | "online" | "offline"
  >("checking");
  const [agentVersion, setAgentVersion] = useState<string | null>(null);
  const [agentError, setAgentError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const fetchVersion = async () => {
      try {
        const res = await agentClient.getVersion(new Empty());
        if (cancelled) return;
        const sha = res.gitSha ? ` (${res.gitSha})` : "";
        setAgentVersion(`${res.name} ${res.version}${sha}`);
        setAgentStatus("online");
        setAgentError(null);
      } catch (err) {
        if (cancelled) return;
        console.error("Failed to get agent version", err);
        setAgentStatus("offline");
        setAgentVersion(null);
        setAgentError("Agent not reachable");
      }
    };

    fetchVersion();
    return () => {
      cancelled = true;
    };
  }, []);

  const agentPillClass =
    agentStatus === "online"
      ? "pill success"
      : agentStatus === "checking"
        ? "pill warning"
        : "pill danger";
  const agentPillText =
    agentStatus === "online"
      ? agentVersion ?? "online"
      : agentStatus === "checking"
        ? "checking..."
        : agentError ?? "offline";

  return (
    <header className="topbar">
      <div className="title">ROS Desktop</div>
      <div className="status">
        <span className={agentPillClass}>
          Agent: {agentPillText}
          <span className="muted" style={{ marginLeft: 6 }}>
            {agentEndpoint}
          </span>
        </span>
        <span className="pill">{status.profileName}</span>
        <span className="pill warning">{status.domain}</span>
      </div>
    </header>
  );
}
