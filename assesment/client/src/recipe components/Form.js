import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";
import ViewRecipes from './ViewRecipes';

function RecipeForm() {
  const [formData, setFormData] = useState({
    recipeName: '',
    recipeDescription: '',
    recipeType: 'vegetarian',
    recipeImageUrl: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
  };
  const navigate=useNavigate();
  const handleNavigate=()=>{
    navigate("ViewRecipes");
  }

  return (
    <Form onSubmit={handleSubmit} style={{width:"400px",marginTop:"300px",marginLeft:"600px"}}>
      <Form.Group controlId="recipeName">
        <Form.Label>Recipe Name</Form.Label>
        <Form.Control
          type="text"
          name="recipeName"
          value={formData.recipeName}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="recipeDescription">
        <Form.Label>Recipe Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          name="recipeDescription"
          value={formData.recipeDescription}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="recipeType">
        <Form.Label>Recipe Type</Form.Label>
        <Form.Control
          as="select"
          name="recipeType"
          value={formData.recipeType}
          onChange={handleChange}
        >
          <option value="vegetarian">Vegetarian</option>
          <option value="nonvegetarian">Non-Vegetarian</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="recipeImageUrl">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          type="text"
          name="recipeImageUrl"
          value={formData.recipeImageUrl}
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Create Recipe
      </Button>
      <Button variant="primary" onClick={handleNavigate}>
        View recipes
      </Button>
    </Form>
  );
}

export default RecipeForm;
