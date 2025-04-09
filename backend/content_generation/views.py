from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from .content_generation import generate_content_for_topic
import json
import logging

# Set up logging
logger = logging.getLogger(__name__)

@api_view(['POST'])
@permission_classes([AllowAny])  # Require authentication
def generate_content(request):
    """
    Generate educational content based on a provided topic.
    
    Expected POST data:
    {
        "topic": "The topic to generate content for",
        "difficulty": "beginner|intermediate|advanced" (optional)
    }
    """
    try:
        # Extract data from request
        data = request.data
        topic = data.get('topic')
        
        # Validate input
        if not topic:
            return Response(
                {"error": "A topic is required"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Get optional difficulty parameter (default to intermediate)
        difficulty = data.get('difficulty', 'intermediate')
        
        # Validate difficulty
        valid_difficulties = ["beginner", "intermediate", "advanced"]
        if difficulty.lower() not in valid_difficulties:
            return Response(
                {"error": f"Difficulty must be one of: {', '.join(valid_difficulties)}"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Generate content
        logger.info(f"Generating content for topic: '{topic}' at {difficulty} level")
        content = generate_content_for_topic(topic, difficulty.lower())
        
        # Return the generated content
        return Response(content, status=status.HTTP_200_OK)
        
    except ValueError as e:
        # Handle expected errors from content generation
        logger.error(f"Content generation error: {str(e)}")
        return Response(
            {"error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    except Exception as e:
        # Handle unexpected errors
        logger.exception(f"Unexpected error in generate_content view: {str(e)}")
        return Response(
            {"error": "An unexpected error occurred"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )