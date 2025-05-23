from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Note(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE,related_name="notes")  # Link to the user who created the note
    title = models.CharField(max_length=200)  
    content = models.TextField()  
    created_at = models.DateTimeField(auto_now_add=True)  
 

    def __str__(self):
        return self.title  # Return the title of the note when it's represented as a string 
