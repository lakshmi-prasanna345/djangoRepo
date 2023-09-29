from django.urls import path
from server import views

urlpatterns = [
    path("",views.index),
    path("get/",views.Serverview.as_view()),
    path("post/",views.Serverview.as_view()),
    path("put/",views.Serverview.as_view()),
    path("del/",views.Serverview.as_view()),
    path("post1/",views.Serverview.as_view()),
]
