from django.urls import path, include

# users
from .bzl.userBzl import find_user, get_all_create_user, \
    change_password, change_username, change_email

# documents
from .bzl.documentBzl import get_all_create_doc, delete_doc, \
    get_first_three_docs, add_images_to_doc, get_pdf, get_first_three_docs_IDs

# images
from .bzl.imageBzl import get_all_create_image, delete_image, \
    get_images_for_document, get_b64_image_after_id, get_three_images_homepage, get_image_after_id

user_patterns = [
    path('', get_all_create_user),
    path('login', find_user),
    path('change-password', change_password),
    path('change-username', change_username),
    path('change-email', change_email),
]

document_patterns = [
    path('', get_all_create_doc),
    path('doc', delete_doc),
    path('first-three-docs', get_first_three_docs),
    path('images_to_doc', add_images_to_doc),
    path('pdf', get_pdf),
    path('first-three-docs-ids', get_first_three_docs_IDs)
]

images_patterns = [
    path('', get_all_create_image),
    path('image', delete_image),
    path('images-for-doc', get_images_for_document),
    path('image-b64', get_b64_image_after_id),
    path('images-for-homepage', get_three_images_homepage),
    path('image-after-id', get_image_after_id)
]

urlpatterns = [
    path('users/', include(user_patterns)),
    path('documents/', include(document_patterns)),
    path('images/', include(images_patterns))
]