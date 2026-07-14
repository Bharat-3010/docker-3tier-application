import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const API = import.meta.env.VITE_API_URL;

  const fetchEmployees = async () => {
    const response = await axios.get(API);
    setEmployees(response.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const addEmployee = async () => {
    if (!name || !email) return;

    await axios.post(API, {
      name,
      email,
    });

    setName("");
    setEmail("");

    fetchEmployees();
  };

  const deleteEmployee = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchEmployees();
  };

  return (
    <div className="container">
      <h1>Employee Management</h1>

      <input
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={addEmployee}>Add Employee</button>

      <hr />

      {employees.map((emp) => (
        <div key={emp.id} className="card">
          <h3>{emp.name}</h3>
          <p>{emp.email}</p>

          <button onClick={() => deleteEmployee(emp.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;