from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from ..dto.userDTO import UserDto, UserLoginDto
from django.contrib.auth.models import User


@csrf_exempt
@api_view(['GET', 'POST'])
def get_all_create_user(request):
    if request.method == 'GET':
        return get_all_users(request)
    elif request.method == 'POST':
        return create_user(request)
    return Response('BAD REQUEST', status=status.HTTP_400_BAD_REQUEST)


@permission_classes([AllowAny])
def get_all_users(request):
    if request.method == 'GET':
        users = User.objects.all()
        user_dto = UserDto(users, many=True)
        return Response(user_dto.data)
    return Response('BAD REQUEST', status=status.HTTP_400_BAD_REQUEST)


@permission_classes([AllowAny])
def create_user(request):
    if request.method == 'POST':
        user_dto = UserDto(data=request.data)
        print(user_dto)
        if user_dto.is_valid():
            user_dto.save()
            return Response("User has been created!", status=status.HTTP_200_OK)
        return Response('User DTO not VALID OR ALREADY EXISTS(e.g. admin mindfuck)', status=status.HTTP_409_CONFLICT)
    return Response('BAD REQUEST', status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([AllowAny])
def find_user(request):
    if request.method == 'GET':
        user_dto = UserLoginDto(data=request.data)
        print(user_dto)
        if not user_dto.is_valid():
            username = user_dto.data.get('username')
            password = user_dto.data.get('password')
            found_user = authenticate(username=username, password=password)
            if not found_user:
                return Response("Incorrect Password/Username", status=status.HTTP_404_NOT_FOUND)
            return Response("You logged in", status=status.HTTP_200_OK)
    return Response('BAD REQUEST', status=status.HTTP_400_BAD_REQUEST)

