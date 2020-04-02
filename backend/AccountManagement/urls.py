from django.urls import path

from . import views

urlpatterns = [
    path('user/', views.get_user, name='user'),
    path('authorized/', views.authorization_complete, name='authorization completed'),
    path('authenticate/', views.authorize_request, name='authenticate'),
    path('logout/', views.logout_user, name='authenticate'),
    path('user/permissions/', views.get_permissions, name='authenticate')
]
