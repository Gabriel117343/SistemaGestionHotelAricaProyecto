# Generated by Django 4.2.4 on 2023-12-10 20:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0006_rename_camas_habitacion_ocupacion_habitacion_cama'),
    ]

    operations = [
        migrations.AlterField(
            model_name='habitacion',
            name='numero',
            field=models.IntegerField(unique=True),
        ),
    ]
