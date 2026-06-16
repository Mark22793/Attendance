import Layout from "../components/Layout";

function Dashboard() {
return ( <Layout> <h1 className="mb-4">Dashboard</h1>

```
  {/* Statistics Cards */}
  <div className="row">

    <div className="col-md-4 mb-3">
      <div className="card shadow border-0">
        <div className="card-body">
          <h6 className="text-muted">Total Students</h6>
          <h2>150</h2>
        </div>
      </div>
    </div>

    <div className="col-md-4 mb-3">
      <div className="card shadow border-0">
        <div className="card-body">
          <h6 className="text-muted">Present Today</h6>
          <h2 className="text-success">130</h2>
        </div>
      </div>
    </div>

    <div className="col-md-4 mb-3">
      <div className="card shadow border-0">
        <div className="card-body">
          <h6 className="text-muted">Absent Today</h6>
          <h2 className="text-danger">20</h2>
        </div>
      </div>
    </div>

  </div>

  {/* Welcome Card */}
  <div className="card shadow border-0 mt-4">
    <div className="card-body">
      <h4>Welcome Administrator 👋</h4>
      <p className="mb-0">
        Manage student attendance records, generate reports,
        and monitor attendance statistics from this dashboard.
      </p>
    </div>
  </div>

  {/* Attendance Summary */}
  <div className="card shadow border-0 mt-4">
    <div className="card-body">
      <h4>Attendance Summary</h4>

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
            <td>130</td>
          </tr>

          <tr>
            <td>Absent</td>
            <td>20</td>
          </tr>

          <tr>
            <td>Late</td>
            <td>15</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  {/* Recent Activities */}
  <div className="card shadow border-0 mt-4">
    <div className="card-body">
      <h4>Recent Activities</h4>

      <ul className="list-group mt-3">
        <li className="list-group-item">
          Attendance recorded for BSIT 3A
        </li>

        <li className="list-group-item">
          New student added: Maria Santos
        </li>

        <li className="list-group-item">
          Monthly report generated
        </li>
      </ul>
    </div>
  </div>

</Layout>


);
}

export default Dashboard;
