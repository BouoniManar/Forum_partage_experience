from venv import logger
from django.shortcuts import render
from forum.models.avis import Avis
from forum.models.favoris import Favoris
from forum.models.utilisateur import Utilisateur
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from forum.models.categorie import Categorie
from .serializers import AvisSerializer, CategorieSerializer, FavorisSerializer, UserSerializer
from forum.models import Sujet
from .serializers import SujetSerializer
from forum.models import Commentaire
from .serializers import CommentaireSerializer


@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        # Serialize the user data
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            # Create JWT tokens
            refresh = RefreshToken.for_user(user)
            return Response({
                'user': serializer.data,
                'access_token': str(refresh.access_token),
                'refresh_token': str(refresh),
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Custom TokenObtainPairView for login
class CustomTokenObtainPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)


# API View for listing categories
class CategorieListView(APIView):
    def get(self, request):
        categories = Categorie.objects.all()
        serializer = CategorieSerializer(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



class CategorieDetailView(APIView):
    def get(self, request, id):
        try:
            # Récupérer la catégorie par son ID
            categorie = Categorie.objects.get(id=id)
            serializer = CategorieSerializer(categorie)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Categorie.DoesNotExist:
            return Response(
                {"error": "Catégorie introuvable"},
                status=status.HTTP_404_NOT_FOUND
            )
            
            



class SujetAPIView(APIView):
  
    def get(self, request):
        category_id = request.query_params.get('category')  # Récupérer l'ID de la catégorie depuis les paramètres de requête
        if category_id:
            sujets = Sujet.objects.filter(categorie__id=category_id)  # Filtrer par catégorie
        else:
            sujets = Sujet.objects.all()
        serializer = SujetSerializer(sujets, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


    def post(self, request):
        serializer = SujetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id):
        try:
            sujet = Sujet.objects.get(id=id)
            sujet.delete()
            return Response({"message": "Sujet supprimé avec succès"}, status=status.HTTP_204_NO_CONTENT)
        except Sujet.DoesNotExist:
            logger.warning(f"Tentative de suppression d'un sujet inexistant avec l'ID {id}")
            return Response({"error": "Sujet introuvable"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"Erreur lors de la suppression du sujet avec l'ID {id}: {e}")
            return Response({"error": "Erreur serveur"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class SujetDetailView(APIView):
    def get(self, request, id):
        try:
            sujet = Sujet.objects.get(id=id)
            serializer = SujetSerializer(sujet)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Sujet.DoesNotExist:
            return Response({"error": "Sujet introuvable"}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, id):
        try:
            sujet = Sujet.objects.get(id=id)
            serializer = SujetSerializer(sujet, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Sujet.DoesNotExist:
            return Response({"error": "Sujet introuvable"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            import traceback
            traceback.print_exc()
            return Response({"error": f"Erreur serveur : {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, id):
        try:
            sujet = Sujet.objects.get(id=id)
            sujet.delete()
            return Response({"message": "Sujet supprimé avec succès"}, status=status.HTTP_204_NO_CONTENT)
        except Sujet.DoesNotExist:
            logger.warning(f"Tentative de suppression d'un sujet inexistant avec l'ID {id}")
            return Response({"error": "Sujet introuvable"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"Erreur lors de la suppression du sujet avec l'ID {id}: {e}")
            return Response({"error": "Erreur serveur"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    
        
    
    
        
class CommentaireAPIView(APIView):
    def post(self, request):
        """Créer un nouveau commentaire"""
        serializer = CommentaireSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, id=None):
        """Récupérer un commentaire par son ID"""
        if id:
            try:
                commentaire = Commentaire.objects.get(id=id)
                serializer = CommentaireSerializer(commentaire)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Commentaire.DoesNotExist:
                return Response({"error": "Commentaire introuvable"}, status=status.HTTP_404_NOT_FOUND)
        else:
            commentaires = Commentaire.objects.all()
            serializer = CommentaireSerializer(commentaires, many=True)
            return Response(serializer.data)

    def put(self, request, id):
        """Mettre à jour un commentaire par son ID"""
        try:
            commentaire = Commentaire.objects.get(id=id)
            serializer = CommentaireSerializer(commentaire, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Commentaire.DoesNotExist:
            return Response({"error": "Commentaire introuvable"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, id):
        """Supprimer un commentaire par son ID"""
        try:
            commentaire = Commentaire.objects.get(id=id)
            commentaire.delete()
            return Response({"message": "Commentaire supprimé avec succès"}, status=status.HTTP_204_NO_CONTENT)
        except Commentaire.DoesNotExist:
            return Response({"error": "Commentaire introuvable"}, status=status.HTTP_404_NOT_FOUND)


class AvisAPIView(APIView):
    def post(self, request):
        """Créer un nouvel avis"""
        serializer = AvisSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, id):
        """Récupérer un avis par son ID"""
        try:
            avis = Avis.objects.get(id=id)
            serializer = AvisSerializer(avis)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Avis.DoesNotExist:
            return Response({"error": "Avis introuvable"}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, id):
        """Mettre à jour un avis par son ID"""
        try:
            avis = Avis.objects.get(id=id)
            serializer = AvisSerializer(avis, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Avis.DoesNotExist:
            return Response({"error": "Avis introuvable"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, id):
        """Supprimer un avis par son ID"""
        try:
            avis = Avis.objects.get(id=id)
            avis.delete()
            return Response({"message": "Avis supprimé avec succès"}, status=status.HTTP_204_NO_CONTENT)
        except Avis.DoesNotExist:
            return Response({"error": "Avis introuvable"}, status=status.HTTP_404_NOT_FOUND)








class FavorisAPIView(APIView):
    def post(self, request):
        """Ajouter un sujet ou un avis aux favoris"""
        utilisateur_id = request.data.get('utilisateur', None)
        sujet_id = request.data.get('sujet', None)
        avis_id = request.data.get('avis', None)

        if not utilisateur_id:
            return Response({"error": "Il faut spécifier un utilisateur."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            utilisateur = Utilisateur.objects.get(id=utilisateur_id)
        except Utilisateur.DoesNotExist:
            return Response({"error": "Utilisateur introuvable."}, status=status.HTTP_404_NOT_FOUND)

        if not sujet_id and not avis_id:
            return Response({"error": "Il faut spécifier un sujet ou un avis."}, status=status.HTTP_400_BAD_REQUEST)

        if sujet_id:
            try:
                sujet = Sujet.objects.get(id=sujet_id)
                favoris = Favoris.objects.create(utilisateur=utilisateur, sujet=sujet)
            except Sujet.DoesNotExist:
                return Response({"error": "Sujet introuvable"}, status=status.HTTP_404_NOT_FOUND)

        elif avis_id:
            try:
                avis = Avis.objects.get(id=avis_id)
                favoris = Favoris.objects.create(utilisateur=utilisateur, avis=avis)
            except Avis.DoesNotExist:
                return Response({"error": "Avis introuvable"}, status=status.HTTP_404_NOT_FOUND)

        return Response(FavorisSerializer(favoris).data, status=status.HTTP_201_CREATED)

    def get(self, request):
        """Récupérer tous les favoris d'un utilisateur"""
        favoris = Favoris.objects.filter(utilisateur=request.user)
        serializer = FavorisSerializer(favoris, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, id):
        """Supprimer un favori par son ID"""
        try:
            favori = Favoris.objects.get(id=id, utilisateur=request.user)
            favori.delete()
            return Response({"message": "Favori supprimé avec succès"}, status=status.HTTP_204_NO_CONTENT)
        except Favoris.DoesNotExist:
            return Response({"error": "Favori introuvable"}, status=status.HTTP_404_NOT_FOUND)



