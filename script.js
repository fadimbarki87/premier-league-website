const API_URL = "https://premier-league-agent.onrender.com/ask";

async function askAgent() {
  const input = document.getElementById("question");
  const messages = document.getElementById("messages");

  const question = input.value.trim();
  if (!question) return;

  messages.innerHTML += `<div><b>You:</b> ${question}</div>`;
  input.value = "";

  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question })
  });

  const data = await response.json();
  messages.innerHTML += `<div><b>Agent:</b> ${data.answer}</div>`;
  messages.scrollTop = messages.scrollHeight;
}

// LOAD CSV INTO TABLE
fetch("premier_league_players.csv")
  .then(res => res.text())
  .then(text => {
    const rows = text.split("\n").map(r => r.split(","));
    const thead = document.querySelector("thead");
    const tbody = document.querySelector("tbody");

    thead.innerHTML = "<tr>" + rows[0].map(h => `<th>${h}</th>`).join("") + "</tr>";

    rows.slice(1).forEach(row => {
      const tr = document.createElement("tr");
      row.forEach(cell => {
        tr.innerHTML += `<td>${cell}</td>`;
      });
      tbody.appendChild(tr);
    });
  });

function filterTable() {
  const value = document.getElementById("search").value.toLowerCase();
  document.querySelectorAll("tbody tr").forEach(row => {
    const match = row.innerText.toLowerCase().includes(value);
    row.style.display = match ? "" : "none";
    row.classList.toggle("highlight", match && value);
  });
}
