import {
  handleHttpErrors,
  sanitizeStringWithTableRows,
  setStatusMsg,
  makeOptions,
} from "../../utils.js";

export function initMember() {
  // husk eventlistener her

  document
    .getElementById("member")
    ?.addEventListener("input", findMemberByUsername);
}

function findMemberByUsername() {}
