import pytest
from rest_framework.test import APIClient
from rest_framework import status

@pytest.mark.django_db
def test_register_success():
    """
    Tester si un utilisateur peut s'inscrire avec succès.
    """
    client = APIClient()

    # Données valides pour l'inscription
    valid_data = {
        "username": "testuser",
        "email": "testuser@example.com",
        "password": "testpassword123"
    }

    # Appeler l'API d'inscription avec le chemin absolu correct
    response = client.post('/forum/api/register/', valid_data)

    # Vérifier que l'utilisateur a été créé avec succès
    assert response.status_code == status.HTTP_201_CREATED
    assert "access_token" in response.data
    assert "refresh_token" in response.data
    assert response.data["user"]["email"] == valid_data["email"]

@pytest.mark.django_db
def test_register_invalid_data():
    """
    Tester si l'API renvoie des erreurs pour des données invalides.
    """
    client = APIClient()

    # Données invalides (manque le champ "password")
    invalid_data = {
        "username": "testuser",
        "email": "testuser@example.com"
    }

    # Appeler l'API d'inscription
    response = client.post('/forum/api/register/', invalid_data)

    # Vérifier que le statut HTTP est 400 (Bad Request)
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert "password" in response.data  # Vérifier que l'erreur concerne le champ password
