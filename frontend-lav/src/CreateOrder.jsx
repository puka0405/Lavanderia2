import React, { useState } from 'react'
import { Button, Col, Container, Row, Form, Card, CloseButton } from 'react-bootstrap' 
import Contants from "./Contants";
import { useNavigate } from 'react-router-dom';

const { services, garments } = Contants;

const CreateOrder = () => {
    const navigate = useNavigate();
    const defaultGarment = {
        type: "Camisa",
        description: "",
        observations: "",
        services: [services[0]],
    }
    const [order, setOrder] = useState({
        client_id: 0,
        user_id: 0,
        state: "recibido",
        total: 0,
        pagado: false,
        garments: [defaultGarment],
    })

    const [total, setTotal] = useState(0);

    const calculateTotal = () => {
        let subTotal = 0;
        const data = order;
        if (data.garments) {
            for (const garment of data.garments) {
                console.log(garment)
                for (const service of garment.services) {
                    console.log(service)
                    subTotal += service.quantity * service.unitPrice
                }
            }
        }
        setTotal(subTotal)
    }

    const addGarment = () => {
        const data = order
        data.garments?.push(defaultGarment)
        setOrder({ ...data })
    }

    const onChangeService = (target, ig, is) => {
        const data = order;
        const newService = services.filter((s) => s.name === target.value).shift()
        if (data.garments && data.garments[ig] && newService) {
            data.garments[ig].services[is] = newService;
        }
        setOrder({ ...data })
        onChangeServiceFields("name", target.value, ig, is)
    }

    const addServiceToGarment = (ig) => {
        const data = order;
        if (data.garments && data.garments[ig]) {
            data.garments[ig].services.push(services[0])
        }
        setOrder({ ...data })
    }

    const deleteServiceToGarment = (ig , is) => {
        const data = order;
        if (data.garments && data.garments[ig]) {
            data.garments[ig].services = data.garments[ig].services.filter((_, i) => i !== is)
        }
        setOrder({ ...data })
    }

    const deleteGarment = (ig) => {
        const data = order;
        if (data.garments && data.garments[ig]) {
            data.garments = data.garments.filter((_, i) => i !== ig)
        }
        setOrder({ ...data })
    }

    const onChangeGarment = (key, value, ig) => {
        const data = order;
        if (data.garments) {
            data.garments[ig][key] = value
        }
    }

    const onChangeServiceFields = (key, value, ig, is) => {
        const data = order;
        if (data.garments) {
            if (key === "name") {
                data.garments[ig].services[is][key] = value
            } else {
                data.garments[ig].services[is][key] = parseFloat(value)
            }
        }
    }

    return (
    <Container className='mx-auto mt-5'>
            <Card>
                <Card.Body>
                    <Card.Title>Creación de orden</Card.Title>
                    <hr></hr>
                    <Row>
                        <Col>
                            <Button onClick={addGarment}>Agregar prenda</Button>
                        </Col>
                    </Row>
                    <h2>Prendas:</h2>
                    {
                        order.garments?.map((garment, i) => (
                            <div id="garment">
                                <hr />
                                {
                                    i > 0 && (
                                        <div className='text-end m-2'>
                                            <Button variant='danger' onClick={() => deleteGarment(i)}>Eliminar prenda</Button>
                                        </div>
                                    )
                                }
                                <Row>
                                    <Col>
                                        <Form>
                                            <h4>#{i + 1}</h4>
                                            <Row>

                                                <Col>
                                                    <Form.Group className='mb-3'>
                                                        <Form.Label>Tipo de prenda:</Form.Label>
                                                        <Form.Select
                                                            name='type'
                                                            onChange={({ target }) => onChangeGarment("type", target.value, i)}
                                                        >
                                                            {
                                                                garments.map(g => (
                                                                    <option
                                                                        defaultValue={garment.type}
                                                                        value={g}>
                                                                        {g}
                                                                    </option>
                                                                ))
                                                            }
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group className='mb-3'>
                                                        <Form.Label>Descripción:</Form.Label>
                                                        <Form.Control
                                                            defaultValue={garment.description}
                                                            name='description'
                                                            onChange={({ target }) => onChangeGarment("description", target.value, i)}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Form.Group className='mb-3'>
                                                        <Form.Label>Observaciones:</Form.Label>
                                                        <Form.Control
                                                            defaultValue={garment.observations}
                                                            name='observations'
                                                            onChange={({ target }) => onChangeGarment("observations", target.value, i)}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                        </Form>
                                    </Col>
                                    <Col>
                                        <h4>Servicios:</h4>
                                        {
                                            garment.services.map((service, is) => (
                                                <div id='service'>
                                                    {
                                                        is > 0 && (
                                                            <div className='text-end m-2'>
                                                                <CloseButton onClick={() => deleteServiceToGarment(i, is)} />
                                                            </div>
                                                        )
                                                    }
                                                    <Form.Select name='services' onChange={({ target }) => onChangeService(target, i, is)}>
                                                        {
                                                            services.map(({ name }) => (
                                                                <option value={name}>{name}</option>
                                                            ))
                                                        }
                                                    </Form.Select>
                                                    <Row>
                                                        <Col>Nombre: {service.name}</Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <p>Cantidad:</p>
                                                            <Form.Control
                                                                name="quantity"
                                                                defaultValue={service.quantity}
                                                                type='number'
                                                                onChange={({ target }) => onChangeServiceFields("quantity", target.value, i, is)}
                                                            />
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <p>Precio:</p>
                                                            {
                                                                service.unitPrice ?
                                                                    service.unitPrice :
                                                                    <Form.Control
                                                                        type='number'
                                                                        name="unitPrice"
                                                                        defaultValue={service.unitPrice}
                                                                        onChange={({ target }) => onChangeServiceFields("unitPrice", target.value, i, is)}
                                                                    />
                                                            }
                                                        </Col>
                                                    </Row>
                                                </div>
                                            ))

                                        }
                                        <Button variant='success' className='mt-2' onClick={() => addServiceToGarment(i)}>Agregar Servicio</Button>
                                    </Col>
                                </Row>

                            </div>
                        ))
                    }
                    <hr />
                    <h2 variant="info" className="bg-primary">Resumen del Pedido</h2>
                    <hr />
                    {
                        order.garments?.map((garment, i) => (
                            <div>
                                <Row>
                                    <Col>
                                        <strong>Prenda {i + 1}: {garment.type}</strong>
                                        {garment.description && <p>Descripción: {garment.description}</p>}
                                        {garment.observations && <p>Observaciones: {garment.observations}</p>}
                                    </Col>
                                    <Col>
                                        <strong>Servicios:</strong>
                                        {
                                            garment.services.map((service, is) => (
                                                <div>
                                                    <Row>
                                                        <Col>{service.name}</Col>
                                                        <Col>Cantidad: {service.quantity || 0}</Col>
                                                        <Col>Precio: ${service.unitPrice || 0}</Col>
                                                        <Col>Total: ${(service.quantity || 0) * (service.unitPrice || 0)}</Col>
                                                    </Row>
                                                </div>
                                            ))
                                        }
                                    </Col>
                                </Row>
                                <hr />
                            </div>
                        ))
                    }
                    <h2>Total: {total}</h2>
                    <Button onClick={calculateTotal}>Tolal</Button>
                    <Button onClick={() => navigate('/App')}>Resumen</Button>

                </Card.Body>
            </Card>
        </Container>
    )
}


export default CreateOrder