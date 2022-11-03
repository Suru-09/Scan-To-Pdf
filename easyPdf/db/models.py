from django.db import models
from django.contrib.auth.models import User


class Document(models.Model):
    name = models.CharField(max_length=200, null=False, default="doc")
    user_fk = models.ForeignKey(User, null=True, on_delete=models.CASCADE, db_column='user_id')
    date = models.DateTimeField(auto_now_add=True, null=True)
    size = models.IntegerField(null=False, default=0)


class Image(models.Model):
    name = models.CharField(max_length=200, null=False, default="image")
    image = models.ImageField(null=True, blank=True, upload_to="images/")
    order_no = models.IntegerField(null=False, default=0)
    size = models.IntegerField(null=False, default=0)
    document_fk = models.ForeignKey(Document, null=True, on_delete=models.CASCADE, db_column='document_id')
