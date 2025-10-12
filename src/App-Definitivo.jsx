import { useEffect, useState } from 'react';

function App() {
  const [sensores, setSensores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ultimaActualizacion, setUltimaActualizacion] = useState(new Date());
  const [debugLogs, setDebugLogs] = useState([]);

  const addDebugLog = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    const logMessage = `[${timestamp}] ${message}`;
    console.log(logMessage);
    setDebugLogs(prev => [...prev.slice(-9), logMessage]);
  };

  useEffect(() => {
    const fetchSensores = async () => {
      try {
        addDebugLog('🔄 Iniciando obtención de datos...');
        
        // Intentar obtener sensores
        const response = await fetch('http://localhost:3001/api/esp32/sensores?api_key=ariete-esp32-2025');
        
        addDebugLog(`📡 Respuesta del servidor: ${response.status}`);
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        addDebugLog(`📊 Datos recibidos: ${JSON.stringify(data).substring(0, 200)}...`);
        
        // Verificar estructura de datos
        if (!data.sensores || !Array.isArray(data.sensores)) {
          throw new Error('Estructura de datos inválida');
        }
        
        // Filtrar solo sensores del Ariete
        const sensoresAriete = data.sensores.filter(sensor => 
          sensor.nombre && sensor.nombre.includes('Ariete')
        );
        
        addDebugLog(`🎯 Sensores Ariete encontrados: ${sensoresAriete.length}`);
        
        // Procesar cada sensor
        const sensoresFormateados = sensoresAriete.map(sensor => {
          // Obtener valor de la última lectura
          let valor = 0;
          if (sensor.ultimaLectura && sensor.ultimaLectura.valor !== undefined) {
            valor = sensor.ultimaLectura.valor;
          }
          
          // Iconos específicos
          let icono = '📊';
          if (sensor.nombre.includes('Humedad')) icono = '🌫️';
          else if (sensor.nombre.includes('Flujo')) icono = '💧';
          else if (sensor.nombre.includes('Nivel')) icono = '🛢️';
          
          addDebugLog(`🔍 ${sensor.nombre}: ${valor} ${sensor.unidad}`);
          
          return {
            id: sensor.id || sensor._id,
            nombre: sensor.nombre,
            valor: valor,
            unidad: sensor.unidad || '%',
            icono: icono,
            timestamp: sensor.ultimaLectura ? sensor.ultimaLectura.timestamp : null,
            rawData: sensor // Para debug
          };
        });
        
        addDebugLog(`✅ Sensores procesados: ${sensoresFormateados.length}`);
        setSensores(sensoresFormateados);
        setUltimaActualizacion(new Date());
        setError(null);
        
      } catch (error) {
        addDebugLog(`❌ Error: ${error.message}`);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    // Ejecutar inmediatamente
    fetchSensores();
    
    // Actualizar cada 1 segundo (muy rápido para ver cambios)
    const interval = setInterval(fetchSensores, 1000);

    return () => clearInterval(interval);
  }, []);

  // Función para enviar datos de prueba
  const enviarDatosPrueba = async () => {
    try {
      addDebugLog('📤 Enviando datos de prueba...');
      
      const datos = [
        { endpoint: '/api/humedad', data: { humedad: Math.floor(Math.random() * 100) } },
        { endpoint: '/api/flujo', data: { flujo: (Math.random() * 10).toFixed(2) } },
        { endpoint: '/api/nivel', data: { nivel: Math.floor(Math.random() * 100) } }
      ];

      for (const { endpoint, data } of datos) {
        const res = await fetch(`http://localhost:3001${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        addDebugLog(`📤 ${endpoint}: ${res.status}`);
      }
      
      addDebugLog('✅ Datos de prueba enviados');
    } catch (error) {
      addDebugLog(`❌ Error enviando datos: ${error.message}`);
    }
  };

  // Función para limpiar logs
  const limpiarLogs = () => {
    setDebugLogs([]);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Ariete - DEBUG</h1>
        <div className="flex gap-2">
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            🔄 Recargar
          </button>
          <button
            onClick={enviarDatosPrueba}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            📤 Datos Prueba
          </button>
          <button
            onClick={limpiarLogs}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            🗑️ Limpiar Logs
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <strong>❌ Error:</strong> {error}
        </div>
      )}

      <div className="mb-4 p-3 bg-white rounded shadow">
        <p className="text-sm text-gray-600">
          <strong>📊 Sensores Ariete:</strong> {sensores.length} | 
          <strong> 🕐 Última actualización:</strong> {ultimaActualizacion.toLocaleTimeString()} |
          <strong> 🔄 Actualización:</strong> Cada 1 segundo
        </p>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <p className="text-xl text-gray-500">🔄 Cargando sensores...</p>
        </div>
      ) : sensores.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-xl text-red-500">❌ No se encontraron sensores del Ariete</p>
          <p className="text-sm text-gray-500 mt-2">
            Verifica que el backend esté corriendo y los sensores estén creados
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sensores.map((sensor) => (
            <div key={sensor.id} className="p-6 bg-white rounded-lg shadow-lg border-l-4 border-blue-500">
              <div className="flex items-center justify-between mb-4">
                <div className="text-4xl">{sensor.icono}</div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Estado</div>
                  <div className="text-sm font-semibold text-green-600">✅ OK</div>
                </div>
              </div>
              
              <h2 className="text-xl font-bold text-gray-800 mb-2">{sensor.nombre}</h2>
              
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {sensor.valor} <span className="text-lg text-gray-500">{sensor.unidad}</span>
              </div>
              
              {sensor.unidad === '%' && (
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div
                    className="h-3 rounded-full bg-blue-500 transition-all duration-300"
                    style={{ width: `${Math.min(sensor.valor, 100)}%` }}
                  ></div>
                </div>
              )}
              
              {sensor.timestamp && (
                <p className="text-xs text-gray-400">
                  📅 {new Date(sensor.timestamp).toLocaleString()}
                </p>
              )}
              
              {/* Debug info */}
              <details className="mt-2">
                <summary className="text-xs text-gray-500 cursor-pointer">🔍 Debug</summary>
                <pre className="text-xs text-gray-400 mt-1 bg-gray-100 p-2 rounded overflow-auto">
                  {JSON.stringify(sensor.rawData, null, 2)}
                </pre>
              </details>
            </div>
          ))}
        </div>
      )}

      {/* Debug Panel */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-bold mb-2">🔧 Debug Logs:</h3>
        <div className="bg-black text-green-400 p-3 rounded font-mono text-xs max-h-64 overflow-y-auto">
          {debugLogs.length === 0 ? (
            <p className="text-gray-500">No hay logs aún...</p>
          ) : (
            debugLogs.map((log, i) => (
              <div key={i} className="mb-1">{log}</div>
            ))
          )}
        </div>
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-bold mb-2">🔧 Información Técnica:</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <p><strong>🌐 Backend:</strong> http://localhost:3001</p>
            <p><strong>📱 Frontend:</strong> http://localhost:5177</p>
          </div>
          <div>
            <p><strong>🔄 Actualización:</strong> Cada 1 segundo</p>
            <p><strong>📊 Sensores:</strong> {sensores.length} del Ariete</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;



