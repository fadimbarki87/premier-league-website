const API_URL = "https://premier-league-agent.onrender.com/ask";

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
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ question })
    });

    const data = await response.json();

    messages.innerHTML += `<div><b>Agent:</b> ${data.answer}</div>`;
  } catch (err) {
    messages.innerHTML += `<div style="color:red;"><b>Error:</b> ${err}</div>`;
  }
}
