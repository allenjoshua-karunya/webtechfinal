// frontend/src/pages/AdminDashboard.js
import React, { useEffect, useState } from "react";
import API from "../api/axios";
import "../styles/AdminDashboard.css";

function AdminDashboard() {
  const [animals, setAnimals] = useState([]);
  const [requests, setRequests] = useState([]);
  const [form, setForm] = useState({
    name: "",
    breed: "",
    species: "",
    ageYears: 0,
    ageMonths: 0,
    imageUrl: ""
  });
  const token = localStorage.getItem("token");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { loadAll(); }, []);


  const loadAll = async () => {
    try {
      const a = await API.get("/animals");
      const r = await API.get("/adoptions", { headers: { Authorization: `Bearer ${token}` }});
      setAnimals(a.data || []);
      setRequests(r.data || []);
    } catch (err) {
      console.error("loadAll error", err);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await API.post("/animals", form, { headers: { Authorization: `Bearer ${token}` }});
      alert("Pet added");
      setForm({ name: "", breed: "", species: "", ageYears: 0, ageMonths: 0, imageUrl: "" });
      loadAll();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add pet");
    }
  };

  const handleDecide = async (id, status) => {
    try {
      await API.put(`/adoptions/${id}`, { status }, { headers: { Authorization: `Bearer ${token}` }});
      loadAll();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update request");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/animals/${id}`, { headers: { Authorization: `Bearer ${token}` }});
      loadAll();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete pet");
    }
  };

  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>

      <section>
        <h3>Add Pet</h3>
        <form onSubmit={handleAdd}>
          <input placeholder="Name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required />
          <input placeholder="Breed" value={form.breed} onChange={(e) => setForm({...form, breed: e.target.value})} required />
          <input placeholder="Species (Dog/Cat)" value={form.species} onChange={(e) => setForm({...form, species: e.target.value})} required />
          <input type="number" placeholder="Years" value={form.ageYears} onChange={(e) => setForm({...form, ageYears: Number(e.target.value)})} />
          <input type="number" placeholder="Months" value={form.ageMonths} onChange={(e) => setForm({...form, ageMonths: Number(e.target.value)})} />
          <input placeholder="Image URL" value={form.imageUrl} onChange={(e) => setForm({...form, imageUrl: e.target.value})} />
          <button type="submit">Add Pet</button>
        </form>
      </section>

      <section>
        <h3>Adoption Requests</h3>
        {requests.length === 0 ? <p>No requests</p> : requests.map(req => (
          <div key={req._id} style={{border: '1px solid #ddd', padding: '8px', margin: '8px 0'}}>
            <p><strong>{req.userId?.username || req.userId}</strong> requested <strong>{req.animalId?.name || req.animalId}</strong></p>
            <p>Status: {req.status}</p>
            {req.status === "pending" && (
              <>
                <button onClick={() => handleDecide(req._id, "approved")}>Approve</button>
                <button onClick={() => handleDecide(req._id, "rejected")}>Reject</button>
              </>
            )}
          </div>
        ))}
      </section>

      <section>
        <h3>All Pets</h3>
        {animals.length === 0 ? <p>No pets</p> : animals.map(a => (
          <div key={a._id} style={{border:'1px solid #eee', padding:'8px', margin:'6px 0'}}>
            <p>{a.name} — {a.breed} ({a.species}) — {a.status}</p>
            <button onClick={() => handleDelete(a._id)}>Delete</button>
          </div>
        ))}
      </section>
    </div>
  );
}

export default AdminDashboard;
