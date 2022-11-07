from django.urls import path
from .views import CategoryView, GetBlogsInCategory

urlpatterns = [
    path('', CategoryView.as_view()),
    path('blogs/<str:cate>', GetBlogsInCategory.as_view())
]
