const API_URL = "https://premier-league-agent.onrender.com/ask";
const CSV_URL = "premier_league_players.csv";

/* SEND ON ENTER */
function handleEnter(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    askAgent();
  }
}

/* CHAT */
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
    messages.scrollTop = messages.scrollHeight;
  } catch (err) {
    messages.innerHTML += `<div style="color:red;"><b>Error:</b> ${err}</div>`;
  }
}

/* TABLE */
async function loadTable() {
  const res = await fetch(CSV_URL);
  const text = await res.text();

  const rows = text.split("\n").map(r => r.split(","));
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
    if (r.length < 2) return;
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

window.onload = loadTable;
