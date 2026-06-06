import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/api";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const navigate =
    useNavigate();

  const handleLogin =
    async () => {

      try {

        const response =
  await loginUser({
    email,
    password,
  });

if (
  response.data.access_token
) {

  localStorage.setItem(
    "token",
    response.data.access_token
  );

  toast.success(
    "Login Successful"
  );

  navigate("/");

}
else if (
  response.data.message ===
  "Invalid email"
) {

  toast.error(
    "Email not found. Please Register."
  );

  return;

}
else if (
  response.data.message ===
  "Invalid password"
) {

  toast.error(
    "Incorrect Password."
  );

  return;

}

      } catch (error) {

        toast.error(
          "Invalid Credentials"
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
            fontSize: "48px",
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
          <div>
            ✅ Employee Management
          </div>

          <div>
            ✅ Leave Management
          </div>

          <div>
            ✅ Attendance Tracking
          </div>

          <div>
            ✅ Payroll Automation
          </div>

          <div>
            ✅ AI Recruitment
          </div>
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
            padding: "100px",
            borderRadius: "20px",
            width: "600px",
            boxShadow:
              "0 8px 25px rgba(0,0,0,0.08)",
          }}
        >
          <h2
  style={{
    marginBottom: "10px",
    fontSize: "38px",
    fontWeight: "700",
  }}
>
            Welcome Back 👋
          </h2>

          <p
  style={{
    color: "#64748b",
    marginBottom: "35px",
    fontSize: "18px",
  }}
>
            Sign in to your account
          </p>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            style={{
              width: "100%",
              padding: "20px",
              marginBottom: "15px",
              borderRadius: "8px",
              border:
                "1px solid #cbd5e1",
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            style={{
              width: "100%",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "8px",
              border:
                "1px solid #cbd5e1",
            }}
          />

          <button
            onClick={handleLogin}
            style={{
              width: "100%",
              padding: "20px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Login
          </button>

          <p
            style={{
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            New User?{" "}
            <Link
              to="/register"
              style={{
                color: "#2563eb",
                fontWeight: "600",
                textDecoration:
                  "none",
              }}
            >
              Register Here
            </Link>
          </p>
        </div>
      </div>

    </div>
  );
}

export default Login;