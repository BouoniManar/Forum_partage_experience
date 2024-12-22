# Generated by Django 5.1.2 on 2024-12-22 10:24

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('forum', '0010_remove_avis_produit_avis_categorie'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sujet',
            name='utilisateur',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
