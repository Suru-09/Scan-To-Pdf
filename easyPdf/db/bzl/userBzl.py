from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from ..dto.userDTO import UserDto
from django.contrib.auth.models import User


@api_view(['GET'])
@permission_classes((AllowAny,))
def get_users(request):
    if request.method == 'GET':
        users = User.objects.all()
        user_dto = UserDto(users, many=True)
        return Response(user_dto.data)
    else:
        return Response('wtf', status=status.HTTP_400_BAD_REQUEST)
