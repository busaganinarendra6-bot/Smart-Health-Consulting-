from flask import Blueprint, jsonify, request

doctor_bp = Blueprint("doctor", __name__)


@doctor_bp.route("/register-doctor", methods=["POST"])
def register_doctor():
    from blockchain.blockchain import Blockchain

    blockchain = Blockchain()

    data = request.get_json()

    if not data:
        return jsonify({
            "error": "No doctor data provided"
        }), 400

    required_fields = [
        "doctor_id",
        "name",
        "specialization"
    ]

    for field in required_fields:
        if field not in data:
            return jsonify({
                "error": f"Missing field: {field}"
            }), 400

    doctor_record = {
        "type": "Doctor Registration",
        "doctor_id": data["doctor_id"],
        "name": data["name"],
        "specialization": data["specialization"]
    }

    blockchain.add_block(doctor_record)

    latest_block = blockchain.get_latest_block()

    return jsonify({
        "message": "Doctor registered successfully",
        "doctor_id": data["doctor_id"],
        "block_index": latest_block.index,
        "block_hash": latest_block.hash
    }), 201