from django.urls import path
from .views import UserView, GetUser
urlpatterns = [
    path('', UserView.as_view()),
    path('<int:pk>/', GetUser.as_view()),
]
