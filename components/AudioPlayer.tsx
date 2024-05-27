import { useEffect, useRef } from 'react';
import { useAudio } from '../context/AudioContext';

const AudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { isPlaying } = useAudio();

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      if (isPlaying) {
        audioElement.play().catch(error => {
          console.log('Autoplay prevented:', error);
        });
      } else {
        audioElement.pause();
      }
    }
  }, [isPlaying]);

  return (
    <audio ref={audioRef} loop>
      <source src="/Dystopia_Music_DocTheme.wav" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
};

export default AudioPlayer;
