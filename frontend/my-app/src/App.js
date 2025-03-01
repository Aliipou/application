import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    const [items, setItems] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/items").then(res => setItems(res.data));
    }, []);

    const addItem = () => {
        axios.post("http://localhost:5000/add", { name, description, price })
            .then(() => window.location.reload());
    };

    const deleteItem = (id) => {
        axios.delete(`http://localhost:5000/delete/${id}`)
            .then(() => window.location.reload());
    };

    return (
        <div className="container mt-4">
            <h2>CRUD App</h2>
            <div className="mb-3">
                <input type="text" placeholder="Name" className="form-control" onChange={e => setName(e.target.value)} />
                <input type="text" placeholder="Description" className="form-control mt-2" onChange={e => setDescription(e.target.value)} />
                <input type="number" placeholder="Price" className="form-control mt-2" onChange={e => setPrice(e.target.value)} />
                <button className="btn btn-primary mt-2" onClick={addItem}>Add Item</button>
            </div>
            <ul className="list-group">
                {items.map(item => (
                    <li key={item.id} className="list-group-item d-flex justify-content-between">
                        {item.name} - {item.description} - ${item.price}
                        <button className="btn btn-danger" onClick={() => deleteItem(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
