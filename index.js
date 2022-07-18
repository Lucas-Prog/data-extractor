// const query = require('./query.json');
const csv = require('convert-array-to-csv')
const fs = require('fs')
const readLine = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readLine.question("informe o local exatp do arquivo: ", local =>{

    fs.readFile(local, "utf-8", (err, data) =>{

        if(err) throw err;

        var file = JSON.parse(data);
        var js = file.rawResponse.hits.hits;

        var data = [];

        js.map(hits => {
            var sliceMessage = JSON.parse(hits.highlight.message[0].slice(82));

            var _data = {
                TraceId : hits.fields['trace.id'][0],
                SequenceNumber : sliceMessage.SequenceNumber,
                Status : sliceMessage.Status
            }

            data.push(_data);
        });

        var csvData = csv.convertArrayToCSV(data);

        fs.writeFile("data.csv", csvData, err =>{
            if(err) throw err;
            console.log("File Created");
        });
                
    });
    
    readLine.close();
});




// C:\Users\Mantega\Desktop\data finder\query.json