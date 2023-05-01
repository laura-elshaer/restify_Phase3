from rest_framework import viewsets
from .serializer import userSerializers, RegisterSerializer, UpdateUserSerializer
from django.contrib.auth.models import User
from rest_framework.generics import CreateAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework.response import Response

 
from .serializer import MyTokenObtainPairSerializer
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView

class userviewsets(viewsets.ModelViewSet):
    permission_classes = () 
    authentication_classes = () 
    queryset = User.objects.all()
    serializer_class = userSerializers

class RegisterView(CreateAPIView):
    permission_classes = () 
    authentication_classes = () 
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

class Login(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = MyTokenObtainPairSerializer

class UpdateProfileView(UpdateAPIView):

    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = UpdateUserSerializer

@api_view(['GET'])
def user_list(request):
    users = User.objects.all()
    serialized_users = userSerializers(users, many=True)
    return Response(serialized_users.data)

