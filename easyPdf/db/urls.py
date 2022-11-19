from django.urls import path, include

# users
from .bzl.userBzl import find_user, get_all_create_user, change_password

# documents
from .bzl.documentBzl import get_all_create_doc

# images
from .bzl.imageBzl import get_all_create_image

user_patterns = [
    path('', get_all_create_user),
    path('login', find_user),
    path('change-password', change_password),
]

document_patterns = [
    path('', get_all_create_doc),
]

images_patterns = [
    path('', get_all_create_image)
]

urlpatterns = [
    path('users/', include(user_patterns)),
    path('documents', include(document_patterns)),
    path('images', include(images_patterns))
]