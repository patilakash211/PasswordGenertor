import { useState, useCallback ,useEffect , useRef} from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberTicked, setNumberTicked] = useState(false);
  const [characterChecked, setCharacterChecked] = useState(false);
  const [password, setPassword] = useState("");

  // useRef Hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberTicked) {
      str += "0123456789";
    }
    if (characterChecked) {
      str += "!#$%&'()*+,-./:;<=>?@[]^_`{|}~";
    }

    for (let i = 1; i <=  length ; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberTicked, characterChecked, setPassword]);

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {
    passwordGenerator()
  }, [length,numberTicked,characterChecked , passwordGenerator])
  

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-organge-500 bg-gray-500">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            placeholder="password"
            className="outline-none w-full py-3 px-3 "
            readOnly
            ref={passwordRef}
          />
          <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0" onClick={copyPasswordToClipboard}>
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e)=>{
                setLength(e.target.value)
              }}  
            />
            <label>Length : {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberTicked}
              id="numberInput"
              onChange={()=>{
                setNumberTicked((prev)=>!prev)
              }}  
            />
            <label>Number</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={characterChecked}
              id="characterInput"
              onChange={()=>{
                setCharacterChecked((prev)=>!prev)
              }}  
            />
            <label>Character</label>
          </div>


        </div>
      </div>
    </>
  );
}

export default App;
