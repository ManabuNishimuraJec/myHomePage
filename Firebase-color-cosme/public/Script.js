const SHEET_URL = "https://opensheet.elk.sh/1br0zYOgBUiwHZdllU1G_tBWoU9v41HzaZEEYaBebtx0/Sheet1";
const container = document.getElementById("product-container");
const colorSelect = document.getElementById("colorSelect");
const typeSelect = document.getElementById("typeSelect");

async function loadProducts(color, type) {
    container.innerHTML = "<p>読み込み中...</p>";

    try {
        const res = await fetch(SHEET_URL);
        const data = await res.json();

        const filtered = data.filter(item => {
            const matchColor = item.color.toLowerCase() === color;
            const matchType = type === "all" || item.type?.toLowerCase() === type;
            return matchColor && matchType;
        });

        container.innerHTML = "";

        if (filtered.length === 0) {
            container.innerHTML = "<p>該当する商品がありません。</p>";
            return;
        }

        filtered.forEach(item => {
            const card = document.createElement("div");
            card.className = "product-card";
            card.innerHTML = `
        <a href="${item.link}" target="_blank">
          <img src="${item.image}" alt="${item.name}">
        </a>
        <h3>${item.name}</h3>
      `;
            container.appendChild(card);
        });

    } catch (err) {
        console.error("読み込みエラー:", err);
        container.innerHTML = "<p>読み込みに失敗しました。</p>";
    }
}

// 初期表示（spring, all）
loadProducts("spring", "all");

// イベントリスナー
colorSelect.addEventListener("change", () => {
    loadProducts(colorSelect.value, typeSelect.value);
});
typeSelect.addEventListener("change", () => {
    loadProducts(colorSelect.value, typeSelect.value);
});