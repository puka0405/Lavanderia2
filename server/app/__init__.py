from flask import Flask
from .config import Config
from .database.db import db
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager


migrate = Migrate()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    from app.models.client import Client
    from app.models.order import Order
    from app.models.user import User
    from .routes.service_route import service_bp


    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)

    #Rutas
    from.routes.user_route import user_bp
    from.routes.client_route import client_bp
    app.register_blueprint(user_bp)
    app.register_blueprint(client_bp)
    app.register_blueprint(service_bp)
    CORS(app)
    return app 
