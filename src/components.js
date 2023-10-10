
import {useState} from "react";
import Papa from 'papaparse'; //import Papaprase

//First parser component
export const Parser1 = () => {
  //useState definitions here
    let [data, setData] = useState([]);


    function consoleLogFile() {
      console.log(data[0])
      }


    //https://stackoverflow.com/questions/67950444/how-to-convert-csv-file-data-to-json-object-in-reactjs
    function handleFileUpload(event){
      const files = event.target.files;
      console.log(files)
      if(files){
        console.log('--------------------')
        Papa.parse(files[0], {
          complete: function(results) {
            const newData = results.data;
            console.log('Parsed Data here:', newData)
            setData(newData)
          }
        }
        )
      }

    }

    return (
        <div>
            <p>
                Parser1
            </p>
            <input type="file" id="input-file" accept=".csv,.xlsx,.xls"
             onChange = {handleFileUpload}
            />
            
        <button className="button1" onClick={consoleLogFile}>
          Display Data
        </button>
        <p>File: {data}</p>

        </div>
    );
  };
  