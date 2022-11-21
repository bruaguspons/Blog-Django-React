from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate

from .serializer import UserSerializer
from .models import User
class UserView(APIView):
    def post (self, request):
        new_user = UserSerializer(data=request.data)
        if new_user.is_valid():
            new_user.save()
            token = Token.objects.create(user_id=new_user.data.get('id'))
            return Response(data={'token': token.key, 'name': new_user.data.get('name'), 'email': new_user.data.get('email'), 'id': new_user.data.get('id')}, status=status.HTTP_201_CREATED)
        else: 
            return Response(data=new_user.errors, status=status.HTTP_400_BAD_REQUEST)

class GetUser(APIView):
    authentication_classes = [TokenAuthentication]
    
    def get(self, request):
        token = request.headers.get('Authorization')
        if not token:
            return Response({'error':'No Token. Authorization Denied'}, status=status.HTTP_401_UNAUTHORIZED)
        data = User.objects.get(id=request.user.id)
        user = UserSerializer(data)
        return Response(user.data)
    
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if email=='' or password=='':
            return Response({'error': 'passwor or email are blank'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = authenticate(email=email, password=password)
        if not user:
            return Response({'error': 'Invalid Credentials'},status=status.HTTP_404_NOT_FOUND)
        data = User.objects.get(request.user.id)
        user = UserSerializer(data)
        return Response(data=user.data, status=status.HTTP_202_ACCEPTED)


