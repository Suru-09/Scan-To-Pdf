from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from ..bzl.imageBzl import get_all_images


def getImages(request, *args, **kwargs):
    return get_all_images(request)
