import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  getAttendance,
  checkIn,
  checkOut,
} from "../services/api";
import "../styles/attendance.css";
import { toast } from "react-toastify";

function Attendance() {
  const [records, setRecords] =
    useState([]);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const recordsPerPage = 10;

  const [
    employeeId,
    setEmployeeId,
  ] = useState("");

  const loadAttendance =
    async () => {
      const response =
        await getAttendance();

      setRecords(
        response.data
      );
    };

  const handleCheckIn =
    async () => {
      try {
        await checkIn(
          Number(
            employeeId
          )
        );

        toast.success(
          "Check-In Successful"
        );

        loadAttendance();
      } catch (error) {
        console.log(error);
      }
    };

  const handleCheckOut =
    async () => {
      try {
        await checkOut(
          Number(
            employeeId
          )
        );

        toast.success(
          "Check-Out Successful"
        );

        loadAttendance();
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

  const filteredAttendance =
    records.filter(
      (record) =>
        String(
          record.employee_id
        ).includes(
          searchTerm
        )
    );

  const currentAttendance =
    filteredAttendance.slice(
      firstIndex,
      lastIndex
    );

  const totalPages =
    Math.ceil(
      filteredAttendance.length /
        recordsPerPage
    ) || 1;

  useEffect(() => {
    loadAttendance();
  }, []);

  return (
    <Layout>
      <h1 className="page-title">
        Attendance
      </h1>

      <div
  style={{
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "20px",
  }}
>

  <input
    type="text"
    placeholder="🔍 Search Employee ID..."
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

      <div className="attendance-card">
        <h3>
          Attendance Actions
        </h3>

        <input
          type="number"
          placeholder="Employee ID"
          value={employeeId}
          onChange={(e) =>
            setEmployeeId(
              e.target.value
            )
          }
        />

        <br />
        <br />

        <div
  style={{
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  }}
>

  <button
    className="approve-btn"
    onClick={
      handleCheckIn
    }
  >
    Check In
  </button>

  <button
    className="reject-btn"
    onClick={
      handleCheckOut
    }
  >
    Check Out
  </button>

</div>
      </div>

      <br />

      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee</th>
            <th>Date</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {currentAttendance.length >
          0 ? (
            currentAttendance.map(
              (record) => (
                <tr
                  key={
                    record.id
                  }
                >
                  <td>
                    {record.id}
                  </td>

                  <td>
                    {
                      record.employee_id
                    }
                  </td>

                  <td>
                    {
                      record.attendance_date
                    }
                  </td>

                  <td>
                    {
                      record.check_in
                    }
                  </td>

                  <td>
                    {
                      record.check_out
                    }
                  </td>

                  <td>
                    {
                      record.status
                    }
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td
                colSpan="6"
                style={{
                  textAlign:
                    "center",
                }}
              >
                No attendance
                records found
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
          alignItems:
            "center",
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

export default Attendance;