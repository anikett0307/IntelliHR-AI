SKILLS = [

    "Python",
    "Java",
    "C",
    "SQL",

    "Machine Learning",
    "Deep Learning",

    "PyTorch",
    "TensorFlow",

    "FastAPI",
    "Flask",

    "LangChain",
    "RAG",

    "LLM",
    "Generative AI",

    "Docker",
    "AWS",

    "Git",
    "GitHub",

    "MongoDB",
    "PostgreSQL",

    "Pandas",
    "NumPy",

    "OpenCV"
]


def extract_skills(
    text: str
):

    found_skills = []

    text = text.lower()

    for skill in SKILLS:

        if skill.lower() in text:

            found_skills.append(
                skill
            )

    return found_skills