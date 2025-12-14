import { recordings } from "../lib/mockData";

export function LogsPage() {
  return (
    <section className="section">
      <div className="section-header">
        <h2>Logs & Bags</h2>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn" type="button">
            Start recording
          </button>
          <button className="btn" type="button">
            Import bag
          </button>
        </div>
      </div>
      <p className="muted">Recording state is mocked; connect to agent in Phase 0.</p>

      <table className="table" style={{ marginTop: 14 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Topics</th>
            <th>Duration</th>
            <th>Size</th>
          </tr>
        </thead>
        <tbody>
          {recordings.map((rec) => (
            <tr key={rec.id}>
              <td>{rec.name}</td>
              <td>
                <span className={`pill ${rec.status === "recording" ? "warning" : "success"}`}>
                  {rec.status}
                </span>
              </td>
              <td>{rec.topics}</td>
              <td className="muted">{Math.round(rec.durationSec / 60)} min</td>
              <td className="muted">{rec.sizeMb} MB</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

