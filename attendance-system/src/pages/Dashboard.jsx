import { useState, useEffect } from "react";
import Layout from "../components/Layout";

function Dashboard() {
  const [stats, setStats] = useState({ totalStudents: 0, presentToday: 0, absentToday: 0, lateToday: 0 });

  useEffect(() => {
    fetch("https://localhost:7133/api/dashboard/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Error kargahin ang stats:", err));
  }, []);

  return (
    <Layout>
      <h1 className="mb-4">Dashboard</h1>

      {/* Statistics Cards */}
      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card shadow border-0">
            <div className="card-body">
              <h6 className="text-muted">Total Students</h6>
              <h2>{stats.totalStudents}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow border-0">
            <div className="card-body">
              <h6 className="text-muted">Present Today</h6>
              <h2 className="text-success">{stats.presentToday}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow border-0">
            <div className="card-body">
              <h6 className="text-muted">Absent Today</h6>
              <h2 className="text-danger">{stats.absentToday}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Card */}
      <div className="card shadow border-0 mt-4">
        <div className="card-body">
          <h4>Welcome Administrator 👋</h4>
          <p className="mb-0">
            Manage student attendance records, generate reports, and monitor attendance statistics.
          </p>
        </div>
      </div>

      {/* Attendance Summary */}
      <div className="card shadow border-0 mt-4">
        <div className="card-body">
          <h4>Attendance Summary Today</h4>
          <table className="table mt-3">
            <thead>
              <tr>
                <th>Status</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Present</td>
                <td className="text-success fw-bold">{stats.presentToday}</td>
              </tr>
              <tr>
                <td>Absent</td>
                <td className="text-danger fw-bold">{stats.absentToday}</td>
              </tr>
              <tr>
                <td>Late</td>
                <td className="text-warning fw-bold">{stats.lateToday}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;