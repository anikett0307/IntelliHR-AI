import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  getPayroll,
  createPayroll,
} from "../services/api";
import "../styles/payroll.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";

function Payroll() {
  const [payroll, setPayroll] =
    useState([]);
    const [searchTerm, setSearchTerm] =
  useState("");
  const [currentPage, setCurrentPage] =
  useState(1);
  const [showForm, setShowForm] =
  useState(false);

const recordsPerPage = 10;
const lastIndex =
  currentPage *
  recordsPerPage;

const firstIndex =
  lastIndex -
  recordsPerPage;

const filteredPayroll =
  payroll.filter((item) =>
    String(item.employee_id)
      .includes(searchTerm)
  );

const currentPayroll =
  filteredPayroll.slice(
    firstIndex,
    lastIndex
  );

const totalPages =
  Math.ceil(
    filteredPayroll.length /
    recordsPerPage
  );
  const exportPayroll = () => {
    

  const worksheet =
    XLSX.utils.json_to_sheet(
      payroll
    );

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Payroll"
  );

  const excelBuffer =
    XLSX.write(
      workbook,
      {
        bookType: "xlsx",
        type: "array",
      }
    );

  const blob =
    new Blob(
      [excelBuffer],
      {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }
    );

  saveAs(
    blob,
    "payroll.xlsx"
  );
};

    const [formData, setFormData] =
  useState({
    employee_id: "",
    basic_salary: "",
    hra: "",
    bonus: "",
    deductions: "",
  });

  const loadPayroll =
    async () => {
      const response =
        await getPayroll();

      setPayroll(
        response.data
      );
    };
    const handleCreatePayroll =
  async () => {

    try {

      await createPayroll({
        employee_id:
          Number(
            formData.employee_id
          ),

        basic_salary:
          Number(
            formData.basic_salary
          ),

        hra:
          Number(
            formData.hra
          ),

        bonus:
          Number(
            formData.bonus
          ),

        deductions:
          Number(
            formData.deductions
          ),
      });

      toast.success(
        "Payroll Created Successfully"
      );

      setFormData({
        employee_id: "",
        basic_salary: "",
        hra: "",
        bonus: "",
        deductions: "",
      });

      loadPayroll();

    } catch (error) {

      console.log(error);

    }
};

  useEffect(() => {
    loadPayroll();
  }, []);

  return (
    <Layout>
      <h1 className="page-title">
  Payroll
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
    className="btn"
    onClick={() =>
      setShowForm(!showForm)
    }
  >
    {showForm
      ? "Hide Form"
      : "+ Add Payroll"}
  </button>

  <input
    type="text"
    placeholder="🔍 Search Employee ID..."
    value={searchTerm}
    onChange={(e) =>
      setSearchTerm(
        e.target.value
      )
    }
    style={{
      flex: 1,
      minWidth: "220px",
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid #ccc",
    }}
  />

  <button
    className="btn"
    onClick={exportPayroll}
    style={{
      background: "#16a34a",
    }}
  >
    Export Excel
  </button>

</div>

<button
  onClick={exportPayroll}
  style={{
    marginLeft: "10px",
    padding: "10px 20px",
    background: "#16a34a",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "20px",
  }}
>
  Export Excel
</button>


{showForm && (
  <div className="payroll-card">

    <h3>
      Create Payroll
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

  <br /><br />

  <input
    placeholder="Basic Salary"
    value={
      formData.basic_salary
    }
    onChange={(e) =>
      setFormData({
        ...formData,
        basic_salary:
          e.target.value,
      })
    }
  />

  <br /><br />

  <input
    placeholder="HRA"
    value={
      formData.hra
    }
    onChange={(e) =>
      setFormData({
        ...formData,
        hra:
          e.target.value,
      })
    }
  />

  <br /><br />

  <input
    placeholder="Bonus"
    value={
      formData.bonus
    }
    onChange={(e) =>
      setFormData({
        ...formData,
        bonus:
          e.target.value,
      })
    }
  />

  <br /><br />

  <input
    placeholder="Deductions"
    value={
      formData.deductions
    }
    onChange={(e) =>
      setFormData({
        ...formData,
        deductions:
          e.target.value,
      })
    }
  />

  <br /><br />

  <button
    className="approve-btn"
    onClick={
      handleCreatePayroll
    }
  >
    Generate Payroll
  </button>

</div>
)}

<br />

      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee</th>
            <th>Basic</th>
            <th>HRA</th>
            <th>Bonus</th>
            <th>Deductions</th>
            <th>Net Salary</th>
          </tr>
        </thead>

        <tbody>
  {currentPayroll.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.employee_id}</td>
                <td>{item.basic_salary}</td>
                <td>{item.hra}</td>
              <td>{item.bonus}</td>
              <td>{item.deductions}</td>
              <td>{item.net_salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
  style={{
    marginTop: "20px",
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
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
    of {totalPages}
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

export default Payroll;