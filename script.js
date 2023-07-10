// async function getUserName() {
//     const idwebsite = document.getElementById("useridGet").value;

//     const endpoint = new URL(`http://192.168.1.239:5000/api/v1/website/${ idwebsite }`)
    
//     console.log(endpoint);

//     const response = await fetch(endpoint);

//     console.log(response);

//     const data = await response.json();

//     console.log(data);

//     // loadIntoTable(endpoint, document.querySelector('table'));
// }

async function loadIntoTable(url, table) {
    const tableHead = table.querySelector("thead");
    const tableBody = table.querySelector("tbody");
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    tableHead.innerHTML = "<tr></tr>";
    tableBody.innerHTML = '';

    const headerConstructor = ["ID", "URL", "Score", "Safety", "Uploaded", "Updated"];

    for (const headerText of headerConstructor) {
        const headerElement = document.createElement('th');

        headerElement.textContent = headerText;
        tableHead.querySelector("tr").appendChild(headerElement);
    }

    for (const row of data) {
        const rowElement = document.createElement("tr");

        for (const [cellKey, cellText] of Object.entries(row)) {
            const cellElement = document.createElement('td');
            let cellStr = '';

            switch (cellKey) {
                case 'score':
                    for (let index = 0; index < parseInt(cellText); index++) {
                        cellStr = cellStr + '★';
                    }
                    cellElement.textContent = cellStr;
                    break;
            
                case 'safety':
                    if (parseInt(cellText) != 0) {
                        cellStr = '🟢';
                        cellElement.textContent = cellStr;
                    } else {
                        cellStr = '🔴';
                        cellElement.textContent = cellStr;
                    }
                    break
                case 'updated_at':
                    const updatedStr = new Date(cellText);
                    cellStr = updatedStr.toLocaleDateString();
                    cellElement.textContent = cellStr;
                    break
                case 'uploaded_at':
                    const uploadedStr = new Date(cellText);
                    cellStr = uploadedStr.toLocaleDateString();
                    cellElement.textContent = cellStr;
                    break
                default:
                    cellElement.textContent = cellText;
                    break;
            }
            rowElement.appendChild(cellElement);
        }

        tableBody.appendChild(rowElement);
    }
}

loadIntoTable(new URL(`http://192.168.1.239:5000/api/v1/website/`), document.querySelector('table'));

