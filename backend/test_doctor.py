import requests

url = "http://127.0.0.1:5000/register-doctor"

doctor = {
    "doctor_id": "D001",
    "name": "Test Doctor",
    "specialization": "General Physician"
}

response = requests.post(url, json=doctor)

print("Status:", response.status_code)
print("Response:", response.json())