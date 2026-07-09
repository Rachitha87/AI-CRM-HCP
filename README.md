# AI-First CRM HCP Module

An AI-powered Customer Relationship Management (CRM) application for Healthcare Professionals (HCPs). This application enables medical representatives to record HCP interactions using either structured form inputs or conversational AI. The system leverages **LangGraph** and **Groq LLM** to intelligently summarize conversations, extract important entities, generate CRM logs, recommend follow-up actions, and assist in editing interaction notes.

---

# Project Objective

The objective of this project is to build an AI-first CRM module that helps pharmaceutical field representatives efficiently capture and manage interactions with healthcare professionals.

The system combines:

- React Frontend
- FastAPI Backend
- LangGraph AI Agent
- Groq LLM
- SQLite Database

---

# Features

### CRM Features

- Log HCP interactions
- Structured interaction form
- Conversational AI assistant
- Save interactions
- Edit interactions
- Delete interactions
- Search HCP interactions
- Export interaction data
- Material management
- Sample management
- File attachment support

### AI Features

- AI-generated CRM Summary
- AI Entity Extraction
- AI Follow-up Suggestions
- AI Interaction Editing
- AI Conversation Logging

---

# Tech Stack

## Frontend

- React
- Vite
- JavaScript
- CSS

## Backend

- Python
- FastAPI
- SQLAlchemy

## AI

- LangGraph
- LangChain
- Groq LLM

## Database

- SQLite

---

# Project Structure

```
AI-CRM-HCP
│
├── backend
│   ├── app.py
│   ├── database.py
│   ├── graph.py
│   ├── models.py
│   ├── prompts.py
│   ├── state.py
│   ├── tools.py
│   ├── requirements.txt
│   ├── .env
│   └── crm.db
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# LangGraph Workflow

```
User

↓

React Frontend

↓

FastAPI Backend

↓

LangGraph

↓

Groq LLM

↓

AI Tools

↓

Structured CRM Response

↓

SQLite Database
```

---

# LangGraph AI Tools

The application uses five AI tools implemented using LangGraph.

## 1. Log Interaction

Converts a doctor's conversation into a structured CRM interaction log.

### Example

Input

```
Dr. Anil Kumar discussed CardioX.
Requested brochure.
Requested 10 samples.
Positive response.
```

Output

- Doctor
- Product
- Sentiment
- Outcome
- Follow-up
- CRM Summary

---

## 2. Summarize Interaction

Creates a concise professional summary of the doctor's interaction.

---

## 3. Extract Entities

Extracts important information such as

- Doctor Name
- Hospital
- Medicine
- Disease
- Product

---

## 4. Edit Interaction

Improves grammar and rewrites interaction notes professionally.

---

## 5. Follow-up Recommendation

Suggests intelligent follow-up activities based on the conversation.

Examples

- Send Product Brochure
- Arrange Samples
- Schedule Follow-up Visit
- Share Clinical Study

---

# Prerequisites

Install the following software before running the project.

- Python 3.11 or above
- Node.js 20+
- npm
- Git
- Visual Studio Code (Recommended)

Verify installation

```bash
python --version
```

```bash
node -v
```

```bash
npm -v
```

```bash
git --version
```

---

# Clone Repository

```bash
git clone https://github.com/Rachitha87/AI-CRM-HCP.git
```

Go to project folder

```bash
cd AI-CRM-HCP
```

---

# Backend Setup

Go to backend

```bash
cd backend
```

Create Virtual Environment

```bash
python -m venv venv
```

Activate Virtual Environment

### Windows

```bash
venv\Scripts\activate
```

### Linux / Mac

```bash
source venv/bin/activate
```

Upgrade pip

```bash
python -m pip install --upgrade pip
```

Install Python dependencies

```bash
pip install -r requirements.txt
```

---

# Environment Variables

Create a file named

```
.env
```

inside the backend folder.

Add

```
GROQ_API_KEY=YOUR_GROQ_API_KEY
MODEL_NAME=llama-3.3-70b-versatile
```

---

# Run Backend

```bash
python -m uvicorn app:app --reload
```

Backend URL

```
http://127.0.0.1:8000
```

Swagger Documentation

```
http://127.0.0.1:8000/docs
```

---

# Frontend Setup

Open a new terminal.

Go to frontend

```bash
cd frontend
```

Install packages

```bash
npm install
```

Run React application

```bash
npm run dev
```

Frontend URL

```
http://localhost:5173
```

---

# Database

Database Used

```
SQLite
```

Database File

```
crm.db
```

The database is automatically created when the backend starts.

---

# API Endpoints

| Method | Endpoint | Description |
|----------|---------------------------|-----------------------------|
| GET | / | Backend Status |
| POST | /ask | AI Assistant |
| POST | /save | Save Interaction |
| GET | /interactions | View Saved Interactions |
| PUT | /interaction/{id} | Update Interaction |
| DELETE | /interaction/{id} | Delete Interaction |

---

# Application Workflow

1. User enters interaction details manually or through conversation.
2. LangGraph receives the interaction.
3. Appropriate AI tool is selected.
4. Groq LLM analyzes the interaction.
5. CRM information is generated.
6. Follow-up suggestions are created.
7. User reviews the AI output.
8. Interaction is saved into SQLite.
9. User can edit, delete, or view previous interactions.

---

# Sample AI Output

The AI Assistant generates:

- Three-line interaction summary
- Doctor details
- Product discussed
- Materials shared
- Samples requested
- Sentiment
- Outcome
- Recommended follow-up actions

---

# Future Enhancements

- User Authentication
- Multi-user CRM
- PostgreSQL Support
- Dashboard Analytics
- Voice Recording Upload
- PDF Report Generation
- Email Notifications
- AI Analytics Dashboard

---

# Troubleshooting

## Backend not starting

Activate virtual environment

```bash
venv\Scripts\activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run backend

```bash
python -m uvicorn app:app --reload
```

---

## Frontend not starting

Install dependencies

```bash
npm install
```

Run

```bash
npm run dev
```

---

## API Key Error

Check the `.env` file.

Ensure the following variables are configured correctly.

```
GROQ_API_KEY=YOUR_GROQ_API_KEY
MODEL_NAME=llama-3.3-70b-versatile
```

---

# Author

**Rachitha H M**

Master of Computer Applications (MCA)

AI-First CRM HCP Module Assignment

---

# License

This project was developed as part of a technical assessment for educational and evaluation purposes.