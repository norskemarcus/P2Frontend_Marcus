import { sendInfoBetweenSites } from "../sleeping-bag-result/sleeping-bag-result.js";

export function initSleepingBagForm() {
  const submitBtn = document.getElementById("submit-info");
  submitBtn.addEventListener("click", function () {
    const tripTemp = document.getElementById("temp-value")?.textContent;
    const trip = { tripTemp };
    sendInfoBetweenSites(trip);
  });

  document.getElementById("temp")?.addEventListener("input", function () {
    const temp = document.getElementById("temp-value");
    temp.textContent = this.value;
    
  });
}
