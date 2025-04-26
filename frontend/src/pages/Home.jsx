import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeStudents: 0,
    departments: []
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/student');
        const students = response.data;
        
        // Calculate stats
        const activeStudents = students.filter(student => student.isactive).length;
        
        // Get unique departments and count
        const deptCount = {};
        students.forEach(student => {
          if (student.department) {
            deptCount[student.department] = (deptCount[student.department] || 0) + 1;
          }
        });
        
        const departments = Object.entries(deptCount).map(([name, count]) => ({ name, count }));
        
        setStats({
          totalStudents: students.length,
          activeStudents,
          departments
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="home-page">
      <div className="jumbotron bg-light p-5 rounded">
        <h1 className="display-4">Student Management System</h1>
        <p className="lead">
          Manage student records, view department statistics, and track enrollment.
        </p>
        <hr className="my-4" />
        <p>Use the navigation menu to access different features of the system.</p>
        <Link to="/students/add" className="btn btn-primary btn-lg">
          Add New Student
        </Link>
      </div>

      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card text-white bg-primary mb-3">
            <div className="card-header">Total Students</div>
            <div className="card-body">
              <h5 className="card-title display-3">{stats.totalStudents}</h5>
              <Link to="/students" className="text-white">View all students</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-success mb-3">
            <div className="card-header">Active Students</div>
            <div className="card-body">
              <h5 className="card-title display-3">{stats.activeStudents}</h5>
              <p className="card-text">Currently enrolled students</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-info mb-3">
            <div className="card-header">Departments</div>
            <div className="card-body">
              <h5 className="card-title display-3">{stats.departments.length}</h5>
              <p className="card-text">Academic departments</p>
            </div>
          </div>
        </div>
      </div>

      {stats.departments.length > 0 && (
        <div className="row mt-4">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                Department Distribution
              </div>
              <div className="card-body">
                <div className="row">
                  {stats.departments.map(dept => (
                    <div key={dept.name} className="col-md-4 mb-3">
                      <div className="card border-primary">
                        <div className="card-body">
                          <h5 className="card-title">{dept.name}</h5>
                          <p className="card-text">{dept.count} students</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;