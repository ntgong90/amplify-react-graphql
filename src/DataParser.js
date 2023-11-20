import {useState} from "react";
import Papa from "papaparse"; //import Papaprase
import * as XLSX from "xlsx";
//import { TableVirtuoso } from 'react-virtuoso';
//import Export  from "./ExportData";
import { CSVLink } from "react-csv";

//First parser component
 export const Parser = ({exportData, sendDataToParent}) => {
    //useState definitions here
    const defaultState = [{
      TelephoneNumber: '1234567890', ContactAttempts: 0, FullMessage: 0, lastCallBlast: 0, lastCallBlastTime: 0,
      Name: 'Constiuent', SuccessfulConnection: 0, ToVoiceMail:0, Route: 'Default', District:'ICSD'}];
    const intialFileTypeState = ['Please upload a file'];

    //hard coded header format for CSVLink 
    const outputHeader = [{label:'TelephoneNumber', key:'TelephoneNumber'}, {label:'ContactAttempts', key:'ContactAttempts'},
      {label:'FullMessage',key:'FullMessage'},{label:'lastCallBlast', key:'lastCallBlast'}, {label:'lastCallBlastTime', key:'lastCallBlastTime'},
      {label:'Name', key:'Name'}, {label:'SuccessfulConnection',key:'SuccessfulConnection'}, {label:'ToVoiceMail', key:'ToVoiceMail'},
      {label:'Route', key:'Route'}, {label:'District', key:'District'}];

    const [data, setData] = useState(defaultState);
    const [fileType, setFileType] = useState(intialFileTypeState);

    //debugging method
    function consoleLogFile() {
      console.log(data);
      }

    //https://stackoverflow.com/questions/67950444/how-to-convert-csv-file-data-to-json-object-in-reactjs
    const handleFileUpload = async(event) => {
      const files = event.target.files,
            fullFileName = files[0] ? files[0].name : 'No file uploaded',
            fileName = fullFileName.split('.')[0] || 'No file',
            fileExtensionType = (fullFileName.match(/\.csv|\.xlsx|.xls/gi) || [])[0];

            //this checks file input
            // console.log(files)
            // console.log(fullFileName)
            // console.log(fileExtensionType)
            // console.log(fileName)

      if(fileExtensionType === '.csv') setFileType(fileName + fileExtensionType);
      if(fileExtensionType === '.xlsx') setFileType(fileName + fileExtensionType);
      if(fileExtensionType === '.xls') setFileType(fileName + fileExtensionType);
      
      if (files.length === 0){
        setData(defaultState);
        setFileType(intialFileTypeState);
      }
      //processes data using Papaparse based on Commodity csv file
      if(files.length > 0){
        if(fileExtensionType === '.csv'){
          Papa.parse(files[0], {
            header: true,
            complete: function(results) {
              const incommingCommodityData = results.data
              const convertedCommodityData = incommingCommodityData.map(dataObject => {

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

                //return final shallow copy array of correctly filled/populated objects
                return convertedEntries;
              }); 

              const cleandCommodityData = convertedCommodityData
                      .filter(object => object.TelephoneNumber !== 'NULL')  //filter check if TelephoneNumber exists; name doesn't matter
                      .slice(0, convertedCommodityData.length-1);           //removes last row due to intial values being re-set

              setData(cleandCommodityData);
              //return(cleandCommodityData);
            }
          })
        }
        //processes data using XLSX from SheetJS based on Bulky xlsx file; Papaparse does not support xlsx
        if(fileExtensionType === '.xlsx'){
          const data = await files[0].arrayBuffer(),
                workbook = XLSX.read(data),
                worksheet = workbook.Sheets[workbook.SheetNames[0]],
                jsonData = XLSX.utils.sheet_to_json(worksheet);

          console.log(jsonData[0].SRNumber)

          //checks if there is an 'SRNumber' field to classify data as bulky data
          if(jsonData[0].SRNumber){
            const convertedBulkyData = jsonData.map(dataObject => {
              const entries = Object.entries(dataObject),
                    name = entries.filter(x => x[0] === 'SRContactName').map(index => ['Name', index[1]]),
                    phone = entries.filter(x => x[0] === 'SRContactPhone').map(index => ['TelephoneNumber', typeof index[1] === 'string' ? 
                                                                                                              index[1].replace(/-/gi,'') : index[1].toString()]),
                    convertedBulkyEntries = Object.fromEntries([name, phone].flat());
              
              //set intial object state again
              convertedBulkyEntries.ContactAttempts = 0;
              convertedBulkyEntries.FullMessage = 0;
              convertedBulkyEntries.lastCallBlast = 0;
              convertedBulkyEntries.lastCallBlastTime = 0;
              convertedBulkyEntries.SuccessfulConnection = 0;
              convertedBulkyEntries.ToVoiceMail = 0;
              convertedBulkyEntries.Route = 'N/A';
              convertedBulkyEntries.District = 'N/A';
  
              //return final array of correctly filled/populated objects
              return convertedBulkyEntries;
            });
              //removes last row due to intial values being re-set
              const cleandBulkyData = convertedBulkyData
                      .filter(object =>  object.TelephoneNumber)  //filter 'NULL' phone number from array of objects
                      .slice(0, convertedBulkyData.length-1);     //removes last row due to intial values being re-set
              console.log(convertedBulkyData)
              setData(cleandBulkyData)
              //return(cleandBulkyData);
          }

          //checks if there is an 'GreenWaste_Routes' field to classify data as kitchen pail data
          if(jsonData[0].GreenWaste_Routes){
            const convertedKitchenPailData = jsonData.map(dataObject => {
              const entries = Object.entries(dataObject),
                    route = entries.filter(x => x[0] === 'GreenWaste_Routes').map(index => ['Route', index[1]]),
                    phone = entries.filter(x => x[0] === 'PHONE').map(index => ['TelephoneNumber', typeof index[1] === 'string' ? 
                                                                                                              index[1].replace(/-/gi,'') : index[1].toString()]),
                    convertedKitchenPailEntries = Object.fromEntries([route, phone].flat());
              
              //set intial object state again\
              convertedKitchenPailEntries.ContactAttempts = 0;
              convertedKitchenPailEntries.FullMessage = 0;
              convertedKitchenPailEntries.lastCallBlast = 0;
              convertedKitchenPailEntries.lastCallBlastTime = 0;
              convertedKitchenPailEntries.SuccessfulConnection = 0;
              convertedKitchenPailEntries.ToVoiceMail = 0;
              convertedKitchenPailEntries.Name = 'No name';
              convertedKitchenPailEntries.District = 'N/A';
  
              //return final array of correctly filled/populated objects
              return convertedKitchenPailEntries;
            });
              //removes last row due to intial values being re-set
              const cleanedKitchenPailData = convertedKitchenPailData
                      .filter(object => object.TelephoneNumber !== 'NULL')  //filter 'NULL' phone number from array of objects
                      .slice(0, convertedKitchenPailData.length-1);         //removes last row due to intial values being re-set

              setData(cleanedKitchenPailData);
             // return(cleanedKitchenPailData);
          }
        }
    }
  }

    return (
        <div>
            <input type="file" id="input-file" accept=".csv,.xlsx,.xls"
             onChange = {(e) => handleFileUpload(e)}
            />


          {/* This button is for debugging */}
          <button className="button1" id='displayDataButton' onClick={consoleLogFile()}>
            Display Data
          </button>

          
          <CSVLink
                data={data}
                headers={outputHeader}
                filename={'results.csv'}
                classNam='outputCSV'>
            Donwload Me
          </CSVLink>
          <div>
            <ul id="descriptionList" style={{listStyleType:'none'}}>
              <li>File Upload currently accepts Commodity, Bulky, and Kitchen Pail Lists</li>
              <li>{fileType}</li>
            </ul> 
          </div>
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
  