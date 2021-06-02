import {useEffect, useState} from "react";
import {API_DOMAIN, GET_LIST_PATH} from "../constants";
import {Container, Table} from "react-bootstrap";
import {Link} from "react-router-dom";

export const List = () => {
    const [list, setList] = useState([])
    const apiUrl = API_DOMAIN.concat(GET_LIST_PATH)
    useEffect(() => {
        fetch(apiUrl).then(resp=> {
            resp.json().then(data => {
                setList(data)
            })
        }).catch(err => console.log(err))
    }, [apiUrl])
    console.log(list)
    return (
        <Container>
            <h1>List employee</h1>
            <Link to="/employee/create">Create new</Link>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>wage</th>
                </tr>
                </thead>
                <tbody>
                {list.map(item => {
                    return(    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.wage}</td>
                    </tr>)
                })}
                </tbody>
            </Table>
        </Container>
    );
};