from flask import Flask, jsonify
from flask_jwt_extended import JWTManager
from routes.auth_routes import auth_bp
from flask_cors import CORS
from blockchain.blockchain import Blockchain

from routes.patient_routes import patient_bp
from routes.doctor_routes import doctor_bp
from routes.consultation_routes import consultation_bp


app = Flask(__name__)
CORS(app)
app.config["JWT_SECRET_KEY"] = "smart-health-secret-key-change-later"
jwt = JWTManager(app)


app.register_blueprint(patient_bp)
app.register_blueprint(doctor_bp)
app.register_blueprint(consultation_bp)
app.register_blueprint(auth_bp)

health_blockchain = Blockchain()


@app.route("/")
def home():
    return jsonify({
        "project": "Smart Health Consulting System",
        "domain": "Blockchain",
        "status": "Backend is running"
    })


@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({
        "status": "healthy",
        "service": "Smart Health Consulting System",
        "blockchain_valid": health_blockchain.is_chain_valid()
    })


@app.route("/blockchain", methods=["GET"])
def get_blockchain():
    chain_data = []

    for block in health_blockchain.chain:
        chain_data.append({
            "index": block.index,
            "timestamp": block.timestamp,
            "data": block.data,
            "previous_hash": block.previous_hash,
            "hash": block.hash
        })

    return jsonify({
        "chain": chain_data,
        "length": len(chain_data),
        "valid": health_blockchain.is_chain_valid()
    })


if __name__ == "__main__":
    app.run(debug=True)