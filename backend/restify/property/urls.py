# from django.conf.urls import url
from django.urls import path, include
from .views import (
    PropertyApiView,
    ReservationApiView,
    OwnerReservationsSearch,
    CustomerReservationsSearch,
    OwnerPropertySearch,
    CustomerPropertySearch,
    cancelRes,
    approveRes,
    approveCancel,
    deleteRes,
)

urlpatterns = [


    #properties
    path('property/', PropertyApiView.as_view()),
    path('property/<int:prop_id>/', PropertyApiView.as_view()), #put. get and delete call for properties
    
    #customers property search
    path('property/customer/search/', CustomerPropertySearch.as_view()), # searching for filtered results

    #host property search
    path('property/host/search/', OwnerPropertySearch.as_view()),

    #reservations
    path('reservations/<', ReservationApiView.as_view()),
    path('reservations/<int:prop_id>/', ReservationApiView.as_view()),

    #host reservation search/view
    path('reservations/host/search/', OwnerReservationsSearch.as_view()),

    #customer reservation search/view
    path('reservations/customer/search/', CustomerReservationsSearch.as_view()),
    


    path('reservations/cancel/<int:res_id>/', cancelRes),
    path('reservations/decision/<int:res_id>/<int:status>/', approveRes),
    path('reservations/cancel/pending/<int:res_id>/<int:status>/', approveCancel),
    path('reservations/delete/<int:res_id>', deleteRes),


]