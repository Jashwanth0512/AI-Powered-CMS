from flask import Flask
from config import config_options
from extensions import init_extensions
from app.routes import auth_routes, content_routes, analytics_routes

def create_app(config_name="development"):
    """Flask Application Factory"""
    app = Flask(__name__)
    app.config.from_object(config_options[config_name])

    init_extensions(app)  # Initialize DB, JWT, Migrate

    # Register Blueprints
    app.register_blueprint(auth_routes.auth_bp, url_prefix="/auth")
    app.register_blueprint(content_routes.content_bp, url_prefix="/content")
    app.register_blueprint(analytics_routes.analytics_bp, url_prefix="/analytics")

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=app.config["DEBUG"])
