import { useState } from "react";

const PHASES = {
  "未登録": ["CSホーム", "求人検索", "求人詳細", "特集", "会員登録誘導"],
  "登録": ["SMS認証", "基本情報", "基本Q&A", "設問Q&A", "敬語変換確認", "写真", "スカウト待ち"],
  "メイン": ["マイページ", "スカウト・応募履歴", "応募完了", "AI面談", "面接調整", "やりとりTOP", "やりとり詳細"],
};

// ===== SHARED COMPONENTS =====
function Phone({ children }) {
  return (
    <div style={{ width: 375, minHeight: 720, maxHeight: 780, background: "#FAFAF8", borderRadius: 36, border: "6px solid #1a1a1a", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 20px 60px rgba(0,0,0,0.18)", fontFamily: "'Noto Sans JP','Hiragino Sans',sans-serif" }}>
      <div style={{ height: 44, background: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", fontSize: 12, fontWeight: 600, color: "#1a1a1a", flexShrink: 0 }}>
        <span>9:41</span>
        <div style={{ width: 120, height: 28, background: "#1a1a1a", borderRadius: 14 }} />
        <span style={{ fontSize: 10 }}>100%</span>
      </div>
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>{children}</div>
    </div>
  );
}

function Header({ title, sub, onBack, accent }) {
  return (
    <div style={{ height: 48, background: accent || "#fff", display: "flex", alignItems: "center", padding: "0 16px", gap: 12, flexShrink: 0, borderBottom: accent ? "none" : "1px solid #E8E6E1" }}>
      {onBack && <div onClick={onBack} style={{ cursor: "pointer", fontSize: 20, color: accent ? "#fff" : "#1a1a1a" }}>←</div>}
      <div>
        <div style={{ fontSize: 16, fontWeight: 700, color: accent ? "#fff" : "#1a1a1a" }}>{title}</div>
        {sub && <div style={{ fontSize: 11, color: accent ? "rgba(255,255,255,0.8)" : "#8C8A82" }}>{sub}</div>}
      </div>
    </div>
  );
}

function StepIndicator({ current, total }) {
  return (
    <div style={{ display: "flex", gap: 6, padding: "12px 20px" }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= current ? "#E8593C" : "#E8E6E1" }} />
      ))}
    </div>
  );
}

function Field({ label, placeholder, required }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: "#3D3D3A", marginBottom: 4, display: "flex", gap: 4 }}>
        {label}{required && <span style={{ fontSize: 10, color: "#E8593C" }}>必須</span>}
      </div>
      <div style={{ height: 42, borderRadius: 8, border: "1.5px solid #D3D1C7", display: "flex", alignItems: "center", padding: "0 12px", fontSize: 14, color: "#B4B2A9", background: "#fff" }}>{placeholder}</div>
    </div>
  );
}

function Btn({ children, disabled, small, outline }) {
  return (
    <div style={{ height: small ? 36 : 48, borderRadius: small ? 8 : 12, background: outline ? "transparent" : disabled ? "#D3D1C7" : "#E8593C", border: outline ? "1.5px solid #E8593C" : "none", color: outline ? "#E8593C" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: small ? 13 : 15, fontWeight: 700, cursor: disabled ? "default" : "pointer" }}>{children}</div>
  );
}

function Tag({ children, color }) {
  const c = { orange: { bg: "#FFF3ED", text: "#E8593C" }, blue: { bg: "#EDF4FF", text: "#2E6FD4" }, green: { bg: "#EEFBF3", text: "#1D9E75" }, gray: { bg: "#F1EFE8", text: "#5F5E5A" }, purple: { bg: "#F0EDFE", text: "#534AB7" }, red: { bg: "#FCEBEB", text: "#A32D2D" } }[color] || { bg: "#F1EFE8", text: "#5F5E5A" };
  return <span style={{ display: "inline-block", padding: "3px 8px", borderRadius: 6, fontSize: 11, fontWeight: 600, background: c.bg, color: c.text }}>{children}</span>;
}

function BottomNav({ active, onNavigate }) {
  const tabs = [
    { id: "CSホーム", label: "ホーム", icon: "🏠" },
    { id: "求人検索", label: "求人検索", icon: "🔍" },
    { id: "スカウト・応募履歴", label: "履歴", icon: "📋" },
    { id: "やりとりTOP", label: "やりとり", icon: "💬" },
    { id: "マイページ", label: "マイページ", icon: "👤" },
  ];
  return (
    <div style={{ height: 56, background: "#fff", display: "flex", borderTop: "1px solid #E8E6E1", flexShrink: 0 }}>
      {tabs.map(t => (
        <div key={t.id} onClick={() => onNavigate(t.id)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, cursor: "pointer" }}>
          <span style={{ fontSize: 18 }}>{t.icon}</span>
          <span style={{ fontSize: 10, fontWeight: active === t.id ? 700 : 400, color: active === t.id ? "#E8593C" : "#8C8A82" }}>{t.label}</span>
        </div>
      ))}
    </div>
  );
}

// ===== 未登録 SCREENS =====
function ScreenCSHome({ onNavigate }) {
  const jobs = [
    { company: "サンプル建設", role: "施工管理", area: "東京都新宿区", color: "#2E6FD4" },
    { company: "ABC歯科クリニック", role: "歯科助手", area: "東京都渋谷区", color: "#1D9E75" },
    { company: "ケアハウスさくら", role: "介護スタッフ", area: "東京都世田谷区", color: "#534AB7" },
  ];
  return (
    <>
      <div style={{ flex: 1, overflow: "auto" }}>
        <div style={{ height: 48, background: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", borderBottom: "1px solid #E8E6E1", flexShrink: 0 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#E8593C" }}>MOTA</div>
          <div onClick={() => onNavigate("SMS認証")} style={{ padding: "5px 14px", borderRadius: 6, background: "#E8593C", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>ログイン / 登録</div>
        </div>
        <div style={{ height: 180, background: "linear-gradient(135deg, #E8593C 0%, #FAC775 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 24px", textAlign: "center" }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", lineHeight: 1.5 }}>履歴書不要！<br />カンタン質問に<br />3問こたえるだけで応募できる！</div>
        </div>
        <div style={{ padding: "16px 16px 8px" }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a", marginBottom: 12 }}>新着の企業情報</div>
          {jobs.map((j, i) => (
            <div key={i} onClick={() => onNavigate("求人詳細")} style={{ display: "flex", gap: 12, alignItems: "center", background: "#fff", borderRadius: 10, padding: 12, marginBottom: 8, border: "1px solid #E8E6E1", cursor: "pointer" }}>
              <div style={{ width: 56, height: 56, borderRadius: 8, background: j.color, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.5)", fontSize: 10 }}>写真</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a1a", marginBottom: 2 }}>{j.company}</div>
                <div style={{ fontSize: 12, color: "#5F5E5A" }}>{j.role}</div>
                <div style={{ fontSize: 11, color: "#8C8A82" }}>{j.area}</div>
              </div>
              <span style={{ color: "#D3D1C7" }}>›</span>
            </div>
          ))}
        </div>
        <div style={{ padding: "4px 16px 16px" }}>
          <div onClick={() => onNavigate("会員登録誘導")} style={{ background: "linear-gradient(135deg,#FFF3ED,#FFEEE4)", borderRadius: 12, padding: "16px 20px", textAlign: "center", border: "1px solid #F0997B", cursor: "pointer" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#E8593C", marginBottom: 4 }}>もっと求人を見たい方は</div>
            <div style={{ fontSize: 12, color: "#D85A30", marginBottom: 10 }}>無料会員登録で全ての求人＋スカウト機能が使えます</div>
            <div style={{ display: "inline-block", padding: "8px 28px", borderRadius: 8, background: "#E8593C", color: "#fff", fontSize: 14, fontWeight: 700 }}>無料で会員登録する</div>
          </div>
        </div>
        <div style={{ padding: "0 16px 16px" }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a", marginBottom: 10 }}>特集</div>
          <div style={{ display: "flex", gap: 10 }}>
            {[{ title: "未経験OK特集", color: "#2E6FD4" }, { title: "高収入特集", color: "#1D9E75" }].map((f, i) => (
              <div key={i} onClick={() => onNavigate("特集")} style={{ flex: 1, borderRadius: 10, overflow: "hidden", border: "1px solid #E8E6E1", cursor: "pointer" }}>
                <div style={{ height: 70, background: f.color }} />
                <div style={{ padding: 8, fontSize: 12, fontWeight: 700, color: "#1a1a1a" }}>{f.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav active="CSホーム" onNavigate={onNavigate} />
    </>
  );
}

function ScreenJobSearch({ onNavigate }) {
  return (
    <>
      <Header title="求人検索" />
      <div style={{ padding: "8px 16px", background: "#fff", borderBottom: "1px solid #E8E6E1" }}>
        <div style={{ height: 36, borderRadius: 8, background: "#F7F6F3", display: "flex", alignItems: "center", padding: "0 12px", fontSize: 13, color: "#B4B2A9" }}>🔍 職種・エリア・キーワードで検索</div>
      </div>
      <div style={{ padding: "8px 16px", background: "#fff", borderBottom: "1px solid #E8E6E1", display: "flex", gap: 6, overflowX: "auto" }}>
        {["職種", "エリア", "給与", "こだわり"].map(f => (
          <span key={f} style={{ padding: "4px 12px", borderRadius: 16, border: "1px solid #D3D1C7", fontSize: 11, color: "#5F5E5A", whiteSpace: "nowrap" }}>{f} ▼</span>
        ))}
      </div>
      <div style={{ flex: 1, padding: "12px 16px", overflow: "auto" }}>
        <div style={{ fontSize: 12, color: "#8C8A82", marginBottom: 8 }}>検索結果: 48件</div>
        {[
          { title: "施工管理", co: "サンプル建設", area: "東京都新宿区", salary: "月給25万〜", tags: ["未経験OK"] },
          { title: "歯科助手", co: "ABC歯科", area: "東京都渋谷区", salary: "月給22万〜", tags: ["駅チカ"] },
          { title: "介護スタッフ", co: "ケアハウスさくら", area: "東京都世田谷区", salary: "月給24万〜", tags: ["夜勤なし"] },
          { title: "アパレル販売", co: "Fashion MOTA", area: "東京都新宿区", salary: "月給20万〜", tags: ["社割あり"] },
        ].map((j, i) => (
          <div key={i} onClick={() => onNavigate("求人詳細")} style={{ background: "#fff", borderRadius: 10, padding: 12, marginBottom: 8, border: "1px solid #E8E6E1", cursor: "pointer" }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <div style={{ width: 48, height: 48, borderRadius: 8, background: "#2E6FD4", flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a1a" }}>{j.title}</div>
                <div style={{ fontSize: 12, color: "#5F5E5A" }}>{j.co} ・ {j.area}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#E8593C", marginTop: 2 }}>{j.salary}</div>
              </div>
              <span style={{ fontSize: 18, color: "#D3D1C7" }}>♡</span>
            </div>
            <div style={{ display: "flex", gap: 4, marginTop: 6 }}>{j.tags.map(t => <Tag key={t} color="blue">{t}</Tag>)}</div>
          </div>
        ))}
      </div>
      <BottomNav active="求人検索" onNavigate={onNavigate} />
    </>
  );
}

function ScreenJobDetail({ onNavigate }) {
  return (
    <>
      <Header title="求人詳細" onBack={() => onNavigate("CSホーム")} />
      <div style={{ flex: 1, overflow: "auto" }}>
        <div style={{ height: 150, background: "linear-gradient(135deg,#2E6FD4,#1D9E75)" }} />
        <div style={{ padding: "16px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#1a1a1a", marginBottom: 4 }}>施工管理スタッフ</div>
              <div style={{ fontSize: 13, color: "#5F5E5A", marginBottom: 10 }}>株式会社サンプル建設</div>
            </div>
            <span style={{ fontSize: 24, color: "#D3D1C7", cursor: "pointer" }}>♡</span>
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
            <Tag color="orange">正社員</Tag><Tag color="green">未経験OK</Tag><Tag color="blue">資格支援</Tag>
          </div>
          {[["仕事内容", "建設現場の工程・品質管理。3ヶ月研修あり。"], ["給与", "月給25〜35万（年収350〜450万）"], ["勤務地", "東京都新宿区"], ["休日", "完全週休2日（土日）"], ["福利厚生", "社保完備、交通費支給、資格支援"]].map(([k, v]) => (
            <div key={k} style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#8C8A82", marginBottom: 2 }}>{k}</div>
              <div style={{ fontSize: 13, color: "#1a1a1a", lineHeight: 1.6 }}>{v}</div>
            </div>
          ))}
          <div style={{ background: "#F7F6F3", borderRadius: 12, padding: 16, marginTop: 8, textAlign: "center" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a", marginBottom: 4 }}>この求人に応募する</div>
            <div style={{ fontSize: 11, color: "#8C8A82", marginBottom: 12 }}>応募には会員登録が必要です</div>
            <div onClick={() => onNavigate("会員登録誘導")}><Btn>応募する（無料会員登録）</Btn></div>
          </div>
        </div>
      </div>
      <BottomNav active="求人検索" onNavigate={onNavigate} />
    </>
  );
}

function ScreenFeature({ onNavigate }) {
  return (
    <>
      <Header title="特集：未経験OK" onBack={() => onNavigate("CSホーム")} />
      <div style={{ flex: 1, padding: "16px", overflow: "auto" }}>
        <div style={{ height: 120, borderRadius: 12, background: "linear-gradient(135deg,#2E6FD4,#85B7EB)", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 16, fontWeight: 700 }}>未経験OK特集</div>
        {[1, 2, 3].map(i => (
          <div key={i} onClick={() => onNavigate("求人詳細")} style={{ background: "#fff", borderRadius: 10, padding: 12, marginBottom: 8, border: "1px solid #E8E6E1", cursor: "pointer", display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ width: 48, height: 48, borderRadius: 8, background: "#5DCAA5" }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a" }}>求人タイトル {i}</div>
              <div style={{ fontSize: 11, color: "#5F5E5A" }}>企業名 ・ エリア</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#E8593C" }}>月給22万〜</div>
            </div>
          </div>
        ))}
      </div>
      <BottomNav active="CSホーム" onNavigate={onNavigate} />
    </>
  );
}

function ScreenSignupPrompt({ onNavigate }) {
  return (
    <>
      <Header title="会員登録" onBack={() => onNavigate("CSホーム")} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px 20px" }}>
        <div style={{ width: 72, height: 72, borderRadius: 36, background: "#FFF3ED", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, marginBottom: 16 }}>🔓</div>
        <div style={{ fontSize: 18, fontWeight: 800, color: "#1a1a1a", marginBottom: 8 }}>会員登録が必要です</div>
        <div style={{ fontSize: 13, color: "#5F5E5A", textAlign: "center", lineHeight: 1.7, marginBottom: 24 }}>応募・スカウト機能を使うには<br />無料の会員登録が必要です。<br />登録は3分で完了します。</div>
        <div style={{ width: "100%", marginBottom: 10 }} onClick={() => onNavigate("SMS認証")}><Btn>無料で会員登録する</Btn></div>
        <div style={{ width: "100%" }} onClick={() => onNavigate("CSホーム")}><Btn small outline>あとで登録する</Btn></div>
        <div style={{ marginTop: 20, fontSize: 13, fontWeight: 700, color: "#1a1a1a", marginBottom: 8 }}>登録するとできること</div>
        {["求人に応募できる", "企業からスカウトが届く", "AI面談で気軽に面接体験", "面接日程をアプリ内で調整"].map((t, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, fontSize: 12, color: "#3D3D3A" }}>
            <span style={{ color: "#E8593C", fontWeight: 700 }}>✓</span>{t}
          </div>
        ))}
      </div>
    </>
  );
}

// ===== 登録 SCREENS =====
function ScreenSMS({ onNavigate }) {
  return (
    <>
      <Header title="会員登録" onBack={() => onNavigate("CSホーム")} />
      <StepIndicator current={0} total={6} />
      <div style={{ flex: 1, padding: "16px 20px", overflow: "auto" }}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: "#E8593C" }}>MOTA</div>
          <div style={{ fontSize: 13, color: "#5F5E5A", marginTop: 4 }}>無料会員登録</div>
        </div>
        <Field label="氏名" placeholder="山田 太郎" required />
        <Field label="電話番号" placeholder="090-0000-0000" required />
        <div style={{ height: 8 }} />
        <Btn>認証コードを送信</Btn>
        <div style={{ height: 16 }} />
        <Field label="認証コード（6桁）" placeholder="000000" />
        <div style={{ height: 8 }} />
        <Btn disabled>認証して次へ</Btn>
      </div>
    </>
  );
}

function ScreenBasicInfo({ onNavigate }) {
  return (
    <>
      <Header title="基本情報" onBack={() => onNavigate("SMS認証")} />
      <StepIndicator current={1} total={6} />
      <div style={{ flex: 1, padding: "0 20px 20px", overflow: "auto" }}>
        <div style={{ background: "#EEFBF3", borderRadius: 10, padding: 12, marginBottom: 16, fontSize: 12, color: "#1D9E75", fontWeight: 500, textAlign: "center" }}>SMS認証完了 ✓</div>
        <Field label="住所（市区町村まで）" placeholder="東京都新宿区" required />
        <Field label="メールアドレス" placeholder="example@email.com（任意）" />
        <div style={{ background: "#F7F6F3", borderRadius: 8, padding: 10, fontSize: 11, color: "#8C8A82", marginBottom: 16 }}>メールを登録するとスカウト通知も受け取れます</div>
        <div style={{ background: "#FFF3ED", borderRadius: 10, padding: 14, marginBottom: 16, textAlign: "center" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#E8593C" }}>ここまでで会員登録完了！</div>
          <div style={{ fontSize: 11, color: "#D85A30", marginTop: 4 }}>続けてプロフィールを登録すると、スカウトが届きます</div>
        </div>
        <Btn>次へ（プロフィール登録）</Btn>
      </div>
    </>
  );
}

function ScreenBasicQA({ onNavigate }) {
  return (
    <>
      <Header title="基本情報Q&A" onBack={() => onNavigate("基本情報")} />
      <StepIndicator current={2} total={6} />
      <div style={{ flex: 1, padding: "0 20px 20px", overflow: "auto" }}>
        <div style={{ fontSize: 13, color: "#5F5E5A", marginBottom: 14, textAlign: "center" }}>あなたについて教えてください</div>
        {[
          { n: 1, q: "生年月日を教えてください", ph: "1998年1月1日", icon: "🎂" },
          { n: 2, q: "最終学歴は？", ph: "選択してください ▼", icon: "🎓" },
          { n: 3, q: "保有している免許・資格は？", ph: "例：普通自動車免許", icon: "📋" },
        ].map(item => (
          <div key={item.n} style={{ background: "#fff", borderRadius: 12, padding: 16, marginBottom: 12, border: "1px solid #E8E6E1" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <div style={{ fontSize: 14, fontWeight: 700 }}>Q{item.n}. {item.q}</div>
            </div>
            <div style={{ height: 42, borderRadius: 8, border: "1.5px solid #D3D1C7", display: "flex", alignItems: "center", padding: "0 12px", fontSize: 13, color: "#B4B2A9", background: "#FAFAF8" }}>{item.ph}</div>
          </div>
        ))}
        <Btn>次へ</Btn>
      </div>
    </>
  );
}

function ScreenClientQA({ onNavigate }) {
  return (
    <>
      <Header title="設問Q&A" onBack={() => onNavigate("基本Q&A")} />
      <StepIndicator current={3} total={6} />
      <div style={{ flex: 1, padding: "0 20px 20px", overflow: "auto" }}>
        <div style={{ textAlign: "center", marginBottom: 16, padding: "12px 0" }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#E8593C", marginBottom: 4 }}>3問で完了！</div>
          <div style={{ fontSize: 13, color: "#5F5E5A" }}>テキストでも動画でもOK！</div>
        </div>
        {["学生時代、時間を忘れて取組んだものは？", "これまでの仕事経験は？", "仕事においての特技は？"].map((q, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 12, padding: 16, marginBottom: 12, border: "1px solid #E8E6E1" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: 14, background: "#E8593C", color: "#fff", fontSize: 13, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>Q{i + 1}</div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{q}</div>
            </div>
            <div style={{ borderRadius: 8, border: "1.5px solid #D3D1C7", padding: 12, minHeight: 50, fontSize: 13, color: "#B4B2A9", background: "#FAFAF8", marginBottom: 8 }}>回答を入力...</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <div style={{ flex: 1, height: 1, background: "#E8E6E1" }} /><span style={{ fontSize: 11, color: "#B4B2A9" }}>または</span><div style={{ flex: 1, height: 1, background: "#E8E6E1" }} />
            </div>
            <div style={{ marginTop: 8, padding: "10px 16px", borderRadius: 10, border: "1.5px solid #AFA9EC", background: "#F0EDFE", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer" }}>
              <span style={{ fontSize: 18 }}>🎥</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#534AB7" }}>動画で回答する</div>
                <div style={{ fontSize: 10, color: "#7F77DD" }}>30秒であなたの人柄が伝わります</div>
              </div>
            </div>
          </div>
        ))}
        <div style={{ background: "#F0EDFE", borderRadius: 8, padding: 10, marginBottom: 12, fontSize: 11, color: "#534AB7", textAlign: "center" }}>💡 話し言葉でOK！AIが敬語に変換します</div>
        <Btn>次へ</Btn>
      </div>
    </>
  );
}

function ScreenKeigoReview({ onNavigate }) {
  return (
    <>
      <Header title="AI敬語変換確認" onBack={() => onNavigate("設問Q&A")} accent="#534AB7" />
      <StepIndicator current={4} total={6} />
      <div style={{ flex: 1, padding: "16px 20px 20px", overflow: "auto" }}>
        <div style={{ background: "#F0EDFE", borderRadius: 12, padding: 14, marginBottom: 16, fontSize: 12, color: "#534AB7", lineHeight: 1.6 }}>AIが話し言葉を敬語に変換しました。確認して必要に応じて修正してください。</div>
        {[
          { q: "学生時代、時間を忘れて取組んだものは？", before: "バレー部。レギュラーじゃなかったけど毎日練習してた", after: "バレー部に所属しておりました。レギュラーではありませんでしたが、毎日の練習に欠かさず参加しておりました。" },
          { q: "これまでの仕事経験は？", before: "カフェで半年と、引越し会社で事務3年", after: "カフェでの接客を半年、引越し会社にて正社員として事務を3年間経験いたしました。" },
          { q: "仕事においての特技は？", before: "パソコンそこそこできる。入力早い", after: "事務でパソコンを使用しておりましたので、入力速度には自信がございます。" },
        ].map((item, i) => (
          <div key={i} style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#3D3D3A", marginBottom: 6 }}>Q{i + 1}. {item.q}</div>
            <div style={{ borderRadius: 8, background: "#F7F6F3", padding: 10, fontSize: 12, color: "#8C8A82", marginBottom: 4, textDecoration: "line-through" }}>{item.before}</div>
            <div style={{ fontSize: 10, color: "#534AB7", fontWeight: 600, marginBottom: 2 }}>↓ AI変換後</div>
            <div style={{ borderRadius: 8, border: "1.5px solid #AFA9EC", padding: 10, fontSize: 13, color: "#1a1a1a", background: "#fff", lineHeight: 1.6 }}>{item.after}</div>
            <div style={{ textAlign: "right", marginTop: 4 }}><span style={{ fontSize: 11, color: "#534AB7", fontWeight: 600, cursor: "pointer" }}>✏️ 修正する</span></div>
          </div>
        ))}
        <Btn>この内容で次へ</Btn>
      </div>
    </>
  );
}

function ScreenPhoto({ onNavigate }) {
  return (
    <>
      <Header title="プロフィール写真" onBack={() => onNavigate("敬語変換確認")} />
      <StepIndicator current={5} total={6} />
      <div style={{ flex: 1, padding: "0 20px 20px", overflow: "auto" }}>
        <div style={{ textAlign: "center", marginBottom: 20, paddingTop: 8 }}>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>プロフィール写真を登録</div>
          <div style={{ fontSize: 12, color: "#5F5E5A" }}>写真があるとスカウト率が<span style={{ color: "#E8593C", fontWeight: 700 }}>3倍</span>UP</div>
          <div style={{ fontSize: 11, color: "#E8593C", fontWeight: 600, marginTop: 4 }}>※ 必須項目です</div>
        </div>
        <div style={{ width: 140, height: 140, borderRadius: 70, border: "2.5px dashed #E8593C", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", background: "#FFF3ED", cursor: "pointer" }}>
          <span style={{ fontSize: 32, color: "#E8593C" }}>+</span>
          <span style={{ fontSize: 11, color: "#D85A30", fontWeight: 600 }}>写真を追加</span>
        </div>
        <Btn>写真を登録して完了</Btn>
      </div>
    </>
  );
}

function ScreenScoutWait({ onNavigate }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px", background: "linear-gradient(180deg,#FFF5F2,#FAFAF8)" }}>
      <div style={{ width: 80, height: 80, borderRadius: 40, background: "#E8593C", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, color: "#fff", marginBottom: 20 }}>✓</div>
      <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>登録完了！</div>
      <div style={{ fontSize: 14, color: "#5F5E5A", textAlign: "center", lineHeight: 1.7, marginBottom: 32 }}>プロフィールが公開されました。<br />企業からのスカウトをお待ちください。<br />SMS・メールでお知らせします。</div>
      <div style={{ width: "100%" }} onClick={() => onNavigate("CSホーム")}><Btn>ホーム画面へ</Btn></div>
    </div>
  );
}

// ===== メイン SCREENS =====
function ScreenMyPage({ onNavigate }) {
  return (
    <>
      <Header title="マイページ" />
      <div style={{ flex: 1, padding: "16px 20px", overflow: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20, background: "#fff", borderRadius: 14, padding: 16, border: "1px solid #E8E6E1" }}>
          <div style={{ width: 56, height: 56, borderRadius: 28, background: "linear-gradient(135deg,#E8593C,#FAC775)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 20, fontWeight: 800 }}>山</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>山田 太郎</div>
            <div style={{ fontSize: 12, color: "#5F5E5A" }}>東京都 ・ 25歳</div>
          </div>
        </div>
        {[
          { icon: "✏️", label: "アカウント編集" },
          { icon: "👤", label: "プロフィール編集" },
          { icon: "🔔", label: "通知設定" },
          { icon: "📄", label: "利用規約" },
          { icon: "🚪", label: "ログアウト" },
          { icon: "⚠️", label: "退会" },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 0", borderBottom: i < 5 ? "1px solid #F1EFE8" : "none", cursor: "pointer" }}>
            <span style={{ fontSize: 18 }}>{item.icon}</span>
            <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: item.label === "退会" ? "#E24B4A" : "#1a1a1a" }}>{item.label}</span>
            <span style={{ color: "#D3D1C7" }}>›</span>
          </div>
        ))}
      </div>
      <BottomNav active="マイページ" onNavigate={onNavigate} />
    </>
  );
}

function ScreenHistory({ onNavigate }) {
  const [tab, setTab] = useState("all");
  const items = [
    { co: "サンプル建設", role: "施工管理", type: "スカウト", status: "応募済み", statusColor: "orange" },
    { co: "ABC歯科", role: "歯科助手", type: "応募", status: "AI面談待ち", statusColor: "purple" },
    { co: "ケアハウスさくら", role: "介護スタッフ", type: "お気に入り", status: "未応募", statusColor: "gray" },
    { co: "Fashion MOTA", role: "販売スタッフ", type: "スカウト", status: "面接案内", statusColor: "green" },
    { co: "レストランZ", role: "ホール", type: "応募", status: "お断り", statusColor: "red" },
  ];
  return (
    <>
      <Header title="スカウト・応募履歴" />
      <div style={{ display: "flex", gap: 0, padding: "0 16px", background: "#fff", borderBottom: "1px solid #E8E6E1" }}>
        {[{ id: "all", l: "すべて" }, { id: "scout", l: "スカウト" }, { id: "apply", l: "応募" }, { id: "fav", l: "お気に入り" }].map(t => (
          <div key={t.id} onClick={() => setTab(t.id)} style={{ padding: "10px 12px", fontSize: 12, fontWeight: tab === t.id ? 700 : 400, color: tab === t.id ? "#E8593C" : "#8C8A82", borderBottom: tab === t.id ? "2px solid #E8593C" : "none", cursor: "pointer" }}>{t.l}</div>
        ))}
      </div>
      <div style={{ flex: 1, padding: "12px 16px", overflow: "auto" }}>
        {items.map((item, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 10, padding: 14, marginBottom: 8, border: "1px solid #E8E6E1", cursor: "pointer" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{item.co}</div>
              <Tag color={item.statusColor}>{item.status}</Tag>
            </div>
            <div style={{ fontSize: 12, color: "#5F5E5A", marginBottom: 6 }}>{item.role}</div>
            <div style={{ display: "flex", gap: 4 }}>
              <Tag color="gray">{item.type}</Tag>
            </div>
            <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
              <span onClick={() => onNavigate("求人詳細")} style={{ fontSize: 11, color: "#2E6FD4", cursor: "pointer" }}>求人詳細</span>
              {item.status === "AI面談待ち" && <span onClick={() => onNavigate("AI面談")} style={{ fontSize: 11, color: "#534AB7", cursor: "pointer" }}>AI面談へ →</span>}
              {item.status === "面接案内" && <span onClick={() => onNavigate("面接調整")} style={{ fontSize: 11, color: "#1D9E75", cursor: "pointer" }}>面接調整 →</span>}
              {item.status === "応募済み" && <span style={{ fontSize: 11, color: "#E24B4A", cursor: "pointer" }}>応募取り消し</span>}
            </div>
          </div>
        ))}
      </div>
      <BottomNav active="スカウト・応募履歴" onNavigate={onNavigate} />
    </>
  );
}

function ScreenApplyComplete({ onNavigate }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
      <div style={{ width: 72, height: 72, borderRadius: 36, background: "#EEFBF3", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, marginBottom: 16 }}>✓</div>
      <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>応募完了！</div>
      <div style={{ fontSize: 13, color: "#5F5E5A", textAlign: "center", lineHeight: 1.7, marginBottom: 32 }}>企業からの連絡をお待ちください。<br />進捗はスカウト・応募履歴から確認できます。</div>
      <div style={{ width: "100%", marginBottom: 10 }} onClick={() => onNavigate("スカウト・応募履歴")}><Btn>履歴を確認する</Btn></div>
      <div style={{ width: "100%" }} onClick={() => onNavigate("CSホーム")}><Btn small outline>ホームに戻る</Btn></div>
    </div>
  );
}

function ScreenAIInterview({ onNavigate }) {
  return (
    <>
      <Header title="AI面談" accent="#534AB7" onBack={() => onNavigate("スカウト・応募履歴")} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20, background: "linear-gradient(180deg,#F0EDFE,#FAFAF8)" }}>
        <div style={{ width: 100, height: 100, borderRadius: 50, background: "linear-gradient(135deg,#534AB7,#7F77DD)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, marginBottom: 16, color: "#fff", boxShadow: "0 8px 24px rgba(83,74,183,0.3)" }}>🤖</div>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>MOTA AIインタビュアー</div>
        <div style={{ fontSize: 12, color: "#5F5E5A", marginBottom: 24 }}>3問の問いに動画で答えてください</div>
        <div style={{ background: "#fff", borderRadius: 16, padding: 20, width: "100%", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 13, color: "#534AB7", fontWeight: 600, marginBottom: 8 }}>質問 1 / 3</div>
          <div style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.6 }}>「これまでの仕事で一番やりがいを感じた経験を教えてください」</div>
        </div>
        <div style={{ width: 72, height: 72, borderRadius: 36, background: "#E8593C", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 4px 16px rgba(232,89,60,0.4)", marginBottom: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: 4, background: "#fff" }} />
        </div>
        <div style={{ fontSize: 12, color: "#5F5E5A", marginBottom: 20 }}>タップして回答を録画</div>
        <div style={{ display: "flex", gap: 10, width: "100%" }}>
          <div style={{ flex: 1 }} onClick={() => onNavigate("スカウト・応募履歴")}><Btn small outline>やめる</Btn></div>
          <div style={{ flex: 1 }} onClick={() => onNavigate("応募完了")}><Btn small>応募する</Btn></div>
        </div>
      </div>
    </>
  );
}

function ScreenInterviewSchedule({ onNavigate }) {
  return (
    <>
      <Header title="面接日程調整" onBack={() => onNavigate("スカウト・応募履歴")} />
      <div style={{ flex: 1, padding: "16px 20px", overflow: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <div style={{ width: 40, height: 40, borderRadius: 8, background: "#E8E6E1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🏢</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Fashion MOTA</div>
            <div style={{ fontSize: 12, color: "#5F5E5A" }}>販売スタッフ</div>
          </div>
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>希望日を入れてください</div>
        {["4月14日（月）10:00〜11:00", "4月15日（火）14:00〜15:00", "4月17日（木）10:00〜11:00"].map((d, i) => (
          <div key={i} style={{ background: i === 0 ? "#FFF3ED" : "#fff", border: i === 0 ? "1.5px solid #E8593C" : "1.5px solid #E8E6E1", borderRadius: 10, padding: 14, marginBottom: 8, display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
            <span style={{ fontSize: 14, fontWeight: 600 }}>{d}</span>
            {i === 0 && <div style={{ width: 20, height: 20, borderRadius: 10, background: "#E8593C", color: "#fff", fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>✓</div>}
          </div>
        ))}
        <div style={{ height: 16 }} />
        <Btn>この日程で確定する</Btn>
        <div style={{ height: 10 }} />
        <div onClick={() => onNavigate("やりとり詳細")}><Btn small outline>日程が合わない場合は連絡する</Btn></div>
      </div>
      <BottomNav active="スカウト・応募履歴" onNavigate={onNavigate} />
    </>
  );
}

function ScreenMessagesTop({ onNavigate }) {
  const msgs = [
    { co: "Fashion MOTA", preview: "面接日程の候補をお送りしました。", time: "14:30", unread: true },
    { co: "サンプル建設", preview: "スカウトへのご応諾ありがとうございます。", time: "昨日", unread: false },
  ];
  return (
    <>
      <Header title="やりとり" />
      <div style={{ flex: 1, padding: "8px 16px", overflow: "auto" }}>
        {msgs.map((m, i) => (
          <div key={i} onClick={() => onNavigate("やりとり詳細")} style={{ background: m.unread ? "#FFFBF8" : "#fff", borderRadius: 10, padding: 14, marginBottom: 8, border: "1px solid #E8E6E1", cursor: "pointer", display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "#F7F6F3", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🏢</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                <span style={{ fontSize: 13, fontWeight: 700 }}>{m.co}</span>
                <span style={{ fontSize: 11, color: "#8C8A82" }}>{m.time}</span>
              </div>
              <div style={{ fontSize: 12, color: "#5F5E5A", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.preview}</div>
            </div>
            {m.unread && <div style={{ width: 8, height: 8, borderRadius: 4, background: "#E8593C" }} />}
          </div>
        ))}
      </div>
      <BottomNav active="やりとりTOP" onNavigate={onNavigate} />
    </>
  );
}

function ScreenMessageDetail({ onNavigate }) {
  return (
    <>
      <Header title="Fashion MOTA" onBack={() => onNavigate("やりとりTOP")} />
      <div style={{ flex: 1, padding: "16px 20px", overflow: "auto" }}>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 14 }}>
          <div style={{ maxWidth: 260 }}>
            <div style={{ background: "#E8593C", color: "#fff", borderRadius: "12px 12px 4px 12px", padding: "12px 16px", fontSize: 13, lineHeight: 1.6 }}>面接日程の候補をお送りしました。ご都合をお知らせください。</div>
            <div style={{ textAlign: "right", fontSize: 10, color: "#B4B2A9", marginTop: 4 }}>企業 14:30</div>
          </div>
        </div>
        <div style={{ display: "flex", marginBottom: 14 }}>
          <div style={{ maxWidth: 260 }}>
            <div style={{ background: "#fff", border: "1px solid #E8E6E1", borderRadius: "12px 12px 12px 4px", padding: "12px 16px", fontSize: 13, lineHeight: 1.6 }}>4月14日の10:00からでお願いしたいです。</div>
            <div style={{ fontSize: 10, color: "#B4B2A9", marginTop: 4 }}>あなた 14:45</div>
          </div>
        </div>
      </div>
      <div style={{ padding: "12px 16px", background: "#fff", borderTop: "1px solid #E8E6E1", display: "flex", gap: 10, alignItems: "center" }}>
        <div style={{ flex: 1, height: 40, borderRadius: 20, border: "1.5px solid #D3D1C7", display: "flex", alignItems: "center", padding: "0 16px", fontSize: 13, color: "#B4B2A9" }}>メッセージを入力...</div>
        <div style={{ width: 40, height: 40, borderRadius: 20, background: "#E8593C", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 16, cursor: "pointer" }}>↑</div>
      </div>
    </>
  );
}

// ===== SCREEN MAP =====
const SCREEN_MAP = {
  "CSホーム": ScreenCSHome, "求人検索": ScreenJobSearch, "求人詳細": ScreenJobDetail,
  "特集": ScreenFeature, "会員登録誘導": ScreenSignupPrompt,
  "SMS認証": ScreenSMS, "基本情報": ScreenBasicInfo, "基本Q&A": ScreenBasicQA,
  "設問Q&A": ScreenClientQA, "敬語変換確認": ScreenKeigoReview, "写真": ScreenPhoto,
  "スカウト待ち": ScreenScoutWait,
  "マイページ": ScreenMyPage, "スカウト・応募履歴": ScreenHistory,
  "応募完了": ScreenApplyComplete, "AI面談": ScreenAIInterview,
  "面接調整": ScreenInterviewSchedule, "やりとりTOP": ScreenMessagesTop,
  "やりとり詳細": ScreenMessageDetail,
};

// ===== MAIN =====
export default function JobseekerMock({ onBack }) {
  const [current, setCurrent] = useState("CSホーム");
  const [phase, setPhase] = useState("未登録");
  const ScreenComponent = SCREEN_MAP[current];
  const navigate = (s) => {
    setCurrent(s);
    for (const [p, screens] of Object.entries(PHASES)) {
      if (screens.includes(s)) { setPhase(p); break; }
    }
  };
  return (
    <div style={{ minHeight: "100vh", background: "#F0EFEB", fontFamily: "'Noto Sans JP','Hiragino Sans',sans-serif" }}>
      {onBack && <div style={{ textAlign: "center", marginBottom: 4 }}><button onClick={onBack} style={{ padding: "4px 14px", borderRadius: 16, border: "1px solid #D3D1C7", background: "#fff", color: "#5F5E5A", fontSize: 12, cursor: "pointer" }}>← トップに戻る</button></div>}
      <div style={{ display: "flex", gap: 8, padding: "16px 16px 8px", flexWrap: "wrap", justifyContent: "center" }}>
        {Object.entries(PHASES).map(([p, screens]) => (
          <button key={p} onClick={() => { setPhase(p); setCurrent(screens[0]); }} style={{ padding: "6px 16px", borderRadius: 20, border: "none", background: phase === p ? "#E8593C" : "#fff", color: phase === p ? "#fff" : "#5F5E5A", fontSize: 13, fontWeight: 600, cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>{p}</button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 4, padding: "4px 16px 12px", overflowX: "auto", justifyContent: "center", flexWrap: "wrap" }}>
        {PHASES[phase].map(s => (
          <button key={s} onClick={() => setCurrent(s)} style={{ padding: "4px 10px", borderRadius: 6, border: "none", background: current === s ? "#1a1a1a" : "transparent", color: current === s ? "#fff" : "#8C8A82", fontSize: 11, fontWeight: current === s ? 700 : 400, cursor: "pointer", whiteSpace: "nowrap" }}>{s}</button>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", paddingBottom: 32 }}>
        <Phone><ScreenComponent onNavigate={navigate} /></Phone>
      </div>
    </div>
  );
}
