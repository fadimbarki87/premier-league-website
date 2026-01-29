const API_URL = "https://premier-league-agent.onrender.com";
const CSV_URL = "premier_league_players.csv";

function getSessionId() {
  let sid = sessionStorage.getItem("session_id");
  if (!sid) {
    sid = crypto.randomUUID();
    sessionStorage.setItem("session_id", sid);
  }
  return sid;
}

let SESSION_ID = getSessionId();

function handleEnter(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    askAgent();
  }
}

async function askAgent() {
  const input = document.getElementById("question");
  const messages = document.getElementById("messages");

  const question = input.value.trim();
  if (!question) return;

  messages.innerHTML += `<div><b>You:</b> ${question}</div>`;
  input.value = "";

  try {
    const response = await fetch(`${API_URL}/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        session_id: SESSION_ID,
        question: question
      })
    });

    const data = await response.json();
    messages.innerHTML += `<div><b>Agent:</b> ${data.answer}</div>`;
    messages.scrollTop = messages.scrollHeight;

  } catch (err) {
    messages.innerHTML += `<div style="color:#f87171;"><b>Error:</b> ${err}</div>`;
  }
}

async function resetChat() {
  try {
    await fetch(`${API_URL}/reset?session_id=${SESSION_ID}`, {
      method: "POST"
    });
  } catch (_) {}

  SESSION_ID = crypto.randomUUID();
  sessionStorage.setItem("session_id", SESSION_ID);
  document.getElementById("messages").innerHTML = "";
}

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

function filterTable() {
  const value = document.getElementById("search").value.toLowerCase();
  document.querySelectorAll("#playersTable tbody tr").forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(value)
      ? ""
      : "none";
  });
}

window.onload = loadTable;
