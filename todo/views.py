from django.shortcuts import render,redirect
from .models import Todo

def home(request):
    todos=Todo.objects.all()
    if request.method == "POST":
        title=request.POST.get("title")

        if title:
            Todo.objects.create(title=title)

        return redirect("home")
    
    return render(request,"home.html",{"todos":todos})