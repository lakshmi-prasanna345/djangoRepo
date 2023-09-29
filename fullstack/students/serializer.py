
from .models import Students,ExamDetails
from rest_framework import serializers
class StudentSerializer(serializers.ModelSerializer):
   class Meta:
      model=Students
      fields="__all__"
class ExamSerializer(serializers.ModelSerializer):
    # You can include the percentage field here if you want
    percentage = serializers.SerializerMethodField()

    class Meta:
        model = ExamDetails
        fields = "__all__"

    def get_percentage(self, obj):
        return (obj.actual_score / obj.max_score) * 100