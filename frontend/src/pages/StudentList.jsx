import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getStudents, deleteStudent } from '../api';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const location = useLocation();

  useEffect(() => {
    // Check for alert in location state (from redirects)
    if (location.state?.alert) {
      showAlert(location.state.alert.message, location.state.alert.type);
      // Clean up the location state to prevent alert from showing again on refresh
      window.history.replaceState({}, document.title);
    }
    
    fetchStudents();
  }, [location]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await getStudents();
      console.log('Fetched students:', data);
      setStudents(data);
      setError(null);
    } catch (err) {
      console.error('Error in component while fetching students:', err);
      setError('Failed to fetch students. Please try again later.');
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteStudent(id);
        // Refresh the student list instead of filtering locally
        fetchStudents();
        showAlert('Student deleted successfully', 'success');
      } catch (err) {
        showAlert('Failed to delete student', 'danger');
      }
    }
  };

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert({ show: false, message: '', type: '' });
    }, 3000);
  };

  const tryAgain = () => {
    fetchStudents();
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Student List</h2>
        <Link to="/students/add" className="btn btn-primary">
          Add New Student
        </Link>
      </div>

      {alert.show && (
        <div className={`alert alert-${alert.type}`} role="alert">
          {alert.message}
        </div>
      )}

      {loading ? (
        <div className="text-center p-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading students...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          <p>{error}</p>
          <button className="btn btn-outline-danger mt-2" onClick={tryAgain}>
            Try Again
          </button>
        </div>
      ) : students.length === 0 ? (
        <div className="alert alert-info p-4 text-center">
          <p>No students found. Add a new student to get started.</p>
          <Link to="/students/add" className="btn btn-outline-primary mt-2">
            Add Your First Student
          </Link>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Enrollment Year</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id || student.id}>
                  <td>{student.id}</td>
                  <td>{student.firstname} {student.lastname}</td>
                  <td>{student.email}</td>
                  <td>{student.department}</td>
                  <td>{student.enrollmentyear}</td>
                  <td>
                    <span className={`badge ${student.isactive ? 'bg-success' : 'bg-secondary'}`}>
                      {student.isactive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <div className="btn-group btn-group-sm">
                      <Link to={`/students/edit/${student._id || student.id}`} className="btn btn-warning">
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(student._id || student.id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentList;