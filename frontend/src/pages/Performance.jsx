import {
  useEffect,
  useState,
} from "react";

import Layout from "../components/Layout";

import {
  getPerformance,
  createPerformance,
  getEmployees,
} from "../services/api";

function Performance() {

  const [employees,
    setEmployees] =
    useState([]);

  const [performance,
    setPerformance] =
    useState([]);

  const [formData,
    setFormData] =
    useState({
      employee_id: "",
      employee_name: "",
      month: "",
      rating: "",
      remarks: "",
    });

    const [showForm,
  setShowForm] =
  useState(false);

  useEffect(() => {

    loadEmployees();

    loadPerformance();

  }, []);

  const loadEmployees =
    async () => {

      const response =
        await getEmployees();

      setEmployees(
        response.data
      );

    };

  const loadPerformance =
    async () => {

      const response =
        await getPerformance();

      setPerformance(
        response.data
      );

    };

  const savePerformance =
    async () => {

      await createPerformance(
        formData
      );

      loadPerformance();

      setFormData({
        employee_id: "",
        employee_name: "",
        month: "",
        rating: "",
        remarks: "",
      });

    };

  return (

    <Layout>

      <h1>
        Performance Tracking
      </h1>
      <br />

<div
  style={{
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
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
      : "+ Add Performance"}
  </button>

</div>

<br />
<br />

      {showForm && (

<div
  className="form-card"
  style={{
    width: "50%",
    maxWidth: "700px",
  }}
>

        <select
  style={{
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
  }}
          value={
            formData.employee_id
          }
          onChange={(e) => {

            const emp =
              employees.find(
                (employee) =>
                  employee.id ===
                  Number(
                    e.target.value
                  )
              );

            setFormData({
              ...formData,
              employee_id:
                emp.id,
              employee_name:
                emp.full_name,
            });

          }}
        >

          <option value="">
            Select Employee
          </option>

          {employees.map(
            (employee) => (
              <option
                key={
                  employee.id
                }
                value={
                  employee.id
                }
              >
                {
                  employee.full_name
                }
              </option>
            )
          )}

        </select>

        <br /><br />

        <input
        style={{
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  boxSizing: "border-box",
}}
          placeholder="Month"
          value={
            formData.month
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              month:
                e.target.value,
            })
          }
        />

        <br /><br />

        <input
        style={{
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  boxSizing: "border-box",
}}
          placeholder="Rating"
          value={
            formData.rating
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              rating:
                e.target.value,
            })
          }
        />

        <br /><br />

        <input
        style={{
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  boxSizing: "border-box",
}}
          placeholder="Remarks"
          value={
            formData.remarks
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              remarks:
                e.target.value,
            })
          }
        />

        <br /><br />

        <button
  className="btn"
  onClick={
    savePerformance
  }
>
  Save Performance
</button>

      </div>

)}

<br />

<div
  style={{
    overflowX: "auto",
    width: "100%",
  }}
>
  <table
    className="employee-table"
  >

        <thead>

          <tr>

            <th>ID</th>
            <th>Employee</th>
            <th>Month</th>
            <th>Rating</th>
            <th>Remarks</th>

          </tr>

        </thead>

        <tbody>

          {performance.map(
            (item) => (

              <tr
                key={item.id}
              >

                <td>
                  {item.id}
                </td>

                <td>
                  {
                    item.employee_name
                  }
                </td>

                <td>
                  {item.month}
                </td>

                <td>
                  {item.rating}
                </td>

                <td>
                  {item.remarks}
                </td>

              </tr>

            )
          )}

        </tbody>

      </table>
      </div>

    </Layout>

  );
}

export default Performance;