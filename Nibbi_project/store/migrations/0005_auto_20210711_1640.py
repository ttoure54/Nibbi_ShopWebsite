# Generated by Django 3.2.5 on 2021-07-11 16:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0004_auto_20210711_0411'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='user',
            new_name='username',
        ),
        migrations.RemoveField(
            model_name='item',
            name='item_id',
        ),
    ]
