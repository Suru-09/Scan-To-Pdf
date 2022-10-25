from rest_framework import serializers
from ..models import Document


class documentDTO(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = (
            'id', 'name', 'date', 'size'
        )
