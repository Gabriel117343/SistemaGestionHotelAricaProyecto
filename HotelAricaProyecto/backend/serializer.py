from rest_framework import serializers
from .models import Usuario, Reserva, Habitacion, Cliente, Notificacion
class UsuarioSerializer(serializers.ModelSerializer):
    class Meta: # metadatos del modelo Usuario para serializar los datos
        model = Usuario
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data): # este método es para crear un usuario con contraseña encriptada si es que se envía en la petición post desde la api en React
        user = Usuario.objects.create(
            email=validated_data['email'],
            rut=validated_data['rut'],
            nombre=validated_data['nombre'],
            apellido=validated_data['apellido'],
            telefono=validated_data['telefono'],
            jornada=validated_data['jornada'],
            rol=validated_data['rol'],
            # otros campos aquí
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    def update(self, instance, validated_data): # este método es para actualizar un usuario con contraseña encriptada si es que se envía en la petición put desde la api en React
        instance.email = validated_data.get('email', instance.email)
        instance.rut = validated_data.get('rut', instance.rut)
        instance.nombre = validated_data.get('nombre', instance.nombre)
        instance.apellido = validated_data.get('apellido', instance.apellido)
        instance.telefono = validated_data.get('telefono', instance.telefono)
        instance.imagen = validated_data.get('imagen', instance.imagen)
        instance.is_active = validated_data.get('is_active', instance.is_active)
        instance.jornada = validated_data.get('jornada', instance.jornada)
        
       
        if 'password' in validated_data: # si se envía una contraseña en la petición put, se encripta y se guarda en la base de datos
            instance.set_password(validated_data['password'])
        instance.save()
        return instance


class HabitacionSerializer(serializers.ModelSerializer):
    class Meta: # metadatos del modelo Habitacion para serializar los datos
        model = Habitacion
        fields = '__all__'
        
    def create (self, validated_data):
        habitacion = Habitacion.objects.create(
            numero=validated_data['numero'],
            descripcion=validated_data['descripcion'],
            tipo=validated_data['tipo'],
            precio=validated_data['precio'],
            imagen=validated_data['imagen'],
            estado=validated_data['estado'],
            cama=validated_data['cama'],
            ocupacion=validated_data['ocupacion'],
        )
        habitacion
        return habitacion
class ClienteSerializer(serializers.ModelSerializer):
    class Meta: # metadatos del modelo Cliente para serializar los datos
        model = Cliente
        fields = '__all__'
class ReservaSerializer(serializers.ModelSerializer):
 
    class Meta: # metadatos del modelo Reserva para serializar los datos
        model = Reserva
        fields = '__all__'
class NotificacionSerializer(serializers.ModelSerializer):
    class Meta: # metadatos del modelo Notificacion para serializar los datos
        model = Notificacion
        fields = '__all__'