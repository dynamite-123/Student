from adrf.decorators import api_view as drf_api_view
from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from .content_generation import generate_content_for_topic
from .question_generation import QuestionGeneratorAgent
import json
import logging

# Set up logging
logger = logging.getLogger(__name__)

@api_view(['POST'])
@permission_classes([AllowAny])
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
    
@drf_api_view(['POST'])
@permission_classes([AllowAny])
async def generate_questions(request):
    """
    Generate multiple-choice questions based on provided content.
    
    Expected POST data:
    {
        "content": "The content to generate questions from",
        "num_questions": 5, (5 by default)
        "difficulty": "beginner|intermediate|advanced" (optional)
    }
    """
    try:
        agent = QuestionGeneratorAgent()
        data = request.data
        content = data.get('content', '')
        num_questions = data.get('num_questions', 5)
        difficulty = data.get('difficulty', 'easy')
        
        # Properly await the coroutine
        questions = await agent.generate_questions(
            str(content),
            num_questions=num_questions,
            difficulty=difficulty
        )
        
        # Convert each ResponseQuestions object to a dictionary
        serialized_questions = []
        for question in questions:
            question_dict = {
                'question': question.question,
                'option_a': question.option_a,
                'option_b': question.option_b,
                'option_c': question.option_c,
                'option_d': question.option_d,
                'answer': question.answer
            }
            serialized_questions.append(question_dict)
        
        # Return the serialized questions
        return Response({"questions": serialized_questions}, status=status.HTTP_200_OK)
        
    except Exception as e:
        logger.exception(f"Error generating questions: {str(e)}")
        return Response(
            {"error": f"Failed to generate questions: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


