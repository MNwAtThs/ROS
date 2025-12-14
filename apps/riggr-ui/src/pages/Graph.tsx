import { useMemo, useState } from "react";
import { nodes, topics } from "../lib/mockData";

export function GraphPage() {
  const [query, setQuery] = useState("");

  const filteredNodes = useMemo(
    () =>
      nodes.filter(
        (n) =>
          n.name.toLowerCase().includes(query.toLowerCase()) ||
          n.namespace.toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  );

  const filteredTopics = useMemo(
    () =>
      topics.filter((t) =>
        [t.name, t.type].some((field) => field.toLowerCase().includes(query.toLowerCase()))
      ),
    [query]
  );

  return (
    <>
      <section className="section">
        <div className="section-header">
          <h2>Graph Explorer</h2>
          <input
            className="input"
            style={{ maxWidth: 260 }}
            placeholder="Search nodes/topics"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <p className="muted">Local ROS graph snapshot (mock data)</p>
      </section>

      <div className="grid-two">
        <section className="section">
          <div className="section-header">
            <h2>Nodes</h2>
            <span className="muted">{filteredNodes.length} shown</span>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Namespace</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredNodes.map((node) => (
                <tr key={node.name}>
                  <td>{node.name}</td>
                  <td className="muted">{node.namespace}</td>
                  <td>{statusPill(node.health)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="section">
          <div className="section-header">
            <h2>Topics</h2>
            <span className="muted">{filteredTopics.length} shown</span>
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
              {filteredTopics.map((topic) => (
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
      </div>
    </>
  );
}

function statusPill(status: "healthy" | "warning" | "error") {
  const cls = status === "healthy" ? "success" : status === "warning" ? "warning" : "danger";
  return <span className={`pill ${cls}`}>{status}</span>;
}

