import Layout from "../components/Layout";

function Reports() {
  return (
    <Layout>
      <h2>Attendance Reports</h2>

      <div className="card p-3 mt-3">
        <h5>Report Type</h5>

        <div>
          <input type="radio" name="type" /> Daily
          <input type="radio" name="type" className="ms-3" /> Weekly
          <input type="radio" name="type" className="ms-3" /> Monthly
        </div>

        <div className="row mt-3">
          <div className="col-md-6">
            <label>From</label>
            <input type="date" className="form-control" />
          </div>

          <div className="col-md-6">
            <label>To</label>
            <input type="date" className="form-control" />
          </div>
        </div>

        <button className="btn btn-primary mt-3">
          Generate Report
        </button>
      </div>

      {/* OUTPUT */}
      <div className="card p-3 mt-3">
        <h5>Report Summary</h5>
        <p>Total Students: 150</p>
        <p>Present: 130</p>
        <p>Absent: 20</p>
        <p>Attendance Rate: 86%</p>
      </div>
    </Layout>
  );
}

export default Reports;