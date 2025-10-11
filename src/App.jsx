import { useEffect, useState } from 'react';
import SensorCard from './components/SensorCard';
import { FaTint, FaWater, FaRulerVertical } from 'react-icons/fa';

const iconMap = {
  Humedad: <FaTint />,
  Caudal: <FaWater />,
  Nivel: <FaRulerVertical />
};

function App() {
  const [sensores, setSensores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSensores = async () => {
      try {
        const res = await fetch('https://backend-ariete.onrender.com/api/sensores');
        console.log('Respuesta cruda:', res); // Verifica si responde algo

        const data = await res.json();
        console.log('Datos recibidos:', data); // Verifica si llegan los datos

        const formateados = data.map(sensor => ({
          title: sensor.nombre,
          value: sensor.valor,
          unit: sensor.unidad,
          status: sensor.valor >= sensor.umbral ? 'warning' : 'ok',
          icon: iconMap[sensor.nombre] || null,
          color: sensor.nombre === 'Humedad' ? 'blue' :
                 sensor.nombre === 'Caudal' ? 'green' :
                 sensor.nombre === 'Nivel' ? 'red' : 'gray'
        }));

        setSensores(formateados);
      } catch (error) {
        console.error('Error al obtener sensores:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSensores();
    const interval = setInterval(fetchSensores, 5000); // actualiza cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Ariete</h1>

      <button
        onClick={() => window.location.reload()}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Recargar Dashboard
      </button>

      <p className="text-sm text-gray-600 mb-4">
        Sensores cargados: {sensores.length}
      </p>

      {loading ? (
        <p className="text-gray-500">Cargando sensores...</p>
      ) : sensores.length === 0 ? (
        <p className="text-red-500">No hay sensores disponibles.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sensores.map((sensor, i) => (
            <SensorCard key={i} {...sensor} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;




