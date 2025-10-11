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
        const data = await res.json();

        console.log('Datos recibidos:', data);

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




