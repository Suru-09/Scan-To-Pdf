from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)


class MyUserManager(BaseUserManager):
    def create_user(self, email, username, password=None):
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            username=username,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None):
        user = self.create_user(
            email,
            password=password,
            username=username,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class MyUser(AbstractBaseUser):
    email = models.EmailField(verbose_name='email address', max_length=255, unique=True)
    username = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    objects = MyUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin


class Document(models.Model):
    name = models.CharField(max_length=200, null=False, default="doc")
    user_fk = models.ForeignKey(MyUser, null=True, on_delete=models.CASCADE, db_column='user_id')
    date = models.DateTimeField(auto_now_add=True, null=True)
    size = models.IntegerField(null=False, default=0)


class IMG(models.Model):
    name = models.CharField(max_length=200, null=False, default="image")
    image = models.ImageField(null=True, blank=True, upload_to="images/")
    url = models.CharField(max_length=512, default='', blank=True, help_text="Insert a link to an image")
    hash = models.CharField(max_length=32, null=True, blank=True)
    order_no = models.IntegerField(null=False, default=0)
    size = models.IntegerField(null=False, default=0)
    document_fk = models.ForeignKey(Document, null=True, on_delete=models.CASCADE, db_column='document_id')

    def __str__(self):
        if self.image:
            name = f"{self.image}"
        else:
            name = self.url
        return name

    def get_hash(self):
        if self.image:
            self.hash = hash(self.image)
        else:
            self.hash = hash(self.url)
        self.save()
