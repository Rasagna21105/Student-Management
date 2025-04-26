import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StudentForm from '../components/StudentForm';
import { getStudentById, updateStudent } from '../api';

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true);
        const data = await getStudentById(id);
        setStudent(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch student details. Please try again.');
        console.error('Error fetching student:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  const handleSubmit = async (studentData) => {
    try {
      await updateStudent(id, studentData);
      navigate('/students', { 
        state: { 
          alert: { 
            type: 'success', 
            message: 'Student updated successfully!' 
          } 
        } 
      });
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.error || 'Failed to update student');
      } else {
        setError('Network error. Please try again later.');
      }
      console.error('Error updating student:', err);
    }
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading student data...</p>
      </div>
    );
  }

  if (error && !student) {
    return (
      <div className="alert alert-danger my-3" role="alert">
        {error}
        <div className="mt-3">
          <button 
            className="btn btn-primary me-2" 
            onClick={() => navigate('/students')}
          >
            Back to Students
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-header bg-warning">
            <h3 className="mb-0">Edit Student</h3>
          </div>
          <div className="card-body">
            {error && <div className="alert alert-danger">{error}</div>}
            {student && (
              <StudentForm 
                student={student} 
                onSubmit={handleSubmit} 
                buttonText="Update Student" 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStudent;