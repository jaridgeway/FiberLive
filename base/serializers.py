from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Tube,Cable,FiberSplice,Event

class TubeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tube
        fields = '__all__'

class CableSerializer(serializers.ModelSerializer):
    tubes=serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Cable
        fields = '__all__'

    def get_tubes(self,obj):
        tubes=obj.tube_set.all()
        serializer=TubeSerializer(tubes,many=True)
        return serializer.data
    
class SpliceSerializer(serializers.ModelSerializer):
    class Meta:
        model = FiberSplice
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id','_id', 'username', 'email', 'name', 'isAdmin']

    def get__id(self, obj):
        return obj.id
    
    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_name(self,obj):
        name = obj.first_name
        if name =="":
            name=obj.email

        return name

class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id','_id', 'username', 'email', 'name', 'isAdmin', 'token']
    
    def get_token(self,obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
