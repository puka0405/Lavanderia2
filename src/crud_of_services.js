import React, { useState } from 'react';

function Services() {
  const [servicios, setServicios] = useState([]);
  const [nuevo, setNuevo] = useState('');
  const [editando, setEditando] = useState(null);
  const [textoEditar, setTextoEditar] = useState('');

  const crear = () => {
    if (nuevo === '') return;
    setServicios([servicios, { id: Date.now(), nombre: nuevo }]);
    setNuevo('');
  };

  const eliminar = (id) => {
    setServicios(servicios.filter(servicios => servicios.id !== id));
  };

  const editar = (id, nombre) => {
    setEditando(id);
    setTextoEditar(nombre);
  };

  const guardar = () => {
    setServicios(servicios.map(servicios => servicios.id === editando ? {servicios, nombre: textoEditar } : servicios));
    setEditando(null);
    setTextoEditar('');
  };

  return (
    <div>
      <h3>Servicios</h3>
      <input value={nuevo} onChange={(e) => setNuevo(e.target.value)} />
      <button onClick={crear}>Crear nuevo</button>

      <ul>
        {servicios.map(servicios => (
          <li key={servicios.id}>
            {editando === servicios.id ? (
              <>
                <input value={textoEditar} onChange={(e) => setTextoEditar(e.target.value)} />
                <button onClick={guardar}>Guardar</button>
              </>
            ) : (
              <>
                {servicios.nombre}
                <button onClick={() => editar(servicios.id, servicios.nombre)}>Editar</button>
              </>
            )}
            <button onClick={() => eliminar(servicios.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Services;
