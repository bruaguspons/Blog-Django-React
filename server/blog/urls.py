from django.urls import path
from .views import BlogsView, SingleBlogView, GetUserBlogs
urlpatterns = [
    path('', BlogsView.as_view()),
    path('<uuid:pk>/', SingleBlogView.as_view()),
    path('user/<int:pk>/', GetUserBlogs.as_view()),

]
