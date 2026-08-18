import requests

BASE_URL = "http://127.0.0.1:5000"

# Login
login_data = {
    "email": "testpatient@example.com",
    "password": "Test@123"
}

login_response = requests.post(
    f"{BASE_URL}/login",
    json=login_data
)

print("Login Status:", login_response.status_code)

login_result = login_response.json()

print("Login Response:", login_result)

# Get JWT token
token = login_result.get("access_token")

if not token:
    print("JWT token was not received.")
    exit()

# Access protected patient history
headers = {
    "Authorization": f"Bearer {token}"
}

patient_id = "P002"

history_response = requests.get(
    f"{BASE_URL}/patient/{patient_id}/history",
    headers=headers
)

print("History Status:", history_response.status_code)
print("History Response:", history_response.json())