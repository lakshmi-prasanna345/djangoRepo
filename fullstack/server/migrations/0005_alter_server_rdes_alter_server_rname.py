# Generated by Django 4.2.4 on 2023-08-30 12:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0004_alter_server_rname'),
    ]

    operations = [
        migrations.AlterField(
            model_name='server',
            name='Rdes',
            field=models.TextField(max_length=300),
        ),
        migrations.AlterField(
            model_name='server',
            name='Rname',
            field=models.CharField(max_length=100),
        ),
    ]
