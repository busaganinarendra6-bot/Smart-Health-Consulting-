from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
import sqlite3

auth_bp = Blueprint("auth", __name__)

DATABASE = "backend/database/health.db"


@auth_bp.route("/register-user", methods=["POST"])
def register_user():

    data = request.get_json()

    if not data:
        return jsonify({
            "error": "No user data provided"
        }), 400

    required_fields = [
        "user_id",
        "name",
        "email",
        "password",
        "role"
    ]

    for field in required_fields:
        if field not in data:
            return jsonify({
                "error": f"Missing field: {field}"
            }), 400

    if data["role"] not in ["patient", "doctor"]:
        return jsonify({
            "error": "Role must be patient or doctor"
        }), 400

    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id TEXT UNIQUE,
            name TEXT,
            email TEXT UNIQUE,
            password TEXT,
            role TEXT
        )
    """)

    hashed_password = generate_password_hash(data["password"])

    try:
        cursor.execute("""
            INSERT INTO users
            (user_id, name, email, password, role)
            VALUES (?, ?, ?, ?, ?)
        """, (
            data["user_id"],
            data["name"],
            data["email"],
            hashed_password,
            data["role"]
        ))

        connection.commit()

    except sqlite3.IntegrityError:
        connection.close()

        return jsonify({
            "error": "User ID or email already exists"
        }), 409

    connection.close()

    return jsonify({
        "message": "User registered successfully",
        "user_id": data["user_id"],
        "role": data["role"]
    }), 201


@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    if not data:
        return jsonify({
            "error": "No login data provided"
        }), 400

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({
            "error": "Email and password are required"
        }), 400

    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    cursor.execute("""
        SELECT user_id, name, password, role
        FROM users
        WHERE email = ?
    """, (email,))

    user = cursor.fetchone()

    connection.close()

    if not user:
        return jsonify({
            "error": "Invalid email or password"
        }), 401

    user_id, name, hashed_password, role = user

    if not check_password_hash(hashed_password, password):
        return jsonify({
            "error": "Invalid email or password"
        }), 401

    access_token = create_access_token(
        identity=user_id,
        additional_claims={
            "role": role,
            "name": name
        }
    )

    return jsonify({
        "message": "Login successful",
        "user_id": user_id,
        "name": name,
        "role": role,
        "access_token": access_token
    }), 200