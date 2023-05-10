import {
  handleHttpErrors,
  sanitizeStringWithTableRows,
  setStatusMsg,
  makeOptions,
} from "../../utils.js";

const URL = "http://localhost:8080/api/sleeping-bags";

let sleepingBags;

export function initSleepingBags() {
  document
    .getElementById("submit-info")
    ?.addEventListener("click", sleepingBagFormSend);
  document.getElementById("temp")?.addEventListener("input", adjustTempValue);
  document.getElementById("price")?.addEventListener("input", adjustPriceValue);
}


function sleepingBagFormSend() {
  const trip = {};
  
  try {
    const environmentTemperatureMin =
      document.getElementById("temp-value")?.textContent;

    if (environmentTemperatureMin?.length !== 0) {
      trip.environmentTemperatureMin = environmentTemperatureMin;
    }
  } catch (error) {}

  try {
    const maxCost = document.getElementById("price-value")?.textContent;

    if (maxCost?.length !== 0) {
      trip.maxCost = maxCost;
    }
  } catch (error) {}

  try {
    const isFemale =
      document.querySelector('input[name="gender"]:checked').value === "female"
        ? "true"
        : "false";
    trip.isFemale = isFemale;
  } catch (error) {}

  try {
    const isColdSensitive =
      document.querySelector('input[name="cold"]:checked').value === "true"
        ? "true"
        : "false";
    trip.isColdSensitive = isColdSensitive;
  } catch (error) {}

  try {
    const innerMaterial =
      document.querySelector('input[name="fill"]:checked').value === "fiber"
        ? "Fiber"
        : "Dun";
    trip.innerMaterial = innerMaterial;
  } catch (error) {}

  try {
    const personHeight = document.getElementById("height").value;

    if (personHeight?.length !== 0) {
      trip.personHeight = personHeight;
    }
  } catch (error) {}

  fetchFilteredSleepingBags(trip)
}

function adjustTempValue() {
  const temp = document.getElementById("temp-value");
  temp.textContent = this.value;
}

function adjustPriceValue() {
  const price = document.getElementById("price-value");
  price.textContent = this.value;
}

function showMultipleSleepingBags() {
  const tableRowsArray = sleepingBags.map(
    (sleepingBag) => `
  <div class="card m-2 col">
    <img class="card-img-top" src="https://www.fotoagent.dk/single_picture/12535/138/large/389010021.jpg" alt="Image" style="width:200px">
    <div class="card-body">
      <h6 class="card-title">${sleepingBag.model}</h6>
      <p class="card-text">${sleepingBag.brand}</p>
      <p class="card-text">Pris: ${sleepingBag.cost}</p>

      <button type="button" class="btn btn-sm btn-primary" 
      data-sku="${sleepingBag.sku}"
      data-action="details"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal">Details</button> 
      
    </div>
  </div>
  `
  );

  document.getElementById("sleeping-bags-result").onclick = showSleepingBagDetails;

  const tableRowsString = tableRowsArray.join("\n");
  document.getElementById("sleeping-bags-result").innerHTML =
    sanitizeStringWithTableRows(tableRowsString);
}

async function showSleepingBagDetails(event) {
  const target = event.target;
  if (target.dataset.action == "details") {
      const sku = target.dataset.sku;
      const sleepingBag = sleepingBags.find(element => element.sku == sku);

      // bootstrap 5 modal
      document.querySelector("#exampleModalLabel").innerText =
        "Information om sovepose " + sleepingBag.sku;

      document.querySelector("#modal-body").innerText = `
      Mærke: ${sleepingBag.brand}
      Produktnavn: ${sleepingBag.model}
      Pris: ${sleepingBag.cost}
      Personlængde: ${sleepingBag.personHeight}
      Komforttemp.(°C): ${sleepingBag.comfortTemp}
      Lower limit. (°C): ${sleepingBag.lowerLimitTemp}
      Fyld: ${sleepingBag.innerMaterial}
      Vægt (g): ${sleepingBag.productWeight}
      Lagerstatus: ${sleepingBag.stockLocation}
      Varenr: ${sleepingBag.sku}
      `;

      // Generate link to the sleepingbag at Friluftslands homepage
      const link = generateLink(sleepingBag.sku);
      document.querySelector("#modal-link").innerHTML = link;  
  }
}

function generateLink(sku) {
  return `<a href="https://www.friluftsland.dk/msearch?q=${sku}" target="_blank">Link</a>`;
}

async function fetchFilteredSleepingBags(tripObj) {
  //TODO: change to true when security is added
  const options = makeOptions("POST", tripObj, false);

  try {
    const filteredResult = await fetch(URL, options).then(handleHttpErrors);
    sleepingBags = filteredResult;
    showMultipleSleepingBags();
  } catch (err) {
    // setStatusMsg("Error", true);
  }
}
