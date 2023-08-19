import { createContext, useRef, useState } from 'react';
import { ISoundtrackContext, ISoundtrackProvider } from '../types';

export const SoundtrackContext = createContext<ISoundtrackContext>({} as ISoundtrackContext);

function SoundtrackContextProvider({ children }: ISoundtrackProvider) {
  const soundtrack = useRef(new Audio("/media/soundtrack.mp3"));
  const [isPaused, setIsPaused] = useState(true);

  const controlSoundtrack = () => {
    soundtrack.current.loop = true;
    if (soundtrack.current.paused) {
      soundtrack.current.play();
      setIsPaused(false)
    } else {
      soundtrack.current.pause();
      setIsPaused(true)
    }
  }

  return (
    <SoundtrackContext.Provider value={{ controlSoundtrack, isPaused }}>
      { children }
    </SoundtrackContext.Provider>
  )
}

export default SoundtrackContextProvider;