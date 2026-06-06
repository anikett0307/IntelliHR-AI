import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Layout from "../components/Layout";
import { getDashboardStats } from "../services/api";
import "../styles/dashboard.css";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

function Dashboard() {
  const token = localStorage.getItem("token");

  let roleId = 4;

  try {
    if (token && token !== "undefined") {
      const decoded = jwtDecode(token);
      roleId = decoded.role_id;
    }
  } catch (error) {
    console.log("Invalid Token");
  }

  const [stats, setStats] = useState({
  total_employees: 0,
  total_users: 0,
  total_leaves: 0,
  total_attendance: 0,
  total_payroll: 0,
  total_candidates: 0,
  total_performance: 0,
  average_rating: 0,
  top_performer: "N/A",
});

  const chartData = [
    {
      name: "Employees",
      value: stats.total_employees,
    },
    {
      name: "Leaves",
      value: stats.total_leaves,
    },
    {
      name: "Attendance",
      value: stats.total_attendance,
    },
    {
      name: "Payroll",
      value: stats.total_payroll,
    },
    {
      name: "Candidates",
      value: stats.total_candidates,
    },
  ];

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      const response = await getDashboardStats();

      setStats({
        total_employees:
          response.data.total_employees || 0,

        total_users:
          response.data.total_users || 0,

        total_leaves:
          response.data.total_leaves || 0,

        total_attendance:
          response.data.total_attendance || 0,

        total_payroll:
          response.data.total_payroll || 0,

        total_candidates:
          response.data.total_candidates || 0,

        total_performance:
          response.data.total_performance || 0,

        average_rating:
          response.data.average_rating || 0,

        top_performer:
          response.data.top_performer || "N/A",
      });
    } catch (error) {
      console.error(
        "Error loading dashboard stats:",
        error
      );
    }
  };

  return (
    <Layout>
      <h1 className="dashboard-title">
        IntelliHR Dashboard
      </h1>

      <div className="stats-grid">
        {/* Employees */}
        <div className="stat-card">
          <div className="stat-title">
            👥 Employees
          </div>

          <div className="stat-number">
            {stats.total_employees}
          </div>

          
        </div>

        {/* Users */}
        {roleId === 1 && (
          <div className="stat-card">
            <div className="stat-title">
              👤 Users
            </div>

            <div className="stat-number">
              {stats.total_users}
            </div>
          </div>
        )}

        {/* Leaves */}
        <div className="stat-card">
          <div className="stat-title">
            📄 Leaves
          </div>

          <div className="stat-number">
            {stats.total_leaves}
          </div>
        </div>

        {/* Attendance */}
        <div className="stat-card">
          <div className="stat-title">
            🕒 Attendance
          </div>

          <div className="stat-number">
            {stats.total_attendance}
          </div>
        </div>

        {/* Payroll */}
        {roleId === 1 && (
          <div className="stat-card">
            <div className="stat-title">
              💰 Payroll
            </div>

            <div className="stat-number">
              {stats.total_payroll}
            </div>
          </div>
        )}

        {/* Candidates */}
        {(roleId === 1 ||
          roleId === 2) && (
          <div className="stat-card">
            <div className="stat-title">
              🎯 Candidates
            </div>

            <div className="stat-number">
              {stats.total_candidates}
            </div>
          </div>
        )}
      
      

  <div className="stat-card">
    <div className="stat-title">
      ⭐ Average Rating
    </div>

    <div className="stat-number">
      {stats.average_rating}
    </div>
  </div>

  <div className="stat-card">
    <div className="stat-title">
      🏆 Top Performer
    
    </div>

    <div
      className="stat-number"
      style={{
        fontSize: "20px",
      }}
    >
      {stats.top_performer}
    </div>
  </div>

  <div className="stat-card">
    <div className="stat-title">
      📈 Reviews
    </div>

    <div className="stat-number">
      {stats.total_performance}
    </div>
  </div>

</div>

      <div className="chart-grid">

  <div className="chart-card">

    <h2>
      📈 Department Statistics
    </h2>

    <ResponsiveContainer
      width="100%"
      height={280}
    >
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />

        <Bar
          dataKey="value"
          fill="#2563eb"
          radius={[8,8,0,0]}
        />
      </BarChart>
    </ResponsiveContainer>

  </div>

  <div className="chart-card">

    <h2>
      📊 Workforce Distribution
    </h2>

    <ResponsiveContainer
      width="100%"
      height={280}
    >
      <PieChart>

        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          outerRadius={90}
          label
        >

          <Cell fill="#2563eb" />
          <Cell fill="#22c55e" />
          <Cell fill="#f59e0b" />
          <Cell fill="#8b5cf6" />
          <Cell fill="#ef4444" />

        </Pie>

        <Tooltip />

      </PieChart>

    
        </ResponsiveContainer>
      </div>
      </div>
    </Layout>
  );
}

export default Dashboard;