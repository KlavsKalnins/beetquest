import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AudioPlayer from '../components/AudioPlayer';
import { AudioProvider } from "@/context/AudioContext";

export default function App({ Component, pageProps }: AppProps) {
  return(
  <AudioProvider>
      <AudioPlayer />
      <Component {...pageProps} />
      {/* <PlaybackControl /> */}
    </AudioProvider>
   );
}
