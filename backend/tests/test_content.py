import unittest
from app import create_app, db
from app.models.content import Content
from utils.auth import create_access_token

class ContentTestCase(unittest.TestCase):
    """Test cases for content APIs"""

    def setUp(self):
        self.app = create_app("testing")
        self.client = self.app.test_client()
        with self.app.app_context():
            db.create_all()
            token = create_access_token(1, "admin")
            self.headers = {"Authorization": f"Bearer {token}"}

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

    def test_create_content(self):
        response = self.client.post("/content/create", json={"title": "Test", "body": "Content body"}, headers=self.headers)
        self.assertEqual(response.status_code, 201)

if __name__ == "__main__":
    unittest.main()
