import os.path

from django.conf import settings
from django.http import FileResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from .ImageToPdf import ImageToPdf
from ..serializers.documentSerializer import DocumentSerializer, DocIDSerializer
from ..models import Document, IMG


@api_view(['GET', 'POST'])
def get_all_create_doc(request):
    if request.method == 'GET':
        return get_all_docs(request)
    elif request.method == 'POST':
        return create_doc(request)
    return Response('BAD REQUEST', status=status.HTTP_400_BAD_REQUEST)


@permission_classes([AllowAny])
def get_all_docs(request):
    if request.method == 'GET':
        documents = Document.objects.all()
        doc_dto = DocumentSerializer(documents, many=True)
        return Response(doc_dto.data)
    return Response('BAD REQUEST', status=status.HTTP_400_BAD_REQUEST)


@permission_classes([AllowAny])
def create_doc(request):
    if request.method == 'POST':
        doc_dto = DocumentSerializer(data=request.data)
        if doc_dto.is_valid():
            doc = doc_dto.save()
            print('DOCUMENT WTF')
            print(doc.id)
            return Response({'id': doc.id}, status=status.HTTP_200_OK)
        print(doc_dto.errors)
        return Response('DTO not VALID', status=status.HTTP_400_BAD_REQUEST)
    return Response('BAD REQUEST', status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['GET'])
@permission_classes([AllowAny])
def get_first_three_docs(request, *args, **kwargs):
    if request.method == 'GET':
        user_fk = request.data.lookup_url_kwarg
        documents = Document.objects.all().filter(user_fk=user_fk).order_by('date')[:3][::-1]
        doc_dto = DocumentSerializer(documents, many=True)
        return Response(doc_dto)
    return Response('BAD REQUEST', status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['GET'])
@permission_classes([AllowAny])
def get_first_three_docs_IDs(request):
    if request.method == 'GET':
        user_fk = request.GET.get('user_id')
        documents = Document.objects.all().filter(user_fk=user_fk).order_by('date')[::-1]
        doc_dto = DocumentSerializer(documents, many=True)
        return Response(doc_dto.data)
    return Response('BAD REQUEST', status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['DELETE'])
@permission_classes([AllowAny])
def delete_doc(request):
    if request.method == 'DELETE':
        print(request.data.get('id'))
        doc = Document.objects.get(id=request.data.get('id'))
        if doc:
            doc.delete()
            return Response("Document has been successfully deleted", status=status.HTTP_200_OK)
        return Response("[Invalid ID] Document was not found!", status=status.HTTP_404_NOT_FOUND)
    return Response('BAD REQUEST', status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def add_images_to_doc(request):
    if request.method == 'POST':
        doc_id = request.data.get('doc_id')
        images_arr = request.data('images_arr')
        if not doc_id or len(images_arr) == 0:
            return Response('Bad Request, invalid doc_id or no images array!', status=status.HTTP_400_BAD_REQUEST)

        for img_id in images_arr:
            image = IMG.objects.get(id=img_id)
            image.doc_fk = doc_id
            image.save(update_fields=["doc_fk"])

        return Response('All images have been updated accordingly to the document_id', status=status.HTTP_200_OK)
    return Response('BAD REQUEST', status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['GET'])
@permission_classes([AllowAny])
def get_pdf(request):
    if request.method == 'GET':
        doc_id = int(request.GET.get('doc_id'))
        pdf_name = request.GET.get('pdf_name')
        doc = Document.objects.get(id=doc_id)
        if not doc:
            return Response('Invalid document id!', status=status.HTTP_400_BAD_REQUEST)

        # given the document_id find all images related to id and save their paths in image_path list
        image_path = []
        images = IMG.objects.all()
        for img in images:
            if img.document_fk:
                print(f'IMG.doc_fk: {type(img.document_fk.id)}')
                print(type(doc_id))
                print(f'Egalitate: {img.document_fk.id == doc_id}')
                if img.document_fk.id == doc_id:
                    image_path.append(img.image)

        print(len(image_path))
        if len(image_path) > 0:
            pdf_path = ImageToPdf.image_to_pdf_list(image_path, settings.MEDIA_ROOT, pdf_name)
            pdf = FileResponse(open(pdf_path, 'rb'))
            return pdf
    return Response('BAD REQUEST', status=status.HTTP_400_BAD_REQUEST)