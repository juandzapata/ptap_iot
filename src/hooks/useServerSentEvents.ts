import { useEffect, useState, useCallback } from 'react';

interface SSEOptions {
  url: string;
  onMessage?: (data: any) => void;
  onError?: (error: Event) => void;
  reconnect?: boolean;
  reconnectInterval?: number;
}

export function useServerSentEvents<T = any>({
  url,
  onMessage,
  onError,
  reconnect = true,
  reconnectInterval = 3000,
}: SSEOptions) {
  const [data, setData] = useState<T | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Event | null>(null);

  const connect = useCallback(() => {
    const eventSource = new EventSource(url);

    eventSource.onopen = () => {
      setIsConnected(true);
      setError(null);
      console.log('SSE: Conectado al servidor');
    };

    eventSource.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        setData(parsedData);
        onMessage?.(parsedData);
      } catch (err) {
        console.error('Error parseando datos SSE:', err);
      }
    };

    eventSource.onerror = (err) => {
      console.error('SSE Error:', err);
      setError(err);
      setIsConnected(false);
      onError?.(err);
      eventSource.close();

      // Reconectar automáticamente
      if (reconnect) {
        setTimeout(() => {
          console.log('SSE: Intentando reconectar...');
          connect();
        }, reconnectInterval);
      }
    };

    return eventSource;
  }, [url, onMessage, onError, reconnect, reconnectInterval]);

  useEffect(() => {
    const eventSource = connect();

    return () => {
      eventSource.close();
      setIsConnected(false);
    };
  }, [connect]);

  return { data, isConnected, error };
}
