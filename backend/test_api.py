import requests
import io
from PIL import Image

BASE_URL = "http://localhost:8000/api"

def create_dummy_image():
    """Creates a small blank image in memory for testing upload."""
    img = Image.new('RGB', (100, 100), color = 'white')
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='JPEG')
    img_byte_arr.seek(0)
    return img_byte_arr

def test_scam_detector():
    print("\n--- Testing Scam Detector ---")
    payload = {
        "text_content": "URGENT: Your electricity power will be disconnected today at 9pm. Pay immediately at http://bit.ly/fake-link"
    }
    try:
        response = requests.post(f"{BASE_URL}/agents/scam-detector", json=payload)
        if response.status_code == 200:
            print("[SUCCESS]", response.json())
        else:
            print("[FAIL]", response.text)
    except Exception as e:
        print("[ERROR]", str(e))

def test_bill_analysis():
    print("\n--- Testing Bill Analysis ---")
    try:
        dummy_file = create_dummy_image()
        files = {'file': ('bill.jpg', dummy_file, 'image/jpeg')}
        response = requests.post(f"{BASE_URL}/agents/analyze-bill", files=files)
        if response.status_code == 200:
            print("[SUCCESS] (Agent replied):", response.json())
        else:
            print("[FAIL]", response.text)
    except Exception as e:
        print("[ERROR]", str(e))

def test_savings():
    print("\n--- Testing Savings Agent ---")
    payload = {"messages": [{"role": "user", "content": "I use an AC for 8 hours a day. It is a 3 star split."}]}
    try:
        response = requests.post(f"{BASE_URL}/agents/savings-chat", json=payload)
        if response.status_code == 200:
            print("[SUCCESS]", response.json())
        else:
            print("[FAIL]", response.text)
    except Exception as e:
        print("[ERROR]", str(e))

def test_general_chatbot():
    print("\n--- Testing General Chat ---")
    payload = {"messages": [{"role": "user", "content": "Hello! How can you help me?"}]}
    try:
        response = requests.post(f"{BASE_URL}/chat", json=payload)
        if response.status_code == 200:
            print("[SUCCESS]", response.json())
        else:
            print("[FAIL]", response.text)
    except Exception as e:
        print("[ERROR]", str(e))

if __name__ == "__main__":
    test_scam_detector()
    test_bill_analysis()
    test_savings()
    test_general_chatbot()

