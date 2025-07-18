import React, { useState } from 'react';
import { button } from 'react-bootstrap';

function Services() {
  const [servicios, setServicios] = useState([]);
  const [nuevo, setNuevo] = useState('');
  const [editando, setEditando] = useState(null);
  const [textoEditar, setTextoEditar] = useState('');

  const crear = () => {
    if (nuevo === '') return;
    setServicios([...servicios, { id: Date.now(), nombre: nuevo }]);
    setNuevo('');
  };

  const eliminar = (id) => {
    setServicios(servicios.filter(services => services.id !== id));
  };

  const editar = (id, nombre) => {
    setEditando(id);
    setTextoEditar(nombre);
  };

  const guardar = () => {
    setServicios(servicios.map(services => services.id === editando ? { ...services, nombre: textoEditar } : services));
    setEditando(null);
    setTextoEditar('');
  };

  return (
    <div>
      <h3>Servicios</h3>
      <input value={nuevo} onChange={(e) => setNuevo(e.target.value)} />
      <button onClick={crear}>Crear nuevo.</button>

      <ul>
        {servicios.map(services => (
          <li key={services.id}>
            {editando === services.id ? (
              <>
                <input value={textoEditar} onChange={(e) => setTextoEditar(e.target.value)} />
                <button onClick={guardar}>Guardar</button>
              </>
            ) : (
              <>
                {services.nombre}
                <button onClick={() => editar(services.id, services.nombre)}>Editar</button>
              </>
            )}
            <button onClick={() => eliminar(services.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Services;
