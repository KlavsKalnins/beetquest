import { useAudio } from "@/context/AudioContext";
import { useEffect, useRef, useState } from "react";

const AudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { isPlaying, togglePlayback } = useAudio();

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement && isPlaying) {
      audioElement.play().catch((error) => {
        console.log("Autoplay prevented:", error);
      });
    }
    if (audioElement && !isPlaying) {
      audioElement.pause();
    }
  }, [isPlaying]);

  const handleClick = () => {
    togglePlayback();
  };

  return (
    <div>
      <audio ref={audioRef} loop>
        <source src="/Dystopia_Music_DocTheme.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <button
        onClick={handleClick}
        className="absolute left-2 top-2 opacity-10"
      >
        {isPlaying ? "Pause Music" : "Play Music"}
      </button>
    </div>
  );
};

export default AudioPlayer;
