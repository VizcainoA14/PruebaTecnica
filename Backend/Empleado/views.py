from rest_framework import viewsets
from .middleware import CustomTokenAuthentication


from .serializers import EmpleadoSerializer, EmailsSerializer, TelefonosSerializer
from .models import Empleado, Emails, Telefonos

class EmpleadoViewSet(viewsets.ModelViewSet):
    authentication_classes = [CustomTokenAuthentication]
    queryset = Empleado.objects.all().order_by('nombres')
    serializer_class = EmpleadoSerializer

class EmailsViewSet(viewsets.ModelViewSet):
    authentication_classes = [CustomTokenAuthentication]
    queryset = Emails.objects.all().order_by('email')
    serializer_class = EmailsSerializer

class TelefonosViewSet(viewsets.ModelViewSet):
    authentication_classes = [CustomTokenAuthentication]


    queryset = Telefonos.objects.all().order_by('numero')
    serializer_class = TelefonosSerializer
