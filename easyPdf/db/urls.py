from django.urls import path
from .views.userViews import getUsers
from .views.documentsViews import getDocs
from .views.imagesViews import getImages

urlpatterns = [
    path('get-users', getUsers),
    path('get-documents', getDocs),
    path('get-images', getImages)
]
