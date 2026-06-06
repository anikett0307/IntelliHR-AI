import {
  useEffect,
  useState,
} from "react";

import Layout from "../components/Layout";

import {
  getJobs,
  createJob,
  deleteJob,
  updateJob,
} from "../services/api";

function JobManagement() {

  const [jobs,
    setJobs] =
    useState([]);

  const [showForm,
    setShowForm] =
    useState(false);
    const token =
  localStorage.getItem(
    "token"
  );

let roleId = 4;

if (token) {
  try {

    const decoded =
      JSON.parse(
        atob(
          token.split(".")[1]
        )
      );

    roleId =
      decoded.role_id;

  } catch {}
}

const canEdit =
  roleId === 1 ||
  roleId === 2;

  const [search,
    setSearch] =
    useState("");

  const [form,
    setForm] =
    useState({
      title: "",
      department: "",
      description: "",
      status: "Open",
    });

  const loadJobs =
    async () => {

      const response =
        await getJobs();

      setJobs(
        response.data
      );

    };

  useEffect(() => {

    loadJobs();

  }, []);

  const handleCreate =
    async () => {

      await createJob(
        form
      );

      setForm({
        title: "",
        department: "",
        description: "",
        status: "Open",
      });

      setShowForm(
        false
      );

      loadJobs();

    };

  const filteredJobs =
    jobs.filter(
      (job) =>
        job.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <Layout>

      <h1>
        📋 Job Management
      </h1>

      <div
  style={{
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "15px",
  marginBottom: "20px",
}}
>

        {canEdit && (

<button
  className="btn"
  onClick={() =>
    setShowForm(
      !showForm
    )
  }
>
          {showForm
            ? "Hide Form"
            : "+ Add Job"}
        </button>
        )}

        <input
          placeholder=" 🔍 Search Job..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          style={{
            padding: "10px",
            width: "250px",
            borderRadius: "10px",
            border:
              "1px solid #ccc",
          }}
        />

      </div>

      {showForm && (

  <div
    className="card"
    
    style={{
      width: "50%",
      minWidth: "500px",
      marginBottom: "25px",
      padding: "25px",
      borderRadius: "16px",
      border: "1px solid #e5e7eb",
      boxShadow:
        "0 8px 24px rgba(0,0,0,0.08)",
      background: "#ffffff",
    }}
  >
    <h2
  style={{
    marginTop: 0,
    marginBottom: "20px",
    color: "#1e293b",
  }}
>
  📋 Create New Job
</h2>

          <input
  placeholder="Job Title"
  style={{
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
  }}
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title:
                  e.target.value,
              })
            }
          />

          <br />
          <br />

          <input
  placeholder="Department"
  style={{
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
  }}
            value={
              form.department
            }
            onChange={(e) =>
              setForm({
                ...form,
                department:
                  e.target.value,
              })
            }
          />

          <br />
          <br />

          <textarea
  placeholder="Description"
  rows={5}
  style={{
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    resize: "vertical",
  }}
            value={
              form.description
            }
            onChange={(e) =>
              setForm({
                ...form,
                description:
                  e.target.value,
              })
            }
          />

          <br />
          <br />

          <select
  value={
    form.status
  }
  style={{
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
  }}
            onChange={(e) =>
              setForm({
                ...form,
                status:
                  e.target.value,
              })
            }
          >
            <option>
              Open
            </option>

            <option>
              Closed
            </option>

          </select>

          <br />
          <br />

          <button
  className="btn"
  onClick={
    handleCreate
  }
  style={{
    width: "100%",
    padding: "14px",
    fontSize: "16px",
    fontWeight: "600",
  }}
>
  💾 Save Job
</button>
            

        </div>

      )}

      <table
        className="employee-table"
      >

        <thead>

          <tr>

            <th>ID</th>

            <th>Title</th>

            <th>Department</th>

            <th>Status</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {filteredJobs.map(
            (job) => (

              <tr
                key={job.id}
              >

                <td>
                  {job.id}
                </td>

                <td>
                  {job.title}
                </td>

                <td>
                  {
                    job.department
                  }
                </td>

                <td>

                  {job.status ===
                  "Open"
                    ? "🟢 Open"
                    : "🔴 Closed"}

                </td>

                <td>

  {canEdit && (

  <button
    className="btn"
                    onClick={
                      async () => {

                        await deleteJob(
                          job.id
                        );

                        loadJobs();

                      }
                    }
                  >
                    Delete
                  </button>
    )}

                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

      <div
        style={{
          marginTop:
            "20px",
          display:
            "flex",
          justifyContent:
            "center",
          gap: "10px",
        }}
      >

        <button
          className="btn"
        >
          Prev
        </button>

        <button
          className="btn"
        >
          1
        </button>

        <button
          className="btn"
        >
          Next
        </button>

      </div>

    </Layout>
  );
}

export default JobManagement;