const API_URL = "https://premier-league-agent.onrender.com/ask";
const CSV_URL = "premier_league_players.csv";

/* ===== CHAT ===== */

async function askAgent() {
  const input = document.getElementById("question");
  const messages = document.getElementById("messages");

  const question = input.value.trim();
  if (!question) return;

  messages.innerHTML += `<div><b>You:</b> ${question}</div>`;
  input.value = "";
  messages.scrollTop = messages.scrollHeight;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });

    const data = await response.json();
    messages.innerHTML += `<div><b>Agent:</b> ${data.answer}</div>`;
    messages.scrollTop = messages.scrollHeight;
  } catch (err) {
    messages.innerHTML += `<div style="color:red;"><b>Error:</b> ${err}</div>`;
  }
}

/* ENTER KEY SUPPORT (desktop + mobile) */
function handleEnter(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    askAgent();
  }
}

/* ===== TABLE ===== */

async function loadTable() {
  const res = await fetch(CSV_URL);
  const text = await res.text();

  const rows = text.trim().split("\n").map(r => r.split(","));
  const thead = document.querySelector("#playersTable thead");
  const tbody = document.querySelector("#playersTable tbody");

  thead.innerHTML = "";
  tbody.innerHTML = "";

  const headerRow = document.createElement("tr");
  rows[0].forEach(col => {
    const th = document.createElement("th");
    th.textContent = col;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);

  rows.slice(1).forEach(r => {
    const tr = document.createElement("tr");
    r.forEach(cell => {
      const td = document.createElement("td");
      td.textContent = cell;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}

/* SEARCH */
function filterTable() {
  const value = document.getElementById("search").value.toLowerCase();
  document.querySelectorAll("#playersTable tbody tr").forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(value)
      ? ""
      : "none";
  });
}

/* INIT */
window.onload = loadTable;
