from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, RetrieveAPIView, \
    ListAPIView, DestroyAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from .models import Notification
from .serializers import NotificationSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework.authentication import SessionAuthentication
# Create your views here.
class ListNotif(APIView):  #this returns notification messages as sepaparte pages
      permission_classes = [IsAuthenticated]
      #authentication_classes = [SessionAuthentication]
      def get(self, request):
        user = request.user  # Get the currently authenticated user
        notifs = Notification.objects.filter(user=user) # Filter notifications by user
        
        paginator = PageNumberPagination()
        paginated_notifs = paginator.paginate_queryset(notifs, request)
        serialized_stores = [
            {
               'message': notif.message,
                'id':notif.id
                
            }
            for notif in paginated_notifs
        ]
        #return paginator.get_paginated_response(serialized_stores)
        response= paginator.get_paginated_response(serialized_stores)
        
        return response
      
    
@api_view(['GET']) #THEY DID IT W PATCH
def mark_notification_read(request, pk):
    notification = Notification.objects.get(id=pk)
    notification.is_read = True
    notification.save()
    serializer = NotificationSerializer(notification)
    return Response(serializer.data)

@api_view(['DELETE'])
def delete_notification(request, pk):
    notification = Notification.objects.get(id=pk)
    notification.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)