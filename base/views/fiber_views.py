from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from rest_framework import status
from base.serializers import CableSerializer, SpliceSerializer
from base.models import Cable, Event,FiberSplice

from datetime import datetime



@api_view(['GET'])
def getTubes(request):
    return Response("done")

@api_view(['GET'])
def getCables(request):
    cables = Cable.objects.all()
    serializer = CableSerializer(cables, many=True)
    return Response({'cables':serializer.data})

@api_view(['POST'])
def setSplice(request):
    user = request.user
    data= request.data

    splices =data['splices']


    event=Event.objects.create(
         user = user,
         paid = False,
    )
    for i in splices:
        cable1=Cable.objects.get(_id=i['cableid']['cableid']['_id'])
        cable2=Cable.objects.get(_id=i['cableid']['cableid2']['_id'])
        spliced=FiberSplice.objects.create(
             user=user,
             event = event,
             cableID = cable1,
             cableID2 = cable2,
              fiber1 = i['cableid']['fiberList'][0],
              fiber2 = i['cableid']['fiberList'][1],
              tube1=i['cableid']['tubeid'],
              tube2=i['cableid']['tubeid2'],)
    return Response("finished")

