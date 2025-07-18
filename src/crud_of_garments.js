import React, { useState } from 'react';
import { button } from 'react-bootstrap';


function Garments() {
  const [prendas, setPrendas] = useState([]);
  const [nueva, setNueva] = useState('');
  const [editando, setEditando] = useState(null);
  const [textoEditar, setTextoEditar] = useState('');

  const crear = () => {
    if (nueva === '') return;
    setPrendas([...prendas, { id: Date.now(), nombre: nueva }]);
    setNueva('');
  };

  const eliminar = (id) => {
    setPrendas(prendas.filter(prenda => prenda.id !== id));
  };

  const editar = (id, nombre) => {
    setEditando(id);
    setTextoEditar(nombre);
  };

  const guardar = () => {
    setPrendas(prendas.map(prenda => prenda.id === editando ? { ...prenda, nombre: textoEditar } : prenda));
    setEditando(null);
    setTextoEditar('');
  };

  return (
    <div>
      <h3>Prendas</h3>
      <input value={nueva} onChange={(e) => setNueva(e.target.value)} />
      <button onClick={crear}>Crear nuevo</button>

      <ul>
        {prendas.map(prenda => (
          <li key={prenda.id}>
            {editando === prenda.id ? (
              <>
                <input value={textoEditar} onChange={(e) => setTextoEditar(e.target.value)} />
                <button onClick={guardar}>Guardar</button>
              </>
            ) : (
              <>
                {prenda.nombre}
                <button onClick={() => editar(prenda.id, prenda.nombre)}>Editar</button>
              </>
            )}
            <button onClick={() => eliminar(prenda.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Garments;
