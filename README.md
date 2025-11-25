# Sistema de Monitoreo de Agua Industrial

Sistema de monitoreo en tiempo real para válvulas y tanques de agua construido con React, TypeScript y Vite.

## Instalación y ejecución

```sh
npm i
npm run dev
```

## Conexión con el servidor (SSE)

Este proyecto utiliza **Server-Sent Events** para recibir datos en tiempo real del servidor.

### Uso del hook `useServerSentEvents`:

```typescript
import { useServerSentEvents } from '@/hooks/useServerSentEvents';

function MiComponente() {
  const { data, isConnected, error } = useServerSentEvents({
    url: 'http://localhost:3000/events',
    onMessage: (sensorData) => {
      console.log('Datos recibidos:', sensorData);
    },
  });

  return (
    <div>
      <div>Estado: {isConnected ? '🟢 Conectado' : '🔴 Desconectado'}</div>
      {data && <p>Nivel: {data.tank.level}%</p>}
    </div>
  );
}
```

**Nota:** Asegúrate de tener el servidor SSE ejecutándose en `http://localhost:3000/events`
