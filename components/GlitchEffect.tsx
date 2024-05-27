import React from "react";

interface Props {
  inputValue: string;
}

const GlitchEffect: React.FC<Props> = ({ inputValue }) => {
  // Split the input value into an array of characters
  const characters: string[] = inputValue.split("");

  while (characters.length < 8) {
    characters.push(" "); // Push spaces until the length reaches 9
  }
  // Create an array with 9 copies of the characters
  const lines: string[][] = Array(9).fill(characters);

  return (
    <div className="glitch text-[3rem] xl:text-[80px]">
      {/* Map over each line */}
      {lines.map((line, index) => (
        <div key={index} className="line">
          {/* Map over each character in the line */}
          {line.map((char: string, charIndex: number) => (
            <div
              key={charIndex}
              className="char-wrapper inline-block relative mx-1.5 xl:mx-4"
            >
              {/* Render the character */}
              {char == " " ? (
                <span className="char opacity-0">A</span>
              ) : (
                <span className="char">{char}</span>
              )}
              {/* Render the green line */}
              <div className="absolute bottom-0 left-0 w-full h-1.5 bg-green-500"></div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GlitchEffect;
