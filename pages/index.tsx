import { Inter } from "next/font/google";
import GlitchEffect from "../components/GlitchEffect";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [isUnlocked, setUnlocked] = useState(false);
  const [showWrongKey, setShowWrongKey] = useState(false);
  const secret = process.env.SECRET_KEY;// "ABCRKSPO";
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.toUpperCase().slice(0, 8));
  };

  const handleClick = () => {
    console.log(secret);
    if (inputValue.trim() == secret) {
      setUnlocked(true);
      setShowWrongKey(false);
      return;
    }
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    delayedFunction();
  };

  const delayedFunction = () => {
    setShowWrongKey(true);
    setInputValue("");
    const id = setTimeout(() => {
      setShowWrongKey(false);
    }, 2000);
    setTimeoutId(id);
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 tracking`}
    >
      <div className="w-screen h-screen flex justify-center items-center">
        {isUnlocked ? (
          <div className="w-full flex justify-center">
            <video controls autoPlay width="1920" height="1080">
              <source src="video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
          <>
            <div className="w-full xs:w-full xl:w-1/2 h-1/5 bg-red-500/0 flex flex-col items-center gap-10 z-0">
              <GlitchEffect inputValue={inputValue} />
            </div>

            <div className="absolute w-full xs:w-full xl:w-1/2 h-1/5 bg-red-500/0 flex flex-col gap-10">
              <input
                className="w-full h-full opacity-0 relative z-10 text-black text-8xl text-center"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder=""
              />
              <div className="bg-green-400/0 w-full h-20 flex justify-center items-center">
                <button
                  onClick={handleClick}
                  className={`${showWrongKey ? 'bg-red-400' : 'bg-green-400'} h-full px-10 hover:brightness-90 text-white font-bold py-2`}
                >
                  <p className="text-black">{showWrongKey ? 'WRONG' : 'ENTER'}</p>
                </button>
              </div>
            </div>
            <div className="absolute bottom-10 w-1/2 sm:w-1/3 xl:w-1/6">
              <img src="/dystopia_logo.png" />
            </div>
          </>
        )}
      </div>
    </main>
  );
}
