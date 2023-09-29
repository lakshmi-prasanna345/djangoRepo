from django.urls import path
from products import views

urlpatterns=[
    path('index/',views.index,name='get'),
    path("get/",views.Getfun.as_view(),name="get"),
    path("post/",views.Post1.as_view(),name="post"),
    #path("put/<int:id>/",views.Put1.as_view(),name="put"),
    path("display/<str:favorite>/",views.Display.as_view(),name="display"),
    path("filter/<str:archieved>/",views.Filter.as_view(),name="filter"),
    path("filter_n_p/<str:pname>/<str:price>/",views.PnamePriceFilter.as_view(),name="filter_n_p"),
    path("productdata/",views.ProductData.as_view(),name="productdata"),
    path("search/",views.Search_products.as_view(),name="search"),
    # Example URL configuration for the update_quantity endpoint
    path("",views.Dropdown.as_view()),
    path('update_quantity/<int:product_id>/',views.UpdateQuantity.as_view(),name='update_quantity'),
]
