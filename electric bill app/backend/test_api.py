import requests
import io
from PIL import Image

BASE_URL = "http://localhost:8000/api/agents"

def create_dummy_image():
    """Creates a small blank image in memory for testing upload."""
    img = Image.new('RGB', (100, 100), color = 'red')
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
        response = requests.post(f"{BASE_URL}/scam-detector", json=payload)
        if response.status_code == 200:
            print("✅ Success:", response.json())
        else:
            print("❌ Failed:", response.text)
    except Exception as e:
        print("❌ Error:", str(e))

def test_bill_analysis():
    print("\n--- Testing Bill Analysis ---")
    try:
        dummy_file = create_dummy_image()
        files = {'file': ('bill.jpg', dummy_file, 'image/jpeg')}
        response = requests.post(f"{BASE_URL}/analyze-bill", files=files)
        if response.status_code == 200:
            print("✅ Success (Agent replied):", response.json())
        else:
            print("❌ Failed:", response.text)
    except Exception as e:
        print("❌ Error:", str(e))

def test_savings():
    print("\n--- Testing Savings Agent ---")
    payload = {"units": 300, "amount": 2500}
    try:
        response = requests.post(f"{BASE_URL}/savings", json=payload)
        if response.status_code == 200:
            print("✅ Success:", response.json())
        else:
            print("❌ Failed:", response.text)
    except Exception as e:
        print("❌ Error:", str(e))

if __name__ == "__main__":
    test_savings()
