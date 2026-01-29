# src/__init__.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from src.config.settings import config

db = SQLAlchemy()
jwt = JWTManager()

def create_app(config_name='development'):
    """Application factory function"""
    app = Flask(__name__)
    
    # Load configuration
    app.config.from_object(config[config_name])
    
    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)
    CORS(app)
    
    # Register blueprints
    from src.routes import auth_routes, biomarker_routes, appointment_routes, admin_routes, export_routes
    
    app.register_blueprint(auth_routes.bp)
    app.register_blueprint(biomarker_routes.bp)
    app.register_blueprint(appointment_routes.bp)
    app.register_blueprint(admin_routes.bp)
    app.register_blueprint(export_routes.bp)
    
    # Create tables
    with app.app_context():
        db.create_all()
    
    # Error handlers
    from src.middleware.error_handler import register_error_handlers
    register_error_handlers(app)
    
    return app
