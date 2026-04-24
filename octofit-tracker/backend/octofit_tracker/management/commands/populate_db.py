from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from djongo import models
from octofit_tracker import models as app_models

from django.db import connection

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        User = get_user_model()
        # Clear collections
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Create Teams
        marvel = Team.objects.create(name='Team Marvel')
        dc = Team.objects.create(name='Team DC')

        # Create Users
        users = [
            User(email='ironman@marvel.com', username='ironman', team=marvel),
            User(email='captain@marvel.com', username='captain', team=marvel),
            User(email='batman@dc.com', username='batman', team=dc),
            User(email='superman@dc.com', username='superman', team=dc),
        ]
        for user in users:
            user.set_password('password')
            user.save()

        # Create Workouts
        workout1 = Workout.objects.create(name='Pushups', description='Do 50 pushups')
        workout2 = Workout.objects.create(name='Running', description='Run 5km')

        # Create Activities
        Activity.objects.create(user=users[0], workout=workout1, duration=30, calories=200)
        Activity.objects.create(user=users[1], workout=workout2, duration=60, calories=500)
        Activity.objects.create(user=users[2], workout=workout1, duration=20, calories=150)
        Activity.objects.create(user=users[3], workout=workout2, duration=45, calories=350)

        # Create Leaderboard
        Leaderboard.objects.create(user=users[0], score=1000)
        Leaderboard.objects.create(user=users[1], score=900)
        Leaderboard.objects.create(user=users[2], score=950)
        Leaderboard.objects.create(user=users[3], score=920)

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data'))

# Models for reference (should be in octofit_tracker/models.py):
# class Team(models.Model):
#     name = models.CharField(max_length=100)
#
# class Workout(models.Model):
#     name = models.CharField(max_length=100)
#     description = models.TextField()
#
# class Activity(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     workout = models.ForeignKey(Workout, on_delete=models.CASCADE)
#     duration = models.IntegerField()
#     calories = models.IntegerField()
#
# class Leaderboard(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     score = models.IntegerField()
