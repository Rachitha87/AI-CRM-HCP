# AI-First CRM HCP Module

An AI-powered CRM module for Healthcare Professional (HCP) interaction management built using React, FastAPI, LangGraph, and Groq LLM.

---

## Features

- Log HCP interactions
- AI-generated CRM summary
- AI entity extraction
- AI follow-up recommendations
- Edit interaction using AI
- Save interactions to database
- Update/Delete interactions
- Export interaction data
- Speech-to-text support

---

## Tech Stack

### Frontend
- React
- Redux
- Vite

### Backend
- Python
- FastAPI
- SQLAlchemy
- SQLite

### AI
- LangGraph
- Groq LLM
- LangChain

---

## LangGraph Tools

### 1. Log Interaction
Converts doctor conversations into structured CRM interaction logs.

### 2. Summarize Interaction
Generates concise summaries from conversations or notes.

### 3. Extract Entities
Extracts doctor name, hospital, products, disease, medicines, etc.

### 4. Edit Interaction
Improves grammar and rewrites interaction notes professionally.

### 5. Follow-up Generator
Suggests recommended follow-up actions after an interaction.

---

## Project Structure

```
AI-CRM-HCP
│
├── backend
│   ├── app.py
│   ├── graph.py
│   ├── tools.py
│   ├── models.py
│   ├── database.py
│
└── frontend
    ├── src
    ├── components
    ├── pages
```

---

## Installation

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn app:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## AI Workflow

1. User enters HCP interaction.
2. LangGraph selects the appropriate tool.
3. Groq LLM analyzes the interaction.
4. Structured CRM summary is generated.
5. Follow-up recommendations are displayed.
6. Interaction is saved into the database.

---

## Author

Rachitha H M