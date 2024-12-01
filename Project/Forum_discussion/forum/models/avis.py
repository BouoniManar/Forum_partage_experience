from forum.models.utilisateur import Utilisateur  # Import the Utilisateur model class
from forum.models.categorie import Categorie
from django.db import models

class Avis(models.Model):
    categorie = models.ForeignKey(Categorie, related_name='avis', on_delete=models.CASCADE)
    auteur = models.ForeignKey(Utilisateur, on_delete=models.CASCADE)  # Reference the model class, not the module
    commentaire = models.TextField()
    note = models.PositiveSmallIntegerField(choices=[(i, i) for i in range(1, 6)])
    date_pub = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Avis de {self.auteur.username} sur {self.categorie.name} - Note: {self.note}"
