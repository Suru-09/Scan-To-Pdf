from django.urls import path, include

# users
from .views.userViews import getUsersCreateUser, log_user

# documents
from .views.documentsViews import getDocsCreateDoc

# images
from .views.imagesViews import getImagesCreateImage

user_patterns = [
    path('', getUsersCreateUser),
    path('login', log_user)
]

document_patterns = [
    path('', getDocsCreateDoc),
]

images_patterns = [
    path('', getImagesCreateImage)
]

urlpatterns = [
    path('users/', include(user_patterns)),
    path('documents', include(document_patterns)),
    path('images', include(images_patterns))
]
