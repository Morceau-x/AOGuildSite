from django.contrib.auth.base_user import BaseUserManager


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, user_id, name, discriminator, avatar, **extra_fields):
        """
        Create and save a user with the given username, email, and password.
        """
        if not user_id:
            raise ValueError('The given user_id must be set')

        user_id = self.model.normalize_username(user_id)
        user = self.model(user_id=user_id, name=name, discriminator=discriminator, avatar=avatar, **extra_fields)
        user.set_password(self.make_random_password(length=10))
        user.save(using=self._db)
        return user

    def create_user(self, user_id, name, discriminator, avatar, **extra_fields):
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(user_id, name, discriminator, avatar, **extra_fields)

    def create_superuser(self, user_id, name, discriminator, avatar, **extra_fields):
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(user_id, name, discriminator, avatar, **extra_fields)
