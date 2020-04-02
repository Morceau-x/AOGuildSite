from django.db import models
from django.utils.translation import ugettext_lazy as _

from AOGSbackend import settings


class AlbionPlayer(models.Model):

    player_id = models.CharField(
        _('player_id'),
        max_length=512,
    )

    user = models.ForeignKey(
        to=settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )

    name = models.CharField(
        _('name'),
        default='',
        max_length=512,
        blank=True
    )

    class Meta:
        unique_together = ["player_id", "user"]
        verbose_name = _('player')
        verbose_name_plural = _('players')
