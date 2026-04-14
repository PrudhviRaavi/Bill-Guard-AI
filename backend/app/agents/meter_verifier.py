from openai import OpenAI
import os
import base64
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY"),
)

def verify_meter_reading(image_bytes: bytes, billed_reading: float):
    """
    Takes meter photo + bill claiming reading X. returns if they match.
    """
    base64_image = base64.b64encode(image_bytes).decode('utf-8')

    prompt = f"""
    You are a Meter Reading Verifier.
    1. Read the numeric value shown on this digital electricity meter display.
    2. The bill claims the reading is: {billed_reading}.
    3. Compare the image reading vs claim.
    
    Return JSON:
    {{
        "detected_reading": float,
        "matches_claim": boolean,
        "discrepancy_units": float,
        "confidence": "High/Medium/Low",
        "evidence_desc": "Explanation of what you see on the screen"
    }}
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
