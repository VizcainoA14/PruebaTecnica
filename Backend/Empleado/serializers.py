from rest_framework import serializers
from .models import Empleado, Emails, Telefonos

class EmpleadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empleado
        fields = '__all__'

class EmailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Emails
        fields = '__all__'


class TelefonosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Telefonos
        fields = '__all__'
