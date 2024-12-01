"""
Module de tests pour l'API des avis dans l'application Forum.

Ce module contient des tests unitaires pour les endpoints de l'API REST liés aux avis.
"""

import pytest
from rest_framework import status
from rest_framework.test import APIClient
from forum.models import Avis, Categorie, Utilisateur


# Fixtures pour les objets nécessaires
@pytest.fixture
def create_utilisateur():
    """Crée un utilisateur pour les tests."""
    return Utilisateur.objects.create_user(
        username="testuser", email="test@example.com", password="testpassword"
    )


@pytest.fixture
def create_categorie():
    """Crée une catégorie pour les tests."""
    return Categorie.objects.create(
        name="Categorie Test", description="Description de la catégorie"
    )


@pytest.mark.django_db
def test_create_avis_api(create_utilisateur, create_categorie):
    """Test pour créer un avis."""
    utilisateur_instance = create_utilisateur
    categorie_instance = create_categorie

    client = APIClient()
    data = {
        "categorie": categorie_instance.id,
        "auteur": utilisateur_instance.id,
        "commentaire": "C'est une excellente catégorie!",
        "note": 5,
    }
    response = client.post("/forum/api/avis/", data)

    assert response.status_code == status.HTTP_201_CREATED
    assert response.data["categorie"] == categorie_instance.id
    assert response.data["auteur"] == utilisateur_instance.id
    assert response.data["commentaire"] == "C'est une excellente catégorie!"
    assert response.data["note"] == 5


@pytest.mark.django_db
def test_get_avis_api(create_utilisateur, create_categorie):
    """Test pour récupérer un avis."""
    utilisateur_instance = create_utilisateur
    categorie_instance = create_categorie

    avis_obj = Avis.objects.create(
        categorie=categorie_instance,
        auteur=utilisateur_instance,
        commentaire="Très bonne catégorie",
        note=4,
    )

    client = APIClient()
    response = client.get(f"/forum/api/avis/{avis_obj.id}/")

    assert response.status_code == status.HTTP_200_OK
    assert response.data["categorie"] == categorie_instance.id
    assert response.data["auteur"] == utilisateur_instance.id
    assert response.data["commentaire"] == "Très bonne catégorie"
    assert response.data["note"] == 4





@pytest.mark.django_db
def test_delete_avis_api(create_utilisateur, create_categorie):
    """Test pour supprimer un avis."""
    utilisateur_instance = create_utilisateur
    categorie_instance = create_categorie

    avis_obj = Avis.objects.create(
        categorie=categorie_instance,
        auteur=utilisateur_instance,
        commentaire="Catégorie acceptable",
        note=4,
    )

    client = APIClient()
    response = client.delete(f"/forum/api/avis/{avis_obj.id}/")

    assert response.status_code == status.HTTP_204_NO_CONTENT
    assert not Avis.objects.filter(id=avis_obj.id).exists()
