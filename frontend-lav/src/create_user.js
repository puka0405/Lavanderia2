import React, { useState } from 'react';
import { Container, Card, Form, Button} from 'react-bootstrap';

export default function CreateUserView() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleCreate = () => {
    console.log('Usuario creado:', { username, password });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: '100%', maxWidth: '400px' }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Crear Usuario</Card.Title>
          
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <div className="d-grid">
              <Button variant="primary" onClick={handleCreate}>
                Registrar
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}