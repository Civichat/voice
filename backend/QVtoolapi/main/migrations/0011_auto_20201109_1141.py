# Generated by Django 3.1.2 on 2020-11-09 16:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0010_auto_20201105_1435'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='credit_balance',
            field=models.DecimalField(blank=True, decimal_places=0, default=0, max_digits=6),
        ),
        migrations.AlterField(
            model_name='user',
            name='profile_pic',
            field=models.TextField(blank=True),
        ),
    ]
