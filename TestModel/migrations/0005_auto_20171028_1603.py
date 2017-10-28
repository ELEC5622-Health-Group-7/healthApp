# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('TestModel', '0004_auto_20171022_1302'),
    ]

    operations = [
        migrations.AlterField(
            model_name='daily_tracker',
            name='time',
            field=models.DateField(),
        ),
    ]
