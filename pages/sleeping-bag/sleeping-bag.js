export function initSleepingbag() {
  document.getElementById("temp")?.addEventListener("input", function () {
    let temp = document.getElementById("temp-value");
    temp.textContent = this.value;
  });
}
