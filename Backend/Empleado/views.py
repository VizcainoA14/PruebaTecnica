from rest_framework import viewsets, status
from rest_framework.response import Response
from .middleware import CustomTokenAuthentication
from .serializers import EmpleadoSerializer, EmailsSerializer, TelefonosSerializer
from .models import Empleado, Emails, Telefonos
from rest_framework.decorators import action

class EmpleadoViewSet(viewsets.ModelViewSet):
    authentication_classes = [CustomTokenAuthentication]
    queryset = Empleado.objects.all().order_by('id').prefetch_related('emails', 'telefonos')
    serializer_class = EmpleadoSerializer

    @action(detail=False, methods=['get'])
    def last_created(self, request, *args, **kwargs):
        last_created_empleado = Empleado.objects.order_by('id').last()
        if last_created_empleado is not None:
            return Response({'id': last_created_empleado.id}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No employees found'}, status=status.HTTP_404_NOT_FOUND)



class EmailsViewSet(viewsets.ModelViewSet):
    authentication_classes = [CustomTokenAuthentication]
    queryset = Emails.objects.all().order_by('email')
    serializer_class = EmailsSerializer

class TelefonosViewSet(viewsets.ModelViewSet):
    authentication_classes = [CustomTokenAuthentication]
    queryset = Telefonos.objects.all().order_by('numero')
    serializer_class = TelefonosSerializer
