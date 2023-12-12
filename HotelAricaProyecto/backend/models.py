from django.db import models
from django.contrib.auth.models import AbstractUser
# cargando la ruta estatica 

class Usuario(AbstractUser):
    ROLES = [
        ('recepcionista', 'Recepcionista'),
        ('personalaseo', 'PersonalAseo'),
        ('administrador', 'Administrador'),
    ]
    rut = models.CharField(max_length=13)
    username = models.CharField(max_length=50, blank=True, null=True)
    nombre  = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    email  = models.EmailField(max_length=50, unique=True, blank=False, null=False)
    USERNAME_FIELD = 'email' # el email es el campo que se usa para logearse
    REQUIRED_FIELDS = ['username']# email y password son requeridos por defecto
    telefono = models.CharField(max_length=15)
    jornada = models.CharField(max_length=10, choices=[('duirno', 'Duirno'), ('vespertino', 'Vespertino')], default='duirno')
    rol = models.CharField(max_length=15, choices=ROLES, default='recepcionista')
    imagen = models.ImageField(upload_to='imagenes/', null=True, blank=True)
   
    def __str__(self):
        return self.nombre
    
class Recepcionista(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, primary_key=True)
    def __str__(self):
        return self.usuario.nombre
class PersonalAseo(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, primary_key=True)
    def __str__(self):
        return self.usuario.nombre
    
class Administrador(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, primary_key=True)
    def __str__(self):
        return self.usuario.nombre
class Habitacion(models.Model):
    ROOM_TYPES = [
        ('individual', 'Individual'),
        ('doble', 'Doble'),
        ('suite', 'Suite'),
        ('deluxe', 'Deluxe'),
    ]
    OCUPACION_CHOICES = [
    (1, 'Uno'),
    (2, 'Dos'),
    (3, 'Tres'),
]
    numero = models.IntegerField(unique=True)
    descripcion = models.TextField(max_length=100, blank=True, null=True)
    tipo = models.CharField(choices=ROOM_TYPES, max_length=15)
    precio = models.IntegerField(default=30000)
    imagen = models.ImageField(upload_to='imagenes/', null=True, blank=True)
    estado = models.CharField(max_length=15, choices=[('disponible', 'Disponible'), ('ocupada', 'Ocupada'), ('mantenimiento', 'Mantenimiento')], default='disponible')
    cama = models.CharField(max_length=50, blank=True, null=True)
    ocupacion = models.IntegerField(choices=OCUPACION_CHOICES, default=1)
    def __str__(self):
        return self.tipo
class Cliente(models.Model):
    #heredar del user con password y email

    email  = models.EmailField(max_length=50, unique=True, blank=False, null=False, default='email@gmail.com')

    nombre = models.CharField(max_length=50, blank=True, null=True)
    apellido = models.CharField(max_length=50, blank=True, null=True)
    rut = models.CharField(max_length=13, blank=True, null=True)
    telefono = models.CharField(max_length=15, blank=True, null=True)
    direccion = models.CharField(max_length=50, blank=True, null=True)
    # otros campos específicos del cliente aquí

    def __str__(self):
        return '{0} - {1}'.format(self.nombre, self.apellido)
class Reserva(models.Model):
    habitacion = models.ForeignKey(Habitacion, on_delete=models.CASCADE)
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    recepcionista = models.ForeignKey(Recepcionista, on_delete=models.SET_NULL, null=True)
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField()
    # otros campos aquí

    def __str__(self):
        return f'Reserva para {self.cliente} en {self.habitacion}'


    


