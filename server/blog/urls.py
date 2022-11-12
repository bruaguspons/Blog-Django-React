from django.urls import path
from .views import BlogsView, SingleBlogView, GetUserBlogs, SerchBlog
urlpatterns = [
    path('', BlogsView.as_view()),
    path('<uuid:pk>/', SingleBlogView.as_view()),
    path('user/<int:pk>/', GetUserBlogs.as_view()),
    path('search/<str:title>/', SerchBlog.as_view()),

]
