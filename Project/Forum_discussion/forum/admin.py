from django.contrib import admin
from forum.models import Sujet, Utilisateur, Categorie, Produit

admin.site.register(Utilisateur)
admin.site.register(Categorie)
admin.site.register(Produit)
admin.site.register(Sujet)
