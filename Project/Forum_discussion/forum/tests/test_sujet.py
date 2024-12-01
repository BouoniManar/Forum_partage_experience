"""
Tests pour le module forum, incluant les fonctionnalités liées aux sujets.
"""

import pytest
from rest_framework.test import APIClient
from rest_framework import status
from forum.models import Sujet


@pytest.mark.django_db
def test_get_sujets(utilisateur, categorie):
    """Test pour récupérer tous les sujets."""
    Sujet.objects.create(
        title="Sujet 1",
        content="Contenu 1",
        utilisateur=utilisateur,
        categorie=categorie
    )
    Sujet.objects.create(
        title="Sujet 2",
        content="Contenu 2",
        utilisateur=utilisateur,
        categorie=categorie
    )

    client = APIClient()
    response = client.get('/forum/api/sujets/')  # Notez le "/" initial

    assert response.status_code == status.HTTP_200_OK
    assert len(response.data) == 2


@pytest.mark.django_db
def test_create_sujet_api(utilisateur, categorie):
    """Test pour créer un sujet via l'API."""
    client = APIClient()

    data = {
        "title": "Nouveau Sujet",
        "content": "Voici le contenu.",
        "utilisateur": utilisateur.id,
        "categorie": categorie.id,
    }
    response = client.post('/forum/api/sujets/', data)  # Notez le "/" initial

    assert response.status_code == status.HTTP_201_CREATED
    assert response.data["title"] == "Nouveau Sujet"
    assert response.data["content"] == "Voici le contenu."
