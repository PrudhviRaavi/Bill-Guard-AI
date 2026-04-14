import requests
import os

# Use the file path from the user's upload or a test file
# Note: Since I cannot access the user's upload directly without the path, I will use a test placeholder or try to point to the artifact if the path is predictable.
# However, the user provided the path in the chat history:
# C:/Users/asus/.gemini/antigravity/brain/0b19ab32-d4d1-41f5-a37a-52945f0b1ba3/uploaded_image_1766217444477.png

IMAGE_PATH = r"C:/Users/asus/.gemini/antigravity/brain/0b19ab32-d4d1-41f5-a37a-52945f0b1ba3/uploaded_image_1766217444477.png"
URL = "http://localhost:8000/api/agents/analyze-bill"

def test_analyze():
    if not os.path.exists(IMAGE_PATH):
        print(f"Error: File not found at {IMAGE_PATH}")
        return

    print(f"Testing analysis for: {IMAGE_PATH}")
    try:
        with open(IMAGE_PATH, 'rb') as f:
            files = {'file': f}
            response = requests.post(URL, files=files)
        
        print("\nStatus Code:", response.status_code)
        try:
            print("Response JSON:", response.json())
        except:
            print("Response Text:", response.text)
            
    except Exception as e:
        print(f"Request failed: {e}")

if __name__ == "__main__":
    test_analyze()
