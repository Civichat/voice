# Generated by Django 3.1.2 on 2020-11-11 14:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0020_auto_20201110_1719'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='voted',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
    ]
