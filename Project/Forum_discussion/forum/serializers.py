from django.contrib.auth.models import User
from forum.models.favoris import Favoris
from rest_framework import serializers

from forum.models.utilisateur import Utilisateur
from .models import Categorie
from forum.models import Sujet, Commentaire, Avis

    
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
    
    


class CategorieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categorie
        fields = ['id', 'name', 'description']



class SujetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sujet
        fields = ['id', 'title', 'content', 'created_at', 'utilisateur', 'categorie']
        
        

class CommentaireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Commentaire
        fields = ['id', 'content', 'created_at', 'Utilisateur', 'sujet']
        
        

class AvisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Avis
        fields = ['id', 'categorie', 'auteur', 'commentaire', 'note', 'date_pub']
        
        
class FavorisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favoris
        fields = ['id', 'utilisateur', 'sujet', 'avis', 'created_at']
        read_only_fields = ['created_at']  # La date de création ne doit pas être modifiable