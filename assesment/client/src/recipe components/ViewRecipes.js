import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Card from 'react-bootstrap/Card';

function ViewRecipes() {
    return (
        <div>
            <center><h1>View Recipes</h1></center>
            <div>
                <Form
                >
                    <Form.Group controlId="recipeWeek">
                        <Form.Label>Select Week</Form.Label>
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="weekDropdown">
                                Select Week
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="thisweek">This Week</Dropdown.Item>
                                <Dropdown.Item eventKey="lastweek">Last Week</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form.Group>
                </Form>
            </div>
            {/* recipes */}
            <div>
                <Card style={{ width: '18rem' }} className='mx-5 mt-5'>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default ViewRecipes;
