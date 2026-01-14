// daftar kota dan rute populer tetap sama
const cities = [
  "Jakarta", "Bandung", "Yogyakarta", "Surabaya", "Malang", "Semarang", "Solo", "Bogor", "Depok"
];

const popularRoutes = [
  { from: "Jakarta", to: "Bandung" },
  { from: "Jakarta", to: "Yogyakarta" },
  { from: "Surabaya", to: "Malang" },
];

const originSelect = document.getElementById("origin");
const destinationSelect = document.getElementById("destination");
const popularList = document.getElementById("popularList");
const recentList = document.getElementById("recentList");
const resultsArea = document.getElementById("resultsArea");
const form = document.getElementById("searchForm");
const resetBtn = document.getElementById("resetBtn");

function populateCityOptions() {
  cities.forEach(city => {
    const o1 = document.createElement("option");
    o1.value = city;
    o1.textContent = city;
    originSelect.appendChild(o1);

    const o2 = document.createElement("option");
    o2.value = city;
    o2.textContent = city;
    destinationSelect.appendChild(o2);
  });
}

populateCityOptions();

popularRoutes.forEach(r => {
  const b = document.createElement("button");
  b.className = "pill";
  b.type = "button";
  b.textContent = `${r.from} → ${r.to}`;
  b.onclick = () => {
    originSelect.value = r.from;
    destinationSelect.value = r.to;
  };
  popularList.appendChild(b);
});

form.addEventListener("submit", e => {
  e.preventDefault();
  const from = originSelect.value.trim();
  const to = destinationSelect.value.trim();
  const date = document.getElementById("departDate").value;
  const pass = document.getElementById("passengers").value;

  if (!from || !to || !date || !pass) return;

  const li = document.createElement("li");
  li.textContent = `${from} → ${to} • ${date} • ${pass} penumpang`;
  li.onclick = () => {
    const parts = li.textContent.split(" • ");
    const citiesPart = parts[0].split(" → ");
    originSelect.value = citiesPart[0].trim();
    destinationSelect.value = citiesPart[1].trim();
    document.getElementById("departDate").value = parts[1].trim();
    document.getElementById("passengers").value = parts[2].split(" ")[0];
  };

  if (recentList.children.length === 1 && recentList.children[0].textContent.includes("Belum")) {
    recentList.innerHTML = "";
  }
  recentList.prepend(li);

  resultsArea.innerHTML = "";
  const ops = ["MegaBus", "Jaya Express"];
  ops.forEach((op, i) => {
    const priceNumber = 100000 + i * 25000;
    const price = priceNumber.toLocaleString();
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="top">
        <div><div class="op">${op}</div><div class="meta">${from} → ${to}</div></div>
        <div style="text-align:right"><div class="price">Rp ${price}</div>
        <div class="meta">08:0${i} • 3 jam</div></div>
      </div>
      <div class="meta">Tanggal: ${date} • ${pass} penumpang</div>
    `;

    card.addEventListener("click", () => {
      const params = new URLSearchParams({
        operator: op,
        from: from,
        to: to,
        date: date,
        passengers: pass,
        price: priceNumber.toString(),
        time: `08:0${i}`
      });
      window.location.href = `../detail/detail.html?${params.toString()}`;
    });

    resultsArea.appendChild(card);
  });
});

resetBtn.addEventListener("click", () => {
  form.reset();
  resultsArea.innerHTML = "";
  originSelect.selectedIndex = 0;
  destinationSelect.selectedIndex = 0;
});