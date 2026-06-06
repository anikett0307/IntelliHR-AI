import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/api";
import "../styles/employee.css";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] =
    useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 10;

  const [formData, setFormData] = useState({
    employee_code: "",
    full_name: "",
    email: "",
    department: "",
    designation: "",
    phone: "",
    status: "Active",
  });

  const [editingId, setEditingId] = useState(null);
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

const canManageEmployees =
  roleId === 1 ||
  roleId === 2;

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const response = await getEmployees();

      setEmployees(response.data);

      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
  };;

  const handleEdit = (employee) => {
    setEditingId(employee.id);

    setFormData({
      employee_code: employee.employee_code,
      full_name: employee.full_name,
      email: employee.email,
      department: employee.department,
      designation: employee.designation,
      phone: employee.phone,
      status: employee.status,
    });
  };

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Are you sure you want to delete this employee?"
        );

      if (!confirmDelete)
        return;

      try {

        await deleteEmployee(id);

        toast.success(
          "Employee Deleted Successfully"
        );

        loadEmployees();

      } catch (error) {

        toast.error(
          "Delete Failed"
        );

        console.log(error);

      }
    };

  const saveEmployee = async () => {
    try {
      if (editingId) {
        await updateEmployee(editingId, formData);
      } else {
        await createEmployee(formData);
      }

      toast.success(
        editingId
          ? "Employee Updated Successfully"
          : "Employee Created Successfully"
      );

      loadEmployees();

      setFormData({
        employee_code: "",
        full_name: "",
        email: "",
        department: "",
        designation: "",
        phone: "",
        status: "Active",
      });

      setEditingId(null);
    } catch (error) {
      toast.error(
        "Error occurred while saving employee."
      );
      console.log(error);
    }
  };

  // Search
  const filteredEmployees =
    employees.filter((employee) =>
      employee.full_name
        ?.toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )
    );

  // Pagination
  const lastIndex =
    currentPage * recordsPerPage;

  const firstIndex =
    lastIndex - recordsPerPage;

  const currentEmployees =
    filteredEmployees.slice(
      firstIndex,
      lastIndex
    );

  const totalPages =
    Math.ceil(
      filteredEmployees.length /
      recordsPerPage
    ) || 1;

  const exportEmployees = () => {
    const csvRows = [];

    csvRows.push(
      [
        "ID",
        "Name",
        "Email",
        "Department",
        "Designation",
      ].join(",")
    );

    currentEmployees.forEach(
      (employee) => {
        csvRows.push(
          [
            employee.id,
            employee.full_name,
            employee.email,
            employee.department,
            employee.designation,
          ].join(",")
        );
      }
    );

    const csvData =
      csvRows.join("\n");

    const blob = new Blob(
      [csvData],
      {
        type:
          "text/csv;charset=utf-8;",
      }
    );

    saveAs(
      blob,
      "employees.csv"
    );
  };

  if (loading) {
    return (
      <Layout>
        <h2>Loading...</h2>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="page-title">
        Employees
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

  {canManageEmployees && (

<button
  onClick={() =>
    setShowForm(!showForm)
  }
  className="btn"
>
  {showForm
    ? "Hide Form"
    : "+ Add Employee"}
</button>

)}

  <input
    type="text"
    placeholder="🔍 Search Employee..."
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
    onClick={exportEmployees}
    className="btn"
    style={{
      background: "#16a34a",
    }}
  >
    Export CSV
  </button>

</div>

      <br />
      <br />

      {showForm &&
 canManageEmployees && (
        <>
          <h3
            style={{
              padding: "30px 0",
            }}
          >
            {editingId
              ? "Edit Employee"
              : "Add Employee"}
          </h3>

          <div className="form-card">
            <input
              value={
                formData.employee_code
              }
              placeholder="Employee Code"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  employee_code:
                    e.target.value,
                })
              }
            />

            <br />
            <br />

            <input
              value={formData.full_name}
              placeholder="Full Name"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  full_name:
                    e.target.value,
                })
              }
            />

            <br />
            <br />

            <input
              value={formData.email}
              placeholder="Email"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email:
                    e.target.value,
                })
              }
            />

            <br />
            <br />

            <input
              value={
                formData.department
              }
              placeholder="Department"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  department:
                    e.target.value,
                })
              }
            />

            <br />
            <br />

            <input
              value={
                formData.designation
              }
              placeholder="Designation"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  designation:
                    e.target.value,
                })
              }
            />

            <br />
            <br />

            <input
              value={formData.phone}
              placeholder="Phone"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone:
                    e.target.value,
                })
              }
            />

            <br />
            <br />

            <button
              onClick={saveEmployee}
              className="btn-primary"
            >
              {editingId
                ? "Update Employee"
                : "Save Employee"}
            </button>
          </div>
        </>
      )}

      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {currentEmployees.length >
            0 ? (
            currentEmployees.map(
              (employee) => (
                <tr
                  key={employee.id}
                >
                  <td>
                    {employee.id}
                  </td>

                  <td>
                    {
                      employee.full_name
                    }
                  </td>

                  <td>
                    {employee.email}
                  </td>

                  <td>
                    {
                      employee.department
                    }
                  </td>

                  <td>
                    {
                      employee.designation
                    }
                  </td>

                  <td>

{canManageEmployees && (

<>
  <button
    className="approve-btn"
    onClick={() =>
      handleEdit(
        employee
      )
    }
  >
    Edit
  </button>

  {" "}

  <button
    className="reject-btn"
    onClick={() =>
      handleDelete(
        employee.id
      )
    }
  >
    Delete
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
                colSpan="6"
                style={{
                  textAlign:
                    "center",
                }}
              >
                No Employees Found
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

export default Employees;