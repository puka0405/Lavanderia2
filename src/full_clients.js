import { Button, Card, Container, Table, InputGroup, Form,Row, Col } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function FullClientModuleView() {

    const [clients, setClients] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getClient();
    }, []);

    const getClient = () => {
        //Peticion a DB
        const client = [
            {
                
                name: "Maria",
                phone_number: "4498765432",
                address:"VillasYork"

            },
            {
                
                name: "Salvador",
                phone_number: "4498765432",
                address:"PensadoresYork"
            },
            {
                
                name: "Juan",
                phone_number: "4498765432",
                address:"Londres"
            },
            {
                
                name: "Luis",
                phone_number: "4498765432",
                address:"Inglaterra"
            }
        ];
        setClients(client);
    }


  return (
    <>
      <Container className="justify-content-center align-items-center">
        <Card className="mt-4">
          <Card.Body>
            <Card.Title className="mb-4 text-center">📋 Lista de Clientes</Card.Title>

            <InputGroup className="mb-4">
              <Form.Control
                placeholder="🔍 Buscar por nombre o teléfono" />
              <Button variant="success" >🔍 Buscar</Button>
            </InputGroup>

            <Table striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>📛 Nombre</th>
                  <th>📞 Teléfono</th>
                  <th>🏠 Dirección</th>
                </tr>
              </thead>
              <tbody>
                    {
                        clients?.map((client) => (
                            <tr>
                                
                                <td>{client.name}</td>
                                <td>{client.phone_number}</td>
                                <td>{client.address}</td>
                                <td>
                                    <Row className='text-center'>
                                        <Col>
                                            <Button onClick={() => navigate('/update-client', {state:client})}>✏ Editar </Button>
                                        </Col>
                                        <Col>
                                            <Button variant='danger' type='delete' > 🗑Eliminar </Button>
                                        </Col>
                                    </Row>
                                </td>
                            </tr>
                        ))
                    }
                    <tr>

                    </tr>
                </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default FullClientModuleView;