from cmath import e
from django.shortcuts import render
from rest_framework import viewsets, permissions
from .serializer import UsuarioSerializer, ReservaSerializer
from .models import Usuario, Recepcionista, PersonalAseo, Administrador, Reserva, Habitacion
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
        uid = smart_str(urlsafe_base64_decode(request.data.get('uid')))
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
        return Response({'token': token, 'usuario':{'nombre':user.nombre, 'rol': user.rol, 'jornada':user.jornada}}, status=status.HTTP_200_OK)   
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

        user = authenticate(request, email=email, password=password)

        if user is not None:
            auth_login(request, user)
            try:
                Token.objects.filter(user=user).delete()  # Elimina cualquier token existente
                token, created = Token.objects.get_or_create(user=user)
                print(token.key) # Imprime el token
            except Exception as e:
                return Response({'error': 'Cannot create token'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            return Response({'token': token.key,'message': 'Se ha logeado Exitosamente', 'usuario':{'nombre':user.nombre, 'rol': user.rol, 'jornada':user.jornada}}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Credenciales Invalidas'}, status=status.HTTP_400_BAD_REQUEST)   
class LogoutView(APIView):
    # solo autenticados
    
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

    def post(self, request):
        email = request.data.get('email')
        user = Usuario.objects.filter(email=email).first()
        if user:
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))  # remove .decode()
            return Response({'uid': uid, 'token': token})  # return 'uid' and 'token' instead of 'reset_link
        else:
            return Response({'error': 'User not found'}, status=404)
class SendPasswordResetEmailView(APIView):
    permission_classes = [AllowAny]
    print('YYYYYYYYYY')
    def post(self, request):
        email = request.data.get('email')
        print('UUUUUUUUUUUUUUUUUUUU')
        print(email)
        reset_link = request.data.get('reset_link')
        print(reset_link)
        send_mail(
            'Restablecimiento de contraseña',
            f'Haga clic en el siguiente enlace para restablecer su contraseña: {reset_link}',
            'hotel.arica00@gmail.com',
            [email],
            fail_silently=False,
        )
        return Response({'message': 'Correo electrónico de restablecimiento de contraseña enviado'})
    
class ReservaView(viewsets.ModelViewSet): # este método es para listar, crear, actualizar y eliminar reservas desde la api en React
    serializer_class = ReservaSerializer
    queryset = Reserva.objects.all()
    # desativa todos los permisos
    permission_classes= [AllowAny]
    def create(self, request, *args, **kwargs):
        room_type = request.data.get('room_type')
        start_date = request.data.get('start_date')

        end_date = request.data.get('end_date')

        available_rooms = Habitacion.objects.filter(tipo=room_type, reserva__fecha_inicio__gte=end_date, reserva__fecha_fin__lte=start_date) # obtiene las habitaciones disponibles de un tipo específico en un rango de fechas específico

        if available_rooms:
            room = available_rooms[0]
            reserva = Reserva(habitacion=room, cliente=request.user, fecha_inicio=start_date, fecha_fin=end_date)
            reserva.save()
            serializer = self.get_serializer(reserva)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'No hay habitaciones disponibles de ese tipo en las fechas seleccionadas.'}, status=status.HTTP_400_BAD_REQUEST)
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
        self.perform_destroy(instance)
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

    # Django Rest Framework proporciona los siguientes métodos para operaciones CRUD en ModelViewSet:

    # .list(): Para listar todos los objetos (GET)
    # .retrieve(): Para obtener un objeto específico (GET con id)
    # .create(): Para crear un nuevo objeto (POST)
    # .update(): Para actualizar un objeto existente (PUT)
    # .partial_update(): Para actualizar parcialmente un objeto existente (PATCH)
    # .destroy(): Para eliminar un objeto existente (DELETE)
    # Por lo tanto, puedes realizar operaciones CRUD en el modelo Usuario a través de esta vista.

