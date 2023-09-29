from django.urls import path
from students import views

urlpatterns=[
    path("course/<str:course>/",views.Course.as_view(),name="course"),
    path("percentage/",views.Percentage.as_view(),name="percentage"),
    path("post1/",views.StudentDetail.as_view(),name="post1"),
    path("post1/<int:id>/",views.StudentDetail.as_view(),name="post1"),
]