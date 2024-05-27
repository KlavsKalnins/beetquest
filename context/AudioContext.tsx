import { createContext, useState, useContext, ReactNode } from "react";

interface AudioContextType {
  isPlaying: boolean;
  togglePlayback: () => void;
  stopPlaying: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudio = (): AudioContextType => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};

export const AudioProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = () => {
    setIsPlaying(prev => !prev);
    // setIsPlaying((prev) => false);
  };
  const stopPlaying = () => {
    setIsPlaying(false);
  };

  return (
    <AudioContext.Provider value={{ isPlaying, togglePlayback, stopPlaying }}>
      {children}
    </AudioContext.Provider>
  );
};
