
import {useState} from "react";

//First parser component
export const Parser1 = () => {
    let [consoleLog, dataTest] = useState(null);
    function handleClick() {
        // eslint-disable-next-line no-useless-concat
        dataTest(console.log(consoleLog));
      }


    return (
        <div>
            <p>
                Parser1
            </p>
            <input type="file" id="input-file" accept=".csv"
             onClick = {()=> {console.log('test')}}
            // onClick = {(event)=> {event.target.value = null}}
             onChange = {(event)=> console.log('uploaded')}
            >
            </input>
        <button className="button1" onClick={handleClick}>
          Press to Console Log
        </button>
        <p>{consoleLog}</p>

        </div>
    );
  };
  