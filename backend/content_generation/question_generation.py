import asyncio
import json
import logging
from pydantic_ai.providers.google_gla import GoogleGLAProvider
from pydantic_ai.models.gemini import GeminiModel
from pydantic_ai import Agent
from typing import List
if __name__ == "__main__":
    from schemas import ResponseQuestions
else:
    from .schemas import ResponseQuestions


class QuestionGeneratorAgent:
    def __init__(self):
        self.model = GeminiModel(
            "gemini-2.0-flash",
            provider=GoogleGLAProvider(
                api_key="AIzaSyAYgz6Eua8KDZ8E08w-4SAtkKuAq_GHyJM"
            ),
        )
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }

    async def generate_questions(
        self, text: str, num_questions: int = 5, difficulty: str = "easy"
    ) -> List[ResponseQuestions]:
        """
        Generates multiple-choice questions based on the given text.
        If use_rag is True, enhances the input with web content.
        """

        agent = Agent(
            self.model,
            result_type=List[ResponseQuestions],
            system_prompt=(
                f"You are a teacher tasked with creating {num_questions} multiple-choice questions on the following information: {text} "
                "Each question should have four options (a, b, c, d) and a correct answer."
                f"Make sure the difficulty of each question is {difficulty}. "
                f"Focus your questions on the core text provided, using the additional information only for context and enrichment."
                "The questions should be clear, concise, and relevant to the text."
            ),
        )

        response = await agent.run(text)
        return response.data


if __name__ == "__main__":

    logging.basicConfig(level=logging.INFO)

    def pretty_print_question(question, index):
        """Print a question in a formatted, easy-to-read way"""
        print(f"\n{'='*60}")
        print(f"QUESTION {index+1}")
        print(f"{'='*60}")
        print(f"{question.question}\n")
        print(f"A. {question.option_a}")
        print(f"B. {question.option_b}")
        print(f"C. {question.option_c}")
        print(f"D. {question.option_d}")
        print(f"\nCorrect Answer: {question.answer}")
        print(f"{'='*60}")

    # Example usage
    generator = QuestionGeneratorAgent()

    data = {
        "topic": "Quantum Physics",
        "summary": "Quantum physics is the study of the very small – atoms and subatomic particles. It describes how energy and matter behave at the atomic and subatomic levels, revealing a world governed by probabilities and wave-particle duality, vastly different from classical physics.",
        "sections": [
            {
                "title": "Introduction to Quantum Mechanics",
                "content": "Classical physics, which accurately describes the macroscopic world, breaks down at the atomic level. Quantum mechanics arose to explain phenomena like the behavior of electrons and photons. It introduces the concept that energy is not continuous but comes in discrete packets called quanta. This means that energy can only exist in specific, defined amounts. Quantum mechanics uses mathematical models to predict the probability of finding a particle in a certain state or location.",
                "key_points": [
                    "Classical physics fails at the atomic level.",
                    "Quantum mechanics deals with the behavior of matter and energy at the atomic and subatomic levels.",
                    "Energy is quantized, meaning it comes in discrete packets called quanta.",
                ],
            },
            {
                "title": "Quantization of Energy and Photons",
                "content": "One of the fundamental principles of quantum mechanics is the quantization of energy. This means that energy, like electricity, comes in discrete packets, not in a continuous flow. These packets of energy are called quanta. Light, for example, is composed of tiny packets of energy called photons. Each photon has a specific amount of energy determined by its frequency. Higher frequency light (like blue light) has photons with more energy than lower frequency light (like red light). This explains the photoelectric effect, where light can knock electrons off a metal surface only if the photons have enough energy.",
                "key_points": [
                    "Energy is quantized, existing in discrete packets.",
                    "Photons are quanta of light, each with a specific energy.",
                    "The energy of a photon is directly proportional to its frequency.",
                ],
            },
            {
                "title": "Wave-Particle Duality and Wave Functions",
                "content": "Quantum mechanics reveals that particles, like electrons, can behave as both waves and particles. This is known as wave-particle duality. A wave function is a mathematical description of the quantum state of a particle. It describes the probability of finding a particle at a particular location at a particular time. The square of the wave function gives the probability density, which tells us the likelihood of finding the particle in a specific region of space.",
                "key_points": [
                    "Particles can behave as both waves and particles (wave-particle duality).",
                    "A wave function describes the quantum state of a particle.",
                    "The square of the wave function gives the probability of finding a particle in a specific location.",
                ],
            },
            {
                "title": "Superposition",
                "content": "Superposition is a fundamental principle in quantum mechanics that states that a quantum system can exist in multiple states simultaneously until it is measured. Imagine a coin spinning in the air. Before it lands, it's neither heads nor tails; it's in a superposition of both states. Similarly, an electron can be in multiple energy levels or locations at the same time. Only when we measure the electron's state does it 'collapse' into one definite state.",
                "key_points": [
                    "A quantum system can exist in multiple states simultaneously.",
                    "Measurement causes the system to 'collapse' into a single, definite state.",
                    "Superposition is like a coin spinning in the air before it lands.",
                ],
            },
            {
                "title": "Quantum Entanglement",
                "content": "Quantum entanglement is a bizarre phenomenon where two or more particles become linked together in such a way that they share the same fate, no matter how far apart they are. If you measure a property of one entangled particle, you instantly know the corresponding property of the other particle, even if they are light-years away. This instantaneous correlation doesn't mean information is being transmitted faster than light (which would violate Einstein's theory of relativity); it's more about the particles sharing a single quantum state.",
                "key_points": [
                    "Entangled particles are linked together, sharing the same fate.",
                    "Measuring one entangled particle instantly reveals information about the other.",
                    "Entanglement does not allow for faster-than-light communication.",
                ],
            },
            {
                "title": "Heisenberg Uncertainty Principle",
                "content": "The Heisenberg Uncertainty Principle states that there is a fundamental limit to the precision with which certain pairs of physical properties of a particle, like position and momentum, can be known simultaneously. The more accurately you know the position of a particle, the less accurately you can know its momentum, and vice versa. This is not due to limitations in our measuring instruments, but rather a fundamental property of the universe at the quantum level.",
                "key_points": [
                    "There's a limit to how accurately certain pairs of properties (e.g., position and momentum) can be known simultaneously.",
                    "The more accurately you know one property, the less accurately you know the other.",
                    "This is a fundamental property of the universe, not a limitation of measurement tools.",
                ],
            },
        ],
        "references": [
            "Griffiths, David J. Introduction to Quantum Mechanics. Pearson Prentice Hall, 2005.",
            "Liboff, Richard L. Introductory Quantum Mechanics. Addison-Wesley, 2003.",
            "Rae, Alastair I.M. Quantum Mechanics. Taylor & Francis, 2002.",
        ],
        "difficulty_level": "beginner",
    }
    
    data = str(data)
    # Create async function to run our coroutines
    async def main():
        print(f"\nGenerating questions about: {data}")
        print(f"Difficulty level: medium")
        print(f"Number of questions: 3\n")

        try:
            questions = await generator.generate_questions(
                data, num_questions=3, difficulty="medium"
            )
            print("****************************************")
            print(type(questions))
            # print(type(questions.data))

            # Pretty print each question
            for i, question in enumerate(questions):
                pretty_print_question(question, i)

            # Also output as JSON for debugging
            print("\nJSON representation of questions:")
            print(json.dumps([q.model_dump() for q in questions], indent=2))

        except Exception as e:
            logging.error(f"Error generating questions: {str(e)}")
            raise

    # Run the async function with asyncio
    asyncio.run(main())
