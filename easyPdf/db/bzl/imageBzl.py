from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from ..dto.imageDTO import ImageDto
from ..models import Image


@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_images(request):
    if request.method == 'GET':
        images = Image.objects.all()
        image_dto = ImageDto(images, many=True)
        return Response(image_dto.data)
    else:
        return Response('BAD REQUEST', status=status.HTTP_400_BAD_REQUEST)
