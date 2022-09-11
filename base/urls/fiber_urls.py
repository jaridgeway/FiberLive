from django.urls import path, include
from base.views import fiber_views as views




urlpatterns = [
    path('cables/',views.getCables,name="cables"),
    path('tubes/',views.getTubes,name="tubes"),
    path('createEvent/',views.setSplice,name="splice"),]