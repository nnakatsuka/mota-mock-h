import { useState } from "react";
import JobseekerMock from "./JobseekerMock.jsx";
import EmployerMock from "./EmployerMock.jsx";

export default function App() {
  const [view, setView] = useState(null);

  if (view === "jobseeker") return <JobseekerMock onBack={() => setView(null)} />;
  if (view === "employer") return <EmployerMock onBack={() => setView(null)} />;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #FAFAF8 0%, #F0EFEB 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Noto Sans JP', 'Hiragino Sans', sans-serif",
    }}>
      <div style={{ textAlign: "center", maxWidth: 600 }}>
        <div style={{
          fontSize: 48, fontWeight: 800, color: "#E8593C",
          letterSpacing: 4, marginBottom: 8,
        }}>MOTA</div>
        <div style={{
          fontSize: 16, color: "#5F5E5A", marginBottom: 40,
        }}>UIモック プロトタイプ</div>
        <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
          <div onClick={() => setView("jobseeker")} style={{
            width: 240, padding: "32px 24px", borderRadius: 16,
            background: "#fff", border: "1px solid #E8E6E1",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            cursor: "pointer", transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.1)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)"; }}
          >
            <div style={{ fontSize: 40, marginBottom: 12 }}>📱</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#1A1A1A", marginBottom: 6 }}>求職者側</div>
            <div style={{ fontSize: 13, color: "#8C8A82", lineHeight: 1.6 }}>
              スマホWebアプリ<br />全16画面
            </div>
          </div>
          <div onClick={() => setView("employer")} style={{
            width: 240, padding: "32px 24px", borderRadius: 16,
            background: "#fff", border: "1px solid #E8E6E1",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            cursor: "pointer", transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.1)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)"; }}
          >
            <div style={{ fontSize: 40, marginBottom: 12 }}>🖥️</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#1A1A1A", marginBottom: 6 }}>企業側</div>
            <div style={{ fontSize: 13, color: "#8C8A82", lineHeight: 1.6 }}>
              PC管理画面<br />全19画面
            </div>
          </div>
        </div>
        <div style={{
          marginTop: 32, fontSize: 12, color: "#B4B2A9",
        }}>
          ※ 画面遷移が可能なインタラクティブモックです
        </div>
      </div>
    </div>
  );
}

