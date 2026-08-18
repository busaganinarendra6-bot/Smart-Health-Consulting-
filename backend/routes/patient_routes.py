from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt

patient_bp = Blueprint("patient", __name__)


@patient_bp.route("/register-patient", methods=["POST"])
def register_patient():
    from blockchain.blockchain import Blockchain

    blockchain = Blockchain()

    data = request.get_json()

    if not data:
        return jsonify({
            "error": "No patient data provided"
        }), 400

    required_fields = ["patient_id", "name", "age", "gender"]

    for field in required_fields:
        if field not in data:
            return jsonify({
                "error": f"Missing field: {field}"
            }), 400

    patient_record = {
        "type": "Patient Registration",
        "patient_id": data["patient_id"],
        "name": data["name"],
        "age": data["age"],
        "gender": data["gender"]
    }

    blockchain.add_block(patient_record)

    latest_block = blockchain.get_latest_block()

    return jsonify({
        "message": "Patient registered successfully",
        "patient_id": data["patient_id"],
        "block_index": latest_block.index,
        "block_hash": latest_block.hash
    }), 201


@patient_bp.route("/patient/<patient_id>/history", methods=["GET"])
@jwt_required()
def patient_history(patient_id):
    from blockchain.blockchain import Blockchain

    blockchain = Blockchain()
    history = []

    for block in blockchain.chain:
        if isinstance(block.data, dict):
            if block.data.get("patient_id") == patient_id:
                history.append({
                    "block_index": block.index,
                    "timestamp": block.timestamp,
                    "data": block.data,
                    "hash": block.hash,
                    "previous_hash": block.previous_hash
                })

    if not history:
        return jsonify({
            "message": "No records found",
            "patient_id": patient_id,
            "records": []
        }), 404

    return jsonify({
        "patient_id": patient_id,
        "records_found": len(history),
        "records": history
    }), 200