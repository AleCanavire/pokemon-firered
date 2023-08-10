import { createContext, useRef } from 'react';
import { ISoundtrackContext, ISoundtrackProvider } from '../types';

export const SoundtrackContext = createContext<ISoundtrackContext | null>(null);

function SoundtrackContextProvider({ children }: ISoundtrackProvider) {
  const soundtrack = useRef(new Audio("/media/soundtrack.mp3"));

  const playSoundtrack = () => {
    if (soundtrack.current.paused) {
      soundtrack.current.play();
      soundtrack.current.loop = true;
    }
  }

  return (
    <SoundtrackContext.Provider value={{ playSoundtrack }}>
      { children }
    </SoundtrackContext.Provider>
  )
}

export default SoundtrackContextProvider;