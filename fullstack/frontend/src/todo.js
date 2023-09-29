import React,{useEffect,useState} from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import TodoSearch from "./todo/search";
export default function Todo(){
   return(
    <div>
        <Navbar className="bg-secondary" style={{marginBottom:"20px"}}>
            <Container>
                <Navbar.Brand href="#" className="text-light">
                    Todo App
                </Navbar.Brand>
            </Container>
        </Navbar>
        <Container>
             <TodoSearch/>
        </Container>
    </div>
   )
}