import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="row justify-content-center">
      <div className="col-md-8 text-center">
        <div className="jumbotron">
          <h1 className="display-6" style={{fontSize:'bold'}}>Student Management System</h1>
          {/* <p className="lead">
            Manage your students' information with ease. Add, edit, view, and delete student records.
          </p> */}
          {/* <hr className="my-4" /> */}
          <p>
            This application helps you keep track of students, their departments, enrollment years, and more.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/students" className="btn btn-primary btn-lg">
              View Students
            </Link>
            <Link to="/students/add" className="btn btn-success btn-lg">
              Add New Student
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;