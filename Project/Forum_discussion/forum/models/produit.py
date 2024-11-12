from django.db import models

from forum.models.categorie import Categorie


class Produit(models.Model):
    name = models.CharField(max_length=255)
    category = models.ForeignKey(Categorie, related_name='produits', on_delete=models.CASCADE)
    description = models.TextField()
    image = models.ImageField(upload_to='produits/', null=True, blank=True)
    
    def __str__(self):
        return f"Produit de {self.name} "

"""     def afficher_details(self):
        pass

    def ajouter_avis(self, commentaire):
        pass

    def __str__(self):
        return self.name
 """



















""" from django.db import models

from forum.models.categorie import Categorie


class Produit(models.Model):
    name = models.CharField(max_length=255)
    category = models.ForeignKey(Categorie, related_name='produits', on_delete=models.CASCADE)
    description = models.TextField()
    image = models.ImageField(upload_to='produits/', null=True, blank=True)

    def afficher_details(self):
        pass

    def ajouter_avis(self, commentaire):
        pass

    def __str__(self):
        return self.name
 """