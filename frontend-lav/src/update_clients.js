import React, { useState } from 'react';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

export default function UpdateClientView() {
  const location = useLocation();
  const navigate = useNavigate();
  const client = location.state;

  const [name, setName] = useState(client?.name || '');
  const [email, setEmail] = useState(client?.email || '');

  const handleUpdate = () => {
    console.log('Cliente actualizado:', { name, email });
  };

  const handleCancel = () => {
    navigate('/client-list');
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: '100%', maxWidth: '400px' }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Actualizar Cliente</Card.Title>
          
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa el nombre del cliente"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa el correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Row>
              <Col>
                <div className="d-grid">
                  <Button variant="success" onClick={handleUpdate}>
                    Guardar Cambios
                  </Button>
                </div>
              </Col>
              <Col>
                <div className="d-grid">
                  <Button variant="secondary" onClick={handleCancel}>
                    Cancelar
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}