import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";

const Table = () => {

  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    course: '',
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editData, setEditData] = useState({
    id: '',
    first_name: '',
    last_name: '',
    course: '',
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    fetch('http://127.0.0.1:8000/students/post1/')
      .then(response => response.json())
      .then(data => setStudents(data))
      .catch(error => console.error('Error fetching data:', error));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://127.0.0.1:8000/students/post1/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(newStudent => {
        setStudents([...students, newStudent]);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          course: '',
        });
      })
      .catch(error => console.error('Error adding student:', error));
  };


  const removeStudent = (id) => {
    fetch(`http://127.0.0.1:8000/students/post1/${id}/`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.status === 204) {
          // Successful deletion
          setStudents(students.filter(student => student.id !== id));
        } else {
          console.error('Error deleting student');
        }
      })
      .catch(error => console.error('Error deleting student:', error));
  };

  const openModal = (student) => {
    console.log(student)
    setEditData({
      id: student.id,
      first_name: student.first_name,
      last_name: student.last_name,
      course: student.course,
    });
    setIsModalVisible(true);
  };


  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const handleEditSubmit = () => {
    // Send the edited data to the backend, then update the local data
    // Close the modal
    closeModal();
  };

  return (
    <div>
      <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossOrigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/popper.js@2.11.6/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossOrigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossOrigin="anonymous"></script>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="student_Id"
          value={formData.student_Id}
          onChange={handleInputChange}
          placeholder="Student ID"
          required
        />
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleInputChange}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleInputChange}
          placeholder="Last Name"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
        />
        <input
          type="text"
          name="course"
          value={formData.course}
          onChange={handleInputChange}
          placeholder="Course"
          required
        />
        <button type="submit">Add Student</button>
      </form>
      <table className='table table-striped'>
        <thead className='table-dark'>
          <tr>
            <th>Serial No.</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Remove</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.id}>
              <td>{index + 1}</td>
              <td>{student.first_name}</td>
              <td>{student.last_name}</td>
              <td>{student.email}</td>
              <td>{student.course}</td>
              <td>
                <button onClick={() => removeStudent(student.id)}>Remove</button>
              </td>
              <td>
                <button onClick={() => openModal(student)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalVisible && (
        <div className="modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit</h5>
                <button type="button" className="close" onClick={closeModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  name="id"
                  value={editData.id}
                  onChange={handleEditInputChange}
                  className="form-control"
                  readOnly
                />
                <input
                  type="text"
                  name="first_name"
                  value={editData.first_name}
                  onChange={handleEditInputChange}
                  className="form-control"
                  placeholder="First Name"
                />
                <input
                  type="text"
                  name="last_name"
                  value={editData.last_name}
                  onChange={handleEditInputChange}
                  className="form-control"
                  placeholder="Last Name"
                />
                <input
                  type="text"
                  name="course"
                  value={editData.course}
                  onChange={handleEditInputChange}
                  className="form-control"
                  placeholder="Course"
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={handleEditSubmit}>
                  Save
                </button>
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

  );
};

export default Table;
