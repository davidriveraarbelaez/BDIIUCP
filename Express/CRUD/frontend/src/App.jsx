// frontend/src/App.jsx
import { useState, useEffect } from 'react';

function App() {
  const [articulos, setArticulos] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [autor, setAutor] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [cargando, setCargando] = useState(false);

  // Obtener todos los artículos al cargar
  useEffect(() => {
    cargarArticulos();
  }, []);

  const cargarArticulos = async () => {
    try {
      const res = await fetch('/api/articulos');
      const data = await res.json();
      setArticulos(data);
    } catch (error) {
      console.error('Error al cargar artículos:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);

    const articulo = { titulo, contenido, autor };

    try {
      if (editandoId) {
        // Actualizar
        await fetch(`/api/articulos/${editandoId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(articulo),
        });
        setEditandoId(null);
      } else {
        // Crear
        await fetch('/api/articulos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(articulo),
        });
      }

      // Resetear formulario y recargar lista
      setTitulo('');
      setContenido('');
      setAutor('');
      await cargarArticulos();
    } catch (error) {
      console.error('Error al guardar artículo:', error);
    } finally {
      setCargando(false);
    }
  };

  const handleEditar = (articulo) => {
    setTitulo(articulo.titulo);
    setContenido(articulo.contenido);
    setAutor(articulo.autor);
    setEditandoId(articulo._id);
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este artículo?')) {
      try {
        await fetch(`/api/articulos/${id}`, { method: 'DELETE' });
        await cargarArticulos();
      } catch (error) {
        console.error('Error al eliminar artículo:', error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        CRUD de Artículos con MongoDB + Express + React
      </h1>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {editandoId ? 'Editar Artículo' : 'Crear Nuevo Artículo'}
        </h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <textarea
            placeholder="Contenido"
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded h-24"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Autor"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          disabled={cargando}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {cargando ? 'Guardando...' : editandoId ? 'Actualizar' : 'Crear'}
        </button>
        {editandoId && (
          <button
            type="button"
            onClick={() => {
              setTitulo('');
              setContenido('');
              setAutor('');
              setEditandoId(null);
            }}
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancelar
          </button>
        )}
      </form>

      {/* Lista de artículos */}

    </div>
  );
}

export default App;