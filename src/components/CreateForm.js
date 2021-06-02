import styled from "styled-components";
import {Alert, Button, Container, Form} from "react-bootstrap";
import {useState} from "react";
import {API_DOMAIN, CREATE_PATH, defaultEmployee} from "../constants";
import {Link} from "react-router-dom";


const Title = styled.h3`
  width: 100%;
  text-align: center;
`
const apiUrl = API_DOMAIN.concat(CREATE_PATH)
const createStudent = async data => {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            const jsonData = await response.json()
            console.log(jsonData)
            return true
        }
        throw new Error("Create student failed")
    } catch (error) {
        console.log(error)
        return false
    }
}
export const CreateForm = () => {
    const [showStatus, setShowStatus] = useState(false);
    const [error, setError] = useState("");
    const [employee, setEmployee] = useState(defaultEmployee)
    const [loading, setLoading] = useState(false)
    const handleChange = e => {
        const fieldName = e.target.name
        const value = e.target.value;
        setEmployee({...employee, [fieldName]: value})
    }
    const handleReset = () => {
        setEmployee(defaultEmployee)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        if (employee.name.length === 0 || employee.wage === 0) {
            setError("some fields are left empty, fill they and try again!")
            setLoading(false)
            setShowStatus(true)
            return
        }

        const result = await createStudent(employee);
        console.log(result)
        if(result === false){
            setError("Create student failed due to some external errors")
            setLoading(false)
            setShowStatus(true)
            return
        }
        setLoading(false)
        setShowStatus(true)
        setError("")
    }
    return (
        <Container>
            <Title>Save new student</Title>
            {showStatus && (<Alert variant={error ? "danger" : "primary"}>
                {error ? error : (<p>Create student success <Link to="/employee">Go To list student</Link></p>)}
            </Alert>)}
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" value={employee.name} name="name"
                                  onChange={handleChange}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Wage</Form.Label>
                    <Form.Control type="number" placeholder="Enter wage" value={employee.wage} name="wage"
                                  onChange={handleChange}/>
                </Form.Group>


                {loading ? (<Button variant="primary" type="button" disabled={true}>
                    Submitting...
                </Button>) : (<Button variant="primary" type="submit">
                    Submit
                </Button>)}

                <Button variant="secondary" type="button" style={{marginLeft: "10px"}} onClick={handleReset}>
                    Reset
                </Button>
            </Form>
        </Container>
    );
};