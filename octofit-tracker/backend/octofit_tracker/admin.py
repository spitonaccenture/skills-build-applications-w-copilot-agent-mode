from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin

from .models import User, Team, Workout, Activity, Leaderboard

@admin.register(User)
class UserAdmin(DjangoUserAdmin):
    fieldsets = DjangoUserAdmin.fieldsets + (
        ('Team Info', {'fields': ('team',)}),
    )
    add_fieldsets = DjangoUserAdmin.add_fieldsets + (
        ('Team Info', {'fields': ('team',)}),
    )
    list_display = ('username', 'email', 'team', 'is_staff')

@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ('name',)

@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')

@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ('user', 'workout', 'duration', 'calories', 'created_at')
    list_filter = ('workout', 'user')

@admin.register(Leaderboard)
class LeaderboardAdmin(admin.ModelAdmin):
    list_display = ('user', 'score', 'updated_at')
    ordering = ('-score',)
