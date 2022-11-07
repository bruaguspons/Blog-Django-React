from rest_framework import serializers
from .models import User, Profile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields =[
            'id',
            'name',
            'email',
            'date',
            'password'
        ]
        extra_kwargs = {'password': {'write_only':True, 'required':True}}
        
        def create(self, validate_data):
            user = User.object.create_user(**validate_data)
            user.save()
            return user

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model=Profile
        fields = [
            'id', 'user', 
            'location', 'status',
            'skills', 'bio',
            'twitter', 'facebook',
            'instagram', 'linkedin',
        ]