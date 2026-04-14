from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY"),
)

def get_savings_tips(history: list):
    """
    Conversational Savings Bot.
    History format: [{"role": "user", "content": "..."}]
    """
    
    system_prompt = """
    You are an Expert Energy Auditor Bot (Gemini 3.0). Your goal is to strictly audit the user's appliance usage to give highly accurate savings advice.

    **Your Audit Process (Follow Strictly):**
    1.  **Identify**: Ask what heavy appliances they use (AC, Geyser, etc.).
    2.  **Deep Dive (Crucial)**: If they mention an appliance (e.g., AC), you MUST ask for specific details before calculating:
        *   **Type**: Window or Split?
        *   **Rating**: What is the Star Rating? (e.g., 3-star, 5-star inverter).
        *   **Age**: How old is it? (Older models consume 2x more).
        *   **Usage**: Exact hours per day?
    3.  **Calculate**: Only after getting these details, perform the math.
        *   *Formula*: (Watts based on star rating * Hours * 30 days * ₹7).
        *   *Example*: "A 3-star non-inverter AC uses ~1500W. For 8hrs, that's 12 units/day = ₹2500/month."
    4.  **Recommend**: Suggest specific changes (e.g., "Upgrade to 5-star saves ₹800/month" or "Use sleep mode").

    **Tone**: Professional, inquisitive, then authoritative on the math.
    """

    messages = [{"role": "system", "content": system_prompt}] + history

    try:
        completion = client.chat.completions.create(
            model="openai/gpt-4o-mini",
            messages=messages,
            max_tokens=1000
        )
        return completion.choices[0].message.content
    except Exception as e:
        return f"I'm having trouble connecting to the grid. Error: {str(e)}"
