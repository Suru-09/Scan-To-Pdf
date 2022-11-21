from rest_framework import serializers
from ..models import IMG

from drf_extra_fields.fields import Base64ImageField


class EntireImageSerialiser(serializers.ModelSerializer):
    class Meta:
        model = IMG
        fields = (
            '__all__'
        )



class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = IMG
        fields = (
            'image', 'order_no', 'size', 'document_fk'
        )


class ImageIDSerializer(serializers.ModelSerializer):
    class Meta:
        model = IMG
        fields = (
            'id',
        )


class ImgB64Serializer(serializers.ModelSerializer):
    image = Base64ImageField()

    class Meta:
        model = IMG
        fields = ('image', 'order_no', 'size', 'document_fk')

    def create(self, validated_data):
        image = validated_data.pop('image')
        order_no = validated_data.pop('order_no')
        size = validated_data.pop('size')
        document_fk = validated_data.pop('document_fk')
        return IMG.objects.create(image=image, order_no=order_no, size=size, document_fk=document_fk)
