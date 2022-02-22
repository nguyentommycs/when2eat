from django.shortcuts import render
from rest_framework import viewsets,status
from .serializers import RoomSerializer, UserSerializer
from .models import Room, User
from rest_framework.decorators import action
from rest_framework.response import Response

# Create your views here.
class RoomView(viewsets.ModelViewSet):
    serializer_class = RoomSerializer
    queryset = Room.objects.all()


    @action(detail=True, methods=['post'])
    def post(self, request, format=None):
        room = Room()
        room.save()
        return Response(RoomSerializer(room).data)
class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    @action(detail=True, methods=['post'])
    def post(self, request, format=None):
        user = User(room=request.room,name=request.name)
        user.save()
        return Response(UserSerializer(user).data)
                