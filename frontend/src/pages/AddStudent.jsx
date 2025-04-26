import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentForm from '../components/StudentForm';
import { createStudent } from '../api';

const AddStudent = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (studentData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      // Log the data being sent
      console.log('Submitting student data:', studentData);
      
      await createStudent(studentData);
      navigate('/students', { 
        state: { 
          alert: { 
            type: 'success', 
            message: 'Student added successfully!' 
          } 
        } 
      });
    } catch (err) {
      console.error('Error in component while adding student:', err);
      
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else if (err.message && err.message.includes('Network Error')) {
        setError('Cannot connect to the server. Please check your connection and try again.');
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-header bg-primary text-white">
            <h3 className="mb-0">Add New Student</h3>
          </div>
          <div className="card-body">
            {error && (
              <div className="alert alert-danger">
                <strong>Error:</strong> {error}
              </div>
            )}
            
            <StudentForm 
              onSubmit={handleSubmit} 
              buttonText={isSubmitting ? 'Adding...' : 'Add Student'} 
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;