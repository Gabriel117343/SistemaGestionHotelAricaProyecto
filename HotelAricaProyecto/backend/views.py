from cmath import e
from django.shortcuts import render
from rest_framework import viewsets, permissions
from .serializer import UsuarioSerializer, ReservaSerializer, HabitacionSerializer, ClienteSerializer, NotificacionSerializer, VentaSerializer
from .models import Usuario, Recepcionista, PersonalAseo, Administrador, Reserva, Habitacion, Cliente, Recepcionista, Notificacion, Venta
# Create your views here.
from django.views.decorators.csrf import csrf_exempt, csrf_protect, ensure_csrf_cookie
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.utils.decorators import method_decorator
from django.contrib.auth.hashers import make_password
from django.middleware.csrf import get_token
from rest_framework.views import APIView
from .serializer import UsuarioSerializer
#importamos el status para darle un estado a la respuesta
from rest_framework import status
from rest_framework.response import Response
import json
import os # para eliminar la imagen anterior cuando se actualiza la imagen de un usuario

from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from django.core.mail import send_mail # para enviar correos
from django.conf import settings # para enviar correos
from django.contrib.auth.forms import PasswordResetForm # para recuperar contraseña
from django.contrib.auth.views import PasswordResetView # para recuperar contraseña
from rest_framework.permissions import AllowAny # para permitir cualquier usuario
from django.utils.http import urlsafe_base64_encode # para recuperar contraseña 
from django.utils.encoding import force_bytes # para recuperar contraseña 
from django.contrib.auth.tokens import default_token_generator # para recuperar contraseña
from django.contrib.auth import get_user_model
from django.utils.encoding import smart_str # para recuperar contraseña
from django.utils.http import urlsafe_base64_decode # para recuperar contraseña
from rest_framework.decorators import api_view
from django.contrib.sites.shortcuts import get_current_site # para obtener el dominio actual http://localhost:8000
from datetime import datetime, time # para saber la fecha actual

from rest_framework.permissions import IsAuthenticated
User = get_user_model() # esto es para obtener el modelo de usuario que se está utilizando en el proyecto

#permitir 

# class UsuarioCreateView(APIView):
#     # permission_classes = [AllowAny]
#      # este método es para crear un usuario con contraseña encriptada si es que se envía en la petición post desde la api en React
#     authentication_classes = [TokenAuthentication]  # Utiliza la autenticación basada en tokens
#     def post(self, request):
#         serializer = UsuarioSerializer(data=request.data)
#         if serializer.is_valid():
#             usuario = serializer.save()
#             print('--------------------')
#             print(usuario.rol)

#             # Crear un Recepcionista, PersonalAseo o Administrador dependiendo del rol
#             if usuario.rol == 'recepcionista':
#                 Recepcionista.objects.create(usuario=usuario)
#             elif usuario.rol == 'personalaseo':
#                 PersonalAseo.objects.create(usuario=usuario)
#             elif usuario.rol == 'administrador':
#                 Administrador.objects.create(usuario=usuario)

#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_csrf_token(request):
    return Response({'csrftoken': get_token(request)})
class ResetPasswordView(APIView):
    permission_classes = [AllowAny] # esto es para permitir cualquier usuario porque el usuario no está autenticado cuando se restablece la contraseña
    def post(self, request):
        uid_b64 = request.data.get('uid')
        if not uid_b64:
            return Response({'status': 'error', 'message': 'No se proporcionó UID'}, status=400)

        uid = smart_str(urlsafe_base64_decode(uid_b64))
        token = request.data.get('token')
        password = request.data.get('password')

        user = Usuario.objects.filter(pk=uid).first()

        if user and default_token_generator.check_token(user, token):
            user.set_password(password)
            user.save()
            return Response({'status': 'success', 'message': 'Contraseña restablecida con éxito'})
        else:
            return Response({'status': 'error'}, status=400)

class GetUsuarioLogeado(APIView):
    
    authentication_classes = [TokenAuthentication]  # Utiliza la autenticación basada en tokens
    def get(self, request):
        token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
        try:
            user = Token.objects.get(key=token).user 
        except Token.DoesNotExist:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        # Aquí puedes devolver los datos del usuario que quieras
        # Obtén el dominio actual
        current_site = get_current_site(request)
        domain = current_site.domain
        return Response({'token': token, 'usuario':{'nombre':user.nombre, 'rol': user.rol, 'apellido': user.apellido, 'jornada':user.jornada, 'imagen': f'http://{domain}{user.imagen.url}' if user.imagen else None, 'email':user.email, 'id': user.id}}, status=status.HTTP_200_OK)   
# @csrf_exempt
# def login(request): # este método es para logearse desde la api en React
#     if request.method == 'POST':
#         email = request.POST.get('email')
#         password = request.POST.get('password')

#         user = authenticate(request, email=email, password=password)
        
#         if user is not None:
#             auth_login(request, user)
#             try:
#                 Token.objects.filter(user=user).delete()  # Elimina cualquier token existente
#                 token, created = Token.objects.get_or_create(user=user)
#                 print(token.key) # Imprime el token
#             except Exception as e:
#                 return JsonResponse({'error': 'Cannot create token'}, status=500)
#             return JsonResponse({'token': token.key,'message': 'Se ha logeado Exitosamente', 'usuario':{'nombre':user.nombre, 'rol': user.rol, 'jornada':user.jornada}}, status=200)
#         else:
            
#             return JsonResponse({'error': 'Credenciales Invalidas'}, status=400)
            
#     else:
#         return JsonResponse({'error': 'Invalid request method'}, status=400)

class LoginView(APIView):
    
    permission_classes = [AllowAny] # esto es para permitir cualquier usuario porque el usuario no está autenticado cuando se logea

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        User = get_user_model()
        # 1 valida si el usurio esta activo con su correo antes de autenticar
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'Credenciales Invalidas', 'tipo': 'credenciales'}, status=status.HTTP_400_BAD_REQUEST)

        if not user.is_active:
            return Response({'error': 'La cuenta del usuario está inactiva', 'tipo': 'cuenta'}, status=status.HTTP_400_BAD_REQUEST)

        #---------------------------------
        # 1 valida si el usuario esta dentro del horario laboral
        now = datetime.now().time()  # obtén la hora actual
        if user.jornada == 'duirno' and not (time(9, 0) <= now <= time(18, 0)):
            return Response({'error': 'Esta cuenta esta fuera del Horario laboral, contacte con el Administrador', 'tipo': 'horario'}, status=status.HTTP_400_BAD_REQUEST)
        elif user.jornada == 'vespertino' and not (time(18, 0) <= now or now <= time(9, 0)):
            return Response({'error': 'Esta cuenta esta fuera del Horario laboral, contacte con el Administrador', 'tipo': 'horario'}, status=status.HTTP_400_BAD_REQUEST)
        #---------------------------------
        # 2 autentica al usuario  
        user = authenticate(request, email=email, password=password) # autentica al usuario

        if user is not None:
            
            auth_login(request, user) # logea al usuario en el sistema
            try:
                Token.objects.filter(user=user).delete()  # Elimina cualquier token existente
                token, created = Token.objects.get_or_create(user=user)
                print(token.key) # Imprime el token
            except Exception as e:
                return Response({'error': 'Cannot create token'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            current_site = get_current_site(request) # Obteniedo el dominio actual http://localhost:8000  para que la imagen se pueda mostrar en el front End
            domain = current_site.domain
            return Response({'token': token.key,'message': 'Se ha logeado Exitosamente', 'usuario':{'nombre':user.nombre, 'rol': user.rol, 'apellido': user.apellido, 'jornada':user.jornada, 'imagen': f'http://{domain}{user.imagen.url}' if user.imagen else None, 'email': user.email, 'id':user.id}}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Credenciales Invalidas', 'tipo': 'credenciales'}, status=status.HTTP_400_BAD_REQUEST)   
class LogoutView(APIView):
    # solo autenticados
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]  # Utiliza la autenticación basada en tokens
    def post(self, request):
        # Elimina el token del usuario
        Token.objects.filter(user=request.user).delete()
        auth_logout(request)  # desloguea al usuario
        return Response({'message': 'Se ha deslogueado Exitosamente'}, status=status.HTTP_200_OK)
# @csrf_exempt
# def logout_view(request):
#     if request.method == 'POST':
#         # Elimina el token del usuario - asi ya no se puede utilizar para autenticar al usuario
#         Token.objects.filter(user=request.user).delete() 
#         auth_logout(request) # desloguea al usuario
#         #print el estado de la sesion
#         print(request.user.is_authenticated) # False
#         return JsonResponse({'message': 'Se ha deslogueado Exitosamente'}, status=200)
        
#     else:
#         return JsonResponse({'error': 'Invalid request method'}, status=400)
    

# recibe una post con un email para recuperar la contraseña del usuario y se envia un correo con la nueva contraseña
class GeneratePasswordResetLinkView(APIView):
    permission_classes = [AllowAny]
    print('Generando passowrd reset link')
    def post(self, request):
        email = request.data.get('email')
        user = Usuario.objects.filter(email=email).first()
        if user:
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))  # remove .decode()
            print('uid_----____', uid)
            return Response({'uid': uid, 'token': token})  # return 'uid' and 'token' instead of 'reset_link
        else:
            return Response({'error': 'User not found'}, status=404)
class SendPasswordResetEmailView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        try:
            email = request.data.get('email')
            reset_link = request.data.get('reset_link')
            
            send_mail(
                'Restablecimiento de contraseña',
                f'Haga clic en el siguiente enlace para restablecer su contraseña: {reset_link}',
                'hotel.arica00@gmail.com',
                [email],
                fail_silently=False,
            )
            return Response({'message': 'Correo electrónico de restablecimiento de contraseña enviado'})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    

class ReservaView(viewsets.ModelViewSet):
    serializer_class = ReservaSerializer
    queryset = Reserva.objects.all()
    authentication_classes = [TokenAuthentication]  # Utiliza la autenticación basada en tokens

    def create(self, request, *args, **kwargs):
        if (request.user.is_authenticated):
            print('autenticado')
        userId = request.data.get('usuario') # Obtener el id del usuario que hizo la reserva
        recepcionista = Recepcionista.objects.get(usuario=userId)
        room_id = request.data.get('habitacion')  # Obtener el Id de la habitacion
        cliente_id = request.data.get('cliente') # Obtener el id del cliente
        start_date = request.data.get('fecha_inicio')
        end_date = request.data.get('fecha_fin')

        cliente = Cliente.objects.get(id=cliente_id)
        overlapping_reservations = Reserva.objects.filter(habitacion__tipo=room_id, fecha_inicio__lt=end_date, fecha_fin__gt=start_date) # Obtener las reservas que se sobreponen en el tiempo
        room = Habitacion.objects.get(id=room_id) # Obtener la habitacion

        cantidad_clientes = int(request.data.get('ocupacion')) # Obtener la cantidad de clientes
        # si la habitacion es individual y la cantidad de clientes es mayor a 1, no se puede hacer la reserva
        if cantidad_clientes > room.ocupacion:
            return Response({'error': 'La habitación seleccionada no puede albergar a esa cantidad de clientes, seleccione otra porfavor.'}, status=status.HTTP_400_BAD_REQUEST)
        if not overlapping_reservations: # Si no hay reservas que se sobrepongan en el tiempo, se puede hacer la reserva
            reserva = Reserva(habitacion=room, cliente=cliente, recepcionista=recepcionista, fecha_inicio=start_date, fecha_fin=end_date)
            reserva.estado = 'en curso'
            reserva.save()
            room.estado = 'ocupada'
            room.save()
            serializer = self.get_serializer(reserva)
            return Response({'message': 'Se ha hecho la reserva con exito', 'data': serializer.data}, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': 'La habitación seleccionada ya está reservada en las fechas seleccionadas.'}, status=status.HTTP_400_BAD_REQUEST)
    def list(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            serializer = self.get_serializer(queryset, many=True)
            return Response({'data': serializer.data, 'message': 'Reservas obtenidas!'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Ha ocurrido un error'}, status=status.HTTP_400_BAD_REQUEST)
    
class CostCalculator(APIView):
    def post(self, request, *args, **kwargs):
        reserva_id = request.data.get('reserva')  # Obtener el ID de la reserva
        reserva = Reserva.objects.get(id=reserva_id)  # Obtener la reserva

        # Calcular el costo total
        days_stayed = (reserva.fecha_fin - reserva.fecha_inicio).days
        total_cost = days_stayed * reserva.habitacion.precio

        return Response({'total_cost': total_cost})
class CheckoutView(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication]  # Utiliza la autenticación basada en tokens

    def create(self, request, *args, **kwargs):
        if (request.user.is_authenticated):
            print('autenticado')

        reserva_id = request.data.get('reserva')  # Obtener el ID de la reserva
        reserva = Reserva.objects.get(id=reserva_id)  # Obtener la reserva

        if reserva.fecha_fin < datetime.now().date():  # Si la fecha de fin de la reserva es anterior a la fecha actual
            reserva.habitacion.estado = 'limpieza'  # Actualizar el estado de la habitación a limpieza 
            reserva.habitacion.save()  # Guardar los cambios en la habitación

            # Calcular el costo total
            total_cost = CostCalculator.calculate_total_cost(reserva)
            return Response({'message': 'Se ha hecho el checkout con éxito', 'total_cost': total_cost}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se puede hacer el checkout antes de la fecha de fin de la reserva.'}, status=status.HTTP_400_BAD_REQUEST)
class UsuarioView(viewsets.ModelViewSet): # este método es para listar, crear, actualizar y eliminar usuarios desde la api en React
    serializer_class = UsuarioSerializer #Esto indica que UsuarioSerializer se utilizará para serializar y deserializar instancias del modelo Usuario.
    queryset = Usuario.objects.all() # Esto indica que todas las instancias del modelo Usuario son el conjunto de datos sobre el que operará esta vista.

    authentication_classes = [TokenAuthentication]  # Utiliza la autenticación basada en tokens
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response({'data': serializer.data, 'message': 'Usuarios obtenidos!'}, status=status.HTTP_200_OK)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.imagen and hasattr(instance.imagen, 'path'):
            image_path = os.path.join(settings.MEDIA_ROOT, instance.imagen.path)  # Guarda la ruta de la imagen
            self.perform_destroy(instance) # Elimina el usuario
            # Si la imagen existe se borrar para que no quede en el servidor
            if os.path.isfile(image_path):
                os.remove(image_path)
        else:
            self.perform_destroy(instance) # Elimina el usuario si no tiene imagen
        return Response({'message': 'Usuario eliminado!'}, status=status.HTTP_200_OK)
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            usuario = serializer.save()

            # Crear un Recepcionista, PersonalAseo o Administrador dependiendo del rol
            if usuario.rol == 'recepcionista':
                Recepcionista.objects.create(usuario=usuario)
            elif usuario.rol == 'personalaseo':
                PersonalAseo.objects.create(usuario=usuario)
            elif usuario.rol == 'administrador':
                Administrador.objects.create(usuario=usuario)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, *args, **kwargs):
        queryset = Usuario.objects.all().order_by('-id')
        serializer = self.get_serializer(queryset, many=True)
        return Response({'data': serializer.data, 'message': 'Usuarios obtenidos!'}, status=status.HTTP_200_OK)
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        old_image = instance.imagen  # Guarda la referencia a la imagen anterior

        serializer = self.get_serializer(instance, data=request.data, partial=True) # partial=True para permitir actualizaciones parciales
        if serializer.is_valid():
            self.perform_update(serializer) # Actualiza el usuario

            # Si la imagen ha cambiado y la imagen antigua existe, borra la imagen anterior
            if old_image != instance.imagen and old_image and hasattr(old_image, 'path'):
                os.remove(os.path.join(settings.MEDIA_ROOT, old_image.path))

            return Response({'data': serializer.data, 'message': 'Usuario actualizado correctamente!'}, status=status.HTTP_200_OK)
        return Response({'message': 'Error al actualizar el usuario', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
    # Django Rest Framework proporciona los siguientes métodos para operaciones CRUD en ModelViewSet:

    # .list(): Para listar todos los objetos (GET)
    # .retrieve(): Para obtener un objeto específico (GET con id)
    # .create(): Para crear un nuevo objeto (POST)
    # .update(): Para actualizar un objeto existente (PUT)
    # .partial_update(): Para actualizar parcialmente un objeto existente (PATCH)
    # .destroy(): Para eliminar un objeto existente (DELETE)
    # Por lo tanto, puedes realizar operaciones CRUD en el modelo Usuario a través de esta vista.

class HabitacionView(viewsets.ModelViewSet): # este método es para listar, crear, actualizar y eliminar habitaciones desde la api en React
    serializer_class = HabitacionSerializer
    queryset = Habitacion.objects.all()

    authentication_classes = [TokenAuthentication]  # Utiliza la autenticación basada en tokens
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response({'data': serializer.data, 'message': 'Habitaciones obtenidas!'}, status=status.HTTP_200_OK)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        try:
            if instance.estado == 'ocupada':
                return Response({'error': 'No se puede eliminar una habitación ocupada'}, status=status.HTTP_400_BAD_REQUEST)
            if instance.estado == 'mantenimiento':
                return Response({'error': 'No se puede eliminar una habitación en mantenimiento'}, status=status.HTTP_400_BAD_REQUEST)
            image_path = None
            if instance.imagen:
                image_path = os.path.join(settings.MEDIA_ROOT, instance.imagen.path)  # Guarda la ruta de la imagen

            self.perform_destroy(instance)

            # Si la imagen existe se borrara
            if image_path and os.path.isfile(image_path):
                os.remove(image_path)
            return Response({'message': 'Habitacion eliminada!'}, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({'error': 'Ha ocurrido un error'}, status=status.HTTP_400_BAD_REQUEST)

         
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            habitacion = serializer.save()
            return Response({'message':'Se ha añadido la Habitacion','response':serializer.data}, status=status.HTTP_201_CREATED)
        return Response({'error': 'No se ha podido añadir la Habitcion'}, status=status.HTTP_400_BAD_REQUEST)
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        old_estado = instance.estado  # Guarda la referencia al estado anterior después de guardar los cambios
        serializer = self.get_serializer(instance, data=request.data, partial=True)  # partial=True para permitir actualizaciones parciales por ejemplo si se quiere actualizar solo el estado de la habitacion

        if serializer.is_valid():
            serializer.save()
            
            print('Estado')
            print(old_estado)
            if old_estado == 'ocupada' or old_estado == 'mantenimiento':
                Reserva.objects.filter(habitacion=instance).delete()

            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ClienteView(viewsets.ModelViewSet): # este método es para listar, crear, actualizar y eliminar clientes desde la api en React
    serializer_class = ClienteSerializer
    queryset = Cliente.objects.all()

    permission_classes = [AllowAny] # esto es para permitir cualquier usuario porque el usuario no está autenticado cuando se crea un cliente desde la api en React
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response({'data': serializer.data, 'message': 'Clientes obtenidos!'}, status=status.HTTP_200_OK)
    def destroy(self, request, *args, **kwargs):
    
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({'message': 'Cliente eliminado!'}, status=status.HTTP_200_OK)
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            cliente = serializer.save()
            return Response({'data': serializer.data, 'message': 'Cliente Agregado'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True) # partial=True para permitir actualizaciones parciales por ejemplo si se quiere actualizar solo el estado de la habitacion
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class NotificacionView(viewsets.ModelViewSet):
    serializer_class = NotificacionSerializer
    queryset = Notificacion.objects.all()
    authentication_classes = [TokenAuthentication]  # Utiliza la autenticación basada en tokens
    # maneja errores con try except
    def list(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            serializer = self.get_serializer(queryset, many=True)
            return Response({'data': serializer.data, 'message': 'Notificaciones obtenidas!'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Ha ocurrido un error'}, status=status.HTTP_400_BAD_REQUEST)
    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
            return Response({'message': 'Notificacion eliminada!'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Ha ocurrido un error'}, status=status.HTTP_400_BAD_REQUEST)
    def create(self, request, *args, **kwargs):
        try:
            # Obtiene el usuario a través del token
            user = request.user
            if user is None:
                return Response({'error': 'No se ha encontrado el usuario'}, status=status.HTTP_400_BAD_REQUEST)

            # Agrega el usuario al data del request
            data = request.data.copy()
            data['usuario'] = user.id

            serializer = self.get_serializer(data=data)
            if serializer.is_valid():
                notificacion = serializer.save()
                return Response({'data': serializer.data, 'message': 'Notificacion Enviada con Exito'}, status=status.HTTP_201_CREATED)
            return Response({'error': 'No se ha podido enviar el mensaje'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': 'Ha ocurrido un error'}, status=status.HTTP_400_BAD_REQUEST)
    def update(self, request, *args, **kwargs):
        try:
            notificacion = self.get_object()
            notificacion.leida = True
            notificacion.save()
            return Response({'message': 'Notificacion marcada como leida!'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Ha ocurrido un error'}, status=status.HTTP_400_BAD_REQUEST)
    
class VentaView(viewsets.ModelViewSet):
    serializer_class = VentaSerializer
    queryset = Venta.objects.all()
    permission_classes = [AllowAny] # Utiliza la autenticación basada en tokens
    def list(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            serializer = self.get_serializer(queryset, many=True)
            return Response({'data': serializer.data, 'message': 'Ventas obtenidas!'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Ha ocurrido un error'}, status=status.HTTP_400_BAD_REQUEST)
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            cliente_id = request.data.get('cliente')
            habitacion_id = request.data.get('habitacion')
            precio_total = request.data.get('precio_total')
            try:
                cliente = Cliente.objects.get(id=cliente_id)
                habitacion = Habitacion.objects.get(id=habitacion_id)
                recepcionista = Recepcionista.objects.get(usuario=request.user)
                venta = Venta(cliente=cliente, recepcionista=recepcionista, habitacion=habitacion, precio_total=precio_total)
                venta.save()
                return Response({'message': 'Venta creada!'}, status=status.HTTP_201_CREATED)
            except Cliente.DoesNotExist:
                return Response({'error': 'Cliente no encontrado'}, status=status.HTTP_400_BAD_REQUEST)
            except Habitacion.DoesNotExist:
                return Response({'error': 'Habitacion no encontrada'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def get(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            serializer = self.get_serializer(queryset, many=True)
            return Response({'data': serializer.data, 'message': 'Ventas obtenidas!'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Ha ocurrido un error'}, status=status.HTTP_400_BAD_REQUEST)