import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    const [items, setItems] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    // Fetch data from the backend API
    useEffect(() => {
        axios.get("http://localhost:5000/items")
            .then(res => {
                // Ensure the response is an array
                if (Array.isArray(res.data)) {
                    setItems(res.data);
                } else {
                    console.error("Received data is not an array:", res.data);
                }
            })
            .catch(error => {
                console.error("There was an error fetching the items:", error);
            });
    }, []);

    // Add new item to the backend API
    const addItem = () => {
        axios.post("http://localhost:5000/add", { name, description, price })
            .then(() => window.location.reload()); // Reload to show the updated list
    };

    // Delete item from the backend API
    const deleteItem = (id) => {
        axios.delete(`http://localhost:5000/delete/${id}`)
            .then(() => window.location.reload()); // Reload to show the updated list
    };

    return (
        <div className="container mt-4">
            <h2>CRUD App</h2>
            <div className="mb-3">
                <input
                    type="text"
                    placeholder="Name"
                    className="form-control"
                    onChange={e => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    className="form-control mt-2"
                    onChange={e => setDescription(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Price"
                    className="form-control mt-2"
                    onChange={e => setPrice(e.target.value)}
                />
                <button className="btn btn-primary mt-2" onClick={addItem}>Add Item</button>
            </div>

            <ul className="list-group">
                {items.length > 0 ? (
                    items.map(item => (
                        <li key={item.id} className="list-group-item d-flex justify-content-between">
                            {item.name} - {item.description} - ${item.price}
                            <button className="btn btn-danger" onClick={() => deleteItem(item.id)}>Delete</button>
                        </li>
                    ))
                ) : (
                    <li className="list-group-item">No items available</li>
                )}
            </ul>
        </div>
    );
}

export default App;
