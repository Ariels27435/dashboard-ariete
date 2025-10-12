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
      <div className="dashboard-content">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
                <h1 style={{ fontSize: '36px', fontWeight: '900', color: '#000000', margin: '0 0 8px 0', textShadow: '2px 2px 4px rgba(255,255,255,0.8)' }}>Dashboard Ariete Hidráulico 🌿</h1>
          <p style={{ fontSize: '16px', color: '#000000', margin: '0', fontWeight: 'bold', textShadow: '1px 1px 2px rgba(255,255,255,0.8)' }}>
            Creado por Ariel Celico López de León ✨
          </p>
        </div>
      </div>

      {/* Espacio para mostrar más la imagen de fondo */}
      <div style={{ height: '250px' }}></div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        {sensores.map((sensor) => (
          <div key={sensor.id} style={{ padding: '24px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderLeft: '4px solid #3b82f6' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ fontSize: '64px' }}>{sensor.icono}</div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>Estado</div>
                <div style={{ fontSize: '12px', fontWeight: '600', color: '#059669' }}>✅ OK</div>
              </div>
            </div>
            
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>{sensor.nombre}</h2>
            
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#2563eb', marginBottom: '8px' }}>
              {sensor.valor} <span style={{ fontSize: '18px', color: '#6b7280' }}>{sensor.unidad}</span>
            </div>
            
            {sensor.unidad === '%' && (
              <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '9999px', height: '12px', marginBottom: '8px' }}>
                <div
                  style={{ 
                    height: '12px', 
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

      {/* Barra de información al final */}
      <div style={{ marginTop: '40px', padding: '12px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
          <strong>📊 Sensores Ariete:</strong> {sensores.length} | 
          <strong> 🕐 Última actualización:</strong> {ultimaActualizacion} | 
          <strong> 🌐 Frontend:</strong> <a href={window.location.origin} target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'none' }}>{window.location.origin}</a>
        </p>
      </div>

      </div>
    </div>
  );
}

export default App;