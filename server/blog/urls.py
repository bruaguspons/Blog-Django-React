from django.urls import path
from .views import BlogsView
urlpatterns = [
    path('', BlogsView.as_view())
]
