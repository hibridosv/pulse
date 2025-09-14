import { useEffect, useState } from 'react';

// Extend the Window interface to include Pusher
declare global {
  interface Window {
    Pusher: typeof Pusher;
  }
}
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

const useReverb = (channelName: string, eventName: string, status = false, randomData = true) => {
  const [data, setData] = useState([] as any);
  const [random, setRandom] = useState(0);

  useEffect(() => {
    if (!status) return;
   
    window.Pusher = Pusher;

    const REVERB_HOST = process.env.NEXT_PUBLIC_REVERB_HOST;
    const REVERB_PORT = process.env.NEXT_PUBLIC_REVERB_PORT;
    const REVERB_SCHEME = process.env.NEXT_PUBLIC_REVERB_SCHEME;
    const REVERB_KEY = process.env.NEXT_PUBLIC_REVERB_KEY;
    
    const echo = new Echo({
      broadcaster: 'reverb',
      key: REVERB_KEY,
      wsHost: REVERB_HOST,
      wsPort: REVERB_PORT,
      wssPort: REVERB_PORT,
      forceTLS: (REVERB_SCHEME ?? 'https') === 'https',
    //   disableStats: true,
    //   encrypted: false,
      enabledTransports: ['ws', 'wss'],
    });

    const channel = echo.channel(channelName);

    const handleEvent = (eventData: string) => {
      if (randomData) {
        setRandom(Math.random());
      } else {
        setData(eventData);
      }
    };

    channel.listen(eventName, handleEvent);

    return () => {
      channel.stopListening(eventName);
      echo.leave(channelName);
    };
  }, [channelName, eventName, status, randomData]);

  return { data, random };
};

export default useReverb;
