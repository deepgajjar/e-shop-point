# Generated by Django 3.1.7 on 2021-04-26 06:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0017_serachsuggestions'),
    ]

    operations = [
        migrations.CreateModel(
            name='Otp_temp',
            fields=[
                ('otp_id', models.BigAutoField(primary_key=True, serialize=False)),
                ('email_add', models.CharField(max_length=170)),
                ('otp', models.BigIntegerField()),
            ],
        ),
    ]
