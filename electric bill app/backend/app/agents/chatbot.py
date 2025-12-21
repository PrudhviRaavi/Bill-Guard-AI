from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

# OpenRouter API configuration
client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY"),
)

def chat_response(history: list):
    """
    Takes a list of message history and returns the AI response using GPT-4o-mini.
    This is the chatbot agent for general conversation.
    """
    system_prompt = {
        "role": "system",
        "content": """You are BillGuard AI, a friendly and helpful assistant for Indian electricity consumers. 
Help them understand their bills, tariffs, and saving tips.

Key behaviors:
- Keep answers concise and practical (max 2-3 paragraphs)
- Use Rs/₹ instead of $ for currency
- Be specific about Indian electricity boards (BESCOM, TNEB, MSEDCL, etc.)
- Provide actionable advice for bill disputes and savings

You can help with:
- Explaining bill components and charges
- Tariff slab calculations
- Energy saving tips
- Complaint drafting guidance
- Meter reading verification info
"""
    }
    
    messages = [system_prompt] + history

    try:
        completion = client.chat.completions.create(
            model="openai/gpt-4o-mini",  # Best for conversational chatbot
            messages=messages,
            max_tokens=500,
            temperature=0.7
        )
        return completion.choices[0].message.content
    except Exception as e:
        error_msg = str(e)
        # Provide helpful error messages
        if "api_key" in error_msg.lower() or "unauthorized" in error_msg.lower():
            return "⚠️ API connection error. Please check that OPENROUTER_API_KEY is set correctly in the .env file."
        elif "rate_limit" in error_msg.lower():
            return "⚠️ Rate limit reached. Please try again in a moment."
        elif "model" in error_msg.lower():
            return "⚠️ Model not available. Please check OpenRouter model availability."
        else:
            return f"⚠️ Connection error: {error_msg[:100]}... Please ensure the backend server is running."
