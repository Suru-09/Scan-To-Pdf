from rest_framework import serializers
from ..models import IMG


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = IMG
        fields = (
            'url', 'order_no', 'size', 'document_fk'
        )


class ImageIDSerializer(serializers.ModelSerializer):
    class Meta:
        model = IMG
        fields = (
            'id'
        )