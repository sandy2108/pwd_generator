import { useCallback, useEffect, useRef, useState } from "react";
import cryptoRandomString from 'crypto-random-string';

export default function App() {
  const [length, setlength] = useState("8");
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  
  const passwordRef = useRef(null)

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numberAllowed) str += "0123456789";
    if(charAllowed) str += "!@#$%^&*()_+";

    for (let i = 1 ; i< length; i++){
      const char = cryptoRandomString({ length: 1, characters: str });
      pass += char;
    }

    setPassword(pass)
  },[length,numberAllowed,charAllowed ])

  useEffect(()=> {
    generatePassword()
  },[length,numberAllowed,charAllowed])

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-blue-500 bg-white/30 font-bold">
      <h1 className=" text-center my-3">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full px-3 text-black font-medium"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button onClick={copyPasswordToClipboard} className="outline-none bg-blue-700 text-white px-3 py-0.5 shir">
          Copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={50}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setlength(e.target.value)}
            name=""
            id=" "
          />
          <label htmlFor="length"> length:{length} </label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            onChange={() => {
              setNumberAllowed((prev) => !prev); //Using Callback for efficient performance
            }}
            name=""
            id=""
          /><lable htmlFor="numInput">Numbers</lable>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            id="characterInput"
            defaultChecked={charAllowed}
            onChange={() => {
              setCharAllowed((prev) => !prev); //Using Callback for efficient performance
            }}
            name=""
          /><lable htmlFor="charInput">Character</lable>
        </div>
      </div>
    </div>
  );
}
