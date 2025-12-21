import requests
import json

url = "http://localhost:8000/api/chat"
headers = {"Content-Type": "application/json"}
payload = {
    "messages": [
        {"role": "user", "content": "what is current bill in the telengana"}
    ]
}

try:
    print(f"Sending request to {url}...")
    response = requests.post(url, headers=headers, json=payload)
    response.raise_for_status()
    print("\n--- API Response ---")
    print(response.json())
    print("--------------------")
except Exception as e:
    print(f"\nError: {e}")
    if hasattr(e, 'response') and e.response:
        print(f"Status Code: {e.response.status_code}")
        print(f"Response: {e.response.text}")
