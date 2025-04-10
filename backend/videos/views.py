from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from .utils import YouTubeService

@api_view(['POST'])
@permission_classes([AllowAny])
def video_links(request):
    pass