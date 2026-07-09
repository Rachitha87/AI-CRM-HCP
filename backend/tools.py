from langchain_groq import ChatGroq
from dotenv import load_dotenv
import os

load_dotenv()

llm = ChatGroq(
    model=os.getenv("MODEL_NAME"),
    api_key=os.getenv("GROQ_API_KEY")
)


def summarize_interaction(text):
    prompt = f"""
Summarize this HCP interaction professionally.

Interaction:
{text}
"""

    return llm.invoke(prompt).content


def extract_entities(text):
    prompt = f"""
Extract the following:

Doctor Name
Hospital
Medicine
Disease
Product

Conversation:

{text}
"""

    return llm.invoke(prompt).content


def follow_up(text):
    prompt = f"""
Suggest professional follow-up actions for this HCP interaction.

{text}
"""

    return llm.invoke(prompt).content


def edit_interaction(old_text, new_text):

    prompt = f"""
Rewrite this interaction professionally.

Old Interaction:

{old_text}

Update:

{new_text}

Return only the updated interaction.
"""

    return llm.invoke(prompt).content


def log_interaction(text):

    prompt = f"""
You are an AI CRM Assistant for Healthcare Professionals (HCP).

Analyze the interaction and create a professional CRM report.

Rules:
- The first section MUST be a 2-3 line Executive Summary.
- The Executive Summary should briefly cover the entire interaction.
- Keep the summary concise and professional.
- Do NOT write long paragraphs.
- After the summary, organize all information into clean CRM sections.
- Use bullets.
- If information is unavailable, write "Not Mentioned".
- Return ONLY the formatted report.

Interaction:

{text}

Return EXACTLY in this format.

══════════════════════════════════════════════
🤖 AI CRM INTERACTION REPORT
══════════════════════════════════════════════

📌 EXECUTIVE SUMMARY
<Write only 2-3 short professional lines covering the complete interaction.>

──────────────────────────────────────────────

👨‍⚕️ HCP DETAILS

Doctor Name :
Hospital :
Interaction Type :
Date :
Time :
Attendees :

──────────────────────────────────────────────

💊 PRODUCT INFORMATION

Product :
Disease / Therapy :
Materials Shared :
Samples Distributed :

──────────────────────────────────────────────

📝 DISCUSSION HIGHLIGHTS

• Point 1

• Point 2

• Point 3

──────────────────────────────────────────────

😊 HCP SENTIMENT

Positive / Neutral / Negative

Reason :
<One short sentence>

──────────────────────────────────────────────

🎯 KEY OUTCOMES

• Outcome 1

• Outcome 2

• Outcome 3

──────────────────────────────────────────────

📅 RECOMMENDED NEXT ACTIONS

✓ Action 1

✓ Action 2

✓ Action 3

──────────────────────────────────────────────

⭐ OVERALL ASSESSMENT

<One professional sentence about the interaction quality.>
"""
    return llm.invoke(prompt).content