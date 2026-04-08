import { useState } from "react";

const SCREENS = [
  "ログイン",
  "企業情報登録",
  "求人情報登録",
  "ダッシュボード",
  "求職者検索",
  "求職者詳細",
  "スカウト送信",
  "スカウト管理(リスト)",
  "スカウト管理(カンバン)",
  "応募管理",
  "応募者詳細",
  "AI面談結果",
  "選考日程登録",
  "選考結果報告",
  "メッセージ一覧",
  "チャット画面",
  "求人管理",
  "求人編集",
  "設定",
];

const PHASES = {
  "登録": ["ログイン", "企業情報登録", "求人情報登録"],
  "ダッシュボード": ["ダッシュボード"],
  "求職者・スカウト": ["求職者検索", "求職者詳細", "スカウト送信", "スカウト管理(リスト)", "スカウト管理(カンバン)"],
  "応募・選考": ["応募管理", "応募者詳細", "AI面談結果", "選考日程登録", "選考結果報告"],
  "メッセージ": ["メッセージ一覧", "チャット画面"],
  "求人・設定": ["求人管理", "求人編集", "設定"],
};

const NAV_ITEMS = [
  { id: "ダッシュボード", icon: "📊", label: "ダッシュボード" },
  { id: "求職者検索", icon: "🔍", label: "求職者検索" },
  { id: "スカウト管理(リスト)", icon: "📩", label: "スカウト管理" },
  { id: "応募管理", icon: "📋", label: "応募管理" },
  { id: "メッセージ一覧", icon: "💬", label: "メッセージ" },
  { id: "求人管理", icon: "📝", label: "求人管理" },
  { id: "設定", icon: "⚙️", label: "設定" },
];

// Sidebar
function Sidebar({ active, onNavigate, collapsed }) {
  return (
    <div style={{
      width: collapsed ? 60 : 200, background: "#1A1A1A", color: "#fff",
      display: "flex", flexDirection: "column", flexShrink: 0, transition: "width 0.2s",
      borderRight: "1px solid #2C2C2A",
    }}>
      <div style={{
        height: 56, display: "flex", alignItems: "center", justifyContent: collapsed ? "center" : "flex-start",
        padding: collapsed ? 0 : "0 20px", borderBottom: "1px solid #2C2C2A",
      }}>
        <span style={{ fontSize: 20, fontWeight: 800, color: "#E8593C", letterSpacing: 2 }}>
          {collapsed ? "M" : "MOTA"}
        </span>
        {!collapsed && <span style={{ fontSize: 10, color: "#888", marginLeft: 6 }}>管理画面</span>}
      </div>
      <div style={{ flex: 1, paddingTop: 8 }}>
        {NAV_ITEMS.map(item => {
          const isActive = active === item.id || 
            (item.id === "スカウト管理(リスト)" && (active === "スカウト管理(リスト)" || active === "スカウト管理(カンバン)"));
          return (
            <div key={item.id} onClick={() => onNavigate(item.id)} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: collapsed ? "10px 0" : "10px 20px",
              justifyContent: collapsed ? "center" : "flex-start",
              cursor: "pointer", fontSize: 13, fontWeight: isActive ? 700 : 400,
              background: isActive ? "rgba(232,89,60,0.15)" : "transparent",
              color: isActive ? "#E8593C" : "#AAA",
              borderLeft: isActive ? "3px solid #E8593C" : "3px solid transparent",
              transition: "all 0.15s",
            }}>
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </div>
          );
        })}
      </div>
      {!collapsed && (
        <div style={{
          padding: "12px 20px", borderTop: "1px solid #2C2C2A",
          fontSize: 11, color: "#666",
        }}>
          <div>スカウト残数</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#E8593C", marginTop: 2 }}>147<span style={{ fontSize: 11, color: "#888" }}> / 300通</span></div>
          <div style={{ fontSize: 10, color: "#555", marginTop: 2 }}>リセット日: 2026/05/01</div>
        </div>
      )}
    </div>
  );
}

// Top header bar
function TopBar({ title, children }) {
  return (
    <div style={{
      height: 56, background: "#fff", borderBottom: "1px solid #E8E6E1",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 24px", flexShrink: 0,
    }}>
      <div style={{ fontSize: 18, fontWeight: 700, color: "#1A1A1A" }}>{title}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>{children}</div>
    </div>
  );
}

// Stat card
function StatCard({ label, value, sub, color }) {
  return (
    <div style={{
      flex: 1, background: "#fff", borderRadius: 12, padding: "18px 20px",
      border: "1px solid #E8E6E1",
    }}>
      <div style={{ fontSize: 12, color: "#8C8A82", marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 800, color: color || "#1A1A1A" }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: "#B4B2A9", marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

// Table
function Table({ headers, rows, onRowClick }) {
  return (
    <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E8E6E1", overflow: "hidden" }}>
      <div style={{
        display: "grid", gridTemplateColumns: headers.map(h => h.w || "1fr").join(" "),
        background: "#F7F6F3", padding: "10px 16px", gap: 8,
      }}>
        {headers.map((h, i) => (
          <div key={i} style={{ fontSize: 11, fontWeight: 700, color: "#8C8A82" }}>{h.label}</div>
        ))}
      </div>
      {rows.map((row, ri) => (
        <div key={ri} onClick={() => onRowClick && onRowClick(ri)} style={{
          display: "grid", gridTemplateColumns: headers.map(h => h.w || "1fr").join(" "),
          padding: "12px 16px", gap: 8, borderTop: "1px solid #F1EFE8",
          cursor: onRowClick ? "pointer" : "default",
          transition: "background 0.1s",
        }}
          onMouseEnter={e => { if (onRowClick) e.currentTarget.style.background = "#FAFAF8"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
        >
          {row.map((cell, ci) => (
            <div key={ci} style={{ fontSize: 13, color: "#1A1A1A", display: "flex", alignItems: "center" }}>{cell}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

// Tag
function Tag({ children, color }) {
  const colors = {
    orange: { bg: "#FFF3ED", text: "#E8593C" },
    blue: { bg: "#EDF4FF", text: "#2E6FD4" },
    green: { bg: "#EEFBF3", text: "#1D9E75" },
    gray: { bg: "#F1EFE8", text: "#5F5E5A" },
    purple: { bg: "#F0EDFE", text: "#534AB7" },
    red: { bg: "#FCEBEB", text: "#A32D2D" },
  };
  const c = colors[color] || colors.gray;
  return (
    <span style={{
      display: "inline-block", padding: "3px 10px", borderRadius: 6,
      fontSize: 11, fontWeight: 600, background: c.bg, color: c.text,
    }}>{children}</span>
  );
}

// Button
function Btn({ children, primary, small, outline, danger, disabled, onClick }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      height: small ? 32 : 40, padding: small ? "0 14px" : "0 20px",
      borderRadius: 8, border: outline ? `1.5px solid ${danger ? "#E24B4A" : "#E8593C"}` : "none",
      background: outline ? "transparent" : disabled ? "#D3D1C7" : danger ? "#E24B4A" : primary !== false ? "#E8593C" : "#F7F6F3",
      color: outline ? (danger ? "#E24B4A" : "#E8593C") : primary !== false ? "#fff" : "#5F5E5A",
      fontSize: small ? 12 : 13, fontWeight: 600, cursor: disabled ? "default" : "pointer",
      display: "inline-flex", alignItems: "center", gap: 6,
    }}>{children}</button>
  );
}

// Field
function Field({ label, placeholder, type, required, wide }) {
  return (
    <div style={{ marginBottom: 14, width: wide ? "100%" : "auto" }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: "#3D3D3A", marginBottom: 4, display: "flex", gap: 4 }}>
        {label}
        {required && <span style={{ fontSize: 10, color: "#E8593C" }}>必須</span>}
      </div>
      {type === "textarea" ? (
        <div style={{
          borderRadius: 8, border: "1.5px solid #D3D1C7", padding: 12,
          minHeight: 80, fontSize: 13, color: "#B4B2A9", background: "#fff",
        }}>{placeholder}</div>
      ) : (
        <div style={{
          height: 40, borderRadius: 8, border: "1.5px solid #D3D1C7",
          display: "flex", alignItems: "center", padding: "0 12px",
          fontSize: 13, color: "#B4B2A9", background: "#fff",
        }}>{placeholder}</div>
      )}
    </div>
  );
}

// ========== SCREENS ==========

function ScreenLogin({ onNavigate }) {
  return (
    <div style={{
      flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg, #FAFAF8 0%, #F0EFEB 100%)",
    }}>
      <div style={{
        width: 400, background: "#fff", borderRadius: 16, padding: 40,
        boxShadow: "0 8px 32px rgba(0,0,0,0.08)", border: "1px solid #E8E6E1",
      }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 32, fontWeight: 800, color: "#E8593C", letterSpacing: 2 }}>MOTA</div>
          <div style={{ fontSize: 13, color: "#8C8A82", marginTop: 4 }}>企業管理画面</div>
        </div>
        <Field label="メールアドレス" placeholder="admin@example.com" required />
        <Field label="パスワード" placeholder="••••••••" required />
        <div style={{ marginTop: 8 }}>
          <Btn>ログイン</Btn>
        </div>
        <div style={{ textAlign: "center", marginTop: 16, fontSize: 12, color: "#8C8A82" }}>
          アカウントをお持ちでない方は<span style={{ color: "#E8593C", fontWeight: 600, cursor: "pointer" }}>新規登録</span>
        </div>
      </div>
    </div>
  );
}

function ScreenCompanyReg({ onNavigate }) {
  return (
    <div style={{ flex: 1, overflow: "auto", background: "#FAFAF8" }}>
      <TopBar title="企業情報登録（Step 1 / 2）" />
      <div style={{ maxWidth: 640, margin: "24px auto", padding: "0 24px" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 4, borderRadius: 2, background: "#E8593C" }} />
          <div style={{ flex: 1, height: 4, borderRadius: 2, background: "#E8E6E1" }} />
        </div>
        <div style={{ background: "#fff", borderRadius: 12, padding: 28, border: "1px solid #E8E6E1" }}>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, color: "#1A1A1A" }}>企業情報</div>
          <Field label="企業名" placeholder="株式会社サンプル" required wide />
          <Field label="所在地" placeholder="東京都新宿区西新宿1-1-1" required wide />
          <Field label="業種" placeholder="選択してください ▼" required wide />
          <Field label="設立年" placeholder="2000" wide />
          <Field label="従業員数" placeholder="50" wide />
          <Field label="企業紹介文" placeholder="企業の理念やアピールポイントを記入..." type="textarea" required wide />
          <Field label="企業ロゴ" placeholder="画像をアップロード" wide />
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 8 }}>
            <Btn primary={false}>下書き保存</Btn>
            <Btn>次へ：求人情報</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScreenJobReg({ onNavigate }) {
  return (
    <div style={{ flex: 1, overflow: "auto", background: "#FAFAF8" }}>
      <TopBar title="求人情報登録（Step 2 / 2）" />
      <div style={{ maxWidth: 640, margin: "24px auto", padding: "0 24px" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 4, borderRadius: 2, background: "#E8593C" }} />
          <div style={{ flex: 1, height: 4, borderRadius: 2, background: "#E8593C" }} />
        </div>
        <div style={{ background: "#fff", borderRadius: 12, padding: 28, border: "1px solid #E8E6E1" }}>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, color: "#1A1A1A" }}>求人情報</div>
          <Field label="職種" placeholder="施工管理" required wide />
          <Field label="雇用形態" placeholder="正社員 ▼" required wide />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="月給（下限）" placeholder="250,000" required />
            <Field label="月給（上限）" placeholder="350,000" required />
          </div>
          <Field label="勤務地" placeholder="東京都新宿区" required wide />
          <Field label="勤務時間" placeholder="8:00〜17:00" required wide />
          <Field label="休日" placeholder="完全週休2日制（土日）" required wide />
          <Field label="仕事内容" placeholder="具体的な業務内容を記入..." type="textarea" required wide />
          <Field label="福利厚生" placeholder="社保完備、交通費支給..." type="textarea" wide />
          <Field label="職場写真（6枚まで）" placeholder="画像をアップロード" wide />
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 8 }}>
            <Btn primary={false}>下書き保存</Btn>
            <Btn>登録完了・掲載開始</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScreenDashboard({ onNavigate }) {
  return (
    <div style={{ flex: 1, overflow: "auto", background: "#FAFAF8" }}>
      <TopBar title="ダッシュボード">
        <div style={{ fontSize: 12, color: "#8C8A82" }}>株式会社サンプル建設</div>
        <div style={{
          width: 32, height: 32, borderRadius: 16, background: "#E8E6E1",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12,
        }}>管</div>
      </TopBar>
      <div style={{ padding: 24 }}>
        <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
          <StatCard label="スカウト残数" value="147" sub="/ 300通（リセット: 5/1）" color="#E8593C" />
          <StatCard label="今月の応募数" value="12" sub="先月比 +3" color="#2E6FD4" />
          <StatCard label="選考中" value="5" sub="面談済み 3 / 面接待ち 2" color="#534AB7" />
          <StatCard label="今月の採用数" value="2" sub="先月比 +1" color="#1D9E75" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: 20, border: "1px solid #E8E6E1" }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, color: "#1A1A1A" }}>最近のスカウト応答</div>
            {[
              { name: "田中 太郎", status: "応諾", color: "green", time: "2時間前" },
              { name: "佐藤 花子", status: "面談済み", color: "purple", time: "昨日" },
              { name: "鈴木 一郎", status: "辞退", color: "gray", time: "2日前" },
              { name: "高橋 美咲", status: "未読", color: "blue", time: "3日前" },
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "8px 0", borderBottom: i < 3 ? "1px solid #F1EFE8" : "none",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 14, background: "#F7F6F3", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#5F5E5A" }}>
                    {item.name[0]}
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{item.name}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Tag color={item.color}>{item.status}</Tag>
                  <span style={{ fontSize: 11, color: "#B4B2A9" }}>{item.time}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: "#fff", borderRadius: 12, padding: 20, border: "1px solid #E8E6E1" }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, color: "#1A1A1A" }}>未対応タスク</div>
            {[
              { task: "山本さんの面接日程を設定", urgent: true },
              { task: "AI面談結果を確認（3件）", urgent: false },
              { task: "新着応募の確認（2件）", urgent: false },
              { task: "未返信メッセージ（1件）", urgent: true },
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "8px 0", borderBottom: i < 3 ? "1px solid #F1EFE8" : "none",
              }}>
                {item.urgent && <div style={{ width: 6, height: 6, borderRadius: 3, background: "#E8593C" }} />}
                <span style={{ fontSize: 13, color: "#1A1A1A" }}>{item.task}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ScreenJobseekerSearch({ onNavigate }) {
  return (
    <div style={{ flex: 1, overflow: "auto", background: "#FAFAF8" }}>
      <TopBar title="求職者検索">
        <Btn small>検索条件を保存</Btn>
      </TopBar>
      <div style={{ padding: 24 }}>
        {/* Filter area */}
        <div style={{ background: "#fff", borderRadius: 12, padding: 20, border: "1px solid #E8E6E1", marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>検索条件</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 12 }}>
            <Field label="年齢" placeholder="18〜35歳 ▼" />
            <Field label="エリア" placeholder="東京都 ▼" />
            <Field label="学歴" placeholder="指定なし ▼" />
            <Field label="免許・資格" placeholder="選択 ▼" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12 }}>
            <Field label="Q&Aキーワード" placeholder="キーワード入力" />
            <Field label="動画" placeholder="動画あり ▼" />
            <Field label="転職意欲" placeholder="指定なし ▼" />
            <div style={{ display: "flex", alignItems: "flex-end", paddingBottom: 14 }}>
              <Btn>検索する</Btn>
            </div>
          </div>
        </div>
        {/* Results */}
        <div style={{ fontSize: 13, color: "#8C8A82", marginBottom: 10 }}>検索結果: 48件</div>
        <Table
          headers={[
            { label: "", w: "40px" },
            { label: "氏名", w: "100px" },
            { label: "年齢", w: "50px" },
            { label: "エリア", w: "80px" },
            { label: "学歴" },
            { label: "動画", w: "50px" },
            { label: "アクション", w: "120px" },
          ]}
          rows={[
            [<input type="checkbox" />, "田中 太郎", "25", "東京都", "高卒", <Tag color="green">あり</Tag>, <Btn small>詳細</Btn>],
            [<input type="checkbox" />, "佐藤 花子", "22", "神奈川", "専門卒", <Tag color="green">あり</Tag>, <Btn small>詳細</Btn>],
            [<input type="checkbox" />, "鈴木 一郎", "28", "東京都", "大卒", <Tag color="gray">なし</Tag>, <Btn small>詳細</Btn>],
            [<input type="checkbox" />, "高橋 美咲", "20", "千葉県", "高卒", <Tag color="green">あり</Tag>, <Btn small>詳細</Btn>],
            [<input type="checkbox" />, "渡辺 健太", "31", "埼玉県", "専門卒", <Tag color="gray">なし</Tag>, <Btn small>詳細</Btn>],
          ]}
          onRowClick={(i) => onNavigate("求職者詳細")}
        />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14 }}>
          <Btn small outline>選択した求職者にスカウト送信（0件）</Btn>
          <div style={{ fontSize: 12, color: "#8C8A82" }}>1-5 / 48件</div>
        </div>
      </div>
    </div>
  );
}

function ScreenJobseekerDetail({ onNavigate }) {
  return (
    <div style={{ flex: 1, overflow: "auto", background: "#FAFAF8" }}>
      <TopBar title="求職者詳細">
        <Btn onClick={() => onNavigate("スカウト送信")}>スカウトを送る</Btn>
      </TopBar>
      <div style={{ padding: 24, display: "grid", gridTemplateColumns: "280px 1fr", gap: 20 }}>
        {/* Left: Profile */}
        <div>
          <div style={{ background: "#fff", borderRadius: 12, padding: 20, border: "1px solid #E8E6E1", marginBottom: 16 }}>
            <div style={{
              width: 80, height: 80, borderRadius: 40, margin: "0 auto 12px",
              background: "linear-gradient(135deg, #E8593C, #FAC775)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontSize: 28, fontWeight: 800,
            }}>田</div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 16, fontWeight: 700 }}>田中 太郎</div>
              <div style={{ fontSize: 12, color: "#8C8A82", marginTop: 2 }}>25歳 ・ 東京都 ・ 高卒</div>
            </div>
            <div style={{ marginTop: 14, display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
              <Tag color="green">動画あり</Tag>
              <Tag color="blue">普通免許</Tag>
            </div>
          </div>
          <div style={{ background: "#fff", borderRadius: 12, padding: 16, border: "1px solid #E8E6E1" }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>基本情報</div>
            {[
              ["住所", "東京都新宿区"],
              ["学歴", "高卒"],
              ["免許", "普通自動車免許"],
              ["登録日", "2026/04/01"],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", fontSize: 12, marginBottom: 6 }}>
                <div style={{ width: 60, color: "#8C8A82", flexShrink: 0 }}>{k}</div>
                <div style={{ color: "#1A1A1A" }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Right: Q&A + Video */}
        <div>
          <div style={{ background: "#fff", borderRadius: 12, padding: 20, border: "1px solid #E8E6E1", marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>Q&A回答</div>
            {[
              { q: "あなたの得意なことは何ですか？", a: "人とお話しすることが得意で、初対面の方ともすぐに打ち解けることができます。" },
              { q: "どんな職場で働きたいですか？", a: "チームワークを大切にし、明るい雰囲気の職場で働きたいと考えております。" },
              { q: "仕事で大切にしていることは？", a: "時間を厳守し、信頼関係を築くことを大切にしております。" },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#8C8A82", marginBottom: 4 }}>Q{i + 1}. {item.q}</div>
                <div style={{ fontSize: 13, color: "#1A1A1A", lineHeight: 1.6, background: "#F7F6F3", borderRadius: 8, padding: 12 }}>{item.a}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "#fff", borderRadius: 12, padding: 20, border: "1px solid #E8E6E1" }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>プロフィール動画</div>
            <div style={{
              height: 200, borderRadius: 10, background: "#1A1A1A",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: 28, background: "rgba(255,255,255,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 24, cursor: "pointer",
              }}>▶</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScreenScoutSend({ onNavigate }) {
  return (
    <div style={{ flex: 1, overflow: "auto", background: "#FAFAF8" }}>
      <TopBar title="スカウト送信" />
      <div style={{ maxWidth: 700, margin: "24px auto", padding: "0 24px" }}>
        <div style={{ background: "#fff", borderRadius: 12, padding: 28, border: "1px solid #E8E6E1" }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>テンプレートを選択</div>
          <div style={{
            height: 40, borderRadius: 8, border: "1.5px solid #D3D1C7", background: "#fff",
            display: "flex", alignItems: "center", padding: "0 12px", fontSize: 13, color: "#B4B2A9",
            marginBottom: 16, justifyContent: "space-between",
          }}>
            <span>施工管理 - 未経験歓迎テンプレ ▼</span>
            <Btn small primary={false}>編集</Btn>
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>スカウト先</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
            {["田中 太郎", "高橋 美咲"].map(n => (
              <span key={n} style={{
                padding: "4px 12px", borderRadius: 6, background: "#EDF4FF",
                fontSize: 12, color: "#2E6FD4", fontWeight: 500,
                display: "inline-flex", alignItems: "center", gap: 4,
              }}>{n} ✕</span>
            ))}
            <span style={{
              padding: "4px 12px", borderRadius: 6, border: "1px dashed #D3D1C7",
              fontSize: 12, color: "#8C8A82", cursor: "pointer",
            }}>+ 追加</span>
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>メッセージ</div>
          <div style={{
            borderRadius: 8, border: "1.5px solid #D3D1C7", padding: 14,
            minHeight: 120, fontSize: 13, color: "#3D3D3A", background: "#fff", lineHeight: 1.7,
            marginBottom: 16,
          }}>
            田中さん、はじめまして。株式会社サンプル建設の採用担当です。<br /><br />
            プロフィールを拝見し、ぜひ一度お話しさせていただきたくスカウトをお送りしました。未経験からスタートできる施工管理のお仕事です。
          </div>
          <div style={{
            background: "#FFF3ED", borderRadius: 8, padding: 12, marginBottom: 16,
            fontSize: 12, color: "#E8593C",
          }}>
            スカウト残数: 147通 → 送信後: 145通（2通消費）
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <Btn primary={false}>キャンセル</Btn>
            <Btn>スカウトを送信（2件）</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScreenScoutManageList({ onNavigate }) {
  return (
    <div style={{ flex: 1, overflow: "auto", background: "#FAFAF8" }}>
      <TopBar title="スカウト管理">
        <div style={{ display: "flex", gap: 4, background: "#F1EFE8", borderRadius: 8, padding: 2 }}>
          <div style={{ padding: "4px 12px", borderRadius: 6, background: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>リスト</div>
          <div onClick={() => onNavigate("スカウト管理(カンバン)")} style={{ padding: "4px 12px", borderRadius: 6, fontSize: 12, color: "#8C8A82", cursor: "pointer" }}>カンバン</div>
        </div>
      </TopBar>
      <div style={{ padding: 24 }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {["すべて", "未読", "既読", "応諾", "面談済み", "面接待ち", "辞退"].map((f, i) => (
            <span key={f} style={{
              padding: "5px 14px", borderRadius: 20, fontSize: 12, fontWeight: i === 0 ? 600 : 400,
              background: i === 0 ? "#1A1A1A" : "#fff", color: i === 0 ? "#fff" : "#5F5E5A",
              border: i === 0 ? "none" : "1px solid #E8E6E1", cursor: "pointer",
            }}>{f}</span>
          ))}
        </div>
        <Table
          headers={[
            { label: "氏名", w: "100px" },
            { label: "年齢", w: "50px" },
            { label: "エリア", w: "80px" },
            { label: "送信日", w: "90px" },
            { label: "ステータス", w: "100px" },
            { label: "最終更新", w: "90px" },
            { label: "アクション", w: "80px" },
          ]}
          rows={[
            ["田中 太郎", "25", "東京都", "4/5", <Tag color="green">応諾</Tag>, "4/6", <Btn small>詳細</Btn>],
            ["佐藤 花子", "22", "神奈川", "4/4", <Tag color="purple">面談済み</Tag>, "4/5", <Btn small>詳細</Btn>],
            ["鈴木 一郎", "28", "東京都", "4/3", <Tag color="blue">既読</Tag>, "4/4", <Btn small>詳細</Btn>],
            ["高橋 美咲", "20", "千葉県", "4/3", <Tag color="orange">面接待ち</Tag>, "4/6", <Btn small>詳細</Btn>],
            ["渡辺 健太", "31", "埼玉県", "4/2", <Tag color="gray">辞退</Tag>, "4/3", <Btn small>詳細</Btn>],
          ]}
          onRowClick={() => onNavigate("応募者詳細")}
        />
      </div>
    </div>
  );
}

function ScreenScoutManageKanban({ onNavigate }) {
  const cols = [
    { title: "未読", color: "#B4B2A9", items: [{ name: "山本 翔", age: 23 }] },
    { title: "既読", color: "#2E6FD4", items: [{ name: "鈴木 一郎", age: 28 }] },
    { title: "応諾", color: "#1D9E75", items: [{ name: "田中 太郎", age: 25 }] },
    { title: "面談済み", color: "#534AB7", items: [{ name: "佐藤 花子", age: 22 }] },
    { title: "面接待ち", color: "#E8593C", items: [{ name: "高橋 美咲", age: 20 }] },
    { title: "採用", color: "#1D9E75", items: [] },
  ];
  return (
    <div style={{ flex: 1, overflow: "auto", background: "#FAFAF8" }}>
      <TopBar title="スカウト管理">
        <div style={{ display: "flex", gap: 4, background: "#F1EFE8", borderRadius: 8, padding: 2 }}>
          <div onClick={() => onNavigate("スカウト管理(リスト)")} style={{ padding: "4px 12px", borderRadius: 6, fontSize: 12, color: "#8C8A82", cursor: "pointer" }}>リスト</div>
          <div style={{ padding: "4px 12px", borderRadius: 6, background: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>カンバン</div>
        </div>
      </TopBar>
      <div style={{ padding: 24, display: "flex", gap: 14, overflowX: "auto" }}>
        {cols.map(col => (
          <div key={col.title} style={{ width: 200, flexShrink: 0 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 6, marginBottom: 10,
              padding: "0 4px",
            }}>
              <div style={{ width: 8, height: 8, borderRadius: 4, background: col.color }} />
              <span style={{ fontSize: 13, fontWeight: 700 }}>{col.title}</span>
              <span style={{ fontSize: 11, color: "#B4B2A9" }}>{col.items.length}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {col.items.map((item, i) => (
                <div key={i} onClick={() => onNavigate("応募者詳細")} style={{
                  background: "#fff", borderRadius: 10, padding: 14,
                  border: "1px solid #E8E6E1", cursor: "pointer",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{item.name}</div>
                  <div style={{ fontSize: 11, color: "#8C8A82" }}>{item.age}歳</div>
                </div>
              ))}
              {col.items.length === 0 && (
                <div style={{
                  height: 60, borderRadius: 10, border: "1px dashed #D3D1C7",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, color: "#B4B2A9",
                }}>なし</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScreenApplications({ onNavigate }) {
  return (
    <div style={{ flex: 1, overflow: "auto", background: "#FAFAF8" }}>
      <TopBar title="応募管理">
        <div style={{ display: "flex", gap: 8 }}>
          {["すべて", "未対応", "選考中", "採用", "不採用"].map((f, i) => (
            <span key={f} style={{
              padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: i === 0 ? 600 : 400,
              background: i === 0 ? "#1A1A1A" : "transparent", color: i === 0 ? "#fff" : "#8C8A82",
              cursor: "pointer",
            }}>{f}</span>
          ))}
        </div>
      </TopBar>
      <div style={{ padding: 24 }}>
        <Table
          headers={[
            { label: "氏名", w: "100px" },
            { label: "応募経路", w: "90px" },
            { label: "職種" },
            { label: "応募日", w: "90px" },
            { label: "ステータス", w: "100px" },
            { label: "アクション", w: "80px" },
          ]}
          rows={[
            ["木村 結衣", <Tag color="green">自己応募</Tag>, "介護スタッフ", "4/6", <Tag color="orange">未対応</Tag>, <Btn small>詳細</Btn>],
            ["田中 太郎", <Tag color="purple">スカウト</Tag>, "施工管理", "4/5", <Tag color="blue">選考中</Tag>, <Btn small>詳細</Btn>],
            ["佐藤 花子", <Tag color="purple">スカウト</Tag>, "施工管理", "4/4", <Tag color="purple">面談済み</Tag>, <Btn small>詳細</Btn>],
          ]}
          onRowClick={() => onNavigate("応募者詳細")}
        />
      </div>
    </div>
  );
}

function ScreenApplicantDetail({ onNavigate }) {
  const [tab, setTab] = useState("選考情報");
  return (
    <div style={{ flex: 1, overflow: "auto", background: "#FAFAF8" }}>
      <TopBar title="応募者詳細 - 田中 太郎">
        <Btn small outline onClick={() => onNavigate("選考日程登録")}>日程登録</Btn>
        <Btn small onClick={() => onNavigate("チャット画面")}>メッセージ</Btn>
      </TopBar>
      <div style={{ padding: 24 }}>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 0, marginBottom: 20, borderBottom: "2px solid #E8E6E1" }}>
          {["選考情報", "AI面談", "メッセージ"].map(t => (
            <div key={t} onClick={() => { setTab(t); if (t === "AI面談") onNavigate("AI面談結果"); }} style={{
              padding: "10px 20px", fontSize: 13, fontWeight: tab === t ? 700 : 400,
              color: tab === t ? "#E8593C" : "#8C8A82",
              borderBottom: tab === t ? "2px solid #E8593C" : "2px solid transparent",
              cursor: "pointer", marginBottom: -2,
            }}>{t}</div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 20 }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: 18, border: "1px solid #E8E6E1" }}>
            <div style={{
              width: 64, height: 64, borderRadius: 32, margin: "0 auto 10px",
              background: "linear-gradient(135deg, #E8593C, #FAC775)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontSize: 22, fontWeight: 800,
            }}>田</div>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 15, fontWeight: 700 }}>田中 太郎</div>
              <div style={{ fontSize: 12, color: "#8C8A82" }}>25歳 ・ 東京都 ・ 施工管理</div>
            </div>
            <Tag color="purple">スカウト経由</Tag>
          </div>
          <div style={{ background: "#fff", borderRadius: 12, padding: 20, border: "1px solid #E8E6E1" }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>選考ステータス</div>
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              {["スカウト送信", "応諾", "AI面談", "企業確認中", "面接", "採用"].map((s, i) => (
                <div key={s} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: 12,
                    background: i <= 3 ? "#E8593C" : "#E8E6E1",
                    color: "#fff", fontSize: 10, fontWeight: 700,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>{i <= 3 ? "✓" : i + 1}</div>
                  <span style={{ fontSize: 10, color: i <= 3 ? "#1A1A1A" : "#B4B2A9" }}>{s}</span>
                  {i < 5 && <span style={{ color: "#D3D1C7", fontSize: 10 }}>→</span>}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <Btn small onClick={() => onNavigate("選考日程登録")}>面接日程を登録</Btn>
              <Btn small outline onClick={() => onNavigate("選考結果報告")}>選考結果を報告</Btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScreenAIInterviewResult({ onNavigate }) {
  return (
    <div style={{ flex: 1, overflow: "auto", background: "#FAFAF8" }}>
      <TopBar title="AI面談結果 - 田中 太郎">
        <Btn small onClick={() => onNavigate("応募者詳細")}>← 応募者詳細に戻る</Btn>
      </TopBar>
      <div style={{ padding: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div>
          <div style={{ background: "#fff", borderRadius: 12, padding: 20, border: "1px solid #E8E6E1", marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>AI面談サマリー</div>
            <div style={{
              background: "#F0EDFE", borderRadius: 10, padding: 14,
              fontSize: 13, color: "#534AB7", lineHeight: 1.7, marginBottom: 14,
            }}>
              コミュニケーション能力が高く、質問に対して的確かつ積極的に回答。未経験ながら学ぶ意欲が強い印象。チームワークを重視する姿勢あり。
            </div>
            {[
              { label: "コミュニケーション", score: 4 },
              { label: "意欲・積極性", score: 5 },
              { label: "論理的思考", score: 3 },
              { label: "協調性", score: 4 },
            ].map(item => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{ width: 120, fontSize: 12, color: "#5F5E5A" }}>{item.label}</div>
                <div style={{ flex: 1, display: "flex", gap: 3 }}>
                  {[1, 2, 3, 4, 5].map(n => (
                    <div key={n} style={{
                      width: 20, height: 20, borderRadius: 4,
                      background: n <= item.score ? "#534AB7" : "#E8E6E1",
                    }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: "#fff", borderRadius: 12, padding: 20, border: "1px solid #E8E6E1" }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>面談Q&A詳細</div>
            {[
              { q: "これまでの仕事で一番やりがいを感じた経験は？", a: "飲食店のアルバイトで、常連のお客様から名前を覚えてもらえた時にやりがいを感じました。" },
              { q: "施工管理に興味を持った理由は？", a: "ものづくりに関わる仕事がしたいと以前から思っており、建物が完成する過程に携われることに魅力を感じました。" },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#8C8A82", marginBottom: 4 }}>Q{i + 1}. {item.q}</div>
                <div style={{ fontSize: 13, color: "#1A1A1A", lineHeight: 1.6, background: "#F7F6F3", borderRadius: 8, padding: 10 }}>{item.a}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ background: "#fff", borderRadius: 12, padding: 20, border: "1px solid #E8E6E1" }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>AI面談動画</div>
            <div style={{
              height: 280, borderRadius: 10, background: "#1A1A1A",
              display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12,
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: 32, background: "rgba(255,255,255,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 28, cursor: "pointer", color: "#fff",
              }}>▶</div>
            </div>
            <div style={{ fontSize: 12, color: "#8C8A82" }}>面談時間: 8分32秒 ・ 実施日: 2026/04/06</div>
          </div>
          <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
            <div style={{ flex: 1 }}><Btn>面接に進める</Btn></div>
            <div style={{ flex: 1 }}><Btn outline danger>見送る</Btn></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScreenScheduleReg({ onNavigate }) {
  return (
    <div style={{ flex: 1, overflow: "auto", background: "#FAFAF8" }}>
      <TopBar title="選考日程登録" />
      <div style={{ maxWidth: 560, margin: "24px auto", padding: "0 24px" }}>
        <div style={{ background: "#fff", borderRadius: 12, padding: 28, border: "1px solid #E8E6E1" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 22,
              background: "linear-gradient(135deg, #E8593C, #FAC775)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontSize: 16, fontWeight: 800,
            }}>田</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700 }}>田中 太郎</div>
              <div style={{ fontSize: 12, color: "#8C8A82" }}>施工管理 ・ スカウト経由</div>
            </div>
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>候補日を追加（最大3つ）</div>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 100px 100px", gap: 10, marginBottom: 10 }}>
              <Field label={`候補${i} - 日付`} placeholder="2026/04/14" />
              <Field label="開始" placeholder="10:00" />
              <Field label="終了" placeholder="11:00" />
            </div>
          ))}
          <Field label="面接形式" placeholder="対面 / オンライン ▼" />
          <Field label="備考（任意）" placeholder="持ち物や注意事項など" type="textarea" />
          <div style={{
            background: "#EEFBF3", borderRadius: 8, padding: 12, marginBottom: 16,
            fontSize: 12, color: "#1D9E75",
          }}>
            登録後、求職者にSMS・メールで通知されます。求職者が候補日から選択します。
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <Btn primary={false} onClick={() => onNavigate("応募者詳細")}>キャンセル</Btn>
            <Btn>日程を登録する</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScreenResult({ onNavigate }) {
  return (
    <div style={{ flex: 1, overflow: "auto", background: "#FAFAF8" }}>
      <TopBar title="選考結果報告" />
      <div style={{ maxWidth: 500, margin: "24px auto", padding: "0 24px" }}>
        <div style={{ background: "#fff", borderRadius: 12, padding: 28, border: "1px solid #E8E6E1" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 22,
              background: "linear-gradient(135deg, #E8593C, #FAC775)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontSize: 16, fontWeight: 800,
            }}>田</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700 }}>田中 太郎</div>
              <div style={{ fontSize: 12, color: "#8C8A82" }}>施工管理</div>
            </div>
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>選考結果</div>
          <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
            {[
              { label: "採用", color: "#1D9E75", bg: "#EEFBF3" },
              { label: "不採用", color: "#A32D2D", bg: "#FCEBEB" },
            ].map(opt => (
              <div key={opt.label} style={{
                flex: 1, padding: 16, borderRadius: 10,
                border: opt.label === "採用" ? "2px solid #1D9E75" : "1.5px solid #E8E6E1",
                background: opt.label === "採用" ? opt.bg : "#fff",
                textAlign: "center", cursor: "pointer",
              }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: opt.color }}>{opt.label}</div>
              </div>
            ))}
          </div>
          <Field label="入社予定日" placeholder="2026/05/01" required />
          <Field label="配属先" placeholder="東京本社" required />
          <Field label="備考（任意）" placeholder="社内共有メモなど" type="textarea" />
          <div style={{
            background: "#EEFBF3", borderRadius: 8, padding: 12, marginBottom: 16,
            fontSize: 12, color: "#1D9E75",
          }}>
            確定後、求職者にメールで通知されます。
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <Btn primary={false}>キャンセル</Btn>
            <Btn>結果を確定する</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScreenMessageList({ onNavigate }) {
  const msgs = [
    { name: "田中 太郎", preview: "ご連絡ありがとうございます。ぜひ面接..", time: "14:30", unread: true, status: "選考中" },
    { name: "佐藤 花子", preview: "面接日程の件、承知しました。", time: "昨日", unread: false, status: "面接待ち" },
    { name: "木村 結衣", preview: "応募いただきありがとうございます。", time: "4/4", unread: false, status: "未対応" },
  ];
  return (
    <div style={{ flex: 1, overflow: "auto", background: "#FAFAF8" }}>
      <TopBar title="メッセージ">
        <div style={{ fontSize: 12, color: "#8C8A82" }}>未読 1件</div>
      </TopBar>
      <div style={{ padding: 24 }}>
        <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E8E6E1", overflow: "hidden" }}>
          {msgs.map((m, i) => (
            <div key={i} onClick={() => onNavigate("チャット画面")} style={{
              display: "flex", gap: 14, padding: "16px 20px",
              borderBottom: i < msgs.length - 1 ? "1px solid #F1EFE8" : "none",
              cursor: "pointer", alignItems: "flex-start",
              background: m.unread ? "#FFFBF8" : "transparent",
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 20, background: "#F7F6F3", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, fontWeight: 700, color: "#5F5E5A",
              }}>{m.name[0]}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                  <div style={{ fontSize: 14, fontWeight: m.unread ? 700 : 500 }}>{m.name}</div>
                  <div style={{ fontSize: 11, color: "#B4B2A9" }}>{m.time}</div>
                </div>
                <div style={{ marginBottom: 4 }}><Tag color={m.status === "選考中" ? "blue" : m.status === "面接待ち" ? "orange" : "gray"}>{m.status}</Tag></div>
                <div style={{ fontSize: 12, color: "#5F5E5A", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.preview}</div>
              </div>
              {m.unread && <div style={{ width: 8, height: 8, borderRadius: 4, background: "#E8593C", flexShrink: 0, marginTop: 8 }} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScreenChat({ onNavigate }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#FAFAF8" }}>
      <TopBar title="田中 太郎 とのメッセージ">
        <Tag color="blue">選考中</Tag>
        <Btn small onClick={() => onNavigate("応募者詳細")}>応募者詳細</Btn>
      </TopBar>
      <div style={{ flex: 1, padding: 24, overflow: "auto" }}>
        {/* Company message */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 14 }}>
          <div style={{ maxWidth: 360 }}>
            <div style={{
              background: "#E8593C", color: "#fff", borderRadius: "12px 12px 4px 12px",
              padding: "12px 16px", fontSize: 13, lineHeight: 1.6,
            }}>
              田中さん、はじめまして。プロフィールを拝見し、ぜひ面接の機会をいただきたくご連絡しました。下記日程でご都合はいかがでしょうか？
            </div>
            <div style={{ textAlign: "right", fontSize: 10, color: "#B4B2A9", marginTop: 4 }}>既読 14:30</div>
          </div>
        </div>
        {/* User message */}
        <div style={{ display: "flex", marginBottom: 14 }}>
          <div style={{ maxWidth: 360 }}>
            <div style={{
              background: "#fff", border: "1px solid #E8E6E1", borderRadius: "12px 12px 12px 4px",
              padding: "12px 16px", fontSize: 13, lineHeight: 1.6, color: "#1A1A1A",
            }}>
              ご連絡ありがとうございます。ぜひ面接をお願いしたいです。4月14日の10:00からでお願いできますか？
            </div>
            <div style={{ fontSize: 10, color: "#B4B2A9", marginTop: 4 }}>14:45</div>
          </div>
        </div>
        {/* File message */}
        <div style={{ display: "flex", marginBottom: 14 }}>
          <div style={{ maxWidth: 360 }}>
            <div style={{
              background: "#fff", border: "1px solid #E8E6E1", borderRadius: "12px 12px 12px 4px",
              padding: "12px 16px", fontSize: 13, color: "#1A1A1A",
            }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 8, padding: "8px 10px",
                background: "#F7F6F3", borderRadius: 8,
              }}>
                <span style={{ fontSize: 16 }}>📄</span>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600 }}>履歴書.pdf</div>
                  <div style={{ fontSize: 10, color: "#8C8A82" }}>2.1MB</div>
                </div>
              </div>
            </div>
            <div style={{ fontSize: 10, color: "#B4B2A9", marginTop: 4 }}>14:46</div>
          </div>
        </div>
      </div>
      {/* Input */}
      <div style={{
        padding: "12px 24px", background: "#fff", borderTop: "1px solid #E8E6E1",
        display: "flex", gap: 10, alignItems: "center",
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 8, background: "#F7F6F3",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, cursor: "pointer",
        }}>+</div>
        <div style={{
          flex: 1, height: 40, borderRadius: 20, border: "1.5px solid #D3D1C7",
          display: "flex", alignItems: "center", padding: "0 16px",
          fontSize: 13, color: "#B4B2A9", background: "#fff",
        }}>メッセージを入力してください...</div>
        <div style={{
          width: 40, height: 40, borderRadius: 20, background: "#E8593C",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", fontSize: 16, cursor: "pointer",
        }}>↑</div>
      </div>
    </div>
  );
}

function ScreenJobManage({ onNavigate }) {
  return (
    <div style={{ flex: 1, overflow: "auto", background: "#FAFAF8" }}>
      <TopBar title="求人管理">
        <Btn onClick={() => onNavigate("求人編集")}>+ 新規求人を追加</Btn>
      </TopBar>
      <div style={{ padding: 24 }}>
        <Table
          headers={[
            { label: "職種" },
            { label: "雇用形態", w: "80px" },
            { label: "給与", w: "120px" },
            { label: "掲載状態", w: "80px" },
            { label: "応募数", w: "60px" },
            { label: "アクション", w: "120px" },
          ]}
          rows={[
            ["施工管理スタッフ", "正社員", "月給25〜35万", <Tag color="green">掲載中</Tag>, "8", <Btn small onClick={() => onNavigate("求人編集")}>編集</Btn>],
            ["現場作業員", "正社員", "月給22〜30万", <Tag color="green">掲載中</Tag>, "4", <Btn small onClick={() => onNavigate("求人編集")}>編集</Btn>],
            ["事務スタッフ", "パート", "時給1,200円", <Tag color="gray">下書き</Tag>, "0", <Btn small onClick={() => onNavigate("求人編集")}>編集</Btn>],
          ]}
          onRowClick={() => onNavigate("求人編集")}
        />
        <div style={{ marginTop: 20, background: "#fff", borderRadius: 12, padding: 20, border: "1px solid #E8E6E1" }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>企業情報</div>
          {[
            ["企業名", "株式会社サンプル建設"],
            ["所在地", "東京都新宿区西新宿1-1-1"],
            ["業種", "建設業"],
            ["従業員数", "50名"],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", fontSize: 13, marginBottom: 6 }}>
              <div style={{ width: 100, color: "#8C8A82" }}>{k}</div>
              <div style={{ color: "#1A1A1A" }}>{v}</div>
            </div>
          ))}
          <div style={{ marginTop: 10 }}><Btn small outline>企業情報を編集</Btn></div>
        </div>
      </div>
    </div>
  );
}

function ScreenJobEdit({ onNavigate }) {
  return (
    <div style={{ flex: 1, overflow: "auto", background: "#FAFAF8" }}>
      <TopBar title="求人編集 - 施工管理スタッフ">
        <Btn small primary={false} onClick={() => onNavigate("求人管理")}>← 戻る</Btn>
      </TopBar>
      <div style={{ maxWidth: 640, margin: "24px auto", padding: "0 24px" }}>
        <div style={{ background: "#fff", borderRadius: 12, padding: 28, border: "1px solid #E8E6E1" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div style={{ fontSize: 16, fontWeight: 700 }}>求人情報</div>
            <Tag color="green">掲載中</Tag>
          </div>
          <Field label="職種" placeholder="施工管理スタッフ" required wide />
          <Field label="雇用形態" placeholder="正社員 ▼" required wide />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="月給（下限）" placeholder="250,000" required />
            <Field label="月給（上限）" placeholder="350,000" required />
          </div>
          <Field label="勤務地" placeholder="東京都新宿区" required wide />
          <Field label="仕事内容" placeholder="建設現場の工程・品質・安全管理..." type="textarea" required wide />
          <Field label="職場写真" placeholder="6枚アップロード済み" wide />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
            <Btn small outline danger>掲載を停止</Btn>
            <div style={{ display: "flex", gap: 10 }}>
              <Btn primary={false}>下書き保存</Btn>
              <Btn>変更を反映</Btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScreenSettings({ onNavigate }) {
  return (
    <div style={{ flex: 1, overflow: "auto", background: "#FAFAF8" }}>
      <TopBar title="設定" />
      <div style={{ maxWidth: 640, margin: "24px auto", padding: "0 24px" }}>
        {[
          { title: "アカウント管理", items: ["メールアドレス: admin@sample-kensetsu.co.jp", "パスワード変更", "担当者名: 管理 太郎"] },
          { title: "スカウトテンプレート管理", items: ["施工管理 - 未経験歓迎テンプレ", "施工管理 - 経験者向けテンプレ", "+ 新しいテンプレートを追加"] },
          { title: "通知設定", items: ["新着応募通知: ON", "スカウト応答通知: ON", "メッセージ通知: ON"] },
        ].map(section => (
          <div key={section.title} style={{
            background: "#fff", borderRadius: 12, padding: 20, border: "1px solid #E8E6E1",
            marginBottom: 16,
          }}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>{section.title}</div>
            {section.items.map((item, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "10px 0", borderBottom: i < section.items.length - 1 ? "1px solid #F1EFE8" : "none",
                fontSize: 13, color: item.startsWith("+") ? "#E8593C" : "#1A1A1A",
                fontWeight: item.startsWith("+") ? 600 : 400,
                cursor: "pointer",
              }}>
                <span>{item}</span>
                <span style={{ color: "#D3D1C7" }}>›</span>
              </div>
            ))}
          </div>
        ))}
        <div style={{ background: "#fff", borderRadius: 12, padding: 20, border: "1px solid #E8E6E1", marginBottom: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>その他</div>
          {["利用規約", "プライバシーポリシー", "ログアウト"].map((item, i) => (
            <div key={item} style={{
              padding: "10px 0", borderBottom: i < 2 ? "1px solid #F1EFE8" : "none",
              fontSize: 13, cursor: "pointer", display: "flex", justifyContent: "space-between",
              color: item === "ログアウト" ? "#E24B4A" : "#1A1A1A",
            }}>
              <span>{item}</span>
              <span style={{ color: "#D3D1C7" }}>›</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ========== SCREEN MAP ==========

const SCREEN_MAP = {
  "ログイン": ScreenLogin,
  "企業情報登録": ScreenCompanyReg,
  "求人情報登録": ScreenJobReg,
  "ダッシュボード": ScreenDashboard,
  "求職者検索": ScreenJobseekerSearch,
  "求職者詳細": ScreenJobseekerDetail,
  "スカウト送信": ScreenScoutSend,
  "スカウト管理(リスト)": ScreenScoutManageList,
  "スカウト管理(カンバン)": ScreenScoutManageKanban,
  "応募管理": ScreenApplications,
  "応募者詳細": ScreenApplicantDetail,
  "AI面談結果": ScreenAIInterviewResult,
  "選考日程登録": ScreenScheduleReg,
  "選考結果報告": ScreenResult,
  "メッセージ一覧": ScreenMessageList,
  "チャット画面": ScreenChat,
  "求人管理": ScreenJobManage,
  "求人編集": ScreenJobEdit,
  "設定": ScreenSettings,
};

// ========== MAIN APP ==========

export default function EmployerMock({ onBack }) {
  const [current, setCurrent] = useState("ダッシュボード");
  const [phase, setPhase] = useState("ダッシュボード");

  const navigate = (s) => {
    setCurrent(s);
    for (const [p, screens] of Object.entries(PHASES)) {
      if (screens.includes(s)) { setPhase(p); break; }
    }
  };

  const ScreenComponent = SCREEN_MAP[current];
  const showSidebar = !["ログイン", "企業情報登録", "求人情報登録"].includes(current);

  return (
    <div style={{
      height: "100vh", display: "flex", flexDirection: "column",
      fontFamily: "'Noto Sans JP', 'Hiragino Sans', sans-serif",
      background: "#FAFAF8",
    }}>
      {/* Back button + Phase tabs */}
      {onBack && <div style={{ textAlign: "center", padding: "4px 0", background: "#fff", borderBottom: "1px solid #E8E6E1" }}><button onClick={onBack} style={{ padding: "4px 14px", borderRadius: 16, border: "1px solid #D3D1C7", background: "#fff", color: "#5F5E5A", fontSize: 12, cursor: "pointer" }}>← トップに戻る</button></div>}
      {/* Phase tabs */}
      <div style={{
        display: "flex", gap: 6, padding: "8px 16px",
        background: "#fff", borderBottom: "1px solid #E8E6E1",
        overflowX: "auto", flexShrink: 0,
      }}>
        {Object.entries(PHASES).map(([p, screens]) => (
          <button key={p} onClick={() => { setPhase(p); setCurrent(screens[0]); }} style={{
            padding: "4px 14px", borderRadius: 16, border: "none",
            background: phase === p ? "#E8593C" : "transparent",
            color: phase === p ? "#fff" : "#8C8A82",
            fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap",
          }}>{p}</button>
        ))}
        <div style={{ borderLeft: "1px solid #E8E6E1", margin: "0 4px" }} />
        {PHASES[phase].map(s => (
          <button key={s} onClick={() => setCurrent(s)} style={{
            padding: "4px 10px", borderRadius: 6, border: "none",
            background: current === s ? "#1A1A1A" : "transparent",
            color: current === s ? "#fff" : "#B4B2A9",
            fontSize: 11, cursor: "pointer", whiteSpace: "nowrap",
          }}>{s}</button>
        ))}
      </div>
      {/* Main area */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {showSidebar && <Sidebar active={current} onNavigate={navigate} />}
        <ScreenComponent onNavigate={navigate} />
      </div>
    </div>
  );
}

