from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from ..serializers.userSerializer import UserSerializer, UserLoginSerializer

from ..models import MyUser


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
        users = MyUser.objects.all()
        user_dto = UserSerializer(users, many=True)
        return Response(user_dto.data)
    return Response('BAD REQUEST', status=status.HTTP_400_BAD_REQUEST)


@permission_classes([AllowAny])
def create_user(request):
    if request.method == 'POST':
        user_dto = UserSerializer(data=request.data)
        print(user_dto)
        if user_dto.is_valid():
            username = user_dto.data.get('username')
            password = user_dto.data.get('password')
            email = user_dto.data.get('email')
            user = MyUser(username=username, email=email)
            user.set_password(password)
            user.save()
            return Response("User has been created!", status=status.HTTP_200_OK)
        print(user_dto.errors)
        return Response('User DTO not VALID OR ALREADY EXISTS(e.g. admin mindfuck)', status=status.HTTP_409_CONFLICT)
    return Response('BAD REQUEST', status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def find_user(request):
    if request.method == 'POST':
        user_dto = UserLoginSerializer(data=request.data)
        print(user_dto)
        if user_dto.is_valid():
            username = user_dto.data.get('username')
            password = user_dto.data.get('password')
            found_user = authenticate(username=username, password=password)
            print(MyUser.objects.all())
            if not found_user:
                print(MyUser.objects.all().filter(username=username))
                return Response("Incorrect Password/Username", status=status.HTTP_404_NOT_FOUND)
            return Response(UserSerializer(found_user).data, status=status.HTTP_200_OK)
        print(user_dto.errors)
    return Response('BAD REQUEST', status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['UPDATE'])
@permission_classes([AllowAny])
def change_password(request):
    if request.method == 'UPDATE':
        my_user_id = request.data['id']
        password = request.data['password']
        user = MyUser.objects.get(id=my_user_id)
        if not user:
            return Response('Could not find user!', status=status.HTTP_404_NOT_FOUND)
        if not user.check_password(password):
            return Response('Password does not match!', status=status.HTTP_401_UNAUTHORIZED)
        user.set_password(request.data['new_password'])
        user.save()
        return Response("User has password been updated!", status=status.HTTP_200_OK)
    return Response('BAD REQUEST', status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['UPDATE'])
@permission_classes([AllowAny])
def change_email(request):
    if request.method == 'UPDATE':
        my_user_id = request.data['id']
        password = request.data['password']
        user = MyUser.objects.get(id=my_user_id)
        if not user:
            return Response('Could not find user!', status=status.HTTP_404_NOT_FOUND)
        if not user.check_password(password):
            return Response('Password does not match!', status=status.HTTP_401_UNAUTHORIZED)
        user.email = request.data['new_email']
        user.save()
        return Response("User email has been updated!", status=status.HTTP_200_OK)
    return Response('BAD REQUEST', status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['UPDATE'])
@permission_classes([AllowAny])
def change_username(request):
    if request.method == 'UPDATE':
        my_user_id = request.data['id']
        password = request.data['password']
        user = MyUser.objects.get(id=my_user_id)
        if not user:
            return Response('Could not find user!', status=status.HTTP_404_NOT_FOUND)
        if not user.check_password(password):
            return Response('Password does not match!', status=status.HTTP_401_UNAUTHORIZED)
        user.username = request.data.get('new_username')
        user.save()
        return Response("User has been updated!", status=status.HTTP_200_OK)
    return Response('BAD REQUEST', status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['UPDATE'])
@permission_classes([AllowAny])
def update_rating(request):
    if request.method == 'UPDATE':
        my_user_id = request.data['id']
        user = MyUser.objects.get(id=my_user_id)
        if not user:
            return Response('Could not find user!', status=status.HTTP_404_NOT_FOUND)
        print(float(request.data.get('rating')))
        user.rating = float(request.data.get('rating'))
        user.save()
        return Response("User has been updated!", status=status.HTTP_200_OK)
    return Response('BAD REQUEST', status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['GET'])
@permission_classes([AllowAny])
def get_rating(request):
    if request.method == 'GET':
        my_user_id = request.GET.get('id')
        user = MyUser.objects.get(id=my_user_id)
        if not user:
            return Response('Could not find user!', status=status.HTTP_404_NOT_FOUND)
        rate = user.rating if user.rating else False
        return Response({"rating": rate}, status=status.HTTP_200_OK)
    return Response('BAD REQUEST', status=status.HTTP_400_BAD_REQUEST)

