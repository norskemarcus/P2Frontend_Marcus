import "https://unpkg.com/navigo"; //Will create the global Navigo object used below
import "https://cdnjs.cloudflare.com/ajax/libs/dompurify/2.4.0/purify.min.js";

import {
  setActiveLink,
  adjustForMissingHash,
  renderTemplate,
  loadTemplate,
} from "./utils.js";

import { initUsersModal } from "./pages/users-modal/users-modal.js";
import { initSleepingbag } from "./pages/sleeping-bag/sleeping-bag.js";

window.addEventListener("load", async () => {
  const templateUsersModal = await loadTemplate(
    "./pages/users-modal/users-modal.html"
  );
  const templateSleepingbag = await loadTemplate(
    "./pages/sleeping-bag/sleeping-bag.html"
  );
  const templateNotFound = await loadTemplate("./pages/notFound/notFound.html");

  adjustForMissingHash();

  const router = new Navigo("/", { hash: true });
  //Not especially nice, BUT MEANT to simplify things. Make the router global so it can be accessed from all js-files
  window.router = router;

  router
    .hooks({
      before(done, match) {
        setActiveLink("menu", match.url);
        done();
      },
    })
    .on({
      //For very simple "templates", you can just insert your HTML directly like below
      "/": () =>
        (document.getElementById("content").innerHTML = `<h2>Home</h2>
      <p style='margin-top:2em'>
      This is the content of the Home Route <br/>
      Observe that this is so simple that all HTML is added in the on-handler for the route. 
      </p>
     `),
      "/users-modal": () => {
        renderTemplate(templateUsersModal, "content");
        initUsersModal();
      },

      "/sleeping-bag": () => {
        renderTemplate(templateSleepingbag, "content");
        initSleepingbag();
      },
    })
    .notFound(() => {
      renderTemplate(templateNotFound, "content");
    })
    .resolve();
});

window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
  alert(
    "Error: " +
      errorMsg +
      " Script: " +
      url +
      " Line: " +
      lineNumber +
      " Column: " +
      column +
      " StackTrace: " +
      errorObj
  );
};
