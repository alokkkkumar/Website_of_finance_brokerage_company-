from django.shortcuts import render,HttpResponse,redirect,get_object_or_404
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
from rest_framework.decorators import api_view
from django.contrib.auth.decorators import login_required
from rest_framework.response import Response
from .serializers import TaskSerializer

from .models import Profile,Stock
# # Create your views here.

# @api_view(['GET'])
# def apiOverview(request):
# 	api_urls = {
# 		'List':'/task-list/',
# 		'Detail View':'/task-detail/<str:pk>/',
# 		'Create':'/task-create/',
# 		'Update':'/task-update/<str:pk>/',
# 		'Delete':'/task-delete/<str:pk>/',
# 		}

# 	return Response(api_urls)

# @api_view(['GET'])
# def taskList(request):
# 	tasks = Task.objects.all().order_by('-id')
# 	serializer = TaskSerializer(tasks, many=True)
# 	return Response(serializer.data)

# @api_view(['GET'])
# def taskDetail(request, pk):
# 	tasks = Task.objects.get(id=pk)
# 	serializer = TaskSerializer(tasks, many=False)
# 	return Response(serializer.data)


# @api_view(['POST'])
# def taskCreate(request):
# 	serializer = TaskSerializer(data=request.data)

# 	if serializer.is_valid():
# 		serializer.save()

# 	return Response(serializer.data)

# @api_view(['POST'])
# def taskUpdate(request, pk):
# 	task = Task.objects.get(id=pk)
# 	serializer = TaskSerializer(instance=task, data=request.data)

# 	if serializer.is_valid():
# 		serializer.save()

# 	return Response(serializer.data)


# @api_view(['DELETE'])
# def taskDelete(request, pk):
# 	task = Task.objects.get(id=pk)
# 	task.delete()

# 	return Response('Item succsesfully delete!')




@login_required(login_url='login')
def Homepage(request):
    if request.method=='GET':
        symbol=request.GET.get('symbol')
    
    user = request.user
    username = request.user.get_username()
    money = request.user.profile.money_available
    stocks = Stock.objects.filter(owner=user)
    return render(request,'home.html',{'username':username, 'money':money, 'stocks':stocks})

def Loginpage(request):
    if request.method=='POST':
        username=request.POST.get('username')
        pass1=request.POST.get('pass')
        user=authenticate(request,username=username,password=pass1)
        if user is not None:
            login(request,user)
            return redirect('home')
        else:
            return HttpResponse("INCORECT USERNAME")
    return render(request,'login.html')

def Signuppage(request):
    if request.method=='POST':
        uname=request.POST.get('username')
        email=request.POST.get('email')
        pass1=request.POST.get('password1')
        pass2=request.POST.get('password2')
        if pass1==pass2:
            my_user=User.objects.create_user(uname,email,pass1)
            my_user.save()
            return redirect('login')
        else:
            return HttpResponse("Password didnot match")
    return render(request,'signup.html')

def Logoutpage(request):
    logout(request)
    return redirect('login')

def Buy(request, quantity, stockname, stockprice):
    stockprice = stockprice/100000
    user = request.user
    
    buy_status = user.profile.buy(quantity, stockprice)
   
    
    if(buy_status==True):
        user.save()
        stock = Stock(name=stockname, quantity=quantity, owner=user, price=stockprice)
        stock.save()
        return redirect('home')
    else:
        return redirect('purchasefailed')

    

def Sell(request, stockname):
    stock = get_object_or_404(Stock, name=stockname, owner=request.user)
    money_refund = stock.price * stock.quantity
    print(money_refund)
    
    user = request.user
    user.profile.sell(money_refund)
    user.save()
    stock.delete()
    return redirect('home')

def Purchasefailed(request):
    return render(request,'purchasefailed.html')