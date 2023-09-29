from django.urls import path
from server import views

urlpatterns=[
    path('',views.index),
    path("get",views.Serverview.as_view()),
    path("post/",views.Serverview.as_view()),
    path("put/<int:id>/",views.Serverview.as_view()),
    path("del/<int:id>/",views.Serverview.as_view()),
] 