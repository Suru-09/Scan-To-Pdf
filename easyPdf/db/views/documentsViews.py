from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from ..bzl.documentBzl import get_all_create_doc


def getDocsCreateDoc(request, *args, **kwargs):
    return get_all_create_doc(request)
