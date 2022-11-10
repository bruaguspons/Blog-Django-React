from django.urls import path
from .views import UserView, GetUser
urlpatterns = [
    path('', UserView.as_view()),
    path('login/', GetUser.as_view()),
]
