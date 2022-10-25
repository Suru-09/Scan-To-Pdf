from rest_framework import serializers
from ..models import Image


class ImageDTO(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = (
            'id', 'name', 'image', 'order_no', 'size'
        )
