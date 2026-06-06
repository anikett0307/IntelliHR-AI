import ollama


def hr_chat(
    message: str
):

    system_prompt = """
You are IntelliHR AI.

You help employees with:

1. Employee Management
2. Leave Management
3. Attendance
4. Payroll
5. Recruitment
6. Performance Tracking

Give short and professional answers.
"""

    response = ollama.chat(

        model="phi4-mini",

        messages=[

            {
                "role": "system",
                "content":
                    system_prompt,
            },

            {
                "role": "user",
                "content":
                    message,
            },
        ],
    )

    return response[
        "message"
    ]["content"]