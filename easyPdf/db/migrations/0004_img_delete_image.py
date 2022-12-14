# Generated by Django 4.1.3 on 2022-11-19 12:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('db', '0003_alter_myuser_username'),
    ]

    operations = [
        migrations.CreateModel(
            name='IMG',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='image', max_length=200)),
                ('image', models.ImageField(blank=True, null=True, upload_to='images/')),
                ('url', models.CharField(blank=True, default='', help_text='Insert a link to an image', max_length=512)),
                ('hash', models.CharField(blank=True, max_length=32, null=True)),
                ('order_no', models.IntegerField(default=0)),
                ('size', models.IntegerField(default=0)),
                ('document_fk', models.ForeignKey(db_column='document_id', null=True, on_delete=django.db.models.deletion.CASCADE, to='db.document')),
            ],
        ),
        migrations.DeleteModel(
            name='Image',
        ),
    ]
