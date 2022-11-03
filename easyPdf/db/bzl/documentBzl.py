from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from ..dto.documentDTO import DocumentDto
from ..models import Document


@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_docs(request):
    if request.method == 'GET':
        documents = Document.objects.all()
        doc_dto = DocumentDto(documents, many=True)
        return Response(doc_dto.data)
    else:
        return Response('BAD REQUEST', status=status.HTTP_400_BAD_REQUEST)
