from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from ..dto.userDTO import UserDto
from django.contrib.auth.models import User


@api_view(['GET', 'POST'])
def get_all_create_user(request):
    if request.method == 'GET':
        return get_all_users(request)
    elif request.method == 'PUT':
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
        if user_dto.is_valid():
            user_dto.save()
            return Response("User has been created!", status=status.HTTP_200_OK)
        return Response('User DTO not VALID', status=status.HTTP_400_BAD_REQUEST)
    return Response('BAD REQUEST', status=status.HTTP_400_BAD_REQUEST)
