from flask import Blueprint, jsonify, request

consultation_bp = Blueprint("consultation", __name__)


@consultation_bp.route("/consultation", methods=["POST"])
def create_consultation():
    from blockchain.blockchain import Blockchain

    blockchain = Blockchain()

    data = request.get_json()

    if not data:
        return jsonify({
            "error": "No consultation data provided"
        }), 400

    required_fields = [
        "consultation_id",
        "patient_id",
        "doctor_id",
        "symptoms",
        "diagnosis",
        "prescription"
    ]

    for field in required_fields:
        if field not in data:
            return jsonify({
                "error": f"Missing {field}"
            }), 400

    consultation_record = {
        "type": "Health Consultation",
        "consultation_id": data["consultation_id"],
        "patient_id": data["patient_id"],
        "doctor_id": data["doctor_id"],
        "symptoms": data["symptoms"],
        "diagnosis": data["diagnosis"],
        "prescription": data["prescription"]
    }

    blockchain.add_block(consultation_record)

    latest_block = blockchain.get_latest_block()

    return jsonify({
        "message": "Consultation saved successfully",
        "consultation_id": data["consultation_id"],
        "block_index": latest_block.index,
        "block_hash": latest_block.hash
    }), 201