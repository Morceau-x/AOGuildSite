from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from django.db.models import Model
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _

from AccountManagement.managers import UserManager


class UserModel(AbstractBaseUser, PermissionsMixin):
    """
    An abstract base class implementing a fully featured User model with
    admin-compliant permissions.

    Username and password are required. Other fields are optional.
    """
    user_id = models.CharField(
        _('user_id'),
        primary_key=True,
        max_length=512,
        unique=True,
    )
    name = models.CharField(
        _('name'),
        default='',
        max_length=512,
        blank=True
    )
    nick = models.CharField(
        _('name'),
        null=True,
        max_length=512,
        blank=True
    )
    discriminator = models.CharField(
        _('discriminator'),
        default='',
        max_length=512,
        blank=True
    )
    avatar = models.CharField(
        _('avatar'),
        default='',
        max_length=512,
        blank=True,
        null=True
    )
    is_active = models.BooleanField(
        _('active'),
        default=True,
    )

    date_joined = models.DateTimeField(_('date joined'), default=timezone.now)

    objects = UserManager()

    USERNAME_FIELD = 'user_id'
    REQUIRED_FIELDS = ['name', 'discriminator', 'avatar']

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

    def clean(self):
        super().clean()

    def get_username(self):
        """
        Return the first_name plus the last_name, with a space in between.
        """
        full_name = '%s#%s' % (self.name, self.discriminator)
        return full_name.strip()

    def get_short(self):
        """Return the short name for the user."""
        return self.name

    def login(self):
        self.last_login = timezone.now()
        self.save()

    @property
    def is_authenticated(self):
        return True
