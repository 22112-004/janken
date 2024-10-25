import { useCallback, useEffect, useRef } from 'react';

interface Sound {
  src: string;
  volume?: number;
}

export function useSound() {
  const audioCache = useRef<Map<string, HTMLAudioElement>>(new Map());

  const preloadSound = useCallback((sound: Sound) => {
    if (!audioCache.current.has(sound.src)) {
      const audio = new Audio(sound.src);
      audio.volume = sound.volume ?? 1;
      audioCache.current.set(sound.src, audio);
    }
  }, []);

  const playSound = useCallback((sound: Sound) => {
    const audio = audioCache.current.get(sound.src);
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {
        // Handle autoplay restrictions
      });
    }
  }, []);

  useEffect(() => {
    return () => {
      audioCache.current.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });
      audioCache.current.clear();
    };
  }, []);

  return { preloadSound, playSound };
}