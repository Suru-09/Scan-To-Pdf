from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from ..serializers.documentSerializer import DocumentSerializer
from ..models import Document


@api_view(['GET', 'PUT'])
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
            doc_dto.save()
            return Response("Document has been created!", status=status.HTTP_200_OK)
        return Response('DTO not VALID', status=status.HTTP_400_BAD_REQUEST)
    return Response('BAD REQUEST', status=status.HTTP_400_BAD_REQUEST)


@permission_classes([AllowAny])
def get_first_three_docs(request, *args, **kwargs):
    if request.method == 'GET':
        user_fk = request.data.lookup_url_kwarg
        documents = Document.objects.all().filter(user_fk=user_fk).order_by('date')[:3][::-1]
        doc_dto = DocumentSerializer(documents, many=True)
        return Response(doc_dto.data)
    return Response('BAD REQUEST', status=status.HTTP_400_BAD_REQUEST)
