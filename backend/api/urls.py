from django.urls import path
from . import views

urlpatterns = [
    path('notes/', views.NoteListView.as_view(), name='note-list'),  # Endpoint to list and create notes
    path('notes/delete/<int:pk>/', views.NoteDelete.as_view(), name='note-delete'), 
]



