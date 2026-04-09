import { useState } from "react";

const SCREENS = [
  "SMS認証",
  "基本情報",
  "写真/動画",
  "Q&A",
  "敬語変換確認",
  "登録完了",
  "ホーム(フリック)",
  "スカウト詳細",
  "求人詳細",
  "AI面談",
  "面談完了",
  "スカウト履歴",
  "日程調整",
  "新着求人",
  "やりとり",
  "マイページ",
];

const PHASES = {
  "CS(未登録)": ["CSホーム", "CS求人詳細", "会員登録誘導"],
  "登録": ["SMS認証", "基本情報", "基本Q&A", "設問Q&A", "敬語変換確認", "写真", "登録完了"],
  "メイン": ["求人詳細", "AI面談", "面談完了", "スカウト履歴", "日程調整", "新着求人", "やりとり", "マイページ"],
};

// Phone frame wrapper
function Phone({ children }) {
  return (
    <div style={{
      width: 375, minHeight: 720, maxHeight: 780,
      background: "#FAFAF8",
      borderRadius: 36, border: "6px solid #1a1a1a",
      overflow: "hidden", display: "flex", flexDirection: "column",
      boxShadow: "0 20px 60px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.05)",
      position: "relative",
      fontFamily: "'Noto Sans JP', 'Hiragino Sans', sans-serif",
    }}>
      {/* Status bar */}
      <div style={{
        height: 44, background: "#fff", display: "flex",
        alignItems: "center", justifyContent: "space-between",
        padding: "0 20px", fontSize: 12, fontWeight: 600, color: "#1a1a1a",
        flexShrink: 0,
      }}>
        <span>9:41</span>
        <div style={{ width: 120, height: 28, background: "#1a1a1a", borderRadius: 14 }} />
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <svg width="16" height="12" viewBox="0 0 16 12"><rect x="0" y="6" width="3" height="6" rx="1" fill="#1a1a1a"/><rect x="4.5" y="4" width="3" height="8" rx="1" fill="#1a1a1a"/><rect x="9" y="2" width="3" height="10" rx="1" fill="#1a1a1a"/><rect x="13.5" y="0" width="3" height="12" rx="1" fill="#1a1a1a" opacity="0.3"/></svg>
          <svg width="22" height="12" viewBox="0 0 22 12"><rect x="0" y="0" width="20" height="12" rx="2" stroke="#1a1a1a" strokeWidth="1" fill="none"/><rect x="1.5" y="1.5" width="14" height="9" rx="1" fill="#1a1a1a"/><rect x="21" y="3.5" width="1.5" height="5" rx="0.5" fill="#1a1a1a"/></svg>
        </div>
      </div>
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {children}
      </div>
    </div>
  );
}

// Bottom navigation
function BottomNav({ active, onNavigate }) {
  const tabs = [
    { id: "ホーム(フリック)", label: "ホーム", icon: "🏠" },
    { id: "スカウト履歴", label: "スカウト", icon: "📩" },
    { id: "新着求人", label: "求人", icon: "💼" },
    { id: "やりとり", label: "やりとり", icon: "💬" },
    { id: "マイページ", label: "マイページ", icon: "👤" },
  ];
  return (
    <div style={{
      height: 56, background: "#fff", display: "flex",
      borderTop: "1px solid #E8E6E1", flexShrink: 0,
    }}>
      {tabs.map(t => (
        <div key={t.id} onClick={() => onNavigate(t.id)} style={{
          flex: 1, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 2,
          cursor: "pointer", transition: "all 0.15s",
        }}>
          <span style={{ fontSize: 18 }}>{t.icon}</span>
          <span style={{
            fontSize: 10, fontWeight: active === t.id ? 700 : 400,
            color: active === t.id ? "#E8593C" : "#8C8A82",
          }}>{t.label}</span>
        </div>
      ))}
    </div>
  );
}

// Header bar
function Header({ title, sub, onBack, accent }) {
  return (
    <div style={{
      height: 48, background: accent || "#fff", display: "flex",
      alignItems: "center", padding: "0 16px", gap: 12, flexShrink: 0,
      borderBottom: accent ? "none" : "1px solid #E8E6E1",
    }}>
      {onBack && (
        <div onClick={onBack} style={{ cursor: "pointer", fontSize: 20, color: accent ? "#fff" : "#1a1a1a" }}>←</div>
      )}
      <div>
        <div style={{ fontSize: 16, fontWeight: 700, color: accent ? "#fff" : "#1a1a1a" }}>{title}</div>
        {sub && <div style={{ fontSize: 11, color: accent ? "rgba(255,255,255,0.8)" : "#8C8A82" }}>{sub}</div>}
      </div>
    </div>
  );
}

// Progress steps
function StepIndicator({ current, total }) {
  return (
    <div style={{ display: "flex", gap: 6, padding: "12px 20px" }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          flex: 1, height: 4, borderRadius: 2,
          background: i <= current ? "#E8593C" : "#E8E6E1",
          transition: "background 0.3s",
        }} />
      ))}
    </div>
  );
}

// Input field
function Field({ label, placeholder, type, required }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: "#3D3D3A", marginBottom: 4, display: "flex", alignItems: "center", gap: 4 }}>
        {label}
        {required && <span style={{ fontSize: 10, color: "#E8593C", fontWeight: 700 }}>必須</span>}
      </div>
      <div style={{
        height: 42, borderRadius: 8, border: "1.5px solid #D3D1C7",
        display: "flex", alignItems: "center", padding: "0 12px",
        fontSize: 14, color: "#B4B2A9", background: "#fff",
      }}>
        {placeholder}
      </div>
    </div>
  );
}

// Primary button
function Btn({ children, disabled, small, outline }) {
  return (
    <div style={{
      height: small ? 36 : 48, borderRadius: small ? 8 : 12,
      background: outline ? "transparent" : disabled ? "#D3D1C7" : "#E8593C",
      border: outline ? "1.5px solid #E8593C" : "none",
      color: outline ? "#E8593C" : disabled ? "#fff" : "#fff",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: small ? 13 : 15, fontWeight: 700,
      cursor: disabled ? "default" : "pointer",
      transition: "all 0.15s",
    }}>
      {children}
    </div>
  );
}

// Badge / tag
function Tag({ children, color }) {
  const colors = {
    orange: { bg: "#FFF3ED", text: "#E8593C" },
    blue: { bg: "#EDF4FF", text: "#2E6FD4" },
    green: { bg: "#EEFBF3", text: "#1D9E75" },
    gray: { bg: "#F1EFE8", text: "#5F5E5A" },
    purple: { bg: "#F0EDFE", text: "#534AB7" },
  };
  const c = colors[color] || colors.gray;
  return (
    <span style={{
      display: "inline-block", padding: "3px 8px", borderRadius: 6,
      fontSize: 11, fontWeight: 600, background: c.bg, color: c.text,
    }}>{children}</span>
  );
}

// ========== SCREENS ==========

// ========== CS SCREENS (未登録) ==========

function ScreenCSHome({ onNavigate }) {
  const jobs = [
    { company: "サンプル建設", role: "施工管理", area: "東京都新宿区", color: "#2E6FD4" },
    { company: "ABC歯科クリニック", role: "歯科助手", area: "東京都渋谷区", color: "#1D9E75" },
    { company: "ケアハウスさくら", role: "介護スタッフ", area: "東京都世田谷区", color: "#534AB7" },
  ];
  return (
    <>
      <div style={{ flex: 1, overflow: "auto" }}>
        {/* Header */}
        <div style={{
          height: 48, background: "#fff", display: "flex",
          alignItems: "center", justifyContent: "space-between",
          padding: "0 16px", borderBottom: "1px solid #E8E6E1", flexShrink: 0,
        }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#E8593C" }}>MOTA</div>
          <div onClick={() => onNavigate("SMS認証")} style={{
            padding: "5px 14px", borderRadius: 6, background: "#E8593C",
            color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer",
          }}>ログイン / 登録</div>
        </div>

        {/* Hero banner */}
        <div style={{
          height: 180, background: "linear-gradient(135deg, #E8593C 0%, #FAC775 100%)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          padding: "0 24px", textAlign: "center",
        }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 6, lineHeight: 1.5 }}>
            履歴書不要！<br />カンタン質問に<br />3問こたえるだけで応募できる！
          </div>
        </div>

        {/* 新着企業情報リスト */}
        <div style={{ padding: "16px 16px 8px" }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a", marginBottom: 12 }}>
            新着の企業情報
          </div>
          {jobs.map((j, i) => (
            <div key={i} onClick={() => onNavigate("CS求人詳細")} style={{
              display: "flex", gap: 12, alignItems: "center",
              background: "#fff", borderRadius: 10, padding: 12, marginBottom: 8,
              border: "1px solid #E8E6E1", cursor: "pointer",
            }}>
              {/* サムネイル */}
              <div style={{
                width: 56, height: 56, borderRadius: 8, background: j.color, flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "rgba(255,255,255,0.5)", fontSize: 10,
              }}>写真</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a1a", marginBottom: 2 }}>{j.company}</div>
                <div style={{ fontSize: 12, color: "#5F5E5A" }}>{j.role}</div>
                <div style={{ fontSize: 11, color: "#8C8A82" }}>{j.area}</div>
              </div>
              <span style={{ fontSize: 14, color: "#D3D1C7" }}>›</span>
            </div>
          ))}
        </div>

        {/* もっと見たい人は会員登録へ CTA */}
        <div style={{ padding: "4px 16px 16px" }}>
          <div onClick={() => onNavigate("会員登録誘導")} style={{
            background: "linear-gradient(135deg, #FFF3ED, #FFEEE4)",
            borderRadius: 12, padding: "16px 20px", textAlign: "center",
            border: "1px solid #F0997B", cursor: "pointer",
          }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#E8593C", marginBottom: 4 }}>
              もっと求人を見たい方は
            </div>
            <div style={{ fontSize: 12, color: "#D85A30", marginBottom: 10 }}>
              無料会員登録で全ての求人＋スカウト機能が使えます
            </div>
            <div style={{
              display: "inline-block", padding: "8px 28px", borderRadius: 8,
              background: "#E8593C", color: "#fff", fontSize: 14, fontWeight: 700,
            }}>無料で会員登録する</div>
          </div>
        </div>

        {/* 特集エリア */}
        <div style={{ padding: "0 16px 16px" }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a", marginBottom: 10 }}>特集</div>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{
              flex: 1, borderRadius: 10, overflow: "hidden", border: "1px solid #E8E6E1",
            }}>
              <div style={{ height: 80, background: "linear-gradient(135deg, #2E6FD4, #85B7EB)" }} />
              <div style={{ padding: 10 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#1a1a1a" }}>未経験OK特集</div>
                <div style={{ fontSize: 10, color: "#8C8A82" }}>初めてでも安心の求人</div>
              </div>
            </div>
            <div style={{
              flex: 1, borderRadius: 10, overflow: "hidden", border: "1px solid #E8E6E1",
            }}>
              <div style={{ height: 80, background: "linear-gradient(135deg, #1D9E75, #5DCAA5)" }} />
              <div style={{ padding: 10 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#1a1a1a" }}>高収入特集</div>
                <div style={{ fontSize: 10, color: "#8C8A82" }}>年収400万以上の求人</div>
              </div>
            </div>
          </div>
        </div>

        {/* MOTAの使い方 */}
        <div style={{ padding: "0 16px 20px" }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a", marginBottom: 10 }}>MOTAの使い方</div>
          {[
            { step: "1", text: "簡単プロフィール登録（3分）", sub: "写真とQ&Aに答えるだけ" },
            { step: "2", text: "企業からスカウトが届く", sub: "あなたに興味のある企業から直接連絡" },
            { step: "3", text: "AI面談で気軽に話す", sub: "スマホで簡単にビデオ面談" },
          ].map((item, i) => (
            <div key={i} style={{
              display: "flex", gap: 12, alignItems: "center",
              padding: "10px 0", borderBottom: i < 2 ? "1px solid #F1EFE8" : "none",
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: 14, background: "#E8593C",
                color: "#fff", fontSize: 13, fontWeight: 800,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>{item.step}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a" }}>{item.text}</div>
                <div style={{ fontSize: 11, color: "#8C8A82" }}>{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function ScreenCSJobDetail({ onNavigate }) {
  return (
    <>
      <Header title="求人詳細" onBack={() => onNavigate("CSホーム")} />
      <div style={{ flex: 1, padding: "0", overflow: "auto" }}>
        <div style={{
          height: 160, background: "linear-gradient(135deg, #2E6FD4, #1D9E75)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "rgba(255,255,255,0.5)", fontSize: 13,
        }}>企業写真</div>
        <div style={{ padding: "16px 20px" }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#1a1a1a", marginBottom: 4 }}>施工管理スタッフ</div>
          <div style={{ fontSize: 13, color: "#5F5E5A", marginBottom: 14 }}>株式会社サンプル建設</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
            <Tag color="orange">正社員</Tag>
            <Tag color="green">未経験OK</Tag>
            <Tag color="blue">資格支援あり</Tag>
          </div>
          {[
            ["仕事内容", "建設現場の工程・品質・安全管理。入社後3ヶ月の研修あり。"],
            ["給与", "月給25万〜35万円（年収350〜450万）"],
            ["勤務地", "東京都新宿区西新宿 ※転勤なし"],
            ["勤務時間", "8:00〜17:00（実働8h）"],
            ["休日", "完全週休2日制（土日）、祝日、年末年始"],
            ["福利厚生", "社保完備、交通費全額支給、資格取得支援"],
          ].map(([k, v]) => (
            <div key={k} style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#8C8A82", marginBottom: 2 }}>{k}</div>
              <div style={{ fontSize: 13, color: "#1a1a1a", lineHeight: 1.6 }}>{v}</div>
            </div>
          ))}
          {/* アクションボタン → 会員登録誘導 */}
          <div style={{
            background: "#F7F6F3", borderRadius: 12, padding: 16, marginTop: 8, textAlign: "center",
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a", marginBottom: 4 }}>この求人に興味がありますか？</div>
            <div style={{ fontSize: 11, color: "#8C8A82", marginBottom: 12 }}>面談申込・保留・お断りには会員登録が必要です</div>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ flex: 1, opacity: 0.4 }}>
                <Btn small outline>お断り</Btn>
              </div>
              <div style={{ flex: 1, opacity: 0.4 }}>
                <Btn small outline>保留</Btn>
              </div>
              <div style={{ flex: 1.2 }} onClick={() => onNavigate("会員登録誘導")}>
                <Btn small>面談申込</Btn>
              </div>
            </div>
            <div onClick={() => onNavigate("SMS認証")} style={{
              marginTop: 10, fontSize: 12, color: "#E8593C", fontWeight: 600, cursor: "pointer",
            }}>無料で会員登録する →</div>
          </div>
        </div>
      </div>
    </>
  );
}

function ScreenSignupPrompt({ onNavigate }) {
  return (
    <>
      <Header title="会員登録" onBack={() => onNavigate("CSホーム")} />
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", padding: "24px 20px",
      }}>
        <div style={{
          width: 72, height: 72, borderRadius: 36, background: "#FFF3ED",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 32, marginBottom: 16,
        }}>🔓</div>
        <div style={{ fontSize: 18, fontWeight: 800, color: "#1a1a1a", marginBottom: 8 }}>会員登録が必要です</div>
        <div style={{ fontSize: 13, color: "#5F5E5A", textAlign: "center", lineHeight: 1.7, marginBottom: 24 }}>
          面談申込・保留・お断りなどの<br />
          アクションを行うには無料の会員登録が必要です。<br />
          登録は3分で完了します。
        </div>
        <div style={{ width: "100%", marginBottom: 10 }}>
          <div onClick={() => onNavigate("SMS認証")}><Btn>無料で会員登録する</Btn></div>
        </div>
        <div style={{ width: "100%" }}>
          <div onClick={() => onNavigate("CSホーム")}><Btn small outline>あとで登録する</Btn></div>
        </div>
        <div style={{ marginTop: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a", marginBottom: 8 }}>登録するとできること</div>
          {[
            "企業からスカウトが届く",
            "AI面談で気軽に面接体験",
            "面接日程をアプリ内で調整",
            "全ての求人に応募できる",
          ].map((text, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 8, marginBottom: 6,
              fontSize: 12, color: "#3D3D3A",
            }}>
              <span style={{ color: "#E8593C", fontWeight: 700 }}>✓</span>
              {text}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ========== REGISTRATION SCREENS ==========

function ScreenSMS({ onNavigate }) {
  return (
    <>
      <Header title="会員登録" onBack={() => onNavigate("CSホーム")} />
      <div style={{ flex: 1, padding: "24px 20px", overflow: "auto" }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: "#E8593C", letterSpacing: 2 }}>MOTA</div>
          <div style={{ fontSize: 13, color: "#5F5E5A", marginTop: 4 }}>無料会員登録（3分で完了）</div>
        </div>
        <StepIndicator current={0} total={6} />
        <Field label="氏名" placeholder="山田 太郎" required />
        <Field label="電話番号" placeholder="090-0000-0000" required />
        <div style={{ height: 8 }} />
        <Btn>認証コードを送信</Btn>
        <div style={{ height: 16 }} />
        <Field label="認証コード（6桁）" placeholder="000000" />
        <div style={{ height: 8 }} />
        <Btn disabled>認証して次へ</Btn>
        <div style={{ textAlign: "center", marginTop: 16, fontSize: 12, color: "#8C8A82" }}>
          すでにアカウントをお持ちの方は<span style={{ color: "#E8593C", fontWeight: 600 }}>こちら</span>
        </div>
      </div>
    </>
  );
}

function ScreenBasicInfo({ onNavigate }) {
  return (
    <>
      <Header title="簡単応募ステップ" onBack={() => onNavigate("SMS認証")} />
      <StepIndicator current={1} total={6} />
      <div style={{ flex: 1, padding: "0 20px 20px", overflow: "auto" }}>
        <div style={{
          background: "#EEFBF3", borderRadius: 10, padding: 12, marginBottom: 16,
          fontSize: 12, color: "#1D9E75", fontWeight: 500, textAlign: "center",
        }}>
          SMS認証が完了しました ✓
        </div>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a", marginBottom: 14 }}>基本情報を入力</div>
        <Field label="住所（市区町村まで）" placeholder="東京都新宿区" required />
        <Field label="メールアドレス" placeholder="example@email.com（任意）" />
        <div style={{
          background: "#F7F6F3", borderRadius: 8, padding: 10,
          fontSize: 11, color: "#8C8A82", marginBottom: 16, lineHeight: 1.5,
        }}>
          メールアドレスを登録するとスカウト通知をメールでも受け取れます
        </div>
        <Btn>次へ</Btn>
      </div>
    </>
  );
}

function ScreenBasicQA({ onNavigate }) {
  const questions = [
    { num: 1, q: "生年月日を教えてください", placeholder: "1998年1月1日", icon: "🎂" },
    { num: 2, q: "最終学歴は？", placeholder: "選択してください ▼", icon: "🎓" },
    { num: 3, q: "保有している免許・資格は？", placeholder: "例：普通自動車免許", icon: "📋" },
  ];
  return (
    <>
      <Header title="基本情報" onBack={() => onNavigate("基本情報")} />
      <StepIndicator current={2} total={6} />
      <div style={{ flex: 1, padding: "0 20px 20px", overflow: "auto" }}>
        <div style={{ fontSize: 13, color: "#5F5E5A", marginBottom: 14, textAlign: "center" }}>
          あなたについて教えてください
        </div>
        {questions.map((item, i) => (
          <div key={i} style={{
            background: "#fff", borderRadius: 12, padding: 16, marginBottom: 12,
            border: "1px solid #E8E6E1",
          }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 8, marginBottom: 10,
            }}>
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a1a" }}>Q{item.num}. {item.q}</div>
            </div>
            <div style={{
              height: 42, borderRadius: 8, border: "1.5px solid #D3D1C7",
              display: "flex", alignItems: "center", padding: "0 12px",
              fontSize: 13, color: "#B4B2A9", background: "#FAFAF8",
            }}>
              {item.placeholder}
            </div>
          </div>
        ))}
        <Btn>次へ</Btn>
      </div>
    </>
  );
}

function ScreenClientQA({ onNavigate }) {
  const questions = [
    { num: 1, q: "あなたの得意なことは何ですか？" },
    { num: 2, q: "どんな職場で働きたいですか？" },
    { num: 3, q: "仕事で大切にしていることは？" },
  ];
  return (
    <>
      <Header title="設問Q&A" onBack={() => onNavigate("基本Q&A")} />
      <StepIndicator current={3} total={6} />
      <div style={{ flex: 1, padding: "0 20px 20px", overflow: "auto" }}>
        {/* キャッチ */}
        <div style={{
          textAlign: "center", marginBottom: 16, padding: "12px 0",
        }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#E8593C", marginBottom: 4 }}>
            3問で完了！
          </div>
          <div style={{ fontSize: 13, color: "#5F5E5A" }}>
            テキストでも動画でもOK！あなたらしさを伝えましょう
          </div>
        </div>

        {questions.map((item, i) => (
          <div key={i} style={{
            background: "#fff", borderRadius: 12, padding: 16, marginBottom: 12,
            border: "1px solid #E8E6E1",
          }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 8, marginBottom: 10,
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: 14, background: "#E8593C",
                color: "#fff", fontSize: 13, fontWeight: 800,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>Q{item.num}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a1a", flex: 1 }}>{item.q}</div>
            </div>
            {/* テキスト回答 */}
            <div style={{
              borderRadius: 8, border: "1.5px solid #D3D1C7", padding: 12,
              minHeight: 56, fontSize: 13, color: "#B4B2A9", background: "#FAFAF8",
              marginBottom: 8,
            }}>
              回答を入力...
            </div>
            {/* 動画回答ボタン */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: 8,
            }}>
              <div style={{ flex: 1, height: 1, background: "#E8E6E1" }} />
              <span style={{ fontSize: 11, color: "#B4B2A9" }}>または</span>
              <div style={{ flex: 1, height: 1, background: "#E8E6E1" }} />
            </div>
            <div style={{
              marginTop: 8, padding: "10px 16px", borderRadius: 10,
              border: "1.5px solid #AFA9EC", background: "#F0EDFE",
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: 8, cursor: "pointer",
            }}>
              <span style={{ fontSize: 18 }}>🎥</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#534AB7" }}>動画で回答する</div>
                <div style={{ fontSize: 10, color: "#7F77DD" }}>30秒であなたの人柄が伝わります</div>
              </div>
            </div>
          </div>
        ))}
        <div style={{
          background: "#F0EDFE", borderRadius: 8, padding: 10, marginBottom: 12,
          fontSize: 11, color: "#534AB7", textAlign: "center",
        }}>
          💡 話し言葉でOK！AIが自動で敬語に変換します
        </div>
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
        <div style={{
          background: "#F0EDFE", borderRadius: 12, padding: 14, marginBottom: 16,
          fontSize: 12, color: "#534AB7", fontWeight: 500, lineHeight: 1.6,
        }}>
          AIが話し言葉を敬語に変換しました。内容を確認して、必要に応じて修正してください。
        </div>
        {[
          { q: "あなたの得意なことは何ですか？", before: "人と話すのが好きで、すぐ仲良くなれる", after: "人とお話しすることが得意で、初対面の方ともすぐに打ち解けることができます。" },
          { q: "どんな職場で働きたいですか？", before: "チームで楽しくやれるとこ", after: "チームワークを大切にし、明るい雰囲気の職場で働きたいと考えております。" },
          { q: "仕事で大切にしていることは？", before: "ちゃんと時間守ること", after: "時間を厳守し、信頼関係を築くことを大切にしております。" },
        ].map((item, i) => (
          <div key={i} style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#3D3D3A", marginBottom: 6 }}>Q{i + 1}. {item.q}</div>
            <div style={{
              borderRadius: 8, background: "#F7F6F3", padding: 10,
              fontSize: 12, color: "#8C8A82", marginBottom: 4, textDecoration: "line-through",
            }}>{item.before}</div>
            <div style={{ fontSize: 10, color: "#534AB7", fontWeight: 600, marginBottom: 2 }}>↓ AI変換後</div>
            <div style={{
              borderRadius: 8, border: "1.5px solid #AFA9EC", padding: 10,
              fontSize: 13, color: "#1a1a1a", background: "#fff", lineHeight: 1.6,
            }}>{item.after}</div>
            <div style={{ textAlign: "right", marginTop: 4 }}>
              <span style={{ fontSize: 11, color: "#534AB7", fontWeight: 600, cursor: "pointer" }}>✏️ 修正する</span>
            </div>
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
          <div style={{ fontSize: 16, fontWeight: 700, color: "#1a1a1a", marginBottom: 4 }}>プロフィール写真を登録</div>
          <div style={{ fontSize: 12, color: "#5F5E5A", lineHeight: 1.6 }}>
            写真があると企業からのスカウト率が<br />
            <span style={{ color: "#E8593C", fontWeight: 700 }}>3倍</span>アップします
          </div>
          <div style={{ fontSize: 11, color: "#E8593C", fontWeight: 600, marginTop: 4 }}>※ 必須項目です</div>
        </div>
        <div style={{
          width: 140, height: 140, borderRadius: 70, border: "2.5px dashed #E8593C",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          margin: "0 auto 20px", background: "#FFF3ED", cursor: "pointer",
        }}>
          <span style={{ fontSize: 32, color: "#E8593C" }}>+</span>
          <span style={{ fontSize: 11, color: "#D85A30", fontWeight: 600 }}>写真を追加</span>
        </div>
        <div style={{
          background: "#F7F6F3", borderRadius: 10, padding: 14, marginBottom: 20,
        }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#3D3D3A", marginBottom: 6 }}>写真のポイント</div>
          {[
            "笑顔で明るい印象の写真がベスト",
            "顔がはっきり見えるものがおすすめ",
            "加工しすぎない自然な写真が好印象",
          ].map((text, i) => (
            <div key={i} style={{ fontSize: 11, color: "#5F5E5A", marginBottom: 3, display: "flex", gap: 4 }}>
              <span>💡</span>{text}
            </div>
          ))}
        </div>
        <Btn>写真を登録して完了</Btn>
      </div>
    </>
  );
}

function ScreenComplete({ onNavigate }) {
  return (
    <>
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", padding: "40px 20px",
        background: "linear-gradient(180deg, #FFF5F2 0%, #FAFAF8 100%)",
      }}>
        <div style={{
          width: 80, height: 80, borderRadius: 40, background: "#E8593C",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 36, color: "#fff", marginBottom: 20,
        }}>✓</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: "#1a1a1a", marginBottom: 8 }}>登録完了！</div>
        <div style={{ fontSize: 14, color: "#5F5E5A", textAlign: "center", lineHeight: 1.7, marginBottom: 32 }}>
          プロフィールが公開されました。<br />
          企業からのスカウトをお待ちください。<br />
          届いたらSMS・メールでお知らせします。
        </div>
        <div style={{ width: "100%" }}>
          <Btn>ホーム画面へ</Btn>
        </div>
      </div>
    </>
  );
}

function ScreenFlick({ onNavigate }) {
  return (
    <>
      <div style={{
        height: 48, background: "#fff", display: "flex",
        alignItems: "center", justifyContent: "space-between",
        padding: "0 16px", borderBottom: "1px solid #E8E6E1", flexShrink: 0,
      }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: "#E8593C" }}>MOTA</div>
        <div style={{ display: "flex", gap: 12 }}>
          <span style={{ fontSize: 11, background: "#FFF3ED", color: "#E8593C", padding: "3px 8px", borderRadius: 10, fontWeight: 700 }}>新着 3件</span>
        </div>
      </div>
      <div style={{ flex: 1, padding: "12px 16px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {/* Scout Card */}
        <div style={{
          flex: 1, borderRadius: 16, overflow: "hidden", position: "relative",
          background: "#fff", boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          border: "1px solid #E8E6E1",
        }}>
          {/* Company image area */}
          <div style={{
            height: 180, background: "linear-gradient(135deg, #2E6FD4 0%, #1D9E75 100%)",
            display: "flex", alignItems: "center", justifyContent: "center", position: "relative",
          }}>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>職場写真（3枚表示）</div>
            <div style={{
              position: "absolute", bottom: 8, right: 8,
              background: "rgba(0,0,0,0.5)", color: "#fff", fontSize: 10,
              padding: "2px 8px", borderRadius: 10,
            }}>+3枚 タップで全枚表示</div>
          </div>
          {/* Card content */}
          <div style={{ padding: "14px 16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 8, background: "#E8E6E1",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14,
              }}>🏢</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a1a" }}>株式会社サンプル建設</div>
                <div style={{ fontSize: 11, color: "#8C8A82" }}>施工管理 ・ 東京都新宿区</div>
              </div>
            </div>
            <div style={{
              fontSize: 13, color: "#3D3D3A", lineHeight: 1.6, marginBottom: 10,
              background: "#F7F6F3", borderRadius: 8, padding: 10,
            }}>
              未経験から手に職がつく施工管理！丁寧な研修があるので安心してスタートできます。
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
              <Tag color="orange">年収350万〜</Tag>
              <Tag color="blue">週休2日</Tag>
              <Tag color="green">未経験OK</Tag>
              <Tag color="gray">正味時給1,800円</Tag>
            </div>
            <div onClick={() => onNavigate("求人詳細")} style={{
              textAlign: "center", fontSize: 12, color: "#2E6FD4", fontWeight: 600, cursor: "pointer",
            }}>求人情報の詳細はこちら →</div>
          </div>
        </div>
        {/* Swipe actions */}
        <div style={{
          display: "flex", justifyContent: "space-around",
          alignItems: "center", padding: "12px 8px 4px", flexShrink: 0,
        }}>
          <div style={{
            width: 52, height: 52, borderRadius: 26, border: "2px solid #F09595",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22, cursor: "pointer", background: "#fff",
          }}>✕</div>
          <div style={{
            width: 44, height: 44, borderRadius: 22, border: "2px solid #FAC775",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, cursor: "pointer", background: "#fff",
          }}>⏸</div>
          <div style={{
            width: 52, height: 52, borderRadius: 26, border: "2px solid #5DCAA5",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22, cursor: "pointer", background: "#fff",
          }}>♥</div>
        </div>
        <div style={{ textAlign: "center", fontSize: 10, color: "#B4B2A9", paddingBottom: 2 }}>
          ← お断り ｜ ↓ 保留 ｜ AI面談へ →
        </div>
      </div>
      <BottomNav active="ホーム(フリック)" onNavigate={onNavigate} />
    </>
  );
}

function ScreenScoutDetail({ onNavigate }) {
  return (
    <>
      <Header title="スカウト詳細" onBack={() => onNavigate("ホーム(フリック)")} />
      <div style={{ flex: 1, padding: "0 0 16px", overflow: "auto" }}>
        <div style={{ height: 200, background: "linear-gradient(135deg, #2E6FD4, #1D9E75)", position: "relative" }}>
          <div style={{ position: "absolute", bottom: 8, left: 12, display: "flex", gap: 6 }}>
            {[1,2,3].map(i => <div key={i} style={{ width: 56, height: 56, borderRadius: 8, background: "rgba(255,255,255,0.3)" }} />)}
          </div>
          <div style={{
            position: "absolute", bottom: 8, right: 12,
            background: "rgba(0,0,0,0.5)", color: "#fff", fontSize: 10,
            padding: "3px 10px", borderRadius: 10,
          }}>全6枚を見る</div>
        </div>
        <div style={{ padding: "16px 20px" }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#1a1a1a", marginBottom: 4 }}>株式会社サンプル建設</div>
          <div style={{ fontSize: 13, color: "#5F5E5A", marginBottom: 12 }}>施工管理 ・ 東京都新宿区</div>
          <div style={{
            background: "#F7F6F3", borderRadius: 10, padding: 14,
            fontSize: 13, color: "#3D3D3A", lineHeight: 1.7, marginBottom: 16,
          }}>
            未経験から手に職がつく施工管理のお仕事です。入社後3ヶ月の研修制度があり、先輩がマンツーマンでサポートします。
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
            {[
              ["年収", "350万〜450万円"],
              ["勤務地", "東京都新宿区西新宿"],
              ["休日", "週休2日（土日）"],
              ["勤務時間", "8:00〜17:00"],
              ["正味時給", "約1,800円"],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", fontSize: 13 }}>
                <div style={{ width: 80, color: "#8C8A82", fontWeight: 600, flexShrink: 0 }}>{k}</div>
                <div style={{ color: "#1a1a1a" }}>{v}</div>
              </div>
            ))}
          </div>
          <div onClick={() => onNavigate("求人詳細")} style={{ marginBottom: 16 }}>
            <Btn small outline>求人情報の詳細を見る →</Btn>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 1 }}><Btn small outline>お断り</Btn></div>
            <div style={{ flex: 1 }}><Btn small>AI面談へ進む</Btn></div>
          </div>
        </div>
      </div>
      <BottomNav active="ホーム(フリック)" onNavigate={onNavigate} />
    </>
  );
}

function ScreenJobDetail({ onNavigate }) {
  return (
    <>
      <Header title="求人詳細" onBack={() => onNavigate("ホーム(フリック)")} />
      <div style={{ flex: 1, padding: "16px 20px", overflow: "auto" }}>
        <div style={{
          height: 140, borderRadius: 12, background: "linear-gradient(135deg, #2E6FD4, #1D9E75)",
          marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "center",
          color: "rgba(255,255,255,0.5)", fontSize: 13,
        }}>企業写真</div>
        <div style={{ fontSize: 18, fontWeight: 800, color: "#1a1a1a", marginBottom: 4 }}>施工管理スタッフ</div>
        <div style={{ fontSize: 13, color: "#5F5E5A", marginBottom: 14 }}>株式会社サンプル建設</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
          <Tag color="orange">正社員</Tag>
          <Tag color="green">未経験OK</Tag>
          <Tag color="blue">資格支援あり</Tag>
        </div>
        {[
          ["仕事内容", "建設現場の工程・品質・安全管理。入社後3ヶ月の研修あり。"],
          ["給与", "月給25万〜35万円（年収350〜450万）"],
          ["勤務地", "東京都新宿区西新宿 ※転勤なし"],
          ["勤務時間", "8:00〜17:00（実働8h）"],
          ["休日", "完全週休2日制（土日）、祝日、年末年始"],
          ["福利厚生", "社保完備、交通費全額支給、資格取得支援"],
        ].map(([k, v]) => (
          <div key={k} style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#8C8A82", marginBottom: 2 }}>{k}</div>
            <div style={{ fontSize: 13, color: "#1a1a1a", lineHeight: 1.6 }}>{v}</div>
          </div>
        ))}
      </div>
      <BottomNav active="ホーム(フリック)" onNavigate={onNavigate} />
    </>
  );
}

function ScreenAIInterview({ onNavigate }) {
  return (
    <>
      <Header title="AI面談" accent="#534AB7" onBack={() => onNavigate("ホーム(フリック)")} />
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", padding: 20,
        background: "linear-gradient(180deg, #F0EDFE 0%, #FAFAF8 100%)",
      }}>
        {/* Avatar */}
        <div style={{
          width: 100, height: 100, borderRadius: 50,
          background: "linear-gradient(135deg, #534AB7, #7F77DD)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 40, marginBottom: 16, color: "#fff",
          boxShadow: "0 8px 24px rgba(83,74,183,0.3)",
        }}>🤖</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#1a1a1a", marginBottom: 4 }}>MOTA AIインタビュアー</div>
        <div style={{ fontSize: 12, color: "#5F5E5A", marginBottom: 24 }}>株式会社サンプル建設 の面談</div>
        <div style={{
          background: "#fff", borderRadius: 16, padding: 20, width: "100%",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)", textAlign: "center",
          marginBottom: 24,
        }}>
          <div style={{ fontSize: 13, color: "#534AB7", fontWeight: 600, marginBottom: 8 }}>質問 1 / 5</div>
          <div style={{ fontSize: 15, color: "#1a1a1a", fontWeight: 600, lineHeight: 1.6 }}>
            「これまでの仕事で一番やりがいを感じた経験を教えてください」
          </div>
        </div>
        {/* Recording button */}
        <div style={{
          width: 72, height: 72, borderRadius: 36,
          background: "#E8593C", display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", boxShadow: "0 4px 16px rgba(232,89,60,0.4)",
          marginBottom: 8,
        }}>
          <div style={{ width: 24, height: 24, borderRadius: 4, background: "#fff" }} />
        </div>
        <div style={{ fontSize: 12, color: "#5F5E5A" }}>タップして回答を録画</div>
      </div>
    </>
  );
}

function ScreenInterviewDone({ onNavigate }) {
  return (
    <>
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", padding: "40px 20px",
        background: "linear-gradient(180deg, #F0EDFE 0%, #FAFAF8 100%)",
      }}>
        <div style={{
          width: 72, height: 72, borderRadius: 36, background: "#534AB7",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 32, color: "#fff", marginBottom: 20,
        }}>✓</div>
        <div style={{ fontSize: 20, fontWeight: 800, color: "#1a1a1a", marginBottom: 8 }}>面談完了！</div>
        <div style={{ fontSize: 13, color: "#5F5E5A", textAlign: "center", lineHeight: 1.7, marginBottom: 32 }}>
          お疲れさまでした。<br />
          面談結果は企業に送信されました。<br />
          企業からの連絡をお待ちください。<br />
          進捗はスカウト履歴で確認できます。
        </div>
        <div style={{ width: "100%" }}>
          <Btn>ホーム画面へ戻る</Btn>
        </div>
      </div>
    </>
  );
}

function ScreenHistory({ onNavigate }) {
  const items = [
    { co: "サンプル建設", role: "施工管理", status: "面談済み", color: "purple" },
    { co: "ABC歯科", role: "歯科助手", status: "企業確認中", color: "blue" },
    { co: "ケアハウスさくら", role: "介護スタッフ", status: "面接案内", color: "green" },
    { co: "アパレルXYZ", role: "販売スタッフ", status: "お断り", color: "gray" },
  ];
  return (
    <>
      <Header title="スカウト履歴" />
      <div style={{ flex: 1, padding: "12px 16px", overflow: "auto" }}>
        {items.map((item, i) => (
          <div key={i} onClick={() => item.status === "面接案内" && onNavigate("日程調整")} style={{
            background: "#fff", borderRadius: 12, padding: 14, marginBottom: 10,
            border: "1px solid #E8E6E1", cursor: "pointer",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a1a" }}>{item.co}</div>
              <Tag color={item.color}>{item.status}</Tag>
            </div>
            <div style={{ fontSize: 12, color: "#5F5E5A" }}>{item.role}</div>
            {item.status === "面接案内" && (
              <div style={{ fontSize: 12, color: "#E8593C", fontWeight: 600, marginTop: 6 }}>
                📅 日程を選択してください →
              </div>
            )}
          </div>
        ))}
      </div>
      <BottomNav active="スカウト履歴" onNavigate={onNavigate} />
    </>
  );
}

function ScreenSchedule({ onNavigate }) {
  return (
    <>
      <Header title="面接日程調整" onBack={() => onNavigate("スカウト履歴")} />
      <div style={{ flex: 1, padding: "16px 20px", overflow: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 8, background: "#E8E6E1",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
          }}>🏢</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a" }}>ケアハウスさくら</div>
            <div style={{ fontSize: 12, color: "#5F5E5A" }}>介護スタッフ</div>
          </div>
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a", marginBottom: 10 }}>
          企業から提示された候補日
        </div>
        {[
          "4月14日（月）10:00〜11:00",
          "4月15日（火）14:00〜15:00",
          "4月17日（木）10:00〜11:00",
        ].map((d, i) => (
          <div key={i} style={{
            background: i === 0 ? "#FFF3ED" : "#fff",
            border: i === 0 ? "1.5px solid #E8593C" : "1.5px solid #E8E6E1",
            borderRadius: 10, padding: 14, marginBottom: 8,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            cursor: "pointer",
          }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a" }}>{d}</div>
            {i === 0 && <div style={{
              width: 20, height: 20, borderRadius: 10, background: "#E8593C",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontSize: 12,
            }}>✓</div>}
          </div>
        ))}
        <div style={{ height: 20 }} />
        <Btn>この日程で確定する</Btn>
        <div style={{ height: 10 }} />
        <Btn small outline>都合が合わない場合は連絡する</Btn>
      </div>
      <BottomNav active="スカウト履歴" onNavigate={onNavigate} />
    </>
  );
}

function ScreenJobs({ onNavigate }) {
  const jobs = [
    { title: "介護スタッフ", co: "ケアハウスさくら", loc: "東京都世田谷区", salary: "月給24万〜", tags: ["未経験OK", "夜勤なし"] },
    { title: "歯科助手", co: "ABC歯科クリニック", loc: "東京都渋谷区", salary: "月給22万〜", tags: ["正社員", "駅チカ"] },
    { title: "アパレル販売", co: "Fashion MOTA", loc: "東京都新宿区", salary: "月給20万〜", tags: ["社割あり", "残業少"] },
  ];
  return (
    <>
      <Header title="新着求人" />
      <div style={{
        padding: "8px 16px", background: "#fff", borderBottom: "1px solid #E8E6E1",
        flexShrink: 0,
      }}>
        <div style={{
          height: 36, borderRadius: 8, background: "#F7F6F3", display: "flex",
          alignItems: "center", padding: "0 12px", fontSize: 13, color: "#B4B2A9",
        }}>🔍 職種・エリアで検索</div>
      </div>
      <div style={{ flex: 1, padding: "12px 16px", overflow: "auto" }}>
        {jobs.map((j, i) => (
          <div key={i} style={{
            background: "#fff", borderRadius: 12, padding: 14, marginBottom: 10,
            border: "1px solid #E8E6E1", cursor: "pointer",
          }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a1a", marginBottom: 2 }}>{j.title}</div>
            <div style={{ fontSize: 12, color: "#5F5E5A", marginBottom: 6 }}>{j.co} ・ {j.loc}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#E8593C", marginBottom: 8 }}>{j.salary}</div>
            <div style={{ display: "flex", gap: 4 }}>
              {j.tags.map(t => <Tag key={t} color="blue">{t}</Tag>)}
            </div>
            <div style={{ textAlign: "right", marginTop: 8 }}>
              <span style={{
                fontSize: 12, color: "#fff", background: "#E8593C",
                padding: "5px 14px", borderRadius: 6, fontWeight: 600,
              }}>応募する</span>
            </div>
          </div>
        ))}
      </div>
      <BottomNav active="新着求人" onNavigate={onNavigate} />
    </>
  );
}

function ScreenMessages({ onNavigate }) {
  const msgs = [
    { co: "ケアハウスさくら", preview: "面接日程の候補をお送りしました。", time: "14:30", unread: true, status: "面接案内" },
    { co: "サンプル建設", preview: "AI面談の結果を確認しています。", time: "昨日", unread: false, status: "企業確認中" },
    { co: "ABC歯科", preview: "スカウトへのご応諾ありがとうございます。", time: "4/3", unread: false, status: "面談済み" },
  ];
  return (
    <>
      <Header title="やりとり" />
      <div style={{ flex: 1, padding: "8px 16px", overflow: "auto" }}>
        {msgs.map((m, i) => (
          <div key={i} style={{
            background: "#fff", borderRadius: 12, padding: 14, marginBottom: 8,
            border: "1px solid #E8E6E1", cursor: "pointer",
            display: "flex", gap: 12, alignItems: "flex-start",
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10, background: "#F7F6F3", flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
            }}>🏢</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a" }}>{m.co}</div>
                <div style={{ fontSize: 11, color: "#8C8A82" }}>{m.time}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <Tag color={m.status === "面接案内" ? "green" : m.status === "企業確認中" ? "blue" : "purple"}>{m.status}</Tag>
              </div>
              <div style={{
                fontSize: 12, color: "#5F5E5A", overflow: "hidden",
                textOverflow: "ellipsis", whiteSpace: "nowrap",
              }}>{m.preview}</div>
            </div>
            {m.unread && <div style={{
              width: 8, height: 8, borderRadius: 4, background: "#E8593C", flexShrink: 0, marginTop: 6,
            }} />}
          </div>
        ))}
      </div>
      <BottomNav active="やりとり" onNavigate={onNavigate} />
    </>
  );
}

function ScreenMyPage({ onNavigate }) {
  return (
    <>
      <Header title="マイページ" />
      <div style={{ flex: 1, padding: "16px 20px", overflow: "auto" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 14, marginBottom: 20,
          background: "#fff", borderRadius: 14, padding: 16,
          border: "1px solid #E8E6E1",
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: 28, background: "linear-gradient(135deg, #E8593C, #FAC775)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontSize: 20, fontWeight: 800,
          }}>山</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#1a1a1a" }}>山田 太郎</div>
            <div style={{ fontSize: 12, color: "#5F5E5A" }}>東京都 ・ 25歳</div>
          </div>
        </div>
        {[
          { icon: "✏️", label: "プロフィール編集", desc: "基本情報・写真・Q&Aの編集" },
          { icon: "🔔", label: "通知設定", desc: "SMS・メール通知のON/OFF" },
          { icon: "👤", label: "アカウント情報", desc: "電話番号・メールアドレス" },
          { icon: "📄", label: "利用規約", desc: "" },
          { icon: "🔒", label: "プライバシーポリシー", desc: "" },
          { icon: "🚪", label: "ログアウト", desc: "" },
          { icon: "⚠️", label: "退会", desc: "" },
        ].map((item, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "13px 0", borderBottom: i < 6 ? "1px solid #F1EFE8" : "none",
            cursor: "pointer",
          }}>
            <span style={{ fontSize: 18 }}>{item.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: 14, fontWeight: 600,
                color: item.label === "退会" ? "#E24B4A" : "#1a1a1a",
              }}>{item.label}</div>
              {item.desc && <div style={{ fontSize: 11, color: "#8C8A82" }}>{item.desc}</div>}
            </div>
            <span style={{ fontSize: 14, color: "#D3D1C7" }}>›</span>
          </div>
        ))}
      </div>
      <BottomNav active="マイページ" onNavigate={onNavigate} />
    </>
  );
}

// ========== MAIN APP ==========

const SCREEN_MAP = {
  "CSホーム": ScreenCSHome,
  "CS求人詳細": ScreenCSJobDetail,
  "会員登録誘導": ScreenSignupPrompt,
  "SMS認証": ScreenSMS,
  "基本情報": ScreenBasicInfo,
  "基本Q&A": ScreenBasicQA,
  "設問Q&A": ScreenClientQA,
  "敬語変換確認": ScreenKeigoReview,
  "写真": ScreenPhoto,
  "登録完了": ScreenComplete,
  "ホーム(フリック)": ScreenFlick,
  "スカウト詳細": ScreenScoutDetail,
  "求人詳細": ScreenJobDetail,
  "AI面談": ScreenAIInterview,
  "面談完了": ScreenInterviewDone,
  "スカウト履歴": ScreenHistory,
  "日程調整": ScreenSchedule,
  "新着求人": ScreenJobs,
  "やりとり": ScreenMessages,
  "マイページ": ScreenMyPage,
};

export default function JobseekerMock({ onBack }) {
  const [current, setCurrent] = useState("CSホーム");
  const [phase, setPhase] = useState("CS(未登録)");
  const ScreenComponent = SCREEN_MAP[current];

  return (
    <div style={{
      minHeight: "100vh", background: "#F0EFEB",
      fontFamily: "'Noto Sans JP', 'Hiragino Sans', sans-serif",
    }}>
      {/* Back button */}
      {onBack && <div style={{ textAlign: "center", marginBottom: 4 }}><button onClick={onBack} style={{ padding: "4px 14px", borderRadius: 16, border: "1px solid #D3D1C7", background: "#fff", color: "#5F5E5A", fontSize: 12, cursor: "pointer" }}>← トップに戻る</button></div>}
      {/* Screen selector */}
      <div style={{
        display: "flex", gap: 8, padding: "16px 16px 8px",
        flexWrap: "wrap", justifyContent: "center",
      }}>
        {Object.entries(PHASES).map(([p, screens]) => (
          <button key={p} onClick={() => { setPhase(p); setCurrent(screens[0]); }} style={{
            padding: "6px 16px", borderRadius: 20, border: "none",
            background: phase === p ? "#E8593C" : "#fff",
            color: phase === p ? "#fff" : "#5F5E5A",
            fontSize: 13, fontWeight: 600, cursor: "pointer",
            boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
          }}>{p}</button>
        ))}
      </div>

      {/* Screen tabs */}
      <div style={{
        display: "flex", gap: 4, padding: "4px 16px 12px",
        overflowX: "auto", justifyContent: "center", flexWrap: "wrap",
      }}>
        {PHASES[phase].map(s => (
          <button key={s} onClick={() => setCurrent(s)} style={{
            padding: "4px 10px", borderRadius: 6, border: "none",
            background: current === s ? "#1a1a1a" : "transparent",
            color: current === s ? "#fff" : "#8C8A82",
            fontSize: 11, fontWeight: current === s ? 700 : 400,
            cursor: "pointer", whiteSpace: "nowrap",
          }}>{s}</button>
        ))}
      </div>

      {/* Phone */}
      <div style={{ display: "flex", justifyContent: "center", paddingBottom: 32 }}>
        <Phone>
          <ScreenComponent onNavigate={(s) => {
            setCurrent(s);
            for (const [p, screens] of Object.entries(PHASES)) {
              if (screens.includes(s)) { setPhase(p); break; }
            }
          }} />
        </Phone>
      </div>
    </div>
  );
}
