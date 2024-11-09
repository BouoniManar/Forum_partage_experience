from django.db import models




class Categorie(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField()
""" 
    def ajouter_categorie(self):
        pass

    def modifier_categorie(self):
        pass

    def __str__(self):
        return self.name """