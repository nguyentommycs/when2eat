from time import strftime, strptime
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
        print("request",request)
        body_data = json.loads(request.body)
        room = Room(date=body_data['date'][0:10],meal=body_data['meal'])
        room.save()
        return Response(RoomSerializer(room).data)
    def list(self, request):
        code = request.GET.get('code')
        room = Room.objects.get(code=code)
        return Response(RoomSerializer(room).data)   

  
class UserView(viewsets.ModelViewSet):

    serializer_class = UserSerializer
    queryset = User.objects.all()

    def create(self, request, format=None):
        print("request",request)
        body_data = json.loads(request.body)
        user = User(room=Room.objects.get(code=body_data['code']),name=body_data['name'],cuisine=body_data['cuisine'],start_time=body_data['start_time'],end_time=body_data['end_time'])
        user.save()
        return Response(UserSerializer(user).data)
    def list(self, request):
        code = request.GET.get('code')
        currentRoom = Room.objects.get(code=code)
        #users = User.objects.filter(room=currentRoom)
        users = currentRoom.user_set.all()
        return Response(UserSerializer(users,many=True).data)   

class BestTimeView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = Room.objects.all()
    
    def list(self, request):
        code = request.GET.get('code')
        room = Room.objects.get(code=code)
        users = room.user_set.all()
        if len(users)==0:
            return Response({
            'best_time':'',
            'best_cuisine':'',
            'available_users':'',
            'unavailable_users':''
            })   
        #finite set of times (every hour)
        #check if a person is available from that hour to the end of the next hour
        #for each hour, check EACH of the users to see if they are available
        #keep track of the most populous time, favor times closest to 7PM
        allTimes = {}
        bestTime = None
        prefTime = 19
        mealTime = RoomSerializer(room).data['meal']
        if mealTime == 'Breakfast':
            prefTime = 8
        if mealTime == 'Lunch':
            prefTime = 12
        for i in range(0,23):
            allTimes[i]=set()
            for user in users:
                data = UserSerializer(user).data
                if i >= int(data['start_time'][0:2]) and (i+1) <= int(data['end_time'][0:2]):
                    allTimes[i].add(user)
                    if bestTime is None:
                        bestTime=i
                    elif len(allTimes[i]) > len(allTimes[bestTime]) or (len(allTimes[i])== len(allTimes[bestTime]) and abs(i-prefTime)<abs(bestTime-prefTime)):
                        bestTime=i

        #set of available users is allTimes[bestTime]
        allCuisines={}
        bestCuisine = 'No Preference'

        for user in allTimes[bestTime]:
            data = UserSerializer(user).data
            cuisine = data['cuisine']
            if len(cuisine)>=1 and cuisine!='No Preference':
                if cuisine in allCuisines:
                    allCuisines[cuisine]=allCuisines[cuisine]+1
                else:
                    allCuisines[cuisine]=1
                if bestCuisine=='No Preference':
                    bestCuisine=cuisine
                elif allCuisines[cuisine]>allCuisines[bestCuisine]:
                    bestCuisine= cuisine
        #convert time into readable string
        bestTimeStr = str(int(bestTime)%12)
        if bestTime>=12:
            if bestTimeStr=='0':
                bestTimeStr='12'
            bestTimeStr = bestTimeStr + ' PM'
        else:
            bestTimeStr=bestTimeStr + ' AM'

        unavailUsers =[]
        for user in users:
            if user not in allTimes[bestTime]:
                unavailUsers.append(user)

        #need to return: list of available users, string for best time, string for best cuisine
        return Response(
            {'best_time':bestTimeStr,
            'best_cuisine':bestCuisine,
            'available_users':UserSerializer(list(allTimes[bestTime]),many=True).data,
            'unavailable_users':UserSerializer(unavailUsers,many=True).data
            })   
