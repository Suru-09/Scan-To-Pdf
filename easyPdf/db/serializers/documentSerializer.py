from rest_framework import serializers
from ..models import Document


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = (
            'id', 'name', 'size', 'user_fk'
        )


class DocIDSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = (
            'id'
        )
