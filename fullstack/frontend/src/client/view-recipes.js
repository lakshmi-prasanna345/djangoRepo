import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function ViewRecipes() {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipeId, setSelectedRecipeId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editedRecipe, setEditedRecipe] = useState({
        Rname: '',
        Rdes: '',
        Rtype: ''
    });


    useEffect(() => {
        axios.get('http://127.0.0.1:8000/server/get')
            .then(response => {
                setRecipes(response.data);
            })
            .catch(error => {
                console.error('Error fetching recipes:', error);
            });
    }, []);

    const handleEdit = (id) => {
        setSelectedRecipeId(id);
        const recipeToEdit = recipes.find(recipe => recipe.id === id);
        setEditedRecipe({
            Rname: recipeToEdit.Rname,
            Rdes: recipeToEdit.Rdes,
            Rtype: recipeToEdit.Rtype
        });
        setShowModal(true);
    };

    const handleSaveEdit = () => {
        axios.put(`http://127.0.0.1:8000/server/del/${selectedRecipeId}`, editedRecipe)
            .then(response => {
                // Update the recipes state after successful edit
                setRecipes(recipes.map(recipe => (recipe.id === selectedRecipeId ? response.data : recipe)));
                setShowModal(false);
            })
            .catch(error => {
                console.error('Error editing recipe:', error);
            });
    };


    const handleDelete = (id) => {
        // Implement your delete logic here
        console.log('Delete recipe with ID:', id);
    };

    return (
        <div>
            <center><h2>View Recipes</h2></center>
            <div className="row">
                {recipes.map(recipe => (
                    <div key={recipe.id} className="col-md-2 mb-4">
                        <div className="card overflow-auto" style={{ height: "455px" }}>
                            <img style={{ height: "200px" }} src={`http://127.0.0.1:8000${recipe.pimage}`} className="card-img-top" alt={recipe.name} />
                            <div className="card-body">
                                <h5 className="card-title">{recipe.Rname}</h5>
                                <p className="card-text">{recipe.Rdes}</p>
                                <p className="card-text">Recipe Type: {recipe.Rtype}</p>
                                <div>
                                    <DropdownButton id={`dropdown-basic-button-${recipe.id}`} title="Modify">
                                        <Dropdown.Item onClick={() => handleEdit(recipe.id)}>Edit</Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleDelete(recipe.id)}>Delete</Dropdown.Item>
                                    </DropdownButton>
                                </div>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                                        Close
                                    </Button>
                                    <Button variant="danger" onClick={handleDelete}>
                                        Delete
                                    </Button>
                                    <Button variant="primary" onClick={handleSaveEdit}>
                                        Save Changes
                                    </Button>
                                </Modal.Footer>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ViewRecipes;