from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from ..bzl.documentBzl import get_all_docs


def getDocs(request, *args, **kwargs):
    return get_all_docs(request)