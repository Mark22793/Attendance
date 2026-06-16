import { useEffect, useState } from "react";
import Layout from "../components/Layout";

export default function Reports() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
  
      const response = await fetch(
        "https://localhost:7133/api/Attendance"
      );
  
      const data = await response.json();
      setRecords(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIXED: works for FLAT attendance data (most common EF Core output)
  const flattened = Array.isArray(records)
    ? records.map((r) => ({
        date: r.date,
        student:
          r.studentName || r.name || `Student ID: ${r.studentId}`,
        status: r.status,
      }))
    : [];

  const filtered = filterDate
    ? flattened.filter((r) => r.date === filterDate)
    : flattened;

  return (
    <Layout>
      <h2 className="mb-3">Attendance Reports</h2>

      <div className="card shadow-sm">
        <div className="card-body">
          {/* FILTER */}
          <div className="d-flex gap-2 mb-3">
            <input
              type="date"
              className="form-control"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />

            <button
              className="btn btn-primary"
              onClick={fetchReports}
            >
              Refresh
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => setFilterDate("")}
            >
              Clear
            </button>
          </div>

          {/* CONTENT */}
          {loading ? (
            <div className="text-center">Loading Reports...</div>
          ) : filtered.length === 0 ? (
            <div className="alert alert-warning">
              No attendance records found.
            </div>
          ) : (
            <table className="table table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Date</th>
                  <th>Student</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((r, index) => (
                  <tr key={index}>
                    <td>{r.date}</td>
                    <td>{r.student}</td>
                    <td>
                      <span
                        className={
                          r.status === "Present"
                            ? "text-success"
                            : r.status === "Absent"
                            ? "text-danger"
                            : "text-warning"
                        }
                      >
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Layout>
  );
}