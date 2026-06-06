import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import {
  extractSkills,
  generateInterview,
  dynamicScore,
  uploadResume,
  getCandidates,
  evaluateVoice,
  analyzeInterview,
  viewResume,
} from "../services/api";
import "../styles/recruitment.css";
import { jwtDecode } from "jwt-decode";

function Recruitment() {
  const [skills, setSkills] = useState([]);
  const [questions, setQuestions] = useState("");
  const [role, setRole] = useState("");
  const [agentQuestions,
    setAgentQuestions] =
    useState([]);

  const [currentQuestion,
    setCurrentQuestion] =
    useState(0);

  const [currentAnswer,
    setCurrentAnswer] =
    useState("");

  const [interviewStarted,
    setInterviewStarted] =
    useState(false);

  const [allAnswers,
    setAllAnswers] =
    useState([]);
  const [recording,
    setRecording] =
    useState(false);



  const [interviewTranscript,
    setInterviewTranscript] =
    useState("");
  const startRecording =
    () => {

      const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

      if (!SpeechRecognition) {

        alert(
          "Speech Recognition Not Supported"
        );

        return;
      }

      const recog =
        new SpeechRecognition();

      recog.lang = "en-US";

      recog.continuous =
        false;

      recog.interimResults =
        false;

      recog.start();

      setRecording(
        true
      );

      recog.onresult =
        (event) => {

          const text =
            event.results[0][0]
              .transcript;

          setCurrentAnswer(
            text
          );

          setRecording(
            false
          );
        };


    };

  const [score, setScore] = useState(null);
  const [transcript,
    setTranscript] =
    useState("");

  const [voiceResult,
    setVoiceResult] =
    useState("");

  const [interviewAnalysis,
    setInterviewAnalysis] =
    useState("");

  const [resumeFile, setResumeFile] =
    useState(null);

  const [candidateName, setCandidateName] =
    useState("");
  const [
    selectedCandidate,
    setSelectedCandidate
  ] = useState(null);

  const [
    showCandidateModal,
    setShowCandidateModal
  ] = useState(false);
  useEffect(() => {

    if (showCandidateModal) {
      document.body.style.overflow =
        "hidden";
    } else {
      document.body.style.overflow =
        "auto";
    }

    return () => {
      document.body.style.overflow =
        "auto";
    };

  }, [showCandidateModal]);

  const [candidateEmail, setCandidateEmail] =
    useState("");

  const [uploadMessage, setUploadMessage] =
    useState("");

  const [candidates, setCandidates] =
    useState([]);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const recordsPerPage = 10;

  useEffect(() => {
    loadCandidates();
  }, []);

  const loadCandidates = async () => {
    try {
      const response =
        await getCandidates();
      console.log(response.data);



      setCandidates(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpload = async () => {
    try {
      const response =
        await uploadResume(
          candidateName,
          candidateEmail,
          resumeFile
        );

      setUploadMessage(
        `${response.data.message}
   | Score: ${response.data.score}
   | Status: ${response.data.status}`
      );

      await loadCandidates();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSkills =
    async () => {

      if (
        !selectedCandidate
      ) {
        alert(
          "Please select a candidate first"
        );
        return;
      }

      try {

        const response =
          await extractSkills(
            selectedCandidate.id
          );

        setSkills(
          response.data.skills || []
        );

      } catch (error) {

        console.error(error);

      }
    };


  const startInterview =
    async () => {

      if (!role) {

        alert(
          "Enter Role First"
        );

        return;
      }

      const response =
        await generateInterview(
          role
        );

      const list =
        response.data.questions
          .split("\n")
          .filter(
            q => q.trim()
          );

      setAgentQuestions(
        list
      );

      setCurrentQuestion(
        0
      );

      setInterviewStarted(
        true
      );
      setInterviewTranscript("");

      setAllAnswers([]);

      setCurrentAnswer("");
    };


  const nextQuestion =
    () => {

      setAllAnswers([
        ...allAnswers,
        {
          question:
            agentQuestions[
            currentQuestion
            ],
          answer:
            currentAnswer,
        },
      ]);
      setInterviewTranscript(
        prev =>
          prev +
          "\n\n" +
          agentQuestions[
          currentQuestion
          ] +
          "\nAnswer: " +
          currentAnswer
      );

      setCurrentAnswer("");

      if (
        currentQuestion <
        agentQuestions.length - 1
      ) {

        setCurrentQuestion(
          currentQuestion + 1
        );

      }
      else {

        const finalTranscript =
          interviewTranscript +
          "\n\n" +
          agentQuestions[currentQuestion] +
          "\nAnswer: " +
          currentAnswer;

        setInterviewTranscript(
          finalTranscript
        );

        setInterviewStarted(
          false
        );

        setTimeout(
          async () => {

            const response =
              await analyzeInterview(
                selectedCandidate.id,
                finalTranscript
              );

            setInterviewAnalysis(
              response.data.analysis
            );

            await loadCandidates();

            alert(
              "Interview Completed Successfully"
            );

          },
          500
        );

      }
    };

  const handleScore =
    async () => {

      if (
        !selectedCandidate
      ) {
        alert(
          "Please select a candidate first"
        );
        return;
      }

      try {

        const response =
          await dynamicScore(
            selectedCandidate.id
          );

        setScore(
          response.data.score
        );

        loadCandidates();

      } catch (error) {

        console.error(error);

      }
    };

  // Pagination Logic

  const lastIndex =
    currentPage *
    recordsPerPage;

  const firstIndex =
    lastIndex -
    recordsPerPage;

  const filteredCandidates =
    candidates.filter(
      (candidate) =>
        candidate.full_name
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )
    );

  const currentCandidates =
    filteredCandidates.slice(
      firstIndex,
      lastIndex
    );

  const totalPages =
    Math.ceil(
      filteredCandidates.length /
      recordsPerPage
    ) || 1;

  const token =
    localStorage.getItem(
      "token"
    );

  let roleId = 4;

  if (
    token &&
    token !== "undefined"
  ) {
    try {

      const decoded =
        jwtDecode(token);

      roleId =
        decoded.role_id;

    } catch (error) {
      console.log(error);
    }
  }

  const isRestrictedUser =
    roleId === 4;
  const startVoiceInterview =
    () => {

      const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

      if (!SpeechRecognition) {

        alert(
          "Speech Recognition Not Supported"
        );

        return;
      }

      const recognition =
        new SpeechRecognition();

      recognition.lang =
        "en-US";

      recognition.start();

      recognition.onresult =
        (event) => {

          setTranscript(
            event.results[0][0]
              .transcript
          );

        };
    };

  const evaluateCandidateVoice =
    async () => {

      if (!transcript) {

        alert(
          "Record Candidate Answer First"
        );

        return;
      }

      try {

        const response =
          await evaluateVoice(
            transcript
          );

        setVoiceResult(
          response.data.evaluation
        );

      } catch (error) {

        console.error(error);

      }
    };

  const runInterviewAnalysis =
    async () => {

      if (
        !selectedCandidate
      ) {

        alert(
          "Select Candidate First"
        );

        return;
      }

      try {

        const response =
          await analyzeInterview(
            selectedCandidate.id,
            interviewTranscript
          );

        setInterviewAnalysis(
          response.data.analysis
        );
        await loadCandidates();

        const updated =
          response.data.candidate_id;

        const refreshed =
          (
            await getCandidates()
          )
            .data.find(
              c => c.id === updated
            );

        setSelectedCandidate(
          refreshed
        );

      } catch (error) {

        console.error(error);

      }
    };

  return (
    <Layout>
      <h1>
        Recruitment AI Dashboard
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "70% 30%",
          gap: "25px",
          alignItems: "start"
        }}
      ></div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          marginBottom: "20px",
        }}
      >

        <input
          type="text"
          placeholder="🔍 Search Candidate..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(
              e.target.value
            );
            setCurrentPage(1);
          }}
          style={{
            width: "100%",
            maxWidth: "400px",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

      </div>
      {selectedCandidate && (
        <div
          style={{
            background: "#dbeafe",
            padding: "12px",
            borderRadius: "10px",
            marginBottom: "20px",
            fontWeight: "600",
          }}
        >
          Selected Candidate:
          {" "}
          {
            selectedCandidate.full_name
          }
        </div>
      )}

      <div

      >
        <div
          className="stats-grid"
          style={{
            marginBottom: "25px",
            maxWidth: "700px",
          }}
        >
          <div className="stat-card">
            <div className="stat-title">
              Candidates
            </div>

            <div className="stat-number">
              {candidates.length}
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-title">
              Approved
            </div>

            <div className="stat-number">
              {
                candidates.filter(
                  c =>
                    c.final_decision ===
                    "Approved"
                ).length
              }
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-title">
              Review
            </div>

            <div className="stat-number">
              {
                candidates.filter(
                  c =>
                    c.final_decision ===
                    "Needs Review"
                ).length
              }
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-title">
              Rejected
            </div>

            <div className="stat-number">
              {
                candidates.filter(
                  c =>
                    c.final_decision ===
                    "Rejected"
                ).length
              }
            </div>
          </div>
        </div>

        {!isRestrictedUser && (

          <div
            className="card"
            style={{
              marginBottom: "25px"
            }}
          >
            <h2>📄 Resume Upload</h2>

            <input
              type="text"
              placeholder="Candidate Name"
              value={candidateName}
              onChange={(e) =>
                setCandidateName(
                  e.target.value
                )
              }
            />

            <br />
            <br />

            <input
              type="email"
              placeholder="Candidate Email"
              value={candidateEmail}
              onChange={(e) =>
                setCandidateEmail(
                  e.target.value
                )
              }
            />

            <br />
            <br />

            <input
              type="file"
              onChange={(e) =>
                setResumeFile(
                  e.target.files[0]
                )
              }
            />

            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              <p>{uploadMessage}</p>
            </div>

            <div
              style={{
                textAlign: "center",
                marginTop: "auto",
              }}
            >
              <button
                className="btn"
                onClick={handleUpload}
              >
                📤 Upload Resume
              </button>
            </div>
          </div>)}
        <div

        >

        </div>

        {!isRestrictedUser && (<div className="card">
          <h2>🧠 Extract Skills</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            {skills.length > 0 ? (
              skills.map(
                (skill, index) => (
                  <div key={index}>
                    ✅ {skill}
                  </div>
                )
              )
            ) : (
              <p>No skills extracted yet.</p>
            )}
          </div>

          <div
            style={{
              textAlign: "center",
              marginTop: "auto",
            }}
          >
            <button
              className="btn"
              onClick={handleSkills}
            >
              🧠 Extract Skills
            </button>
          </div>
        </div>)}
        <br />
        <br />

        {!isRestrictedUser && (<div className="card">
          <h2>🤖 AI Resume Score</h2>


          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            <h1
              style={{
                color: "#2563eb",
                fontSize: "56px",
                fontWeight: "700",
                margin: 0,
              }}
            >
              {score ? `${score}%` : "--"}
            </h1>
          </div>

          <div
            style={{
              textAlign: "center",
              marginTop: "auto",
            }}
          >
            <button
              className="btn"
              onClick={handleScore}
            >
              📊 Generate Score
            </button>
          </div>
        </div>)}
        <br />
        <br />

        {!isRestrictedUser && (<div className="card">
          <h2>🤖 AI Interview Agent</h2>
          <br />
          <p>
            Generate AI-powered interview questions based on the candidate's role and skills.
          </p><br></br>

          <input
            type="text"
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
            placeholder="Enter Role"
            style={{
              width: "100%",
              padding: "8px",
            }}
          />

          <div
            style={{
              flex: 1,
              marginTop: "20px",
              overflowY: "auto",
            }}
          >
            {!interviewStarted ? (

              <button
                className="btn"
                onClick={
                  startInterview
                }
              >
                🚀 Start Interview
              </button>

            ) : (

              <>

                <h3>

                  Question
                  {" "}
                  {currentQuestion + 1}
                  {" / "}
                  {agentQuestions.length}

                </h3>

                <p>

                  {
                    agentQuestions[
                    currentQuestion
                    ]
                  }

                </p>

                <div
                  style={{
                    background: "#f8fafc",
                    padding: "20px",
                    borderRadius: "12px"
                  }}
                >

                  <button
                    className="btn"
                    onClick={
                      startRecording
                    }
                  >
                    🎙 Start Recording
                  </button>

                  <br />
                  <br />

                  <strong>

                    {recording
                      ? "Recording..."
                      : "Transcript"}

                  </strong>

                  <p>

                    {currentAnswer}

                  </p>

                </div>

                <br />
                <br />

                <button
                  className="btn"
                  disabled={!currentAnswer}
                  onClick={nextQuestion}
                >
                  {
                    currentQuestion ===
                      agentQuestions.length - 1
                      ? "🏁 Finish Interview"
                      : "➡ Next Question"
                  }
                </button>

              </>

            )}
          </div>




        </div>)}

      </div>




      <div
        className="card"
        style={{
          marginTop: "20px",
        }}
      >
        <h2>
          🎙 Voice Recruitment Screening
        </h2>

        <button
          className="btn"
          onClick={
            startVoiceInterview
          }
        >
          🎤 Start Recording
        </button>

        <br />
        <br />

        <textarea
          value={transcript}
          readOnly
          placeholder="Candidate response will appear here..."
          style={{
            width: "100%",
            minHeight: "80px",
            padding: "10px",
          }}
        />

        <br />
        <br />

        <button
          className="btn"
          onClick={
            evaluateCandidateVoice
          }
        >
          🤖 Evaluate Candidate
        </button>

        <br />
        <br />

        <pre
          style={{
            whiteSpace:
              "pre-wrap",
          }}
        >
          {voiceResult}
        </pre>

        <br />
        <div>
          <button
            className="btn"
            onClick={
              runInterviewAnalysis
            }
          >
            🧠 Analyze Interview
          </button></div>

        <br />
        <br />

        <pre
          style={{
            whiteSpace:
              "pre-wrap",
          }}
        >
          {interviewAnalysis}
        </pre>
      </div>

      <div
        className="card"
        style={{
          marginTop: "20px",
        }}
      >
        <h2>
          🏆 Candidate Ranking Leaderboard
        </h2>

        {[...candidates]
          .sort((a, b) => {

            const scoreA =
              (a.score || 0) * 0.4 +
              (a.interview_score || 0) * 0.6;

            const scoreB =
              (b.score || 0) * 0.4 +
              (b.interview_score || 0) * 0.6;

            return scoreB - scoreA;
          })
          .slice(0, 5)
          .map((candidate, index) => {

            const overallScore =
              (
                (candidate.score || 0) * 0.4 +
                (candidate.interview_score || 0) * 0.6
              ).toFixed(2);

            return (

              <div
                key={candidate.id}
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems:
                    "center",
                  padding: "15px",
                  borderBottom:
                    "1px solid #e5e7eb",
                }}
              >

                <div>
                  <strong>

                    {index === 0
                      ? "🥇"
                      : index === 1
                        ? "🥈"
                        : index === 2
                          ? "🥉"
                          : `#${index + 1}`}

                  </strong>

                  {" "}
                  {candidate.full_name}

                </div>

                <div>

                  Overall Score:
                  {" "}
                  <strong>
                    {overallScore}
                  </strong>

                </div>

              </div>

            );
          })}
      </div>
      <h2
        style={{
          marginTop: "40px",
          marginBottom: "20px"
        }}
      >
        Candidates
      </h2>

      <div
        style={{
          overflowX: "auto",
          width: "100%",
        }}
      >
        <table
          className="employee-table"
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Skills</th>
              <th>Resume Score</th>
              <th>Interview Score</th>
              <th>Final Decision</th>
              <th>Status</th>
              <th>Profile</th>

            </tr>
          </thead>

          <tbody>
            {currentCandidates.length >
              0 ? (
              currentCandidates.map(
                (
                  candidate
                ) => (
                  <tr
                    key={
                      candidate.id
                    }
                  >
                    <td>
                      {
                        candidate.id
                      }
                    </td>
                    <td>
                      {
                        candidate.full_name
                      }
                    </td>
                    <td>
                      {
                        candidate.email
                      }
                    </td>
                    <td
                      style={{
                        maxWidth: "250px",
                        fontSize: "13px",
                      }}
                    >
                      {candidate.skills}
                    </td>
                    <td>
                      {candidate.score}
                    </td>

                    <td>
                      {
                        candidate.interview_score || 0
                      }
                    </td>

                    <td>
                      {
                        candidate.final_decision ||
                        "Pending"
                      }
                    </td>

                    <td>
                      {
                        candidate.status
                      }
                    </td>

                    <td>
                      <button
                        className="btn"
                        onClick={() => {

                          setSelectedCandidate(
                            candidate
                          );

                          setShowCandidateModal(
                            true
                          );

                        }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td
                  colSpan="7"
                  style={{
                    textAlign:
                      "center",
                  }}
                >
                  No candidates
                  found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          gap: "10px",
          alignItems:
            "center",
        }}
      >
        <button
          disabled={
            currentPage ===
            1
          }
          onClick={() =>
            setCurrentPage(
              currentPage -
              1
            )
          }
        >
          Previous
        </button>

        <span>
          Page {currentPage} of{" "}
          {totalPages}
        </span>

        <button
          disabled={
            currentPage ===
            totalPages
          }
          onClick={() =>
            setCurrentPage(
              currentPage +
              1
            )
          }
        >
          Next
        </button>
      </div>



      {showCandidateModal && selectedCandidate && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              background: "white",
              width: "75%",
              maxWidth: "1100px",
              height: "80vh",
              overflowY: "auto",
              overflowX: "hidden",
              padding: "30px",
              borderRadius: "16px",
              boxShadow:
                "0 10px 40px rgba(0,0,0,0.25)",
              scrollbarWidth: "thin",
            }}
          >

            <div
              style={{
                background: "white",
                width: "100%",
                padding: "0",
              }}
            >

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >

                <div>

                  <h1
                    style={{
                      margin: 0,
                      color: "#1e293b",
                    }}
                  >
                    👤 {selectedCandidate.full_name}
                  </h1>

                  <p
                    style={{
                      color: "#64748b",
                      marginTop: "5px",
                    }}
                  >
                    Candidate Profile
                  </p>

                </div>

                <button
                  className="btn"
                  onClick={() =>
                    setShowCandidateModal(false)
                  }
                >
                  Close
                </button>

              </div>

              <hr />

              <div>



                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(250px, 1fr))",
                    columnGap: "25px",
                    rowGap: "20px",
                    marginBottom: "35px",
                  }}
                >

                  <div
                    style={{
                      background: "#eff6ff",
                      padding: "20px",
                      borderRadius: "12px",
                    }}
                  >
                    <h4>📊 Resume Score</h4>
                    <h2 style={{ color: "#2563eb" }}>
                      {selectedCandidate.score}
                    </h2>
                  </div>

                  <div
                    style={{
                      background: "#f0fdf4",
                      padding: "20px",
                      borderRadius: "12px",
                    }}
                  >
                    <h4>🎤 Interview Score</h4>
                    <h2 style={{ color: "#16a34a" }}>
                      {selectedCandidate.interview_score || 0}
                    </h2>
                  </div>

                  <div
                    style={{
                      background: "#fef3c7",
                      padding: "20px",
                      borderRadius: "12px",
                    }}
                  >
                    <h4>🏆 Final Decision</h4>
                    <h2>
                      {selectedCandidate.final_decision}
                    </h2>
                  </div>

                  <div
                    style={{
                      background: "#eef2ff",
                      padding: "20px",
                      borderRadius: "12px",
                    }}
                  >
                    <h4>📄 Resume</h4>

                    <button
                      className="btn"
                      onClick={async () => {

                        const response =
                          await viewResume(
                            selectedCandidate.id
                          );

                        const file =
                          new Blob(
                            [response.data],
                            {
                              type:
                                "application/pdf",
                            }
                          );

                        const url =
                          window.URL.createObjectURL(
                            file
                          );

                        window.open(
                          url,
                          "_blank"
                        );

                      }}
                    >
                      View Resume
                    </button>

                  </div>

                </div>
                <h3>
                  📧 Contact
                </h3>

                <p>
                  {selectedCandidate.email}
                </p>
              </div>
              <br />



              <div
                style={{
                  background: "#eff6ff",
                  padding: "20px",
                  borderRadius: "12px",
                  marginBottom: "20px",
                }}
              >

                <h3>
                  🤖 AI Recommendation
                </h3>

                <pre
                  style={{
                    whiteSpace: "pre-wrap",
                    fontFamily: "inherit",
                    margin: 0,
                    lineHeight: "1.8",
                  }}
                >
                  {
                    selectedCandidate.recommendation ||
                    "No recommendation available"
                  }
                </pre>

              </div>
              <br />

              <div
                style={{
                  background: "#f8fafc",
                  padding: "20px",
                  borderRadius: "12px",
                }}
              >

                <h3>
                  🎤 Interview Analysis
                </h3>

                <pre
                  style={{
                    whiteSpace:
                      "pre-wrap",
                    fontFamily:
                      "inherit",
                  }}
                >
                  {
                    selectedCandidate.interview_analysis ||
                    "No interview analysis available"
                  }
                </pre>

              </div>

            </div>
          </div>
        </div>
      )}

    </Layout>
  );
}

export default Recruitment;