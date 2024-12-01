import pytest
from forum.models import Utilisateur, Categorie

@pytest.fixture
def utilisateur():
    return Utilisateur.objects.create_user(username="testuser", email="test@example.com", password="testpassword")

@pytest.fixture
def categorie():
    return Categorie.objects.create(name="Test Categorie", description="Description de test")



