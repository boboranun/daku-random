import { useState } from “react”;

const categories = {
color: {
label: “🎨 색상 뽑기”,
items: [
{ name: “베이지 + 테라코타 + 크림”, hex: [”#F5ECD7”, “#C7614A”, “#FFF8F0”] },
{ name: “라벤더 + 민트 + 화이트”, hex: [”#C9B8E8”, “#B2E4D8”, “#FFFFFF”] },
{ name: “머스타드 + 올리브 + 브라운”, hex: [”#E8C840”, “#6B7B3A”, “#7B4F2E”] },
{ name: “피치 + 코랄 + 골드”, hex: [”#FFCBA4”, “#FF6B6B”, “#FFD700”] },
{ name: “네이비 + 크림 + 버건디”, hex: [”#1B2A4A”, “#FFF8F0”, “#800020”] },
{ name: “세이지 + 화이트 + 카키”, hex: [”#B2C5A8”, “#FFFFFF”, “#8B8B6B”] },
{ name: “핑크 + 라일락 + 실버”, hex: [”#FFB7C5”, “#C8A4D4”, “#C0C0C0”] },
{ name: “오렌지 + 옐로우 + 아이보리”, hex: [”#FF8C42”, “#FFD166”, “#FFF3E0”] },
],
tip: (item) => `오늘은 ${item.name} 조합으로 꾸며봐요! 메인 컬러를 가장 많이, 포인트 컬러는 살짝만 써보세요 ✨`,
},
layout: {
label: “📐 레이아웃 뽑기”,
items: [
“사진을 왼쪽에 크게, 오른쪽엔 글씨와 스티커”,
“상단에 제목 크게, 하단에 사진 3장 나란히”,
“대각선으로 요소 배치하기”,
“중앙에 사진 하나, 주변을 스티커로 가득 채우기”,
“두 페이지를 하나처럼 — 양쪽에 걸쳐서 꾸미기”,
“격자(그리드) 형식으로 칸칸이 나눠서 채우기”,
“여백을 많이 두는 미니멀 레이아웃”,
“스크랩북처럼 겹겹이 레이어드하기”,
“상단 1/3은 제목 존, 하단 2/3은 사진 존”,
“모서리 4개에 스티커, 가운데에 텍스트”,
],
tip: (item) => `오늘의 레이아웃: "${item}" — 먼저 연필로 대략 스케치해보고 시작하면 훨씬 쉬워요! 📝`,
},
theme: {
label: “🌿 테마/무드 뽑기”,
items: [
{ name: “Cottagecore 🌾”, desc: “들꽃, 버섯, 자연 소재 느낌” },
{ name: “빈티지 레트로 📻”, desc: “바랜 색감, 클래식한 폰트, 오래된 감성” },
{ name: “미니멀 모던 🤍”, desc: “여백, 단순함, 깔끔한 선” },
{ name: “Y2K 반짝이 💿”, desc: “홀로그램, 메탈릭, 2000년대 감성” },
{ name: “아카데믹 🎓”, desc: “책, 필기, 도서관, 지적인 무드” },
{ name: “동화 속 세계 🧚”, desc: “파스텔, 별, 달, 마법 같은 느낌” },
{ name: “도시 감성 🏙️”, desc: “모노톤, 신문지 스크랩, 어반 무드” },
{ name: “가을 낙엽 🍂”, desc: “브라운, 오렌지, 따뜻하고 포근한 느낌” },
{ name: “바다 여름 🌊”, desc: “블루, 조개, 샌드, 시원한 느낌” },
{ name: “카페 감성 ☕”, desc: “크래프트지, 커피, 따뜻한 갈색 톤” },
],
tip: (item) => `오늘의 테마는 "${item.name}"! ${item.desc}. 이 분위기에 맞는 스티커나 마테를 골라보세요 🎨`,
},
};

const categoryKeys = [“color”, “layout”, “theme”];

export default function DakuApp() {
const [results, setResults] = useState({ color: null, layout: null, theme: null });
const [spinning, setSpinning] = useState({ color: false, layout: false, theme: false });
const [flipped, setFlipped] = useState({ color: false, layout: false, theme: false });

const pick = (key) => {
if (spinning[key]) return;
setSpinning((s) => ({ …s, [key]: true }));
setFlipped((f) => ({ …f, [key]: false }));

```
setTimeout(() => {
  const items = categories[key].items;
  const picked = items[Math.floor(Math.random() * items.length)];
  setResults((r) => ({ ...r, [key]: picked }));
  setSpinning((s) => ({ ...s, [key]: false }));
  setFlipped((f) => ({ ...f, [key]: true }));
}, 700);
```

};

return (
<div style={styles.root}>
{/* grain overlay */}
<div style={styles.grain} />

```
  <header style={styles.header}>
    <div style={styles.headerDeco}>✦</div>
    <h1 style={styles.title}>다꾸 뽑기</h1>
    <p style={styles.subtitle}>막힐 때 눌러봐요 — 오늘의 다꾸를 알려드려요</p>
    <div style={styles.headerDeco}>✦</div>
  </header>

  <main style={styles.main}>
    {categoryKeys.map((key) => {
      const cat = categories[key];
      const result = results[key];
      const isSpin = spinning[key];
      const isFlipped = flipped[key];

      return (
        <section key={key} style={styles.card}>
          <div style={styles.cardInner}>
            <h2 style={styles.cardTitle}>{cat.label}</h2>

            {/* Result area */}
            <div style={{ ...styles.resultBox, opacity: isFlipped && result ? 1 : 0.35 }}>
              {isSpin ? (
                <div style={styles.spinText}>🎲 뽑는 중...</div>
              ) : result ? (
                <div style={styles.resultContent}>
                  {key === "color" && (
                    <>
                      <div style={styles.swatchRow}>
                        {result.hex.map((h, i) => (
                          <div key={i} style={{ ...styles.swatch, background: h }} title={h} />
                        ))}
                      </div>
                      <p style={styles.resultName}>{result.name}</p>
                    </>
                  )}
                  {key === "layout" && (
                    <p style={styles.resultName}>{result}</p>
                  )}
                  {key === "theme" && (
                    <>
                      <p style={styles.resultName}>{result.name}</p>
                      <p style={styles.resultDesc}>{result.desc}</p>
                    </>
                  )}
                  <div style={styles.tipBox}>
                    <span style={styles.tipLabel}>💡 팁</span>
                    <p style={styles.tipText}>{cat.tip(result)}</p>
                  </div>
                </div>
              ) : (
                <p style={styles.emptyText}>버튼을 눌러 뽑아봐요!</p>
              )}
            </div>

            <button
              style={{ ...styles.btn, ...(isSpin ? styles.btnSpin : {}) }}
              onClick={() => pick(key)}
              disabled={isSpin}
            >
              {isSpin ? "🎲 뽑는 중..." : isFlipped ? "🔄 다시 뽑기" : "✨ 뽑기"}
            </button>
          </div>
        </section>
      );
    })}
  </main>

  <footer style={styles.footer}>
    <p>오늘도 즐거운 다꾸 하세요 🌸</p>
  </footer>
</div>
```

);
}

const styles = {
root: {
minHeight: “100vh”,
background: “#FDF6EC”,
fontFamily: “‘Georgia’, ‘Noto Serif KR’, serif”,
position: “relative”,
overflow: “hidden”,
},
grain: {
position: “fixed”,
inset: 0,
backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
pointerEvents: “none”,
zIndex: 0,
opacity: 0.6,
},
header: {
textAlign: “center”,
padding: “48px 24px 24px”,
position: “relative”,
zIndex: 1,
},
headerDeco: {
fontSize: “20px”,
color: “#C7614A”,
marginBottom: “8px”,
},
title: {
fontSize: “clamp(2rem, 6vw, 3.2rem)”,
color: “#3B2A1A”,
margin: “0 0 8px”,
letterSpacing: “0.05em”,
fontWeight: “normal”,
},
subtitle: {
fontSize: “0.95rem”,
color: “#8B6F5A”,
margin: “0 0 8px”,
letterSpacing: “0.03em”,
},
main: {
maxWidth: “480px”,
margin: “0 auto”,
padding: “16px 20px 40px”,
display: “flex”,
flexDirection: “column”,
gap: “24px”,
position: “relative”,
zIndex: 1,
},
card: {
background: “rgba(255,255,255,0.7)”,
borderRadius: “20px”,
border: “1.5px solid #E8D5C0”,
backdropFilter: “blur(8px)”,
overflow: “hidden”,
boxShadow: “0 4px 24px rgba(199,97,74,0.08)”,
},
cardInner: {
padding: “28px 24px 24px”,
},
cardTitle: {
fontSize: “1.05rem”,
color: “#3B2A1A”,
margin: “0 0 16px”,
fontWeight: “normal”,
letterSpacing: “0.04em”,
},
resultBox: {
minHeight: “110px”,
background: “#FFF8F0”,
borderRadius: “14px”,
border: “1px dashed #D4B49A”,
padding: “16px”,
marginBottom: “16px”,
display: “flex”,
alignItems: “center”,
justifyContent: “center”,
transition: “opacity 0.4s ease”,
},
spinText: {
color: “#C7614A”,
fontSize: “1rem”,
fontStyle: “italic”,
},
emptyText: {
color: “#B8977E”,
fontSize: “0.9rem”,
fontStyle: “italic”,
margin: 0,
},
resultContent: {
width: “100%”,
},
swatchRow: {
display: “flex”,
gap: “10px”,
marginBottom: “10px”,
},
swatch: {
width: “36px”,
height: “36px”,
borderRadius: “50%”,
border: “2px solid rgba(255,255,255,0.8)”,
boxShadow: “0 2px 8px rgba(0,0,0,0.1)”,
flexShrink: 0,
},
resultName: {
fontSize: “1rem”,
color: “#3B2A1A”,
margin: “0 0 10px”,
fontWeight: “bold”,
lineHeight: 1.5,
},
resultDesc: {
fontSize: “0.85rem”,
color: “#8B6F5A”,
margin: “0 0 10px”,
fontStyle: “italic”,
},
tipBox: {
background: “rgba(199,97,74,0.07)”,
borderRadius: “10px”,
padding: “10px 12px”,
marginTop: “6px”,
},
tipLabel: {
fontSize: “0.75rem”,
color: “#C7614A”,
fontWeight: “bold”,
letterSpacing: “0.05em”,
display: “block”,
marginBottom: “4px”,
},
tipText: {
fontSize: “0.82rem”,
color: “#5C3D2A”,
margin: 0,
lineHeight: 1.6,
},
btn: {
width: “100%”,
padding: “14px”,
background: “#C7614A”,
color: “#FFF8F0”,
border: “none”,
borderRadius: “14px”,
fontSize: “1rem”,
cursor: “pointer”,
letterSpacing: “0.05em”,
fontFamily: “inherit”,
transition: “background 0.2s, transform 0.1s”,
boxShadow: “0 4px 16px rgba(199,97,74,0.25)”,
},
btnSpin: {
background: “#B8977E”,
cursor: “not-allowed”,
},
footer: {
textAlign: “center”,
padding: “0 0 32px”,
color: “#B8977E”,
fontSize: “0.85rem”,
fontStyle: “italic”,
position: “relative”,
zIndex: 1,
},
};
