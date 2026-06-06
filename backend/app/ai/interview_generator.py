import ollama


def generate_questions(
    role: str
):

    prompt = f"""
Generate 10 interview questions for a {role}.

Include:

1. Technical Questions
2. HR Questions
3. Scenario Based Questions

Return only questions.
"""

    response = ollama.chat(
        model="phi4-mini",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response["message"]["content"]