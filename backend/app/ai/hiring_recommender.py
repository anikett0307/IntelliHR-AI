import ollama


def generate_recommendation(
    score,
    skills
):

    prompt = f"""
You are an expert HR recruiter.

Candidate Resume Score:
{score}

Candidate Skills:
{skills}

Give:

1. Recommendation:
Strong Hire / Recommended / Needs Review / Reject

2. Reason:
Short reason in 2 lines.

Return only:

Recommendation:
...

Reason:
...
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