from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response

# Python imports
import os
import base64

from .ImageToPdf import ImageToPdf
# serializers
from ..serializers.documentSerializer import DocIDSerializer
from ..serializers.imageSerializer import ImageSerializer, ImgB64Serializer, EntireImageSerialiser

# models
from ..models import IMG


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
        image_serializer = EntireImageSerialiser(images, many=True)
        return Response(image_serializer.data, status=status.HTTP_200_OK)
    return Response('BAD REQUEST', status=status.HTTP_400_BAD_REQUEST)


@permission_classes([AllowAny])
def create_image(request):
    print("Am intrat pe create_image!")
    if request.method == 'POST':
        image_serializer = ImgB64Serializer(data=request.data)
        if image_serializer.is_valid():
            image = image_serializer.save()
            return Response(JsonResponse({'id': image.id}), status=status.HTTP_200_OK)
        print(image_serializer.errors)
        return Response(image_serializer.errors, status=status.HTTP_417_EXPECTATION_FAILED)
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
        return Response(doc_serializer.errors, status=status.HTTP_417_EXPECTATION_FAILED)
    return Response('BAD REQUEST', status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['DELETE'])
@permission_classes([AllowAny])
def delete_image(request):
    if request.method == 'DELETE':
        img_id = request.data.get('id')
        img = IMG.objects.get(id=img_id)
        if img:
            # BASE_DIR instead of MEDIA_ROOT (it does not contain /media which is already contained by image url)
            image_path = str(settings.BASE_DIR) + img.image.url
            # abspath, followed by expanduser transform path either to
            # Windows or UNIX depending on needs (a.k.a \ vs / in paths)
            image_path = os.path.abspath(os.path.expanduser(image_path))
            if os.path.isfile(image_path):
                # also remove the jpg/png which is linked to the url in the database
                os.remove(image_path)
                img.delete()
                return Response("Image has been deleted!", status=status.HTTP_200_OK)
        return Response("Image ID is invalid, could not find an image/image path!", status=status.HTTP_404_NOT_FOUND)
    return Response('BAD REQUEST', status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['GET'])
@permission_classes([AllowAny])
def get_b64_image_after_id(request):
    if request.method == 'GET':
        img_id = request.data.get('id')
        img = IMG.objects.get(id=img_id)
        if img:
            try:
                image_path = str(settings.BASE_DIR) + img.image.url
                image_path = os.path.abspath(os.path.expanduser(image_path))
                with open(image_path, 'rb') as image_file:
                    image_data = base64.b64encode(image_file.read()).decode('utf-8')
                    # Test to see whether creating a pdf works
                    # ImageToPdf.image_to_pdf_list([image_path], settings.MEDIA_ROOT, "myPdf")
                response_dict = {
                    "image_b64": image_data,
                    "id": img.id,
                    "url": img.url,
                    "order_no": img.order_no,
                    "size": img.size,
                    "document_fk": img.document_fk.id
                }
                return Response(response_dict,
                                status=status.HTTP_200_OK)
            except FileNotFoundError:
                return Response("Image ID is invalid, could not find an image/image path!",
                                status=status.HTTP_404_NOT_FOUND)
    return Response('BAD REQUEST', status=status.HTTP_400_BAD_REQUEST)
