import React, { useState, useEffect } from "react";

const App = () => {
  const [students, setStudents] = useState([]);
  const [studentName, setStudentName] = useState("");
  const [studentGrade, setStudentGrade] = useState("");

  
  const GET_URL = "https://jsonplaceholder.typicode.com/users";
  const ADD_URL = "https://jsonplaceholder.typicode.com/posts";
  const DELETE_URL = "https://jsonplaceholder.typicode.com/posts/";

  
  const fetchStudents = async () => {
    try {
      const response = await fetch(GET_URL);
      const data = await response.json();
      const studentData = data.map((student) => ({
        id: student.id,
        name: student.name,
        grade: "N/A", 
      }));
      setStudents(studentData);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  
  const addStudent = async (e) => {
    e.preventDefault();

    const newStudent = {
      name: studentName,
      grade: studentGrade,
    };

    try {
      const response = await fetch(ADD_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStudent),
      });

      const result = await response.json();
      setStudents([...students, { id: result.id, ...newStudent }]);
      setStudentName("");
      setStudentGrade("");
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  
  const deleteStudent = async (id) => {
    try {
      await fetch('${DELETE_URL}${id}', {
        method: "DELETE",
      });
      setStudents(students.filter((student) => student.id !== id));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };


  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>Student Management System</h1>

      {/* Add Student Form */}
      <form onSubmit={addStudent} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          required
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          placeholder="Student Grade"
          value={studentGrade}
          onChange={(e) => setStudentGrade(e.target.value)}
          required
          style={{ marginRight: "10px" }}
        />
        <button type="submit">Add Student</button>
      </form>

      {/* Display Student List */}
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {students.map((student) => (
          <li
            key={student.id}
            style={{
              marginBottom: "10px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            <strong>{student.name}</strong> - Grade: {student.grade}
            <button
              onClick={() => deleteStudent(student.id)}
              
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
