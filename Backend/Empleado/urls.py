from django.urls import path, include
from rest_framework import routers
from Empleado import views

router = routers.DefaultRouter()
router.register(r'empleados', views.EmpleadoViewSet)
router.register(r'emails', views.EmailsViewSet)
router.register(r'telefonos', views.TelefonosViewSet)


urlpatterns = [
    path('', include(router.urls)),
]