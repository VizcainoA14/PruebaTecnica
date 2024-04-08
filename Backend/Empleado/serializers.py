from rest_framework import serializers
from .models import Empleado, Emails, Telefonos


class EmailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Emails
        fields = '__all__'


class TelefonosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Telefonos
        fields = '__all__'
        

class EmpleadoSerializer(serializers.ModelSerializer):
    emails = EmailsSerializer(many=True, read_only=True)
    telefonos = TelefonosSerializer(many=True, read_only=True)
    class Meta:
        model = Empleado
        fields = '__all__'
