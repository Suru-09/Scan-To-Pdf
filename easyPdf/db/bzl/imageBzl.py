from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from ..dto.imageDTO import ImageDto
from ..models import Image


@api_view(['GET', 'PUT'])
def get_all_create_image(request):
    if request.method == 'GET':
        return get_all_images(request)
    elif request.method == 'PUT':
        return create_image(request)
    return Response("Invalid request", status=status.HTTP_400_BAD_REQUEST)


@permission_classes([AllowAny])
def get_all_images(request):
    if request.method == 'GET':
        images = Image.objects.all()
        image_dto = ImageDto(images, many=True)
        return Response(image_dto.data)
    return Response('BAD REQUEST', status=status.HTTP_400_BAD_REQUEST)


@permission_classes([AllowAny])
def create_image(request):
    if request.method == 'PUT':
        image_dto = ImageDto(data=request.data)
        if image_dto.is_valid():
            image_dto.save()
            return Response("Image has been created!", status=status.HTTP_200_OK)
        return Response('Image DTO not VALID', status=status.HTTP_400_BAD_REQUEST)
    return Response('BAD REQUEST', status=status.HTTP_400_BAD_REQUEST)
