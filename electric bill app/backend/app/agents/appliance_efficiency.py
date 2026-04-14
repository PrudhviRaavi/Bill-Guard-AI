from openai import OpenAI
import os
import base64
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY"),
)

def analyze_appliance_rating(image_bytes: bytes):
    """
    Analyzes the 'Bee Star Rating' label on appliances.
    """
    base64_image = base64.b64encode(image_bytes).decode('utf-8')

    prompt = """
    Identify the Appliance and its Star Rating from this image.
    1. Appliance Name (e.g. LG Refrigerator)
    2. Star Rating (1 to 5)
    3. Year of Manufacture (if visible)
    4. Estimated Annual Consumption (if visible)
    
    **Crucial Analysis:**
    *   Estimate the **Power Consumption in Watts** (e.g., 1500W for AC).
    *   Calculate **Cost per Hour** at ₹7/unit.
    *   Calculate **Monthly Cost** for typical usage (8hrs/day).
    
    Return JSON:
    {
        "appliance": "...",
        "stars": int,
        "year": "...",
        "is_inefficient": boolean,
        "wattage": "... W",
        "cost_per_hour": "₹...",
        "monthly_cost": "₹...",
        "upgrade_recommendation": "..."
    }
    """

    try:
        completion = client.chat.completions.create(
            model="openai/gpt-4o-mini",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": prompt},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{base64_image}"
                            }
                        }
                    ]
                }
            ],
            response_format={"type": "json_object"}
        )
        return completion.choices[0].message.content
    except Exception as e:
        return {"error": str(e)}
