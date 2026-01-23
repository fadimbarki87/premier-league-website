const API_URL = "https://premier-league-agent.onrender.com/ask";

async function askAgent() {
  const input = document.getElementById("question");
  const messages = document.getElementById("messages");
  const question = input.value.trim();

  if (!question) return;

  messages.innerHTML += `<p><strong>You:</strong> ${question}</p>`;
  input.value = "";
  messages.scrollTop = messages.scrollHeight;

  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question })
  });

  const data = await response.json();
  messages.innerHTML += `<p><strong>Agent:</strong> ${data.answer}</p>`;
  messages.scrollTop = messages.scrollHeight;
}

// ===== TABLE =====

fetch("premier_league_players.csv")
  .then(r => r.text())
  .then(text => loadTable(text));

function loadTable(csv) {
  const rows = csv.split("\n").map(r => r.split(","));
  const thead = document.querySelector("#playersTable thead");
  const tbody = document.querySelector("#playersTable tbody");

  thead.innerHTML = "<tr>" + rows[0].map(h => `<th>${h}</th>`).join("") + "</tr>";

  rows.slice(1).forEach(r => {
    if (r.length > 1) {
      tbody.innerHTML += "<tr>" + r.map(c => `<td>${c}</td>`).join("") + "</tr>";
    }
  });
}

function filterTable() {
  const q = document.getElementById("search").value.toLowerCase();
  document.querySelectorAll("#playersTable tbody tr").forEach(row => {
    row.style.display = row.innerText.toLowerCase().includes(q) ? "" : "none";
  });
}
