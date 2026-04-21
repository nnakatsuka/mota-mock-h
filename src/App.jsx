import { useState } from "react";
import JobseekerMock from "./JobseekerMock";

export default function App() {
  const [mode, setMode] = useState(null);
  if (mode === "cs") return <JobseekerMock onBack={() => setMode(null)} />;
  return (
    <div style={{ minHeight: "100vh", background: "#F0EFEB", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Noto Sans JP',sans-serif" }}>
      <div style={{ fontSize: 36, fontWeight: 800, color: "#E8593C", marginBottom: 8 }}>MOTA</div>
      <div style={{ fontSize: 14, color: "#5F5E5A", marginBottom: 32 }}>採用プラットフォーム モック</div>
      <div style={{ display: "flex", gap: 16 }}>
        <div onClick={() => setMode("cs")} style={{ width: 200, background: "#fff", borderRadius: 16, padding: 24, textAlign: "center", cursor: "pointer", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", border: "2px solid transparent" }}
          onMouseEnter={e => e.currentTarget.style.borderColor = "#E8593C"} onMouseLeave={e => e.currentTarget.style.borderColor = "transparent"}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>👤</div>
          <div style={{ fontSize: 16, fontWeight: 700 }}>求職者側</div>
          <div style={{ fontSize: 12, color: "#8C8A82", marginTop: 4 }}>CS画面フロー</div>
        </div>
        <div style={{ width: 200, background: "#fff", borderRadius: 16, padding: 24, textAlign: "center", opacity: 0.5 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🏢</div>
          <div style={{ fontSize: 16, fontWeight: 700 }}>企業側</div>
          <div style={{ fontSize: 12, color: "#8C8A82", marginTop: 4 }}>CL画面（準備中）</div>
        </div>
      </div>
    </div>
  );
}
