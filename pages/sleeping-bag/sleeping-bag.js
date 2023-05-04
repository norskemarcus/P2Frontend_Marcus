import { sendInfoBetweenSites } from "../users-modal/users-modal.js";

export function initSleepingbag() {

   const submitBtn = document.getElementById('submit-info')
   submitBtn.addEventListener('click', function() {
    
    const tripTemp = document.getElementById('temp-value')?.textContent
    const trip = {tripTemp}
    sendInfoBetweenSites(trip)
   })

  document.getElementById('temp')?.addEventListener('input', function() {
  const temp = document.getElementById('temp-value')
  temp.textContent = this.value

     });
}



