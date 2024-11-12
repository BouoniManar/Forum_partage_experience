from django.contrib import admin
from .models import Utilisateur, Categorie, Produit

admin.site.register(Utilisateur)
admin.site.register(Categorie)
admin.site.register(Produit)
