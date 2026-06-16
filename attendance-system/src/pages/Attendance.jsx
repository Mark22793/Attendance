import { useState, useEffect } from "react";
import Layout from "../components/Layout";

export default function Attendance() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [attendanceStatuses, setAttendanceStatuses] = useState({});

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const response = await fetch("https://localhost:7133/api/Student");
      const data = await response.json();

      setStudents(data);

      // default status = Present
      const defaults = {};
      data.forEach((s) => {
        defaults[s.id] = "Present";
      });

      setAttendanceStatuses(defaults);
    } catch (error) {
      console.error("Error loading students:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = (id, value) => {
    setAttendanceStatuses((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const saveAttendance = async () => {
    const payload = {
      date: today,
      records: students.map((s) => ({
        studentId: s.id,
        status: attendanceStatuses[s.id],
      })),
    };

    try {
      setSaving(true);

      const response = await fetch(
        "https://localhost:7133/api/Attendance",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save attendance");
      }

      alert("Attendance saved successfully!");
      console.log(payload);
    } catch (error) {
      console.error(error);
      alert("Error saving attendance");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout>
      <h2 className="mb-3">Attendance Session</h2>
      <p><strong>Date:</strong> {today}</p>

      <div className="card shadow-sm">
        <div className="card-body">
          {loading ? (
            <div className="text-center">Loading Students...</div>
          ) : students.length === 0 ? (
            <div className="alert alert-warning">
              No students found.
            </div>
          ) : (
            <>
              <table className="table table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th>Student</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {students.map((s) => (
                    <tr key={s.id}>
                      <td>
                        {s.name}
                        <br />
                        <small>
                          {s.course} - {s.section}
                        </small>
                      </td>

                      <td>
                        <select
                          className="form-select"
                          value={attendanceStatuses[s.id]}
                          onChange={(e) =>
                            updateStatus(s.id, e.target.value)
                          }
                        >
                          <option value="Present">Present</option>
                          <option value="Absent">Absent</option>
                          <option value="Late">Late</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="text-end">
                <button
                  className="btn btn-success"
                  onClick={saveAttendance}
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Attendance"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}