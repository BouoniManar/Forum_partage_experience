from django.db import models
from forum.models import Utilisateur  # Import the Utilisateur model

class Commentaire(models.Model):
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    Utilisateur = models.ForeignKey(Utilisateur, on_delete=models.CASCADE, default=1)  # or specify an existing Utilisateur ID here
    sujet = models.ForeignKey('forum.Sujet', related_name='commentaires', on_delete=models.CASCADE)

    def __str__(self):
        return f"Commentaire de {self.Utilisateur} sur {self.sujet}"
