""" from django.db import models
from forum.models.utilisateur import Utilisateur
from forum.models.sujet import Sujet
from forum.models.avis import Avis

class Favoris(models.Model):
    utilisateur = models.ForeignKey(Utilisateur, on_delete=models.CASCADE, related_name='favoris')
    sujet = models.ForeignKey(Sujet, on_delete=models.CASCADE, related_name='favoris', null=True, blank=True)
    avis = models.ForeignKey(Avis, on_delete=models.CASCADE, related_name='favoris', null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        if self.sujet:
            return f"Favori de {self.utilisateur.username} sur le sujet {self.sujet.title}"
        if self.avis:
            return f"Favori de {self.utilisateur.username} sur l'avis pour {self.avis.produit.name}"
        return "Favori inconnu"""
from django.db import models
from forum.models.utilisateur import Utilisateur
from forum.models.sujet import Sujet
from forum.models.avis import Avis

class Favoris(models.Model):
    utilisateur = models.ForeignKey(Utilisateur, on_delete=models.CASCADE, related_name='favoris')
    sujet = models.ForeignKey(Sujet, on_delete=models.CASCADE, related_name='favoris', null=True, blank=True)
    avis = models.ForeignKey(Avis, on_delete=models.CASCADE, related_name='favoris', null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        if self.sujet:
            return f"Favori de {self.utilisateur.username} sur le sujet {self.sujet.title}"
        if self.avis:
            return f"Favori de {self.utilisateur.username} sur l'avis pour {self.avis.produit.name}"
        return "Favori inconnu"

    # Vulnérabilité intentionnelle
    def creer_favori(self, sujet=None, avis=None):
        """ Créer un favori sans vérifier la validité des objets passés. """
        if not sujet and not avis:
            raise ValueError("Le sujet ou l'avis doit être fourni.")  # Manque de validation
        self.sujet = sujet
        self.avis = avis
        self.save()

    def get_favori(self):
        """ Renvoie un favori sans vérifier s'il existe vraiment. """
        return Favoris.objects.get(id=self.id)  # Risque de `DoesNotExist`



