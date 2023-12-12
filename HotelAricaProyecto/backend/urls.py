from django.urls import path, include
from rest_framework.documentation import include_docs_urls 
from rest_framework import routers
from backend import views
from .views import *
from django.contrib.auth import views as auth_views
router = routers.DefaultRouter() # tiene el crud de los usuarios"""
#usuarios
router.register(r'usuarios', views.UsuarioView, 'usuarios')
#reservas
router.register(r'reservas', views.ReservaView, 'reservas')
#habitaciones
router.register(r'habitaciones', views.HabitacionView, 'habitaciones')
#clientes
router.register(r'clientes', views.ClienteView, 'clientes')
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

]