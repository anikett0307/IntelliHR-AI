import ollama


def analyze_interview(
    transcript
):

    prompt = f"""
You are a Senior HR Interviewer.

Analyze the candidate answer.

Candidate Answer:
{transcript}

Give:

Communication Score: X/10

Confidence Score: X/10

Technical Knowledge Score: X/10

Problem Solving Score: X/10

Overall Score: X/100

Final Decision:
Strong Hire / Recommended / Needs Review / Reject

Strengths:
- ...

Weaknesses:
- ...

Return only analysis.
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