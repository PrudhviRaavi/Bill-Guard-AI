from openai import OpenAI
import os
from dotenv import load_dotenv
from pydantic import BaseModel

load_dotenv()

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY"),
)

def generate_complaint(details: dict):
    """
    Drafts a formal email to the electricity board.
    """
    prompt = f"""
    Write a formal complaint email to the Assistant Executive Engineer (AEE) of the Electricity Board.
    
    Issue Type: {details.get('issue_type', 'High Bill')}
    Consumer Number: {details.get('consumer_id', 'N/A')}
    Details: {details.get('description', '')}
    
    Return JSON: {{ "email_subject": "...", "email_body": "..." }}
    """
    
    try:
        completion = client.chat.completions.create(
            model="google/gemini-3-flash-preview", 
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"}
        )
        return completion.choices[0].message.content
    except Exception as e:
        return {"error": str(e)}
