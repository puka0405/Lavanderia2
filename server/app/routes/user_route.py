from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
from app.models.user import User
from app.database.db import db
from app.controllers.user_controller import login_user, logout_user, update_user, toggle_user_status, get_user_logs

user_bp =  Blueprint("users", __name__, url_prefix="/users")

@user_bp.route("/register", methods=["POST"])
def create_user():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    rol = data.get("rol")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({"error":"Es necesario enviar todos los datos"}), 400
    
    if User.query.filter_by(email=email).first():
        return jsonify({"error":"El correo ya esta registrado"}), 400
    
    password_hash = generate_password_hash(password)
    new_user = User(name=name, email=email, password=password_hash, rol=rol)
    db.session.add(new_user)
    #Registra un cambio en nuestra DB al como tipo github
    db.session.commit()
    return jsonify({"msg":"Usuario creado con exito :3", "user":new_user.to_dict()}), 200

@user_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    token = login_user(data["email"], data["password"])
    if token:
        return jsonify({"access_token": token}), 200
    return jsonify({"msg": "Algo salió mal al intentar iniciar sesión, revise sus claves :3"}), 400

@user_bp.route("/logout/<int:user_id>", methods=["POST"])
def logout(user_id):
    logout_user(user_id)
    return jsonify({"msg":"Logout exitosos mdfk :3"}), 200

@user_bp.route("/update/<int:user_id>", methods=["PUT"])
def update(user_id):
    data = request.json
    user = update_user(user_id, data)
    if user:
        return jsonify({"msg": "Usuario actualizado :3", "user":user.to_dict()}), 200
    return jsonify({"msg":"Algo salió mal, intentar actualizar al usuario >:c"}), 400

@user_bp.route("/change/<int:user_id>/status", methods=["PATCH"])
def change_status(user_id):
    data = request.json
    is_active = data.get("active")
    user = toggle_user_status(user_id, is_active)
    if user:
        return jsonify({"msg":"Estatus actualizado", "activo":user.state}), 200
    return jsonify({"msg":"Algo salió mal, intentar actualizar el estado del usuario >:c"}), 400

@user_bp.route("/get/logs/<int:user_id>", methods=["GET"])
def get_logs(user_id):
    logs = get_user_logs(user_id)
    data = []
    for log in logs:
        data.append(log.to_dict())
    return jsonify({
        "msg":"Logs obtenidos con éxito",
        "logs":data
    }), 200

@user_bp.route("/get-all", methods=["GET"])
def get_all():
    users = get_users()
    return  [user.to_dict() for user in users]


@user_bp.route("/delete/<int:id>", methods=["DELETE"])
def delete(id):
    return delete_user(id)