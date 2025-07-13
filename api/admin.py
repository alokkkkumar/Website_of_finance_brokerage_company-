from django.contrib import admin

# Register your models here.

from .models import Profile,Stock

admin.site.register(Profile)
admin.site.register(Stock)