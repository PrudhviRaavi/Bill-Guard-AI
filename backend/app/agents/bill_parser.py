from openai import OpenAI
import os
import base64
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY"),
)

def analyze_bill_image(image_bytes: bytes):
    """
    Takes raw image bytes, sends to Gemini Vision, and extracts bill details JSON.
    """
    # Encode image to base64
    base64_image = base64.b64encode(image_bytes).decode('utf-8')

    prompt = """
    You are an Expert Electricity Bill Auditor for India. 
    Analyze this electricity bill image and extract the following details in structued JSON format:
    1. bill_period (string)
    2. total_units_consumed (float)
    3. current_charges (float)
    4. due_date (string)
    5. tariff_slab (string or "Unknown")
    6. meter_number (string)
    7. provider_name (string e.g. BESCOM, TNEB)
    8. consumer_number (string - also distinct from meter number, often called Account ID or Service No)
    
    Also check for any anomalies or obvious calculation errors. Add a field 'anomalies_found' (list of strings).
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
            response_format={"type": "json_object"},
            max_tokens=1000
        )
        return completion.choices[0].message.content
    except Exception as e:
        return {"error": str(e)}
