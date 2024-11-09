from django.db import models
from forum.models.produit import Produit
from forum.models.utilisateur import Utilisateur



class Sujet(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    utilisateur = models.ForeignKey(Utilisateur, related_name='sujets', on_delete=models.CASCADE)
    produit = models.ForeignKey(Produit, related_name='sujets', on_delete=models.CASCADE)
    
    
    
    

    """ def creer_sujet(self):
        pass

    def modifier_sujet(self):
        pass

    def supprimer_sujet(self):
        pass

    def __str__(self):
        return self.title
 """













""" from django.db import models
from .Utilisateur import Utilisateur
from .produit import Produit  # Assuming 'Produit' is defined in 'Produit.py' in the same directory

class Sujet(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    Utilisateur = models.ForeignKey(Utilisateur, related_name='sujets', on_delete=models.CASCADE)
    produit = models.ForeignKey(Produit, related_name='sujets', on_delete=models.CASCADE)

    def __str__(self):
        return self.title
 """