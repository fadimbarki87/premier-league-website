const API_URL = "https://premier-league-agent.onrender.com/ask";

let allRows = [];

/* ================= CHAT ================= */

async function askAgent() {
  const input = document.getElementById("question");
  const messages = document.getElementById("messages");

  const question = input.value.trim();
  if (!question) return;

  messages.innerHTML += `<div><b>You:</b> ${question}</div>`;
  input.value = "";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });

    const data = await response.json();
    messages.innerHTML += `<div><b>Agent:</b> ${data.answer}</div>`;
  } catch (err) {
    messages.innerHTML += `<div style="color:red;"><b>Error:</b> ${err}</div>`;
  }
}

/* ================= TABLE ================= */

async function loadTable() {
  const response = await fetch("premier_league_players.csv");
  const text = await response.text();

  const rows = text.trim().split("\n").map(r => r.split(","));
  const table = document.getElementById("playersTable");
  const thead = table.querySelector("thead");
  const tbody = table.querySelector("tbody");

  const headers = rows[0];
  allRows = rows.slice(1);

  /* Header */
  thead.innerHTML =
    "<tr>" + headers.map(h => `<th>${h}</th>`).join("") + "</tr>";

  renderRows(allRows);
}

function renderRows(rows) {
  const tbody = document.querySelector("#playersTable tbody");
  tbody.innerHTML = "";

  rows.forEach(r => {
    tbody.innerHTML +=
      "<tr>" + r.map(c => `<td>${c}</td>`).join("") + "</tr>";
  });
}

function filterTable() {
  const q = document.getElementById("search").value.toLowerCase();

  const filtered = allRows.filter(r =>
    r.join(" ").toLowerCase().includes(q)
  );

  renderRows(filtered);
}

/* AUTO LOAD TABLE */
window.onload = loadTable;
