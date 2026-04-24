from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Team, Workout, Activity

User = get_user_model()

class OctoFitTrackerAPITests(APITestCase):
    def setUp(self):
        self.team = Team.objects.create(name='Team Alpha')
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='pass1234',
            team=self.team,
        )
        self.workout = Workout.objects.create(
            name='Morning Run',
            description='Run for 30 minutes',
        )

    def test_api_root(self):
        url = reverse('api-root')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('users', response.data)
        self.assertIn('teams', response.data)
        self.assertIn('workouts', response.data)
        self.assertIn('activities', response.data)
        self.assertIn('leaderboard', response.data)

    def test_create_activity(self):
        url = reverse('activity-list')
        payload = {
            'user': self.user.id,
            'workout': self.workout.id,
            'duration': 30,
            'calories': 250,
        }
        response = self.client.post(url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Activity.objects.count(), 1)
        activity = Activity.objects.first()
        self.assertEqual(activity.duration, 30)
        self.assertEqual(activity.calories, 250)
