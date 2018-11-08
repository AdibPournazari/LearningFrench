const tipsApiUrl = "http://localhost:8080/api/tips";

function getAllTips() {
    sendHttpRequest("GET", 
                    `${tipsApiUrl}/all`, 
                    "", 
                    "", 
                    (tips) => tips.map(tip => addNewTableRow(tip))
    );
}

function saveTip(){
    let tipName = document.getElementById("tipName").value;
    let tipAdvice = document.getElementById("tipAdvice").value;
    if(!tipName || !tipAdvice) {
        return;
    }

    let jsonTip = {"name": tipName, "advice": tipAdvice};
    sendHttpRequest("POST", 
                    `${tipsApiUrl}/add`, 
                    {key: "Content-type", value: "application/json"}, 
                    JSON.stringify(jsonTip), 
                    (tip) => addNewTableRow(tip)
    );

}

function sendHttpRequest(type, url, header, data, callback) {
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4 && xhr.status === 200) {
            if(xhr.responseText) {
                callback(JSON.parse(xhr.responseText));
            }else{
                callback();
            }
        }
    }
    xhr.open(type, url);
    let {key, value} = header;
    xhr.setRequestHeader(key, value);
    xhr.send(data);
}

let tipsTable = document.getElementById('tipsTable');

function deleteRow(id) {
    for(let rowIndex in tipsTable.rows) {
        for(let cell of tipsTable.rows[rowIndex].cells) {
            const button = cell.children[0];
            if(button && (button.id === id)) {
                tipsTable.deleteRow(rowIndex);
                deleteTip(id);
                return;
            }
        }
    }
}

function deleteTip(id) {
    sendHttpRequest("DELETE",
                    `${tipsApiUrl}/${id}`,
                    "",      
                    "",
                    () => console.log("delete")             
    );
}

function addNewTableRow(tip) {
     let {name, advice, _id} = tip;
    let row = tipsTable.insertRow(1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    cell1.innerHTML = name;
    cell2.innerHTML = advice;
    
    let deleteButton = document.createElement("button");
    deleteButton.id = tip._id;
    deleteButton.onclick = (function(id) { 
        return () => deleteRow(id); 
    })(deleteButton.id);
    deleteButton.appendChild(document.createTextNode("Delete"));
    cell3.appendChild(deleteButton);
}

getAllTips();