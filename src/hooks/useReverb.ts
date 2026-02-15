import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    Pusher: typeof Pusher;
  }
}

let echoInstance: Echo<'reverb'> | null = null;

function getEchoInstance(): Echo<'reverb'> {
  if (!echoInstance) {
    window.Pusher = Pusher;

    const REVERB_HOST = process.env.NEXT_PUBLIC_REVERB_HOST;
    const REVERB_PORT = process.env.NEXT_PUBLIC_REVERB_PORT;
    const REVERB_SCHEME = process.env.NEXT_PUBLIC_REVERB_SCHEME;
    const REVERB_KEY = process.env.NEXT_PUBLIC_REVERB_KEY;

    echoInstance = new Echo({
      broadcaster: 'reverb',
      key: REVERB_KEY,
      wsHost: REVERB_HOST,
      wsPort: Number(REVERB_PORT),
      wssPort: Number(REVERB_PORT),
      forceTLS: (REVERB_SCHEME ?? 'https') === 'https',
      enabledTransports: ['ws', 'wss'],
    });
  }
  return echoInstance;
}

const useReverb = (channelName: string, eventName: string, status = false) => {
  const [data, setData] = useState<any>(null);
  const [random, setRandom] = useState(0);
  const channelRef = useRef<any>(null);

  useEffect(() => {
    console.log("Status: ", status)
    if (!status) return;

    const echo = getEchoInstance();
    const channel = echo.channel(channelName);
    channelRef.current = channel;
    console.log("Channel: ", channel)

    const handleEvent = (eventData: any) => {
        setRandom(Math.random());
        setData(eventData);
    };

    channel.listen(eventName, handleEvent);

    return () => {
      channel.stopListening(eventName);
      echo.leave(channelName);
      channelRef.current = null;
    };
  }, [channelName, eventName, status]);

  return { data, random };
};

export default useReverb;
