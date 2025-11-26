// Datos simulados del sistema de agua
export interface SensorData {
  valve1: 0 | 1; // Válvula izquierda
  valve2: 0 | 1; // Válvula derecha
  tank1Level: number; // 0-100%
  tank2Level: number; // 0-100%
  tank3Level: number; // 0-100%
  tank3Turbidity: number; // 0-900
  tank3Temperature: number; // Temperatura en °C
}

// Simular datos dinámicos
let currentData: SensorData = {
  valve1: 1,
  valve2: 0,
  tank1Level: 45,
  tank2Level: 78,
  tank3Level: 62,
  tank3Turbidity: 250,
  tank3Temperature: 22.5,
};

// Simular cambios aleatorios cada ciertos segundos
export const getSimulatedData = (): SensorData => {
  // Cambio aleatorio de válvulas cada 8-15 segundos
  if (Math.random() > 0.92) {
    currentData.valve1 = currentData.valve1 === 1 ? 0 : 1;
  }
  if (Math.random() > 0.94) {
    currentData.valve2 = currentData.valve2 === 1 ? 0 : 1;
  }

  // Cambios graduales en niveles de tanques
  currentData.tank1Level = Math.max(0, Math.min(100, currentData.tank1Level + (Math.random() - 0.5) * 3));
  currentData.tank2Level = Math.max(0, Math.min(100, currentData.tank2Level + (Math.random() - 0.5) * 3));
  currentData.tank3Level = Math.max(0, Math.min(100, currentData.tank3Level + (Math.random() - 0.5) * 3));

  // Cambios graduales en turbidez
  currentData.tank3Turbidity = Math.max(0, Math.min(900, currentData.tank3Turbidity + (Math.random() - 0.5) * 40));

  // Cambios graduales en temperatura (15°C - 35°C)
  currentData.tank3Temperature = Math.max(15, Math.min(35, currentData.tank3Temperature + (Math.random() - 0.5) * 0.8));

  return { ...currentData };
};

// Hook para obtener datos en tiempo real
export const useSensorData = (updateInterval: number = 2000) => {
  const [data, setData] = React.useState<SensorData>(getSimulatedData());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setData(getSimulatedData());
    }, updateInterval);

    return () => clearInterval(interval);
  }, [updateInterval]);

  return data;
};

import React from 'react';
