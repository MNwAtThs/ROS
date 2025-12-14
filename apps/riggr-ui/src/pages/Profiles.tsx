import { profiles } from "../lib/mockData";

export function ProfilesPage() {
  return (
    <section className="section">
      <div className="section-header">
        <h2>Profiles</h2>
        <button className="btn" type="button">
          New profile
        </button>
      </div>
      <div className="grid-two">
        {profiles.map((profile) => (
          <div key={profile.id} className="list-item">
            <div className="title">{profile.name}</div>
            <div className="meta">
              ROS {profile.distro} · Domain {profile.domainId} · {profile.rmw}
            </div>
            <div style={{ marginTop: 8, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <span className="pill">{profile.workspacePath}</span>
              <span className="pill muted">Last used {profile.lastUsed}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

