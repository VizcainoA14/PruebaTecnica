from django.db import models
from enum import Enum
from datetime import date



class TipoIdentificacionEnum(Enum):
    CC = "cc"
    NIT = "nit"

class TipoTelefonoEnum(Enum):
    CELL = "cell"
    TEL = "tel"
    

# Create your models here.
class Empleado(models.Model):
    nombres = models.CharField(max_length=50)
    apellidos = models.CharField(max_length=50)

    class TipoIdentificacionChoices(models.TextChoices):
        CC = TipoIdentificacionEnum.CC.value, TipoIdentificacionEnum.CC.value
        NIT = TipoIdentificacionEnum.NIT.value, TipoIdentificacionEnum.NIT.value
        # Agrega más tipos si es necesario

    tipoIdentificacion = models.CharField(max_length=50,choices=TipoIdentificacionChoices.choices,)
    identificacion = models.CharField(max_length=50)
    fechaIngreso = models.DateField(default=date.today, editable=False)
    salarioMensual = models.DecimalField(max_digits=10, decimal_places=2)
    cargo = models.CharField(max_length=50)
    departamento = models.CharField(max_length=50)



class Telefonos(models.Model):
    class TipoTelefonoChoices(models.TextChoices):
        CELL = TipoTelefonoEnum.CELL.value, TipoTelefonoEnum.CELL.value
        TEL = TipoTelefonoEnum.TEL.value, TipoTelefonoEnum.TEL.value

    tipo = models.CharField(max_length=50, choices=TipoTelefonoChoices.choices)
    numero = models.CharField(max_length=50)
    indicativo = models.CharField(max_length=50)
    empleadoId = models.ForeignKey(Empleado, related_name='telefonos', on_delete=models.CASCADE)

class Emails(models.Model):
    email = models.EmailField()
    empleadoId = models.ForeignKey(Empleado, related_name='emails', on_delete=models.CASCADE)
