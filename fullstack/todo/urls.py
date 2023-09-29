from todo.views import Todoview
from django.urls import path

urlpatterns=[
    path("",Todoview.as_view()),
    path("put/<int:id>/",Todoview.as_view()),
]