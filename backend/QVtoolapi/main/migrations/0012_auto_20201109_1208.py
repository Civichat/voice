# Generated by Django 3.1.2 on 2020-11-09 17:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0011_auto_20201109_1141'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vote',
            name='proposal',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='main.proposal'),
        ),
    ]
