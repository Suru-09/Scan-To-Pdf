# Generated by Django 4.1.3 on 2022-11-20 11:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('db', '0008_remove_img_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='img',
            name='image',
        ),
    ]
