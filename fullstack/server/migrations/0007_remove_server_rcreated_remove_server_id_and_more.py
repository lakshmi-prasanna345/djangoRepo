# Generated by Django 4.2.4 on 2023-08-30 13:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0006_alter_server_pimage'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='server',
            name='Rcreated',
        ),
        migrations.RemoveField(
            model_name='server',
            name='id',
        ),
        migrations.AlterField(
            model_name='server',
            name='Rid',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='server',
            name='pimage',
            field=models.ImageField(blank=True, null=True, upload_to='images/'),
        ),
    ]