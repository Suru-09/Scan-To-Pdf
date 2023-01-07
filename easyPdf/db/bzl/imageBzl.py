from django.conf import settings
from django.core import serializers
from django.http import HttpResponse, FileResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response

# Python imports
import os
import base64
from PIL import Image
import tempfile
from zipfile import ZipFile

# serializers
from ..serializers.documentSerializer import DocIDSerializer
from ..serializers.imageSerializer import ImageSerializer, ImgB64Serializer, EntireImageSerialiser

# models
from ..models import IMG, Document


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
            print(image.id)
            return Response({'id': image.id}, status=status.HTTP_200_OK)
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
@api_view(['GET'])
@permission_classes([AllowAny])
def get_three_images_homepage(request):
    if request.method == 'GET':
        us_id = request.GET.get('id')
        print(f'User_id: {us_id}')

        temp_dir = tempfile.TemporaryDirectory()
        image_paths = []
        docs = Document.objects.filter(user_fk=us_id).order_by('-date')[:3]
        for doc in docs:
            img = IMG.objects.filter(order_no=1, document_fk=doc.id)[:1][0]
            image_path = str(settings.BASE_DIR) + img.image.url
            image_path = os.path.abspath(os.path.expanduser(image_path))
            image_paths.append(image_path)

        for path in image_paths:
            image = Image.open(path).resize((800, 600))
            image.save(os.path.join(temp_dir.name, path))

        with ZipFile(os.path.join(temp_dir.name, 'images.zip'), 'w') as zip_file:
            for path in image_paths:
                zip_file.write(os.path.join(temp_dir.name, path), arcname=os.path.basename(path))

        response = FileResponse(open(os.path.join(temp_dir.name, 'images.zip'), 'rb'), content_type='application/zip')
        temp_dir.cleanup()
        return response
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



@csrf_exempt
@api_view(['GET'])
@permission_classes([AllowAny])
def get_image_after_id(request):
    if request.method == 'GET':
        doc_id = request.GET.get('doc_id')
        print(doc_id)
        img_querry = IMG.objects.all().filter(document_fk=doc_id)[:1]
        img = None
        if len(img_querry) > 0:
            img = img_querry[0]
        print(img)
        if img:
            try:
                image_path = str(settings.BASE_DIR) + img.image.url
                image_path = os.path.abspath(os.path.expanduser(image_path))
                image = Image.open(image_path).resize((800, 600))
                temp_path = f"temp_${doc_id}.jpg"
                image.save(temp_path)
                with open(temp_path, 'rb') as image_file:
                    image_data = base64.b64encode(image_file.read()).decode('utf-8')
                    # Test to see whether creating a pdf works
                    # ImageToPdf.image_to_pdf_list([image_path], settings.MEDIA_ROOT, "myPdf")
                doc = Document.objects.all().get(id=doc_id)
                response_dict = {
                    "image_b64": image_data,
                    "id": img.id,
                    "url": img.url,
                    "order_no": img.order_no,
                    "size": img.size,
                    "document_fk": img.document_fk.id,
                    "date": doc.date,
                    "name": doc.name
                }
                os.remove(temp_path)
                return Response(response_dict,
                                status=status.HTTP_200_OK)
            except FileNotFoundError:
                return Response("Image ID is invalid, could not find an image/image path!",
                                status=status.HTTP_404_NOT_FOUND)
    return Response('BAD REQUEST', status=status.HTTP_400_BAD_REQUEST)
