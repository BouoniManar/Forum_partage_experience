from django.db import models




class Categorie(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField()

    def __str__(self):
        return f"{self.name} - {self.description[:50]}"  # Affiche seulement les 50 premiers caractères de la description

   
   
   
   
   
   
    
""" 
    def ajouter_categorie(self):
        pass

    def modifier_categorie(self):
        pass

    def __str__(self):
        return self.name """