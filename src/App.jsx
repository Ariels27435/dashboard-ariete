import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [sensores, setSensores] = useState([
      {
        id: 'humedad',
        nombre: 'Sensor Humedad Ariete',
        valor: 0,
        unidad: '%',
        icono: '🌧️'
      },
    {
      id: 'flujo',
      nombre: 'Sensor Flujo Ariete',
      valor: 0,
      unidad: 'L/min',
      icono: '💧'
    },
    {
      id: 'nivel',
      nombre: 'Sensor Nivel Ariete',
      valor: 0,
      unidad: '%',
      icono: '🛢️'
    }
  ]);

  const [ultimaActualizacion, setUltimaActualizacion] = useState(new Date().toLocaleTimeString());
  const [debugInfo, setDebugInfo] = useState('');

  // Función para obtener datos del backend
  const obtenerDatosBackend = async () => {
    try {
      console.log('🔄 Obteniendo datos del backend...');
      
      const API_URL = import.meta.env.VITE_API_URL || 'https://backend-ariete.onrender.com';
      const response = await fetch(`${API_URL}/api/esp32/sensores?api_key=ariete-esp32-2025`);
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Datos recibidos:', data);
        
        if (data && data.sensores && data.sensores.length > 0) {
          // Buscar los sensores del Ariete
          const sensoresAriete = data.sensores.filter(s => 
            s.nombre.includes('Ariete')
          );
          
          if (sensoresAriete.length >= 3) {
            const nuevosSensores = [
              {
                id: 'humedad',
                nombre: 'Sensor Humedad Ariete',
                valor: sensoresAriete.find(s => s.tipo === 'humedad')?.ultimaLectura?.valor || 0,
                unidad: '%',
                icono: '🌧️'
              },
              {
                id: 'flujo',
                nombre: 'Sensor Flujo Ariete',
                valor: sensoresAriete.find(s => s.tipo === 'caudal')?.ultimaLectura?.valor || 0,
                unidad: 'L/min',
                icono: '💧'
              },
              {
                id: 'nivel',
                nombre: 'Sensor Nivel Ariete',
                valor: sensoresAriete.find(s => s.tipo === 'nivel')?.ultimaLectura?.valor || 0,
                unidad: '%',
                icono: '🛢️'
              }
            ];
            
            setSensores(nuevosSensores);
            setUltimaActualizacion(new Date().toLocaleTimeString());
            console.log('✅ Sensores actualizados:', nuevosSensores);
          }
        }
      } else {
        console.log('❌ Error en respuesta:', response.status);
      }
    } catch (error) {
      console.error('❌ Error:', error);
    }
  };

  // Función para probar la carga de la imagen
  const probarImagen = () => {
    const img = new Image();
    img.onload = () => {
      setDebugInfo('✅ Imagen cargada correctamente');
      console.log('✅ Imagen de fondo cargada:', img.src);
    };
    img.onerror = () => {
      setDebugInfo('❌ Error al cargar la imagen');
      console.error('❌ Error al cargar la imagen de fondo');
    };
    img.src = '/background-image.jpeg';
  };

  // Actualizar datos cada 3 segundos
  useEffect(() => {
    const interval = setInterval(obtenerDatosBackend, 3000);
    obtenerDatosBackend(); // Cargar datos inmediatamente
    probarImagen(); // Probar carga de imagen

    return () => clearInterval(interval);
  }, []);

  // Función para simular datos del ESP32
  const simularDatosESP32 = () => {
    console.log('🎮 Simulando datos del ESP32...');
    setSensores([
      {
        id: 'humedad',
        nombre: 'Sensor Humedad Ariete',
        valor: 39,
        unidad: '%',
        icono: '🌧️'
      },
      {
        id: 'flujo',
        nombre: 'Sensor Flujo Ariete',
        valor: 0.00,
        unidad: 'L/min',
        icono: '💧'
      },
      {
        id: 'nivel',
        nombre: 'Sensor Nivel Ariete',
        valor: 0,
        unidad: '%',
        icono: '🛢️'
      }
    ]);
    setUltimaActualizacion(new Date().toLocaleTimeString());
    console.log('✅ Datos del ESP32 simulados');
  };

  // Función para datos aleatorios
  const datosAleatorios = () => {
    console.log('📤 Generando datos aleatorios...');
    setSensores(prev => prev.map(sensor => ({
      ...sensor,
      valor: sensor.unidad === '%' ? Math.floor(Math.random() * 100) : 
             sensor.unidad === 'L/min' ? (Math.random() * 10).toFixed(2) : 
             Math.floor(Math.random() * 100)
    })));
    setUltimaActualizacion(new Date().toLocaleTimeString());
    console.log('✅ Datos aleatorios generados');
  };

  return (
    <div 
      className="dashboard-container"
      style={{
        backgroundImage: 'url(/background-image.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay semi-transparente para mejorar legibilidad */}
      <div className="dashboard-overlay"></div>
      {/* Contenido del dashboard */}
      <div className="dashboard-content" style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        {/* Título arriba como estaba originalmente */}
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', marginBottom: 'auto', paddingTop: '5px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#000000', margin: '0', textShadow: '2px 2px 4px rgba(255,255,255,0.8)' }}>Dashboard Ariete Hidráulico 🌿</h1>
          </div>
        </div>

        {/* Contenido en la parte inferior centrado */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: '5px' }}>
          {/* Todos los sensores en línea horizontal centrados */}
          <div style={{ display: 'flex', gap: '6px', marginBottom: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {sensores.map((sensor) => (
              <div key={sensor.id} style={{ padding: '8px', backgroundColor: 'white', borderRadius: '6px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderLeft: '3px solid #3b82f6', maxWidth: '280px', minWidth: '240px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <div style={{ fontSize: '32px' }}>{sensor.icono}</div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '8px', color: '#6b7280' }}>Estado</div>
                    <div style={{ fontSize: '8px', fontWeight: '600', color: '#059669' }}>✅ OK</div>
                  </div>
                </div>
                
                <h2 style={{ fontSize: '14px', fontWeight: 'bold', color: '#1f2937', marginBottom: '4px' }}>{sensor.nombre}</h2>
                
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#2563eb', marginBottom: '4px' }}>
                  {sensor.valor} <span style={{ fontSize: '12px', color: '#6b7280' }}>{sensor.unidad}</span>
                </div>
                
                {sensor.unidad === '%' && (
                  <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '9999px', height: '6px', marginBottom: '4px' }}>
                    <div
                      style={{ 
                        height: '6px', 
                        borderRadius: '9999px', 
                        backgroundColor: '#3b82f6', 
                        transition: 'width 0.3s ease',
                        width: `${Math.min(sensor.valor, 100)}%` 
                      }}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Barra de información centrada */}
          <div style={{ padding: '6px', backgroundColor: 'white', borderRadius: '6px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', maxWidth: '100%' }}>
            <p style={{ fontSize: '10px', color: '#6b7280', margin: 0, textAlign: 'center' }}>
              <strong>📊 Sensores Ariete:</strong> {sensores.length} | 
              <strong> 🕐 Última actualización:</strong> {ultimaActualizacion} | 
              <strong> 🌐 Frontend:</strong> <a href={window.location.origin} target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'none' }}>{window.location.origin}</a> |
              <strong> ✍️ Autor:</strong> Ariel Celico López de León
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;