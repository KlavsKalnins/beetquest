import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [isUnlocked, setUnlocked] = useState(false);
  const [showWrongKey, setShowWrongKey] = useState(false);
  const secret = "key";
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleClick = () => {
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
    const id = setTimeout(() => {
      setShowWrongKey(false);
    }, 3000);
    setTimeoutId(id);
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-center flex-col gap-4 font-mono text-sm flex">
        {isUnlocked ? (
          <div className="w-full">
            <video controls autoPlay width="1920" height="1080">
              <source src="video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
          <>
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="insert..."
              className="w-full h-56 border border-indigo-300 rounded px-3 py-2 mr-2 text-black bg-slate-100"
              autoComplete="off"
            />
            <button
              onClick={handleClick}
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
            >
              Try your luck!
            </button>
            {showWrongKey && <p className="text-red-500">Wrong guess</p>}
          </>
        )}
      </div>
    </main>
  );
}
