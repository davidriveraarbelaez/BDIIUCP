import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [articulos, setArticulos] = useState([]);
  const [titulo, setTitulo] = useState(['']);
  const [contenido, setContenido] = useState(['']);
  const [autor, setAutor] = useState(['']);
  const [editandoId, setEditandoId] = useState(null);
  const [cargando, setCargando] = useState([]);
  
  // Obtener todos los artículos al cargar
  useEffect(() => {
    cargarArticulos();
  },[]);

  const cargarArticulos = async () => {
    try{
      const res = await fetch('/api/articulos');
      const data = await res.json();
      setArticulos(data);
    } catch(error){
      console.error('Error al cargar artículos; ', error);
    }
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setCargando(true);

    const articulo = {titulo, contenido, autor};

    try{
      if(editandoId){
        // Actualizar
        await fetch (`/api/articulos/${editandoId}`,{
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(articulo),          
        });
        setEditandoId(null)
      }else{
        
      }
    }

  }
  

  return (
    <>

    </>
  )
}

export default App