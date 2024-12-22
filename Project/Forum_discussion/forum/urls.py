from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    AvisAPIView,
    FavorisAPIView,
    register,
    CustomTokenObtainPairView,
    CategorieListView,
    CategorieDetailView,
    SujetAPIView,
    SujetDetailView,
    CommentaireAPIView,
    
)

urlpatterns = [
    # Authentification
      path('api/register/', register, name='register'),
    # path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/login/', CustomTokenObtainPairView.as_view(), name='login'),  # Login endpoint

    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Catégories
    path('api/categories/', CategorieListView.as_view(), name='categorie_list'),
    path('api/categories/<int:id>/', CategorieDetailView.as_view(), name='categorie_detail'),

    # Sujets
    path('api/sujets/', SujetAPIView.as_view(), name='sujets'),  # Liste et création de sujets
    path('api/sujets/<int:id>/', SujetAPIView.as_view(), name='sujet-delete'),  # DELETE avec ID
    path('api/sujets/detail/<int:id>/', SujetDetailView.as_view(), name='sujet-detail'),  # GET et PUT
    # Commentaires
    path('api/commentaires/', CommentaireAPIView.as_view(), name='commentaires'),
    path('api/commentaires/<int:id>/', CommentaireAPIView.as_view(), name='commentaire_detail'), # Suppression


    # Avis
    path('api/avis/<int:id>/', AvisAPIView.as_view(), name='avis_detail'),  # GET, PUT, DELETE
    path('api/avis/', AvisAPIView.as_view(), name='avis_create'),  # POST    
    
    # Favoris
    path('api/favoris/', FavorisAPIView.as_view(), name='favoris_create'),
    path('api/favoris/<int:id>/', FavorisAPIView.as_view(), name='favoris_detail'),  # DELETE: Supprimer un favori
    
    
]
