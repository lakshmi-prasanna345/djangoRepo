import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useState } from "react";
import axios from "axios";

export default function TodoSearch() {
    const [name, setname] = useState("");
    const [postdata, setpostdata] = useState({
        task: ""
    })
    const handleChange = (e) => {
        setname(e.target.value)
    }
    const postData = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:8000/todo/", postData);
            console.log(response.data);

        } catch (error) {
            console.error(error);
        }
    };
    console.log(name)
    return (
        <div>
            <Form onSubmit={postData}>
                <InputGroup>
                    <FormControl
                        placeholder="New Todo"
                        onChange={handleChange}
                        value={name}
                    >{name}</FormControl>
                    <button type="submit">Add</button>
                </InputGroup>
            </Form>

        </div>
    )
}