from django.shortcuts import render
from rest_framework import viewsets,status
from .serializers import RoomSerializer, UserSerializer
from .models import Room, User
from rest_framework.decorators import action
from rest_framework.response import Response
import json
# Create your views here.
class RoomView(viewsets.ModelViewSet):
    serializer_class = RoomSerializer
    queryset = Room.objects.all()


    def create(self, request, format=None):
        room = Room()
        room.save()
        return Response(RoomSerializer(room).data)


  
class UserView(viewsets.ModelViewSet):

    serializer_class = UserSerializer
    queryset = User.objects.all()

    def create(self, request, format=None):
        print("request",request)
        body_data = json.loads(request.body)
        user = User(room=Room.objects.get(code=body_data['code']),name=body_data['name'],cuisine=body_data['cuisine'])
        user.save()
        return Response(UserSerializer(user).data)
    def list(self, request):
        code = request.GET.get('code')
        currentRoom = Room.objects.get(code=code)
        users = User.objects.filter(room=currentRoom)
        return Response(UserSerializer(users,many=True).data)   