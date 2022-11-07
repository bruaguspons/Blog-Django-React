from django.db import models

from django.contrib.auth.models import BaseUserManager, AbstractBaseUser


class userManager(BaseUserManager):
    use_in_migrations: True
    def create_user(self, name, email, password=None):
        if not email:
            raise ValueError('Users must have an email')
        if not name:
            raise ValueError("Users must have names")
        
        email = self.normalize_email(email)
        name = name.strip()
        user = self.model(name=name, email=email)
        user.set_password(password)
        user.save(useing=self._db)
        return user

    def create_superuser(self, name, email, password=None):
        if not email:
            raise ValueError('superUser must have an email')
        if not name:
            raise ValueError("superUser must have names")
        email = self.normalize_email(email)
        name = name.strip()

class User(AbstractBaseUser):
    name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    date = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'
    objects = userManager()

    def __str__(self):
        return self.email


class Profile(models.Model):
    user = models.OneToOneField('User', on_delete=models.CASCADE, related_name='profile', blank=True)
    location = models.CharField(max_length=255, blank=True)
    status = models.CharField(max_length=100)
    skills = models.TextField(help_text="Comma Seperated value")
    bio = models.TextField()
    twitter = models.CharField(max_length=255, blank=True)
    facebook = models.CharField(max_length=255, blank=True)
    instagram = models.CharField(max_length=255, blank=True)
    linkedin = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.user.name
