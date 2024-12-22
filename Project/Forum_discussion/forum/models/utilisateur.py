from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

class Utilisateur(AbstractUser):
    role = models.CharField(max_length=50)
    profile_picture = models.ImageField(upload_to='profiles/', null=True, blank=True)
    email = models.EmailField(max_length=30)

    groups = models.ManyToManyField(Group, related_name='utilisateur_set', blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name='utilisateur_set', blank=True)











""" from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, Group, Permission
from django.db import models

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, role='utilisateur', **extra_fields):
        if not email:
            raise ValueError("L'utilisateur doit avoir une adresse email")
        
        email = self.normalize_email(email)
        user = self.model(email=email, role=role, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        user = self.create_user(email, password, role='admin', **extra_fields)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser, PermissionsMixin):
    ROLES = (
        ('utilisateur', 'Utilisateur'),
        ('admin', 'Admin'),
    )
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=11, choices=ROLES, default='utilisateur')
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
 
    groups = models.ManyToManyField(
        Group,
        related_name="custom_user_groups",
        blank=True,
        help_text="The groups this user belongs to.",
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name="custom_user_permissions",
        blank=True,
        help_text="Specific permissions for this user.",
    )
    
    objects = UserManager()

   
    
    def __str__(self):
        return self.email
 """