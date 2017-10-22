# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('TestModel', '0003_user_password'),
    ]

    operations = [
        migrations.CreateModel(
            name='Daily_tracker',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('user_id', models.CharField(max_length=10)),
                ('time', models.CharField(max_length=20)),
                ('pulse', models.CharField(max_length=3)),
                ('diastolic', models.CharField(max_length=3)),
                ('systolic', models.CharField(max_length=3)),
            ],
        ),
        migrations.CreateModel(
            name='Exercise_monitor',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('user_id', models.CharField(max_length=10)),
                ('monitor_type', models.CharField(max_length=2)),
                ('pulse', models.CharField(max_length=3)),
                ('diastolic', models.CharField(max_length=3)),
                ('systolic', models.CharField(max_length=3)),
            ],
        ),
        migrations.AlterField(
            model_name='user',
            name='password',
            field=models.CharField(max_length=30),
        ),
    ]
