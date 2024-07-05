import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import './AdminComponent.css';

const AdminComponent = () => {
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [opcion, setOpcion] = useState('');
  const [message, setMessage] = useState({ type: '', content: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', content: '' });

    if (!titulo.trim() || !contenido.trim() || !opcion.trim()) {
      setMessage({ type: 'error', content: 'Por favor, complete todos los campos.' });
      return;
    }

    try {
      const db = getFirestore();
      await addDoc(collection(db, 'temas'), {
        titulo,
        contenido,
        opcion,
        fechaCreacion: new Date()
      });

      setMessage({ type: 'success', content: 'Tema agregado correctamente.' });
      setTitulo('');
      setContenido('');
      setOpcion('');
    } catch (error) {
      console.error("Error al agregar el tema: ", error);
      setMessage({ type: 'error', content: 'Hubo un error al agregar el tema. Por favor, intente de nuevo.' });
    }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Panel de Administración</h1>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label htmlFor="titulo">Título del Tema</label>
          <input
            id="titulo"
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ingrese el título del tema"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="opcion">Opciones</label>
          <select
            id="opcion"
            value={opcion}
            onChange={(e) => setOpcion(e.target.value)}
            className="form-control"
          >
            <option value="">Seleccione una opción</option>
            <option value="opcion1">Comprobacion</option>
            <option value="opcion2">Declaracion</option>
            <option value="opcion2">Alemanes del volga</option>
            <option value="opcion3">116</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="contenido">Contenido</label>
          <textarea
            id="contenido"
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            placeholder="Ingrese el contenido del tema"
            className="form-control"
            rows={5}
          />
        </div>
        <button type="submit" className="submit-btn">Agregar Tema</button>
      </form>
      {message.content && (
        <div className={`message ${message.type}`}>
          {message.content}
        </div>
      )}
    </div>
  );
};

export default AdminComponent;
