from django.urls import path, include

# users
from .bzl.userBzl import find_user, get_all_create_user, change_password

# documents
from .bzl.documentBzl import get_all_create_doc, delete_doc, get_first_three_docs

# images
from .bzl.imageBzl import get_all_create_image, delete_image, get_images_for_document, get_b64_image_after_id

user_patterns = [
    path('', get_all_create_user),
    path('login', find_user),
    path('change-password', change_password),
]

document_patterns = [
    path('', get_all_create_doc),
    path('delete-doc', delete_doc),
    path('get-first-three-docs', get_first_three_docs)
]

images_patterns = [
    path('', get_all_create_image),
    path('delete-image', delete_image),
    path('get-images-for-doc', get_images_for_document),
    path('get-b64-img', get_b64_image_after_id),
]

urlpatterns = [
    path('users/', include(user_patterns)),
    path('documents/', include(document_patterns)),
    path('images/', include(images_patterns))
]