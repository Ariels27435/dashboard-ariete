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
        icono: '💦'
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
  const [historialVisible, setHistorialVisible] = useState({});
  const [historialDatos, setHistorialDatos] = useState({});

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
                icono: '💦'
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

  // Función para obtener historial real del ESP32
  const obtenerHistorialReal = async (sensorId) => {
    try {
      console.log(`🔄 Obteniendo historial real para ${sensorId}...`);
      
      const API_URL = import.meta.env.VITE_API_URL || 'https://backend-ariete.onrender.com';
      
      // Obtener las últimas 24 horas de lecturas para este sensor
      const response = await fetch(`${API_URL}/api/esp32/lecturas/${sensorId}?horas=24&api_key=ariete-esp32-2025`);
      
      if (response.ok) {
        const data = await response.json();
        console.log(`✅ Historial recibido para ${sensorId}:`, data);
        
        if (data && data.lecturas && data.lecturas.length > 0) {
          return data.lecturas.map(lectura => ({
            hora: new Date(lectura.timestamp).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
            valor: lectura.valor,
            fecha: new Date(lectura.timestamp).toLocaleDateString('es-ES')
          }));
        } else {
          // Si no hay datos reales, mostrar mensaje de no hay datos
          return [{
            hora: 'Sin datos',
            valor: 'No hay lecturas',
            fecha: 'del ESP32'
          }];
        }
      } else {
        console.log(`❌ Error al obtener historial para ${sensorId}:`, response.status);
        return [{
          hora: 'Error',
          valor: 'No se pudieron',
          fecha: 'cargar datos'
        }];
      }
    } catch (error) {
      console.error(`❌ Error al obtener historial para ${sensorId}:`, error);
      return [{
        hora: 'Error',
        valor: 'Sin conexión',
        fecha: 'al ESP32'
      }];
    }
  };

  // Función para mostrar/ocultar historial
  const toggleHistorial = async (sensorId) => {
    if (!historialVisible[sensorId]) {
      // Cerrar todos los otros historiales primero
      setHistorialVisible({});
      
      // Obtener historial real del ESP32 cuando se abre por primera vez
      console.log(`🔄 Abriendo historial para ${sensorId}...`);
      const historial = await obtenerHistorialReal(sensorId);
      setHistorialDatos(prev => ({ ...prev, [sensorId]: historial }));
      
      // Abrir solo este historial
      setHistorialVisible(prev => ({
        ...prev,
        [sensorId]: true
      }));
    } else {
      // Cerrar este historial
      setHistorialVisible(prev => ({
        ...prev,
        [sensorId]: false
      }));
    }
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
        icono: '💦'
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
            <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#ffffff', margin: '0', textShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.4)', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif', letterSpacing: '0.5px', lineHeight: '1.2', fontStyle: 'normal' }}>DASHBOARD ARIETE INTELIGENTE CON MICROSERVICIOS E IOT (INTERNET DE LAS COSAS) 🌿</h1>
          </div>
        </div>

        {/* Contenido en la parte inferior centrado */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: '20px' }}>
          {/* Todos los sensores en línea horizontal centrados */}
          <div style={{ display: 'flex', gap: '15px', marginBottom: '5px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {sensores.map((sensor) => (
                <div 
                  key={sensor.id} 
                  className="sensor-card"
                  style={{ 
                    padding: '20px', 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    borderRadius: '16px', 
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)', 
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    width: historialVisible[sensor.id] ? '420px' : '320px', 
                    minHeight: historialVisible[sensor.id] ? '400px' : '200px',
                    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    cursor: 'pointer',
                    transform: 'scale(1)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    zIndex: historialVisible[sensor.id] ? '10' : '1',
                    position: 'relative'
                  }}
                >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <div style={{ fontSize: '48px' }}>{sensor.icono}</div>
          <button
                    onClick={() => toggleHistorial(sensor.id)}
                    style={{
                      background: 'linear-gradient(135deg, #ff6b35 0%, #007aff 50%, #5856d6 100%)',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '4px 8px',
                      fontSize: '10px',
                      fontWeight: '600',
                      color: 'white',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 2px 6px rgba(255, 107, 53, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'scale(1.05)';
                      e.target.style.boxShadow = '0 4px 12px rgba(255, 107, 53, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'scale(1)';
                      e.target.style.boxShadow = '0 2px 6px rgba(255, 107, 53, 0.3)';
                    }}
                  >
                    📊 Historial
      </button>
      </div>

                <h2 style={{ fontSize: '17px', fontWeight: '600', color: '#1d1d1f', marginBottom: '12px', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif', letterSpacing: '-0.022em' }}>{sensor.nombre}</h2>
                
                <div style={{ fontSize: '36px', fontWeight: '700', background: 'linear-gradient(135deg, #ff6b35 0%, #007aff 50%, #5856d6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '12px', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif', letterSpacing: '-0.022em' }}>
                  {sensor.valor} <span style={{ fontSize: '20px', fontWeight: '500', color: '#86868b' }}>{sensor.unidad}</span>
            </div>
            
            {sensor.unidad === '%' && (
                  <div style={{ width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.1)', borderRadius: '8px', height: '8px', marginBottom: '8px', overflow: 'hidden' }}>
                <div
                  style={{ 
                        height: '8px', 
                        borderRadius: '8px', 
                        background: 'linear-gradient(90deg, #ff6b35 0%, #ff3b30 25%, #007aff 50%, #5856d6 75%, #af52de 100%)',
                        transition: 'width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        width: `${Math.min(sensor.valor, 100)}%`,
                        boxShadow: '0 2px 8px rgba(255, 107, 53, 0.4), 0 0 12px rgba(0, 122, 255, 0.3)'
                  }}
                ></div>
              </div>
            )}

                {/* Panel de historial desplegable */}
                {historialVisible[sensor.id] && (
                  <div style={{
                    marginTop: '12px',
                    padding: '16px',
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    maxHeight: '250px',
                    overflowY: 'auto',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '12px'
                    }}>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#1d1d1f',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif'
                      }}>
                        📈 Historial Real del ESP32 - Últimas 24 horas
                      </div>
                      <button
                        onClick={() => toggleHistorial(sensor.id)}
                        style={{
                          background: 'linear-gradient(135deg, #ff3b30 0%, #ff6b35 100%)',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '4px 8px',
                          fontSize: '10px',
                          fontWeight: '600',
                          color: 'white',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 2px 6px rgba(255, 59, 48, 0.3)'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'scale(1.05)';
                          e.target.style.boxShadow = '0 4px 12px rgba(255, 59, 48, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'scale(1)';
                          e.target.style.boxShadow = '0 2px 6px rgba(255, 59, 48, 0.3)';
                        }}
                      >
                        ✕ Cerrar
                      </button>
                    </div>
                    {historialDatos[sensor.id] && historialDatos[sensor.id].length > 0 ? (
                      <>
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(4, 1fr)',
                          gap: '8px',
                          fontSize: '11px'
                        }}>
                          {historialDatos[sensor.id].slice(-12).map((dato, index) => (
                            <div key={index} style={{
                              padding: '8px',
                              backgroundColor: 'rgba(255, 255, 255, 0.9)',
                              borderRadius: '8px',
                              textAlign: 'center',
                              border: '1px solid rgba(0, 0, 0, 0.1)',
                              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                            }}>
                              <div style={{ 
                                fontWeight: '600', 
                                color: '#1d1d1f',
                                fontSize: '12px',
                                marginBottom: '2px'
                              }}>
                                {dato.valor}{dato.valor !== 'No hay lecturas' && dato.valor !== 'No se pudieron' && dato.valor !== 'Sin conexión' ? sensor.unidad : ''}
                              </div>
                              <div style={{ 
                                fontSize: '10px', 
                                color: '#86868b',
                                fontFamily: 'monospace'
                              }}>
                                {dato.hora}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div style={{
                          marginTop: '12px',
                          textAlign: 'center',
                          fontSize: '10px',
                          color: '#86868b',
                          fontStyle: 'italic'
                        }}>
                          📊 Datos reales del ESP32 - Mostrando últimas {Math.min(historialDatos[sensor.id].length, 12)} lecturas
                        </div>
                      </>
                    ) : (
                      <div style={{
                        textAlign: 'center',
                        padding: '20px',
                        color: '#86868b'
                      }}>
                        <div style={{ fontSize: '16px', marginBottom: '8px' }}>📡</div>
                        <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
                          Conectando con ESP32...
                        </div>
                        <div style={{ fontSize: '12px' }}>
                          Obteniendo datos reales del sensor
                        </div>
                      </div>
                    )}
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
            <div style={{ textAlign: 'center', marginTop: '8px' }}>
              <a 
                href="https://es.wikipedia.org/wiki/Bomba_de_ariete" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  display: 'inline-block',
                  padding: '8px 16px',
                  background: 'linear-gradient(135deg, #ff6b35 0%, #007aff 50%, #5856d6 100%)',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(255, 107, 53, 0.3), 0 2px 6px rgba(0, 122, 255, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05) translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 20px rgba(255, 107, 53, 0.4), 0 4px 12px rgba(0, 122, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1) translateY(0px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(255, 107, 53, 0.3), 0 2px 6px rgba(0, 122, 255, 0.2)';
                }}
              >
                📚 ¿Qué es un Ariete Hidráulico?
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;