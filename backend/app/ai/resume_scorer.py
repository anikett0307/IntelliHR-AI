from sentence_transformers import (
    SentenceTransformer
)

from sentence_transformers.util import cos_sim


model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)


def score_resume(
    resume_text: str,
    job_description: str
):

    resume_embedding = model.encode(
        resume_text
    )

    jd_embedding = model.encode(
        job_description
    )

    score = cos_sim(
        resume_embedding,
        jd_embedding
    )

    return float(score)