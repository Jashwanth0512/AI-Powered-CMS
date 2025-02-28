import unittest
from app import create_app, db
from app.models.user import User
from utils.auth import hash_password

class AuthTestCase(unittest.TestCase):
    """Test cases for authentication"""

    def setUp(self):
        self.app = create_app("testing")
        self.client = self.app.test_client()
        with self.app.app_context():
            db.create_all()
            self.user = User(email="test@example.com", password=hash_password("password"))
            db.session.add(self.user)
            db.session.commit()

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

    def test_login_success(self):
        response = self.client.post("/auth/login", json={"email": "test@example.com", "password": "password"})
        self.assertEqual(response.status_code, 200)

    def test_login_failure(self):
        response = self.client.post("/auth/login", json={"email": "test@example.com", "password": "wrongpass"})
        self.assertEqual(response.status_code, 401)

if __name__ == "__main__":
    unittest.main()
