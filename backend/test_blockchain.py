import requests

url = "http://127.0.0.1:5000/add-record"

health_record = {
    "patient_id": "P001",
    "symptoms": ["fever", "cough", "headache"],
    "consultation": "General health consultation",
    "doctor_id": "D001"
}

response = requests.post(url, json=health_record)

print("Status:", response.status_code)
print("Response:", response.json())