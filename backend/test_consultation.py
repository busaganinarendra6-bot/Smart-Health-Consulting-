import requests

url = "http://127.0.0.1:5000/consultation"

consultation = {
    "consultation_id": "C001",
    "patient_id": "P002",
    "doctor_id": "D001",
    "symptoms": ["Fever", "Cough"],
    "diagnosis": "Viral Fever",
    "prescription": "Paracetamol 500mg"
}

response = requests.post(url, json=consultation)

print("Status:", response.status_code)
print("Response:", response.json())