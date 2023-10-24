import { React } from "react";
import { CSVLink } from "react-csv";

function Export({consoleLogFile}){
    
    return(
        <div>
            <button onClick={() => consoleLogFile()}> 
                Export Data
            </button>
            <CSVLink
                data={'test,test1,test2'}
                filename={'test.csv'}
                classNam='testOutputCSV'>
            Donwload Me
            </CSVLink>

        </div>
    )
}

export default Export