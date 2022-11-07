from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializer import UserSerializer
from .models import User
class UserView(APIView):
    def post (self, request):
        new_user = UserSerializer(data=request.data)
        if new_user.is_valid():
            new_user.save()
            return Response(data=new_user.data, status=status.HTTP_201_CREATED)
        else: 
            return Response(data=new_user.errors, status=status.HTTP_400_BAD_REQUEST)
class GetUser(APIView):
    def get(self, request,pk):
        try:
            data = User.objects.get(id=pk)
            user = UserSerializer(data)
            return Response(data=user.data, status=status.HTTP_202_ACCEPTED)
        except:
            return Response({'error': 'user not found'},status=status.HTTP_404_NOT_FOUND)


