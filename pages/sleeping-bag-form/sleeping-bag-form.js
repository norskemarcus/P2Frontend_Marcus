import { sendInfoBetweenSites } from "../sleeping-bag-result/sleeping-bag-result.js";

export function initSleepingBagForm() {
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
        ? "fiber"
        : "dun";
    trip.innerMaterial = innerMaterial;
  } catch (error) {}

  try {
    const personHeight = document.getElementById("height").value;

    if (personHeight?.length !== 0) {
      trip.personHeight = personHeight;
    }
  } catch (error) {}

  alert(JSON.stringify(trip));

  sendInfoBetweenSites(trip);
}

function adjustTempValue() {
  const temp = document.getElementById("temp-value");
  temp.textContent = this.value;
}

function adjustPriceValue() {
  const price = document.getElementById("price-value");
  price.textContent = this.value;
}
