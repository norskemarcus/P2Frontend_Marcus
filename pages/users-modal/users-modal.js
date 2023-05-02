const URL = "https://jsonplaceholder.typicode.com/users/"
import { sanitizeStringWithTableRows } from "../../utils.js"


export function initUsersModal() {
  document.getElementById("tbl-body").onclick = showUserDetails
  getAllUsers()
}

export async function getAllUsers() {
  try {
    const usersFromServer = await fetch(URL).then(res => res.json())
    showAllData(usersFromServer)
  }
  catch (err) {
    console.error("UPPPPPS: " + err) //This can be done better - do it
  }
}

function showAllData(data) {
  const tableRowsArray = data.map(user => `
  <div class="card m-3" style="width:400px">
  <div class="card-body">
    <h4 class="card-title">${user.name}</h4>
    <p class="card-text">${user.address.street}.</p>
    <a href="#" class="btn btn-primary">See Profile</a>
  </div>
  </div>

  `)


  const tableRowsString = tableRowsArray.join("\n")
  document.getElementById("tbl-body").innerHTML = sanitizeStringWithTableRows(tableRowsString)

  
}

async function showUserDetails(evt) {
  const target = evt.target
  if (!target.id.startsWith("row-btn_")) {
    return
  }
  
  const parts = target.id.split("_");
  const id = parts[2]
  const btnAction = parts[1]
    if (btnAction === "details") {
      alert("Here you can Add an option to view details for user with id: " + id )
      
    } 
    else 
    if (btnAction === "delete")  {
        alert("Here you can DELETE user with id: " + id )
    }
    
}
