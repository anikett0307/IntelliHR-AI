import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  getLeaves,
  approveLeave,
  rejectLeave,
  applyLeave,
} from "../services/api";
import "../styles/leave.css";
import { toast } from "react-toastify";

function Leaves() {
  const [leaves, setLeaves] = useState([]);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);
    const [showForm, setShowForm] =
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

const canApproveLeave =
  roleId === 1 ||
  roleId === 2 ||
  roleId === 3;

  const recordsPerPage = 10;

  const [formData, setFormData] =
    useState({
      employee_id: "",
      leave_type: "",
      start_date: "",
      end_date: "",
      reason: "",
    });

  const loadLeaves = async () => {
    const response =
      await getLeaves();

    setLeaves(response.data);
  };

  useEffect(() => {
    loadLeaves();
  }, []);

  const handleApprove = async (id) => {
    await approveLeave(id);

    toast.success(
      "Leave Approved Successfully"
    );

    loadLeaves();
  };

  const handleReject = async (id) => {
    await rejectLeave(id);

    toast.success(
      "Leave Rejected Successfully"
    );

    loadLeaves();
  };

  const handleApplyLeave =
    async () => {
      try {
        await applyLeave(
          formData
        );

        alert(
          "Leave Applied Successfully"
        );

        setFormData({
          employee_id: "",
          leave_type: "",
          start_date: "",
          end_date: "",
          reason: "",
        });

        loadLeaves();
      } catch (error) {
        console.log(error);
      }
    };

  const lastIndex =
    currentPage *
    recordsPerPage;

  const firstIndex =
    lastIndex -
    recordsPerPage;

  const filteredLeaves =
    leaves.filter((leave) =>
      leave.leave_type
        ?.toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )
    );

  const currentLeaves =
    filteredLeaves.slice(
      firstIndex,
      lastIndex
    );

  const totalPages =
    Math.ceil(
      filteredLeaves.length /
        recordsPerPage
    ) || 1;

  return (
    <Layout>
      <h1 className="page-title">
        Leave Management
      </h1>
      <div
  style={{
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: "20px",
  }}
>

  <button
    onClick={() =>
      setShowForm(!showForm)
    }
    className="btn"
  >
    {showForm
      ? "Hide Form"
      : "+ Apply Leave"}
  </button>

  <input
    type="text"
    placeholder="🔍 Search Leave Type..."
    value={searchTerm}
    onChange={(e) => {
      setSearchTerm(
        e.target.value
      );
      setCurrentPage(1);
    }}
    style={{
      flex: 1,
      minWidth: "220px",
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid #ccc",
    }}
  />

</div>

      
      {showForm && (
        <div className="leave-card">
          <h3>
            Apply Leave
          </h3>

        <input
          placeholder="Employee ID"
          value={
            formData.employee_id
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              employee_id:
                e.target.value,
            })
          }
        />

        <br />
        <br />

        <input
          placeholder="Leave Type"
          value={
            formData.leave_type
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              leave_type:
                e.target.value,
            })
          }
        />

        <br />
        <br />

        <input
          type="date"
          value={
            formData.start_date
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              start_date:
                e.target.value,
            })
          }
        />

        <br />
        <br />

        <input
          type="date"
          value={
            formData.end_date
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              end_date:
                e.target.value,
            })
          }
        />

        <br />
        <br />

        <input
          placeholder="Reason"
          value={
            formData.reason
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              reason:
                e.target.value,
            })
          }
        />

        <br />
        <br />

        <button
          className="approve-btn"
          onClick={
            handleApplyLeave
          }
        >
          Apply Leave
        </button>
      </div>
      )}

      <br />

      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee</th>
            <th>Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {currentLeaves.length >
          0 ? (
            currentLeaves.map(
              (leave) => (
                <tr
                  key={leave.id}
                >
                  <td>
                    {leave.id}
                  </td>

                  <td>
                    {
                      leave.employee_id
                    }
                  </td>

                  <td>
                    {
                      leave.leave_type
                    }
                  </td>

                  <td>
                    {
                      leave.status
                    }
                  </td>

                  <td>

{canApproveLeave && (

<>
  <button
    className="approve-btn"
    onClick={() =>
      handleApprove(
        leave.id
      )
    }
  >
    Approve
  </button>

  {" "}

  <button
    className="reject-btn"
    onClick={() =>
      handleReject(
        leave.id
      )
    }
  >
    Reject
  </button>
</>

)}

</td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td
                colSpan="5"
                style={{
                  textAlign:
                    "center",
                }}
              >
                No leaves found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <button
          disabled={
            currentPage === 1
          }
          onClick={() =>
            setCurrentPage(
              currentPage - 1
            )
          }
        >
          Previous
        </button>

        <span>
          Page {currentPage}
          {" "}of{" "}
          {totalPages}
        </span>

        <button
          disabled={
            currentPage ===
            totalPages
          }
          onClick={() =>
            setCurrentPage(
              currentPage + 1
            )
          }
        >
          Next
        </button>
      </div>
    </Layout>
  );
}

export default Leaves;