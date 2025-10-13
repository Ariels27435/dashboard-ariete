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
      <div className="dashboard-content" style={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'flex-start', padding: '20px' }}>
        {/* Título arriba */}
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', marginBottom: 'auto' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#ffffff', margin: '0', textShadow: '3px 3px 6px rgba(0,0,0,0.8)', fontFamily: 'Times New Roman, serif', letterSpacing: '1px', lineHeight: '1.2' }}>DASHBOARD ARIETE INTELIGENTE CON MICROSERVICIOS E IOT (INTERNET DE LAS COSAS) 🌿</h1>
          </div>
        </div>

        {/* Contenido en la parte inferior centrado */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: '20px' }}>
          {/* Todos los sensores en línea horizontal centrados */}
          <div style={{ display: 'flex', gap: '15px', marginBottom: '5px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {sensores.map((sensor) => (
              <div 
                key={sensor.id} 
                style={{ 
                  padding: '15px', 
                  backgroundColor: 'rgba(255, 255, 255, 0.85)', 
                  borderRadius: '10px', 
                  boxShadow: '0 4px 8px rgba(0,0,0,0.15)', 
                  borderLeft: '4px solid #3b82f6', 
                  width: '320px', 
                  minHeight: '200px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  transform: 'scale(1)',
                  backdropFilter: 'blur(10px)',
                  ':hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)',
                    borderLeft: '6px solid #1d4ed8'
                  }
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 8px 20px rgba(59, 130, 246, 0.3)';
                  e.target.style.borderLeft = '6px solid #1d4ed8';
                  e.target.style.backgroundColor = 'rgba(248, 250, 252, 0.9)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
                  e.target.style.borderLeft = '4px solid #3b82f6';
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <div style={{ fontSize: '48px' }}>{sensor.icono}</div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>Estado</div>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#059669' }}>✅ OK</div>
                  </div>
                </div>
                
                <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>{sensor.nombre}</h2>
                
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#2563eb', marginBottom: '8px' }}>
                  {sensor.valor} <span style={{ fontSize: '18px', color: '#6b7280' }}>{sensor.unidad}</span>
                </div>
                
                {sensor.unidad === '%' && (
                  <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '9999px', height: '10px', marginBottom: '8px' }}>
                    <div
                      style={{ 
                        height: '10px', 
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
        </div>

        {/* Barra de información en la parte inferior */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ padding: '12px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 2px 6px rgba(0,0,0,0.15)', maxWidth: '100%' }}>
            <p style={{ fontSize: '14px', color: '#6b7280', margin: 0, textAlign: 'center' }}>
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