
import {useState} from "react";
import Papa from 'papaparse'; //import Papaprase

//First parser component
export const Parser = () => {
  //useState definitions here
    const defualtState = [{
      TelephoneNumber: '1234567890', ContactAttempts: 0, FullMessage: 0, lastCallBlast: 0, lastCallBlastTime: 0,
      Name: 'Constiuent', SuccessfulConnection: 0, ToVoiceMail:0, Route: 'Default', District:'ICSD'
    }];

    const [data, setData] = useState(defualtState);

    function consoleLogFile() {
      console.log(data);
      }


    //https://stackoverflow.com/questions/67950444/how-to-convert-csv-file-data-to-json-object-in-reactjs
    function handleFileUpload(event){
      const files = event.target.files;

      if (files.length === 0){
        setData(defualtState);
      }

      if(files.length > 0){
        Papa.parse(files[0], {
          header: true,
          complete: function(results) {
            const incommingData = results.data,
                  convertedData = incommingData.map(dataObject => {
                    const entries = Object.entries(dataObject),
                          name = entries.filter(x => x[0] === 'PREM_ID').map(index => ['Name', index[1]]),
                          phone = entries.filter(x => x[0] === 'PHONE').map(index => ['TelephoneNumber', index[1].replace(/-/gi,'')]),
                          route = entries.filter(x => x[0] === 'ROUTES').map(index => ['Route', index[1]]),
                          district = entries.filter(x => x[0] === 'DISTRICT_NAME').map(index => ['District', index[1]]),
                          convertedEntries = Object.fromEntries([name, phone, route, district].flat());
                    
                    //set intial object state again
                    convertedEntries.ContactAttempts = 0;
                    convertedEntries.FullMessage = 0;
                    convertedEntries.lastCallBlast = 0;
                    convertedEntries.lastCallBlastTime = 0;
                    convertedEntries.SuccessfulConnection = 0;
                    convertedEntries.ToVoiceMail = 0;

                    //return final array of correctly filled/populated objects
                    return convertedEntries;
                  });

                  //removes last row due to intial values being re-set
                  const cleandData = convertedData.slice(0, convertedData.length-1)


            //uncomment below for debugging
            //console.log('Parsed Data here:', incommingData)
            //console.log(convertedDate)


            
            setData(cleandData)
          }
        }
        )
      }

    }

    return (
        <div>
            <input type="file" id="input-file" accept=".csv,.xlsx,.xls"
             onChange = {handleFileUpload}
            />
          {/* This button is for debugging */}
          <button className="button1" onClick={consoleLogFile}>
            Display Data
          </button>
            <table>
              <thead>
                <tr>
                  <th>TelephoneNumber</th>
                  <th>ContactAttempts</th>
                  <th>FullMessage</th>
                  <th>lastCallBlast</th>
                  <th>lastCallBlastTime</th>
                  <th>Name</th>
                  <th>SuccessfulConnection</th>
                  <th>ToVoiceMail</th>
                  <th>Route</th>
                  <th>District</th>
                </tr>
              </thead>
              <tbody>{data.map((entry,index) => (
                <tr key = {index}>
                  <td>{entry.TelephoneNumber}</td>
                  <td>{entry.ContactAttempts}</td>
                  <td>{entry.FullMessage}</td>
                  <td>{entry.lastCallBlast}</td>
                  <td>{entry.lastCallBlastTime}</td>
                  <td>{entry.Name}</td>
                  <td>{entry.SuccessfulConnection}</td>
                  <td>{entry.ToVoiceMail}</td>
                  <td>{entry.Route}</td>
                  <td>{entry.District}</td>
                </tr>
                ))}
              </tbody>
            </table>
        </div>
    );
  };
  