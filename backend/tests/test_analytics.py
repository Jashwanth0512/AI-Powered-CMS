import unittest
from app import create_app, db
from app.models.analytics import Analytics
from utils.auth import create_access_token

class AnalyticsTestCase(unittest.TestCase):
    """Test cases for analytics"""

    def setUp(self):
        self.app = create_app("testing")
        self.client = self.app.test_client()
        with self.app.app_context():
            db.create_all()
            self.token = create_access_token(1, "admin")
            self.headers = {"Authorization": f"Bearer {self.token}"}

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

    def test_get_analytics(self):
        response = self.client.get("/analytics", headers=self.headers)
        self.assertEqual(response.status_code, 200)

if __name__ == "__main__":
    unittest.main()
