from django.urls import path, include
from .views.userViews import getUsersCreateUser
from .views.documentsViews import getDocsCreateDoc
from .views.imagesViews import getImagesCreateImage

user_patterns = [
    path('', getUsersCreateUser),
]
urlpatterns = [
    path('users', include(user_patterns)),
    path('documents', getDocsCreateDoc),
    path('images', getImagesCreateImage)
]
