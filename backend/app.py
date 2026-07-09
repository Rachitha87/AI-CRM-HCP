

from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session

from database import engine, Base, get_db
from models import Interaction
from graph import graph

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI CRM HCP Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Prompt(BaseModel):
    text: str


class InteractionData(BaseModel):
    hcp_name: str
    interaction_type: str
    date: str
    time: str
    attendees: str
    topics: str
    materials: str
    samples: str
    sentiment: str
    outcomes: str
    follow_up: str
    ai_response: str
    attachment: str


@app.get("/")
def home():
    return {
        "message": "AI CRM Backend Running Successfully"
    }


@app.post("/ask")
def ask_ai(prompt: Prompt):

    result = graph.invoke(
        {
            "user_input": prompt.text
        }
    )

    return {
        "response": result["result"]
    }
    # Print the raw AI response
    print("\n========== AI RESPONSE ==========")
    print(result["result"])
    print("=================================\n")

    try:
        data = json.loads(result["result"])
        return data

    except Exception as e:
        print("JSON ERROR:", e)
        raise HTTPException(
            status_code=500,
            detail="AI returned invalid JSON."
        )

    try:
        data = json.loads(result["result"])
        return data

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="AI returned invalid JSON."
        )

@app.post("/save")
def save_interaction(
    data: InteractionData,
    db: Session = Depends(get_db)
):

    interaction = Interaction(
        hcp_name=data.hcp_name,
        interaction_type=data.interaction_type,
        date=data.date,
        time=data.time,
        attendees=data.attendees,
        topics=data.topics,
        materials=data.materials,
        samples=data.samples,
        sentiment=data.sentiment,
        outcomes=data.outcomes,
        follow_up=data.follow_up,
        ai_response=data.ai_response,
        attachment=data.attachment,
    )

    db.add(interaction)
    db.commit()
    db.refresh(interaction)

    return {
        "message": "Interaction Saved Successfully",
        "id": interaction.id
    }


@app.get("/interactions")
def get_interactions(db: Session = Depends(get_db)):
    return db.query(Interaction).all()
@app.delete("/interaction/{interaction_id}")
def delete_interaction(
    interaction_id: int,
    db: Session = Depends(get_db)
):
    interaction = (
        db.query(Interaction)
        .filter(Interaction.id == interaction_id)
        .first()
    )

    if not interaction:
        return {
            "message": "Interaction not found"
        }

    db.delete(interaction)
    db.commit()

    return {
        "message": "Deleted Successfully"
    }
@app.put("/interaction/{interaction_id}")
def update_interaction(
    interaction_id: int,
    data: InteractionData,
    db: Session = Depends(get_db)
):

    interaction = (
        db.query(Interaction)
        .filter(Interaction.id == interaction_id)
        .first()
    )

    if not interaction:
        return {
            "message": "Interaction not found"
        }

    interaction.hcp_name = data.hcp_name
    interaction.interaction_type = data.interaction_type
    interaction.date = data.date
    interaction.time = data.time
    interaction.attendees = data.attendees
    interaction.topics = data.topics
    interaction.materials = data.materials
    interaction.samples = data.samples
    interaction.sentiment = data.sentiment
    interaction.outcomes = data.outcomes
    interaction.follow_up = data.follow_up
    interaction.ai_response = data.ai_response
    interaction.attachment = data.attachment

    db.commit()

    return {
        "message": "Updated Successfully"
    }