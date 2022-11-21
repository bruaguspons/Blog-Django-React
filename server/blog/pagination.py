from rest_framework.pagination import PageNumberPagination

class MediumSetPagination(PageNumberPagination):
    page_query_param = 'page'
    page_size = 9
    page_size_query_param = 'page size'
    max_page_size = 9