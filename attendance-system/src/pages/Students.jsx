import { useState } from "react";
import Layout from "../components/Layout";

function Students() {
  const [students, setStudents] = useState([
    { id: 1, name: "Juan Dela Cruz", course: "BSIT", section: "3A" },
    { id: 2, name: "Maria Santos", course: "BSCS", section: "2B" },
  ]);

  const [search, setSearch] = useState("");
  const [course, setCourse] = useState("");
  const [section, setSection] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [viewData, setViewData] = useState(null);

  const [form, setForm] = useState({ name: "", course: "", section: "" });

  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) &&
    (course ? s.course === course : true) &&
    (section ? s.section === section : true)
  );

  const openAdd = () => {
    setForm({ name: "", course: "", section: "" });
    setEditData(null);
    setShowModal(true);
  };

  const saveStudent = () => {
    if (editData) {
      setStudents(students.map(s =>
        s.id === editData.id ? { ...form, id: editData.id } : s
      ));
    } else {
      setStudents([...students, { ...form, id: Date.now() }]);
    }
    setShowModal(false);
  };

  const deleteStudent = (id) => {
    setStudents(students.filter(s => s.id !== id));
  };

  return (
    <Layout>
      <div className="d-flex justify-content-between mb-3">
        <h2>Students</h2>

        <button className="btn btn-primary" onClick={openAdd}>
          Add Student
        </button>
      </div>

      {/* SEARCH + FILTER */}
      <div className="row mb-3">
        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="Search student..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <select className="form-control" onChange={(e) => setCourse(e.target.value)}>
            <option value="">All Courses</option>
            <option>BSIT</option>
            <option>BSCS</option>
          </select>
        </div>

        <div className="col-md-4">
          <select className="form-control" onChange={(e) => setSection(e.target.value)}>
            <option value="">All Sections</option>
            <option>3A</option>
            <option>2B</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Course</th>
            <th>Section</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                No records found
              </td>
            </tr>
          ) : (
            filtered.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.course}</td>
                <td>{s.section}</td>
                <td>
                  <button className="btn btn-info btn-sm me-1" onClick={() => setViewData(s)}>
                    View
                  </button>

                  <button
                    className="btn btn-warning btn-sm me-1"
                    onClick={() => {
                      setEditData(s);
                      setForm(s);
                      setShowModal(true);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteStudent(s.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* MODAL */}
      {showModal && (
        <div className="modal d-block" style={{ background: "#000000aa" }}>
          <div className="modal-dialog">
            <div className="modal-content p-3">
              <h5>{editData ? "Edit Student" : "Add Student"}</h5>

              <input
                className="form-control mb-2"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <input
                className="form-control mb-2"
                placeholder="Course"
                value={form.course}
                onChange={(e) => setForm({ ...form, course: e.target.value })}
              />

              <input
                className="form-control mb-2"
                placeholder="Section"
                value={form.section}
                onChange={(e) => setForm({ ...form, section: e.target.value })}
              />

              <button className="btn btn-primary me-2" onClick={saveStudent}>
                Save
              </button>

              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW */}
      {viewData && (
        <div className="modal d-block" style={{ background: "#000000aa" }}>
          <div className="modal-dialog">
            <div className="modal-content p-3">
              <h5>Student Details</h5>
              <p>Name: {viewData.name}</p>
              <p>Course: {viewData.course}</p>
              <p>Section: {viewData.section}</p>

              <button className="btn btn-secondary" onClick={() => setViewData(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Students;