# Generated by Django 4.1.3 on 2022-11-17 20:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('db', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='myuser',
            name='username',
            field=models.CharField(max_length=255, unique=True),
        ),
    ]
