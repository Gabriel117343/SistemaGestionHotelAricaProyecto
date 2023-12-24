from django.contrib import admin
from .models import Usuario, Recepcionista, PersonalAseo, Administrador, Habitacion, Reserva, Cliente, Notificacion, Venta
# Register your models here.

admin.site.register(Recepcionista)
admin.site.register(PersonalAseo)
admin.site.register(Administrador)
admin.site.register(Habitacion)
admin.site.register(Reserva)
admin.site.register(Cliente)
admin.site.register(Notificacion)
admin.site.register(Venta)
@admin.register(Usuario)
class UsuarioAdmin(admin.ModelAdmin):
    list_display = ('id', 'rut', 'nombre', 'apellido', 'email', 'telefono', 'jornada', 'rol') # campos a mostrar en la tabla de usuarios en el admin
    list_filter = ('rol',) # filtro por rol
    search_fields = ('rut', 'nombre', 'apellido', 'email', 'telefono', 'jornada', 'rol') # búsqueda por rut, nombre, apellido, email, telefono, jornada y rol
    list_per_page = 3 # paginación de 3 en 3

    