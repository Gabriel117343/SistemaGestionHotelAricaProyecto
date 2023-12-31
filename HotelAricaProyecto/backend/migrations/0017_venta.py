# Generated by Django 4.2.4 on 2023-12-23 23:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0016_notificacion_hora'),
    ]

    operations = [
        migrations.CreateModel(
            name='Venta',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('precio_total', models.DecimalField(decimal_places=2, max_digits=10)),
                ('fecha', models.DateTimeField(auto_now_add=True)),
                ('cliente', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='backend.cliente')),
                ('habitacion', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='backend.habitacion')),
                ('recepcionista', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='backend.recepcionista')),
            ],
        ),
    ]
