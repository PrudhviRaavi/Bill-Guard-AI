from openai import OpenAI
import os
import json
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY"),
)

def enrich_bill_data(bill_data: dict):
    """
    Takes extracted bill data (provider, date, units) and uses Perplexity Online
    to find official payment links, tariff rates, and news.
    """
    provider = bill_data.get("provider_name", "Unknown Electricity Board")
    date = bill_data.get("bill_period", "current month")
    context = f"Provider: {provider}, Bill Date: {date}, Units: {bill_data.get('total_units_consumed')}"

    print(f"Enriching data for: {context}")

    prompt = f"""
    You are a Real-Time Electricity Bill Intelligence Agent.
    Context: {context}

    Perform a live web search to find the following specific information:
    1. **Official Payment Link**: The legitimate URL where users pay bills for {provider}.
    2. **Tariff Rate**: The actual energy charges (Rs/unit) for {provider} applicable in {date} for domestic consumers.
    3. **News/Updates**: Any recent government announcements, subsidy changes, or fuel surcharge updates for {provider} in the last 3 months.
    4. **Summary**: A concise 2-sentence summary of the bill status and any alerts.

    Return ONLY valid JSON in this format:
    {{
        "payment_link": "https://...",
        "payment_link_label": "Pay on [Official Site Name]",
        "tariff_info": "For {date}, the rate is ₹X.XX/unit (Tier 1).",
        "news_update": "Latest: [Headline about subsidy/tax]...",
        "summary": "Your bill of [Amount] seems [Normal/High]. The current tariff includes..."
    }}
    """

    try:
        completion = client.chat.completions.create(
            model="perplexity/llama-3-sonar-large-32k-online", 
            messages=[
                {"role": "system", "content": "You are a helpful assistant that outputs JSON."},
                {"role": "user", "content": prompt}
            ],
            response_format={"type": "json_object"}
        )
        content = completion.choices[0].message.content
        # Perplexity sometimes wraps code in backticks
        if "```json" in content:
            content = content.replace("```json", "").replace("```", "")
        
        return json.loads(content)
    except Exception as e:
        print(f"Error enriching data: {e}")
        return {
            "payment_link": "#",
            "payment_link_label": "Official Site Not Found",
            "tariff_info": "Could not fetch live tariff data.",
            "news_update": "No recent updates found.",
            "summary": "Bill analysis complete. Please verify details manually."
        }
