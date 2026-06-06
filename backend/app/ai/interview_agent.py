import ollama


def generate_interview_questions(
    role
):

    prompt = f"""
Generate exactly 5 interview questions
for a {role}.

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


def evaluate_answer(
    question,
    answer
):

    prompt = f"""
Question:
{question}

Candidate Answer:
{answer}

Evaluate answer.

Give score out of 20.

Return only number.
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