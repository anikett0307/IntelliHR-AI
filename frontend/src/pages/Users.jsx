import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import { toast } from "react-toastify";

function Users() {

  const [users, setUsers] =
    useState([]);
    const [showForm, setShowForm] =
  useState(false);

  const [searchTerm, setSearchTerm] =
    useState("");
    const [currentPage, setCurrentPage] =
  useState(1);

const recordsPerPage = 10;

    const [formData, setFormData] =
  useState({
    full_name: "",
    email: "",
    password: "",
    role_id: 4,
  });

  const loadUsers =
    async () => {

      try {

        const response =
          await api.get(
            "/auth/users"
          );

        setUsers(
          response.data
        );

      } catch (error) {

        console.log(error);

      }
    };
    const createUser =
  async () => {

    try {

      await api.post(
        "/auth/register",
        formData
      );

      toast.success(
        "User Created Successfully"
      );

      loadUsers();

      setFormData({
        full_name: "",
        email: "",
        password: "",
        role_id: 4,
      });

    } catch (error) {

      toast.error("Error occurred while creating user.");
      console.log(error);

    }
};
const lastIndex =
  currentPage *
  recordsPerPage;

const firstIndex =
  lastIndex -
  recordsPerPage;

const filteredUsers =
  users.filter((user) =>
    user.full_name
      ?.toLowerCase()
      .includes(
        searchTerm.toLowerCase()
      )
  );

const currentUsers =
  filteredUsers.slice(
    firstIndex,
    lastIndex
  );

const totalPages =
  Math.ceil(
    filteredUsers.length /
    recordsPerPage
  );


  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <Layout>

      <h1 className="page-title">
  User Management
</h1>

<div
  style={{
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    marginBottom: "20px",
    alignItems: "center",
  }}
>
  <button
    className="btn-primary"
    onClick={() =>
      setShowForm(!showForm)
    }
  >
    {showForm
      ? "Hide Form"
      : "+ Add User"}
  </button>

  <input
    type="text"
    placeholder="🔍 Search User..."
    value={searchTerm}
    onChange={(e) =>
      setSearchTerm(
        e.target.value
      )
    }
    style={{
      width: "100%",
      maxWidth: "300px",

      padding: "10px",
      borderRadius: "8px",
      border:
        "1px solid #ccc",
    }}
  />
</div>
      
  {showForm && (

<div
  className="form-card"
>

  <div
    style={{
      width: "50%",
      maxWidth: "600px",
    }}
  >

    <h3>
      Create User
    </h3>

    <input
      placeholder="Full Name"
      value={formData.full_name}
      onChange={(e) =>
        setFormData({
          ...formData,
          full_name:
            e.target.value,
        })
      }
    />

    <input
      placeholder="Email"
      value={formData.email}
      onChange={(e) =>
        setFormData({
          ...formData,
          email:
            e.target.value,
        })
      }
    />

    <input
      type="password"
      placeholder="Password"
      value={formData.password}
      onChange={(e) =>
        setFormData({
          ...formData,
          password:
            e.target.value,
        })
      }
    />

    <select
      value={formData.role_id}
      onChange={(e) =>
        setFormData({
          ...formData,
          role_id:
            Number(
              e.target.value
            ),
        })
      }
      style={{
        width: "100%",
        padding: "10px",
        marginBottom: "12px",
        borderRadius: "8px",
      }}
    >
      <option value={1}>
        Admin
      </option>

      <option value={2}>
        HR Recruiter
      </option>

      <option value={3}>
        Senior Manager
      </option>

      <option value={4}>
        Employee
      </option>
    </select>

    <button
      onClick={createUser}
      className="btn-primary"
    >
      Create User
    </button>

  </div>

</div>

)}

      

      <div
  style={{
    overflowX: "auto",
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
            <th>Role ID</th>
          </tr>
        </thead>

        <tbody>
  {currentUsers.length > 0 ? (
    currentUsers.map((user) => (
      <tr key={user.id}>
        <td>{user.id}</td>

        <td>{user.full_name}</td>

        <td>{user.email}</td>

        <td>
          {user.role_id === 1
            ? "Admin"
            : user.role_id === 2
            ? "HR Recruiter"
            : user.role_id === 3
            ? "Senior Manager"
            : "Employee"}
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td
        colSpan="4"
        style={{
          textAlign: "center",
          padding: "20px",
        }}
      >
        No Users Found
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

export default Users;