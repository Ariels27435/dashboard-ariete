import { useState, useEffect } from 'react';

function App() {
  const [sensores, setSensores] = useState([
    {
      id: 'humedad',
      nombre: 'Sensor Humedad Ariete',
      valor: 0,
      unidad: '%',
      icono: '🌫️'
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
                icono: '🌫️'
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

  // Actualizar datos cada 3 segundos
  useEffect(() => {
    const interval = setInterval(obtenerDatosBackend, 3000);
    obtenerDatosBackend(); // Cargar datos inmediatamente

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
        icono: '🌫️'
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
    <div style={{ padding: '24px', backgroundColor: '#f3f4f6', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1f2937', margin: '0 0 4px 0' }}>Dashboard Ariete - FUNCIONAL</h1>
          <p style={{ fontSize: '14px', color: '#6b7280', margin: '0', fontStyle: 'italic' }}>
            Creado por Ariel Celico López de León
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={obtenerDatosBackend}
            style={{ padding: '8px 16px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            🔄 Recargar
          </button>
          <button
            onClick={datosAleatorios}
            style={{ padding: '8px 16px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            📤 Datos Aleatorios
          </button>
      <button
            onClick={simularDatosESP32}
            style={{ padding: '8px 16px', backgroundColor: '#8b5cf6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
            🎮 Simular ESP32
      </button>
        </div>
      </div>

      <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
          <strong>📊 Sensores Ariete:</strong> {sensores.length} | 
          <strong> 🕐 Última actualización:</strong> {ultimaActualizacion}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        {sensores.map((sensor) => (
          <div key={sensor.id} style={{ padding: '24px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderLeft: '4px solid #3b82f6' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ fontSize: '32px' }}>{sensor.icono}</div>
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

      <div style={{ padding: '16px', backgroundColor: '#dbeafe', borderRadius: '8px' }}>
        <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>🔧 Instrucciones:</h3>
        <div style={{ fontSize: '14px' }}>
          <p><strong>1. 📤 Datos Aleatorios:</strong> Genera valores aleatorios para todos los sensores</p>
          <p><strong>2. 🎮 Simular ESP32:</strong> Simula los datos reales del ESP32 (Humedad: 39%, Flujo: 0.00 L/min, Nivel: 0%)</p>
          <p><strong>3. 🔄 Recargar:</strong> Refresca el dashboard</p>
        </div>
      </div>

      <div style={{ marginTop: '16px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
        <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>🔧 Información Técnica:</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', fontSize: '14px' }}>
          <div>
            <p><strong>🌐 Backend:</strong> {import.meta.env.VITE_API_URL || 'http://localhost:3001'}</p>
            <p><strong>📱 Frontend:</strong> {window.location.origin}</p>
          </div>
          <div>
            <p><strong>📊 Sensores:</strong> {sensores.length} del Ariete</p>
            <p><strong>⚡ React:</strong> Versión simple sin dependencias</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;