from openai import OpenAI
import os
from dotenv import load_dotenv
import json

load_dotenv()

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY"),
)

def validate_tariff(bill_data: dict, state: str = "Karnataka"):
    """
    Takes extracted bill data and checks if the calculation matches the State logic.
    """
    
    prompt = f"""
    You are a Tariff Auditor for {state} Electricity Board.
    Here is the bill data extracted: {json.dumps(bill_data)}
    
    Task:
    1. Verify if the 'current_charges' match the official tariff slab for {state} (Assume standard domestic LT-2 rates for 2024).
    2. Identify if the user is paying 'Fixed Charges' that are too high.
    3. Calculate the 'Ideal Cost' based on the units consumed.
    
    Return JSON:
    {{
        "is_overcharged": boolean,
        "calculated_amount": float,
        "difference_amount": float,
        "remarks": "String explanation of why it is wrong or right"
    }}
    """

    try:
        completion = client.chat.completions.create(
            model="perplexity/llama-3-sonar-large-32k-online",
            messages=[
                {"role": "user", "content": prompt}
            ],
            response_format={"type": "json_object"}
        )
        return completion.choices[0].message.content
    except Exception as e:
        return {"error": str(e)}
