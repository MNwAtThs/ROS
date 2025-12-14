import { graphMetrics, launches, nodes, recordings, topics } from "../lib/mockData";
import { LaunchInfo } from "../lib/types";

export function DashboardPage() {
  const runningLaunch = launches.find((l) => l.status === "running");

  return (
    <>
      <div className="card-grid">
        <div className="card">
          <h3>Graph</h3>
          <div className="kpi">
            {graphMetrics.nodes} nodes · {graphMetrics.topics} topics
          </div>
          <p className="muted">
            Services: {graphMetrics.services} · Actions: {graphMetrics.actions}
          </p>
        </div>
        <div className="card">
          <h3>Launch</h3>
          {runningLaunch ? (
            <>
              <div className="kpi">{runningLaunch.name}</div>
              <p className="muted">Started {runningLaunch.startedAgo}</p>
            </>
          ) : (
            <p className="muted">No launch running</p>
          )}
        </div>
        <div className="card">
          <h3>Recording</h3>
          <div className="kpi">{recordings[0]?.status === "recording" ? "Recording" : "Idle"}</div>
          <p className="muted">
            Active: {recordings.filter((r) => r.status === "recording").length} · Completed:{" "}
            {recordings.filter((r) => r.status === "complete").length}
          </p>
        </div>
        <div className="card">
          <h3>Health</h3>
          <div className="kpi">
            {nodes.filter((n) => n.health === "healthy").length} / {nodes.length} healthy
          </div>
          <p className="muted">
            {nodes.filter((n) => n.health === "warning").length} warning ·{" "}
            {nodes.filter((n) => n.health === "error").length} error
          </p>
        </div>
      </div>

      <div className="grid-two">
        <section className="section">
          <div className="section-header">
            <h2>Nodes</h2>
            <span className="muted">{nodes.length} total</span>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Namespace</th>
                <th>Status</th>
                <th>Last seen</th>
              </tr>
            </thead>
            <tbody>
              {nodes.slice(0, 4).map((node) => (
                <tr key={node.name}>
                  <td>{node.name}</td>
                  <td className="muted">{node.namespace}</td>
                  <td>{statusPill(node.health)}</td>
                  <td className="muted">{node.lastSeenMs} ms ago</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="section">
          <div className="section-header">
            <h2>Launches</h2>
            <span className="muted">{launches.length} defined</span>
          </div>
          <div className="list">
            {launches.map((launch) => (
              <LaunchRow key={launch.id} launch={launch} />
            ))}
          </div>
        </section>
      </div>

      <section className="section">
        <div className="section-header">
          <h2>Topics (recent)</h2>
          <span className="muted">{topics.length} tracked</span>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Topic</th>
              <th>Type</th>
              <th>Rate</th>
              <th>Last msg</th>
            </tr>
          </thead>
          <tbody>
            {topics.slice(0, 6).map((topic) => (
              <tr key={topic.name}>
                <td>{topic.name}</td>
                <td className="muted">{topic.type}</td>
                <td>{topic.rateHz.toFixed(1)} Hz</td>
                <td className="muted">{topic.lastMessageMs} ms ago</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Recordings</h2>
          <span className="muted">{recordings.length} total</span>
        </div>
        <div className="list">
          {recordings.map((rec) => (
            <div key={rec.id} className="list-item">
              <div className="title">{rec.name}</div>
              <div className="meta">
                {rec.topics} topics · {(rec.sizeMb / 1024).toFixed(1)} GB · {rec.durationSec}s ·{" "}
                <span className={`pill ${rec.status === "recording" ? "warning" : "success"}`}>
                  {rec.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function LaunchRow({ launch }: { launch: LaunchInfo }) {
  const color =
    launch.status === "running" ? "success" : launch.status === "error" ? "danger" : "warning";
  return (
    <div className="list-item">
      <div className="title">{launch.name}</div>
      <div className="meta">
        {launch.launchFile} · {launch.namespace}
      </div>
      <div style={{ marginTop: 6, display: "flex", gap: 10, alignItems: "center" }}>
        <span className={`pill ${color}`}>{launch.status}</span>
        <span className="muted">{launch.startedAgo}</span>
      </div>
    </div>
  );
}

function statusPill(status: "healthy" | "warning" | "error") {
  const cls = status === "healthy" ? "success" : status === "warning" ? "warning" : "danger";
  return <span className={`pill ${cls}`}>{status}</span>;
}

