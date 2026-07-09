from langchain_groq import ChatGroq
from langgraph.graph import StateGraph, END
from typing import TypedDict
from dotenv import load_dotenv
import os

from tools import log_interaction

load_dotenv()

llm = ChatGroq(
    model=os.getenv("MODEL_NAME"),
    api_key=os.getenv("GROQ_API_KEY")
)


class GraphState(TypedDict):
    user_input: str
    result: str


def router(state: GraphState):

    return {
        "result": log_interaction(state["user_input"])
    }


builder = StateGraph(GraphState)

builder.add_node("router", router)

builder.set_entry_point("router")

builder.add_edge("router", END)

graph = builder.compile()