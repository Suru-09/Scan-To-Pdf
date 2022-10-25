from django.urls import path
from .views.userViews import getUsers

urlpatterns = [
    path('get-users', getUsers),
]
