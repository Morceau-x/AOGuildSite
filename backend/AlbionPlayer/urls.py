from django.urls import path

from . import views

urlpatterns = [
    path('get/', views.get_players, name='add player'),
    path('remove/', views.remove_players, name='add player'),
    path('add/', views.add_players, name='add player'),
]
