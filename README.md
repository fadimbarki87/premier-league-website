# Premier League Question Answering Website

This repository contains a minimal static frontend for the Premier League Question Answering Agent.
It provides a simple web interface to interact with the backend API.

The website is built with plain HTML, CSS, and JavaScript and is hosted using GitHub Pages.

---

## What This Project Does

- Provides a browser-based UI to ask natural-language questions about Premier League players
- Sends user questions to a FastAPI backend
- Displays structured, factual answers returned by the API

---

## Tech Stack

- HTML
- CSS
- JavaScript (vanilla)
- GitHub Pages (hosting)

---

## Live Demo

- Website: https://fadimbarki87.github.io/premier-league-website/
- Backend API: https://premier-league-agent.onrender.com

---

## How It Works

- `index.html` defines the page structure
- `style.css` handles layout and styling
- `script.js` sends requests to the backend API and renders responses
- Images are included as static assets

---

## Follow-Up Questions (Conversation Context)

The frontend supports conversational follow-up questions within a single browser session.

A user can ask an initial question about a player and then continue with short follow-ups
without repeating the player name.

Example:
- "What is Mohamed Salah’s religion?"
- "And his preferred foot?"
- "And his club?"

The conversation context is maintained for the duration of the session.
Refreshing the page starts a new conversation.


---

## Notes

- This frontend is intentionally simple and framework-free.
- All application logic and data validation live in the backend.
