import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaVideo, FaEdit, FaTrash } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
    const [contacts, setContacts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editContactIndex, setEditContactIndex] = useState(null);
    const [newContact, setNewContact] = useState({ name: '', contact_no: '', email: '' });
    const [errors, setErrors] = useState({});
    const [searchTerm, setSearchTerm] = useState('');

    const userId = sessionStorage.getItem('userId');
    const navigate = useNavigate();

    useEffect(() => {
        if (userId) {
            const fetchContacts = async () => {
                try {
                    const response = await axios.get(`https://vils-backend-2.onrender.com/contacts/${userId}`);
                    setContacts(response.data);
                } catch (error) {
                    console.error('Error fetching contacts:', error);
                }
            };
            fetchContacts();
        }
    }, [userId]);

    const validate = () => {
        let errors = {};
        if (!newContact.name) errors.name = "Name is required.";
        if (!/^\d{10}$/.test(newContact.contact_no)) errors.contact_no = "Phone number must be 10 digits.";
        if (!/\S+@\S+\.\S+/.test(newContact.email)) errors.email = "Email is invalid.";
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleAddContact = async () => {
        if (!validate()) return;

        try {
            if (editContactIndex !== null) {
                await axios.post(`https://vils-backend-2.onrender.com/contacts/${contacts[editContactIndex].id}`, newContact);
                const updatedContacts = contacts.map((contact, index) =>
                    index === editContactIndex ? { ...newContact, user_id: userId } : contact
                );
                setContacts(updatedContacts);
                setEditContactIndex(null);
            } else {
                const response = await axios.post('https://vils-backend-2.onrender.com/contacts/', {
                    ...newContact,
                    user_id: userId,
                });
                setContacts([...contacts, response.data]);
            }
            setNewContact({ name: '', contact_no: '', email: '' });
            setShowModal(false);
        } catch (error) {
            console.error('Error saving contact:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewContact({ ...newContact, [name]: value });
    };

    const handleEditContact = (index) => {
        setNewContact(contacts[index]);
        setEditContactIndex(index);
        setShowModal(true);
    };

    const handleDeleteContact = async (index) => {
        try {
            const contactId = contacts[index].id;

            await axios.delete(`https://vils-backend-2.onrender.com/contacts/${contactId}`, {
                params: { user_id: userId }
            });

            const updatedContacts = contacts.filter((_, i) => i !== index);
            setContacts(updatedContacts);

        } catch (error) {
            console.error('Error deleting contact:', error);
            alert('Failed to delete the contact. Please try again.');
        }
    };

    const handleNavigate = async (contact) => {
        try {
            // Store the email of the selected contact in sessionStorage
            sessionStorage.setItem('email', contact.email);

            // Navigate to the room login page
            navigate('/roomlogin');
        } catch (error) {
            console.error('Error setting up video call:', error);
            alert('Failed to initiate the video call. Please try again.');
        }
    };

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-center w-100">Make Video calls to your favourite person</h2>
                <button className="btn btn-success rounded-circle" onClick={() => {
                    setNewContact({ name: '', contact_no: '', email: '' });
                    setEditContactIndex(null);
                    setShowModal(true);
                }}>
                    <FaPlus size={20} />
                </button>
            </div>

            <input
                type="text"
                className="form-control mb-4"
                placeholder="Search Contacts"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="row">
                {filteredContacts.map((contact, index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="card-title">{contact.name}</h3>
                                <p className="card-text">{contact.contact_no}</p>
                                <div className="d-flex justify-content-between">
                                    <button className="btn btn-primary" onClick={() => handleEditContact(index)}>
                                        <FaEdit />
                                    </button>
                                    <button className="btn btn-warning" onClick={() => handleNavigate(contact)}>
                                        <FaVideo />
                                    </button>
                                    <button className="btn btn-danger" onClick={() => handleDeleteContact(index)}>
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {editContactIndex !== null ? 'Edit Contact' : 'Add New Contact'}
                                </h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control mb-2"
                                    placeholder="Name"
                                    value={newContact.name}
                                    onChange={handleInputChange}
                                />
                                {errors.name && <p className="text-danger">{errors.name}</p>}
                                <input
                                    type="text"
                                    name="contact_no"
                                    className="form-control mb-2"
                                    placeholder="Phone Number"
                                    value={newContact.contact_no}
                                    onChange={handleInputChange}
                                />
                                {errors.contact_no && <p className="text-danger">{errors.contact_no}</p>}
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control mb-2"
                                    placeholder="Email"
                                    value={newContact.email}
                                    onChange={handleInputChange}
                                />
                                {errors.email && <p className="text-danger">{errors.email}</p>}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={handleAddContact}>
                                    {editContactIndex !== null ? 'Save Changes' : 'Add Contact'}
                                </button>
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
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

export default Contact;
