from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from forum.models.categorie import Categorie
from .serializers import CategorieSerializer, UserSerializer


# Registration API - User registration
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