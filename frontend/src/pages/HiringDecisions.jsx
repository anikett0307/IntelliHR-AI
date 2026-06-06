import {
  useEffect,
  useState,
} from "react";

import Layout from "../components/Layout";
import api from "../services/api";

function HiringDecisions() {

  const [candidates,
    setCandidates] =
    useState([]);

  const loadCandidates =
    async () => {

      const response =
        await api.get(
          "/hiring-decisions/"
        );

      setCandidates(
        response.data
      );

    };

  useEffect(() => {
    loadCandidates();
  }, []);

  const updateDecision =
    async (
      id,
      action
    ) => {

      await api.put(
        `/hiring-decisions/${action}/${id}`
      );

      loadCandidates();

    };

  const approved =
    candidates.filter(
      c =>
        c.final_decision ===
        "Approved"
    ).length;

  const rejected =
    candidates.filter(
      c =>
        c.final_decision ===
        "Rejected"
    ).length;

  const review =
    candidates.filter(
      c =>
        c.final_decision ===
        "Needs Review"
    ).length;

  return (

    <Layout>

      <h1
        className="dashboard-title"
      >
        🏆 Final Hiring Decisions
      </h1>

      {/* KPI CARDS */}

      <div
        className="stats-grid"
        style={{
          marginBottom:
            "25px",
        }}
      >

        <div
          className="stat-card"
        >
          <div
            className="stat-title"
          >
            Total Candidates
          </div>

          <div
            className="stat-number"
          >
            {
              candidates.length
            }
          </div>
        </div>

        <div
          className="stat-card"
        >
          <div
            className="stat-title"
          >
            Approved
          </div>

          <div
            className="stat-number"
          >
            {approved}
          </div>
        </div>

        <div
          className="stat-card"
        >
          <div
            className="stat-title"
          >
            Rejected
          </div>

          <div
            className="stat-number"
          >
            {rejected}
          </div>
        </div>

      </div>

      {/* TABLE CARD */}

      <div
        className="page-card"
      >

        <div
          style={{
            overflowX:
              "auto",
          }}
        >

          <table
            className="employee-table"
          >

            <thead>

              <tr>

                <th>ID</th>

                <th>Candidate</th>

                <th>Score</th>

                <th>Status</th>

                <th>Decision</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {candidates.map(
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

                      <strong>
                        {
                          candidate.full_name
                        }
                      </strong>

                      <br />

                      <small>
                        {
                          candidate.email
                        }
                      </small>

                    </td>

                    <td>

                      <span
                        style={{
                          fontWeight:
                            "bold",
                          color:
                            candidate.score >=
                            60
                              ? "#16a34a"
                              : "#dc2626",
                        }}
                      >
                        {
                          candidate.score
                        }
                      </span>

                    </td>

                    <td>
                      {
                        candidate.status
                      }
                    </td>

                    <td>

                      <span
                        style={{
                          padding:
                            "8px 12px",
                          borderRadius:
                            "20px",
                          fontSize:
                            "13px",
                          fontWeight:
                            "600",

                          background:
                            candidate.final_decision ===
                            "Approved"
                              ? "#dcfce7"
                              : candidate.final_decision ===
                                "Rejected"
                              ? "#fee2e2"
                              : "#fef3c7",

                          color:
                            candidate.final_decision ===
                            "Approved"
                              ? "#166534"
                              : candidate.final_decision ===
                                "Rejected"
                              ? "#991b1b"
                              : "#92400e",
                        }}
                      >
                        {candidate.final_decision ||
                          "Pending"}
                      </span>

                    </td>

                    <td>

                      <div
                        style={{
                          display: "flex",
flexWrap: "wrap",
gap: "8px",
                        }}
                      >

                        <button
  onClick={() =>
    updateDecision(
      candidate.id,
      "approve"
    )
  }
  style={{
    background: "#16a34a",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  }}
>
  Approve
</button>

                        <button
  onClick={() =>
    updateDecision(
      candidate.id,
      "review"
    )
  }
  style={{
    background: "#f59e0b",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  }}
>
  Review
</button>

                        <button
  onClick={() =>
    updateDecision(
      candidate.id,
      "reject"
    )
  }
  style={{
    background: "#dc2626",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  }}
>
  Reject
</button>

                      </div>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </Layout>

  );
}

export default HiringDecisions;