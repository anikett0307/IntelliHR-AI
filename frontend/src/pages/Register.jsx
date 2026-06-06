import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

function Register() {

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({
      full_name: "",
      email: "",
      password: "",
    });

  const handleRegister =
    async () => {

      try {

        await api.post(
          "/auth/register",
          {
            ...formData,
            role_id: 4,
          }
        );

        toast.success(
          "Registration Successful"
        );

        navigate("/login");

      } catch (error) {

        toast.error(
          "Registration Failed"
        );

        console.log(error);

      }
    };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
      }}
    >

      {/* Left Panel */}

      <div
        style={{
          flex: 3,
          background:
            "linear-gradient(135deg,#0f172a,#1e293b)",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        <h1
          style={{
            fontSize: "64px",
            marginBottom: "15px",
          }}
        >
          IntelliHR AI
        </h1>

        <h3
          style={{
            color: "#cbd5e1",
            marginBottom: "40px",
          }}
        >
          AI-Powered HR Management Platform
        </h3>

        <div
          style={{
            fontSize: "18px",
            lineHeight: "2.2",
          }}
        >
          <div>✅ Employee Management</div>
          <div>✅ Leave Management</div>
          <div>✅ Attendance Tracking</div>
          <div>✅ Payroll Automation</div>
          <div>✅ AI Recruitment</div>
        </div>
      </div>

      {/* Right Panel */}

      <div
        style={{
          flex: 7,
          background: "#f8fafc",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            background: "white",
            width: "650px",
            padding: "70px",
            borderRadius: "16px",
            boxShadow:
              "0 8px 25px rgba(0,0,0,0.08)",
          }}
        >

          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "#2563eb",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 auto 25px",
              fontSize: "36px",
            }}
          >
            🧠
          </div>

          <h2
            style={{
              textAlign: "center",
              fontSize: "38px",
            }}
          >
            Create Account
          </h2>

          <p
            style={{
              textAlign: "center",
              color: "#64748b",
              marginBottom: "30px",
            }}
          >
            Register as Employee
          </p>

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
            style={{
              width: "100%",
              padding: "16px",
              marginBottom: "15px",
            }}
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
            style={{
              width: "100%",
              padding: "16px",
              marginBottom: "15px",
            }}
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
            style={{
              width: "100%",
              padding: "16px",
              marginBottom: "20px",
            }}
          />

          <button
            onClick={handleRegister}
            style={{
              width: "100%",
              padding: "16px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            Register
          </button>

          <p
            style={{
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            Already have an account?{" "}
            <Link to="/login">
              Login
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
}

export default Register;