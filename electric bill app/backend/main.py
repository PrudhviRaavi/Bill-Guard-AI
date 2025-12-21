from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from pydantic import BaseModel
from typing import Optional, List
import os
from dotenv import load_dotenv
from openai import OpenAI
import uvicorn

# Load env variables
load_dotenv()

app = FastAPI(title="Electric Bill AI Agent System")

from fastapi.middleware.cors import CORSMiddleware


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all origins for dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize OpenAI Client (OpenRouter)
client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY"),
)

class ScamCheckRequest(BaseModel):
    text_content: str

class AgentResponse(BaseModel):
    agent_name: str
    status: str
    data: dict
    recommendation: Optional[str] = None

@app.get("/")
def read_root():
    return {"message": "AI Electricity Bill Agents are Active"}

@app.post("/api/agents/scam-detector")
def check_scam(request: ScamCheckRequest):
    """
    Agent 1: Scam Detector
    Analyzes SMS or Link text to find fraud patterns.
    """
    try:
        completion = client.chat.completions.create(
            model="anthropic/claude-3-haiku-20240307",
            messages=[
                {
                    "role": "system",
                    "content": "You are an Expert Fraud Detection Agent for Indian Electricity Boards. "
                               "Your job is to analyze the user's text (SMS/Email/Link) and determine if it is a SCAM or GENUINE. "
                               "Return the output in JSON format with keys: 'is_scam' (boolean), 'confidence_score' (0-100), 'reason' (string), 'safety_tips' (list of strings)."
                },
                {"role": "user", "content": f"Analyze this text: {request.text_content}"}
            ],
            response_format={"type": "json_object"} # Ensure JSON
        )
        return {"result": completion.choices[0].message.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Import Agents
from app.agents.bill_parser import analyze_bill_image
from app.agents.tariff_validator import validate_tariff
from app.agents.meter_verifier import verify_meter_reading
from app.agents.savings_recommender import get_savings_tips
from app.agents.complaint_generator import generate_complaint
from app.agents.appliance_efficiency import analyze_appliance_rating
import json

@app.post("/api/agents/analyze-bill")
async def analyze_bill_endpoint(file: UploadFile = File(...)):
    """
    Agent 2: Bill Parser
    """
    contents = await file.read()
    ai_response_str = analyze_bill_image(contents)
    
    # Parse string to JSON to return proper object
    try:
        data = json.loads(ai_response_str)
        return {"result": data}
    except:
        return {"result": ai_response_str}


@app.post("/api/agents/verify-meter")
async def verify_meter_endpoint(file: UploadFile = File(...), claimed_reading: float = Form(...)):
    """
    Agent 3: Meter Verifier
    """
    contents = await file.read()
    ai_response_str = verify_meter_reading(contents, claimed_reading)
    try:
        data = json.loads(ai_response_str)
        return {"result": data}
    except:
         return {"result": ai_response_str}

# Chatbot Endpoint
from app.agents.chatbot import chat_response
class ChatRequest(BaseModel):
    messages: List[dict] # [{"role": "user", "content": "hi"}]

@app.post("/api/chat")
async def chat_endpoint(request: ChatRequest):
    """
    Agent 4: General Chatbot (GPT-4o-mini)
    """
    response_text = chat_response(request.messages)
    return {"reply": response_text}

# New Endpoints
@app.post("/api/agents/savings-chat")
async def savings_chat_endpoint(request: ChatRequest):
    """
    Specialized Energy Auditor Bot
    """
    response = get_savings_tips(request.messages)
    return {"reply": response}

class ComplaintRequest(BaseModel):
    issue_type: str
    consumer_id: str
    description: str

@app.post("/api/agents/complaint")
def complaint_endpoint(data: ComplaintRequest):
    return {"result": json.loads(generate_complaint(data.dict()))}

@app.post("/api/agents/appliance")
async def appliance_endpoint(file: UploadFile = File(...)):
    contents = await file.read()
    return {"result": json.loads(analyze_appliance_rating(contents))}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
