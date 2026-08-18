import requests

url = "http://127.0.0.1:5000/register-user"

user = {
    "user_id": "U001",
    "name": "Test Patient",
    "email": "testpatient@example.com",
    "password": "Test@123",
    "role": "patient"
}

response = requests.post(url, json=user)

print("Registration Status:", response.status_code)
print("Registration Response:", response.json())


login_url = "http://127.0.0.1:5000/login"

login_data = {
    "email": "testpatient@example.com",
    "password": "Test@123"
}

login_response = requests.post(login_url, json=login_data)

print("Login Status:", login_response.status_code)
print("Login Response:", login_response.json())