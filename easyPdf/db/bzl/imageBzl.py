from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response

# serializers
from ..serializers.documentSerializer import DocIDSerializer
from ..serializers.imageSerializer import ImageSerializer, ImageIDSerializer

# my model
from ..models import IMG

# Other business logic imports
import io, base64
from io import BytesIO
from PIL import Image


@csrf_exempt
@api_view(['GET', 'POST'])
def get_all_create_image(request):
    if request.method == 'GET':
        return get_all_images(request)
    elif request.method == 'POST':
        return create_image(request)
    return Response("Invalid request", status=status.HTTP_400_BAD_REQUEST)


@permission_classes([AllowAny])
def get_all_images(request):
    if request.method == 'GET':
        images = IMG.objects.all()
        image_dto = ImageSerializer(images, many=True)
        return Response(image_dto.data)
    return Response('BAD REQUEST', status=status.HTTP_400_BAD_REQUEST)


@permission_classes([AllowAny])
def create_image(request):
    if request.method == 'POST':
        image_serializer = ImageSerializer(data=request.data)
        if not image_serializer.is_valid():
            img_io = BytesIO()

            image_data=request.data.get('image')
            img = Image.open(io.BytesIO(base64.decodebytes(bytes(image_data, "utf-8"))))
            order_no=request.data.get('order_no')
            size=request.data.get('size')
            document_fk=request.data.get('document_fk')

            img.save(img_io,format='JPEG',quality=100)
            image = IMG(image=img_io, order_no=order_no, size=size, document_fk=document_fk)
            print(img)
            image.save()
            return Response("Image has been created!", status=status.HTTP_200_OK)
        print(image_serializer.errors)
    return Response('BAD REQUEST', status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['GET'])
@permission_classes([AllowAny])
def get_images_for_document(request):
    doc_serializer = DocIDSerializer(data=request.data)
    if request.method == 'GET':
        if doc_serializer.is_valid():
            doc_id = doc_serializer.data.get('doc_id')
            images = IMG.objects.get(doc_fk=doc_id)
            image_serializer = ImageSerializer(images, many=True)
            image_serializer.is_valid(raise_exception=True)
            return Response(image_serializer.validated_data)
        print(doc_serializer.errors)
    return Response('BAD REQUEST', status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['DELETE'])
@permission_classes([AllowAny])
def delete_image(request):
    if request.method == 'DELETE':
        image_serializer = ImageIDSerializer(data=request.data)
        if image_serializer.is_valid():
            image = IMG.objects.get(id=image_serializer.data.get('id'))
            if image:
                image.delete()
                return Response("Image has been deleted!", status=status.HTTP_200_OK)
            return Response("Image ID is invalid, could not find an image!", status=status.HTTP_404_NOT_FOUND)
        print(image_serializer.errors)
    return Response('BAD REQUEST', status=status.HTTP_400_BAD_REQUEST)
