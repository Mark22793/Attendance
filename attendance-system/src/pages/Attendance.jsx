import { useState } from "react";
import Layout from "../components/Layout";

export default function Attendance() {
  const [date] = useState("June 16, 2026");

  const [students, setStudents] = useState([
    { id: 1, name: "Juan Dela Cruz", status: "Present" },
    { id: 2, name: "Maria Santos", status: "Absent" },
  ]);

  const updateStatus = (id, status) => {
    setStudents(
      students.map((s) =>
        s.id === id ? { ...s, status } : s
      )
    );
  };

  const saveAttendance = () => {
    alert("Attendance Saved (Frontend Only - No Backend Yet)");
  };

  return (
    <Layout>
      <h2 className="mb-3">Attendance Session</h2>

      {/* DATE DISPLAY */}
      <div className="alert alert-info">
        <strong>Date:</strong> {date}
      </div>

      {/* TABLE */}
      <div className="card shadow-sm">
        <div className="card-body">
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Student</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan="2" className="text-center">
                    No students found
                  </td>
                </tr>
              ) : (
                students.map((s) => (
                  <tr key={s.id}>
                    <td>{s.name}</td>
                    <td>
                      <select
                        className="form-select"
                        value={s.status}
                        onChange={(e) =>
                          updateStatus(s.id, e.target.value)
                        }
                      >
                        <option>Present</option>
                        <option>Absent</option>
                        <option>Late</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* SAVE BUTTON */}
          <div className="text-end">
            <button
              className="btn btn-success"
              onClick={saveAttendance}
            >
              Save Attendance
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}