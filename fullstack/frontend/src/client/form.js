import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Form1() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    recipeName: '',
    recipeDescription: '',
    recipeType: 'veg',
    recipecreated:'',
    recipeImage: '',
  });
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://127.0.0.1:8000/server/post/', formData)
      .then(response => {
        console.log('Recipe added successfully:',response.data);
      })
      .catch(error => {
        console.error('Error adding recipe:', error);
      });
  };
  
  return (
    <div>
      <div className='bg-light' style={{ width: "20%", marginLeft: "600px", marginTop: "30px" }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="recipeName">
            <Form.Label>Recipe name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Recipe name"
              value={formData.recipeName}
              onChange={handleInputChange}
              name="recipeName"
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="recipeDescription">
            <Form.Label>Recipe description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Recipe description"
              value={formData.recipeDescription}
              onChange={handleInputChange}
              name="recipeDescription"
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="recipeType">
            <Form.Label>Recipe type</Form.Label>
            <Form.Control
              as="select"
              name="recipeType"
              value={formData.recipeType}
              onChange={handleInputChange}
            >
              <option value="veg">Vegetarian</option>
              <option value="nonveg">Non-Vegetarian</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="recipeImage">
            <Form.Label>Recipe image URL</Form.Label>
            <Form.Control
              type="file"
              value={formData.recipeImage}
              onChange={handleInputChange}
              name="recipeImage"
            />
          </Form.Group>
          
          <Button variant="primary" type="submit">
            Add Recipe
          </Button>
        </Form>
      </div>
      
      <center>
        <Button className='mt-5' onClick={() => navigate('/view-recipes')}>View Recipes</Button>
      </center>
    </div>
  );
}

export default Form1;
