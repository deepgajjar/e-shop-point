# Generated by Django 3.1.5 on 2021-03-31 08:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0013_orderplaced'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderplaced',
            name='total_price',
            field=models.BigIntegerField(default=1),
            preserve_default=False,
        ),
    ]
