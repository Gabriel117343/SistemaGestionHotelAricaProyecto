from django.urls import path, include
from rest_framework.documentation import include_docs_urls 
from rest_framework import routers
from backend import views
from .views import *
from django.contrib.auth import views as auth_views
router = routers.DefaultRouter() # esto permite que se puedan ver las rutas en el navegador
#usuarios
router.register(r'usuarios', views.UsuarioView, 'usuarios')
#reservas - ESTO PODRIA SER CONSIDERADO MAS COMO EL CHECKIN PORQUE ES EL INGRESO DE UNA RESERVA
router.register(r'reservas', views.ReservaView, 'reservas')
#habitaciones
# FALTA ENTONCES PARA HACER RESERVAS 
router.register(r'habitaciones', views.HabitacionView, 'habitaciones')
#clientes
router.register(r'clientes', views.ClienteView, 'clientes')
#checkout
router.register(r'checkout', views.CheckoutView, basename='checkout')
#checkin
router.register(r'checkin', views.CheckinView, basename='checkin')
#notificaciones
router.register(r'notificaciones', views.NotificacionView, 'notificaciones')
urlpatterns = [
    path('datos/v1/', include(router.urls)),
    path('docs/', include_docs_urls(title="Usuarios Api")),
    path('csrf/', views.get_csrf_token),
    path('login/', views.LoginView.as_view()), 
    path('logout/', views.LogoutView.as_view()),
    path('get_usuario_logeado/', views.GetUsuarioLogeado.as_view()),
    path('generate_password_reset_link/', GeneratePasswordResetLinkView.as_view()),
    path('send_password_reset_email/',  SendPasswordResetEmailView.as_view()),
    path('reset_password/', ResetPasswordView.as_view()),
    path('calculate_cost/', views.CostCalculator.as_view()),
  

]