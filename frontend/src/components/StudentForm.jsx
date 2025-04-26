import React, { useState, useEffect } from 'react';

const StudentForm = ({ student, onSubmit, buttonText, isSubmitting }) => {
  const currentYear = new Date().getFullYear();
  
  const [formData, setFormData] = useState({
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    dob: '',
    department: '',
    enrollmentyear: currentYear,
    isactive: true
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (student) {
      // Format the date for the date input (YYYY-MM-DD)
      let formattedDate = '';
      if (student.dob) {
        const date = new Date(student.dob);
        if (!isNaN(date)) {
          formattedDate = date.toISOString().split('T')[0];
        }
      }
      
      setFormData({
        id: student.id || '',
        firstname: student.firstname || '',
        lastname: student.lastname || '',
        email: student.email || '',
        dob: formattedDate,
        department: student.department || '',
        enrollmentyear: student.enrollmentyear || currentYear,
        isactive: student.isactive !== undefined ? student.isactive : true
      });
    }
  }, [student, currentYear]);

  const validateForm = () => {
    const newErrors = {};
    
    // ID validation - required, alphanumeric, unique (uniqueness checked on server)
    if (!formData.id.trim()) {
      newErrors.id = 'Student ID is required';
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.id)) {
      newErrors.id = 'Student ID must be alphanumeric';
    }
    
    // First name validation - required, min 2 chars
    if (!formData.firstname.trim()) {
      newErrors.firstname = 'First name is required';
    } else if (formData.firstname.trim().length < 2) {
      newErrors.firstname = 'First name must be at least 2 characters';
    }
    
    // Last name validation - required, min 2 chars
    if (!formData.lastname.trim()) {
      newErrors.lastname = 'Last name is required';
    } else if (formData.lastname.trim().length < 2) {
      newErrors.lastname = 'Last name must be at least 2 characters';
    }
    
    // Email validation - required, valid format
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Date of birth validation - required
    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required';
    }
    
    // Department validation - required
    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
    }
    
    // Enrollment year validation - required, between 2000 and current year
    if (!formData.enrollmentyear) {
      newErrors.enrollmentyear = 'Enrollment year is required';
    } else if (
      formData.enrollmentyear < 2000 || 
      formData.enrollmentyear > currentYear
    ) {
      newErrors.enrollmentyear = `Year must be between 2000 and ${currentYear}`;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const formatDateForSubmission = (dateString) => {
    // If the date is in DD/MM/YYYY format, convert to YYYY-MM-DD
    if (dateString.includes('/')) {
      const [day, month, year] = dateString.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    return dateString;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Format data before submission
      const submissionData = {
        ...formData,
        dob: formatDateForSubmission(formData.dob),
        enrollmentyear: parseInt(formData.enrollmentyear, 10)
      };
      
      console.log('Form validated, submitting:', submissionData);
      onSubmit(submissionData);
    } else {
      console.log('Form validation failed:', errors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="id" className="form-label">Student ID</label>
        <input
          type="text"
          className={`form-control ${errors.id ? 'is-invalid' : ''}`}
          id="id"
          name="id"
          value={formData.id}
          onChange={handleChange}
          placeholder="Enter unique student ID"
          disabled={student && student.id} // Disable editing ID for existing students
        />
        {errors.id && <div className="invalid-feedback">{errors.id}</div>}
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="firstname" className="form-label">First Name</label>
          <input
            type="text"
            className={`form-control ${errors.firstname ? 'is-invalid' : ''}`}
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="Enter first name"
          />
          {errors.firstname && <div className="invalid-feedback">{errors.firstname}</div>}
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="lastname" className="form-label">Last Name</label>
          <input
            type="text"
            className={`form-control ${errors.lastname ? 'is-invalid' : ''}`}
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="Enter last name"
          />
          {errors.lastname && <div className="invalid-feedback">{errors.lastname}</div>}
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email address"
        />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="dob" className="form-label">Date of Birth</label>
        <input
          type="date"
          className={`form-control ${errors.dob ? 'is-invalid' : ''}`}
          id="dob"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
        />
        <small className="form-text text-muted">Format: DD-MM-YYYY</small>
        {errors.dob && <div className="invalid-feedback">{errors.dob}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="department" className="form-label">Department</label>
        <input
          type="text"
          className={`form-control ${errors.department ? 'is-invalid' : ''}`}
          id="department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          placeholder="e.g., Computer Science"
        />
        {errors.department && <div className="invalid-feedback">{errors.department}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="enrollmentyear" className="form-label">Enrollment Year</label>
        <input
          type="number"
          className={`form-control ${errors.enrollmentyear ? 'is-invalid' : ''}`}
          id="enrollmentyear"
          name="enrollmentyear"
          min="2000"
          max={currentYear}
          onChange={handleChange}
        />
        {errors.enrollmentyear && <div className="invalid-feedback">{errors.enrollmentyear}</div>}
      </div>

      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="isactive"
          name="isactive"
          checked={formData.isactive}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="isactive">Active Student</label>
      </div>

      <button 
        type="submit" 
        className="btn btn-primary"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Processing...
          </>
        ) : (
          buttonText || 'Submit'
        )}
      </button>
    </form>
  );
};

export default StudentForm;