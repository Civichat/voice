# Generated by Django 3.1.2 on 2020-11-10 22:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('main', '0018_auto_20201110_1026'),
    ]

    operations = [
        migrations.AddField(
            model_name='election',
            name='group',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='auth.group'),
        ),
    ]
