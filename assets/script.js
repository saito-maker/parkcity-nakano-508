/* =========================================================
   ギャラリーのデータ
   写真を増減・並べ替えしたいときは、この配列を編集してください。
   { src:"画像ファイル", cap:"キャプション" }
   ========================================================= */
const SECTIONS = [
  {
    id: "exterior", en: "EXTERIOR", title: "外観",
    items: [
      { src: "ext-01.jpg", cap: "外観（タワー）" },
      { src: "ext-02.jpg", cap: "館銘板" },
      { src: "ext-03.jpg", cap: "館内ショップ案内" },
    ],
  },
  {
    id: "entrance", en: "ENTRANCE", title: "エントランス・EVホール",
    items: [
      { src: "entrance-01.jpg", cap: "エントランスロビー" },
      { src: "entrance-02.jpg", cap: "エントランス" },
      { src: "entrance-03.jpg", cap: "内廊下" },
    ],
  },
  {
    id: "living", en: "LIVING", title: "リビング・ダイニング",
    items: [
      { src: "living-01.jpg", cap: "リビング・ダイニング" },
      { src: "living-02.jpg", cap: "リビングよりキッチン方向" },
    ],
  },
  {
    id: "kitchen", en: "KITCHEN", title: "キッチン",
    items: [
      { src: "kitchen-01.jpg", cap: "システムキッチン" },
      { src: "kitchen-02.jpg", cap: "キッチン" },
      { src: "kitchen-03.jpg", cap: "ガスコンロ" },
      { src: "kitchen-04.jpg", cap: "レンジフード" },
      { src: "kitchen-05.jpg", cap: "カップボード" },
      { src: "kitchen-06.jpg", cap: "カップボード" },
    ],
  },
  {
    id: "genkan", en: "ENTRY", title: "玄関",
    items: [
      { src: "genkan-01.jpg", cap: "玄関" },
      { src: "genkan-02.jpg", cap: "シューズボックス" },
    ],
  },
  {
    id: "room", en: "ROOM", title: "洋室・収納",
    items: [
      { src: "room-01.jpg", cap: "洋室" },
      { src: "room-02.jpg", cap: "洋室（クローゼット）" },
      { src: "room-03.jpg", cap: "クローゼット" },
      { src: "room-04.jpg", cap: "クローゼット" },
      { src: "room-05.jpg", cap: "サービスルーム" },
    ],
  },
  {
    id: "sanitary", en: "SANITARY", title: "水まわり（洗面・浴室・トイレ）",
    items: [
      { src: "sanitary-01.jpg", cap: "洗面化粧台" },
      { src: "sanitary-02.jpg", cap: "洗面室" },
      { src: "sanitary-03.jpg", cap: "洗面室" },
      { src: "sanitary-08.jpg", cap: "浴室" },
      { src: "sanitary-09.jpg", cap: "トイレ" },
      { src: "sanitary-07.jpg", cap: "洗濯機置場" },
      { src: "sanitary-04.jpg", cap: "洗面室収納" },
      { src: "sanitary-05.jpg", cap: "収納" },
      { src: "sanitary-06.jpg", cap: "収納" },
    ],
  },
  {
    id: "common", en: "COMMON AREA", title: "共用部",
    items: [
      { src: "common-01.jpg", cap: "ラウンジ" },
      { src: "common-02.jpg", cap: "ゲストルーム" },
      { src: "common-03.jpg", cap: "ライブラリー" },
      { src: "common-04.jpg", cap: "ライブラリー／キッズ" },
      { src: "common-05.jpg", cap: "フィットネスジム" },
      { src: "common-06.jpg", cap: "フィットネスジム" },
      { src: "common-07.jpg", cap: "ランドリー" },
      { src: "common-08.jpg", cap: "駐輪場" },
      { src: "common-09.jpg", cap: "駐輪場" },
      { src: "common-10.jpg", cap: "駐輪場・EVホール" },
      { src: "common-11.jpg", cap: "レンタサイクル" },
      { src: "common-12.jpg", cap: "駐車場" },
      { src: "common-13.jpg", cap: "バイク置場" },
    ],
  },
  {
    id: "rooftop", en: "ROOFTOP", title: "屋上",
    items: [
      { src: "rooftop-01.jpg", cap: "スカイテラス（眺望）" },
      { src: "rooftop-02.jpg", cap: "スカイテラス" },
      { src: "rooftop-03.jpg", cap: "ルーフガーデン" },
    ],
  },
];

/* ===== ギャラリー描画 ===== */
const root = document.getElementById("gallery-root");
const flat = []; // ライトボックス用の全画像リスト

SECTIONS.forEach((sec) => {
  const section = document.createElement("section");
  section.className = "section";
  section.id = sec.id;
  section.innerHTML = `
    <div class="section-head">
      <p class="sec-en">${sec.en}</p>
      <h2>${sec.title}</h2>
    </div>
    <div class="gallery-grid"></div>`;
  const grid = section.querySelector(".gallery-grid");

  sec.items.forEach((it) => {
    const idx = flat.length;
    flat.push(it);
    const fig = document.createElement("div");
    fig.className = "g-item";
    fig.dataset.idx = idx;
    fig.innerHTML = `
      <img src="assets/img/${it.src}" alt="${it.cap}" loading="lazy">
      <span class="g-cap">${it.cap}</span>`;
    grid.appendChild(fig);
  });
  root.appendChild(section);
});

/* ===== ライトボックス ===== */
const lb = document.getElementById("lightbox");
const lbImg = lb.querySelector("img");
const lbCap = lb.querySelector(".lb-caption");
let current = 0;

function showLB(i) {
  current = (i + flat.length) % flat.length;
  const it = flat[current];
  lbImg.src = "assets/img/" + it.src;
  lbImg.alt = it.cap;
  lbCap.textContent = it.cap;
  lb.classList.add("open");
  lb.setAttribute("aria-hidden", "false");
}
function closeLB() {
  lb.classList.remove("open");
  lb.setAttribute("aria-hidden", "true");
}

root.addEventListener("click", (e) => {
  const item = e.target.closest(".g-item");
  if (item) showLB(Number(item.dataset.idx));
});
lb.querySelector(".lb-close").addEventListener("click", closeLB);
lb.querySelector(".lb-next").addEventListener("click", () => showLB(current + 1));
lb.querySelector(".lb-prev").addEventListener("click", () => showLB(current - 1));
lb.addEventListener("click", (e) => { if (e.target === lb) closeLB(); });
document.addEventListener("keydown", (e) => {
  if (!lb.classList.contains("open")) return;
  if (e.key === "Escape") closeLB();
  if (e.key === "ArrowRight") showLB(current + 1);
  if (e.key === "ArrowLeft") showLB(current - 1);
});

/* ===== モバイルメニュー ===== */
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
nav.addEventListener("click", (e) => {
  if (e.target.tagName === "A") { nav.classList.remove("open"); toggle.setAttribute("aria-expanded", false); }
});
