import { editForm } from "../Js/updateUser.js";
import { confirm } from "../Js/deleteUser.js";

document.addEventListener("DOMContentLoaded", getData, false);

async function getData() {
  let label = document.querySelector("#labels");
  let resp = await fetch("http://127.0.0.1:3000/users");
  let data = await resp.json();
  let result = "";
  data.forEach((m) => {
    result += `
      <div class="member-label" id="member-label-${m.id}">
        <div>
          <p>${m.firstName}&nbsp;${m.lastName}</p>
          <p>${m.id}</p>
          <p>${m.address.country}</p>
        </div>
        <div  class = "circle"><span>D</span></div>
        <button 
          class = "delete-member" 
          type="delete" id = "${m.id}">Delete
        </button>
        <button class = "edit-member" type="edit" id ="${m.id}">Edit</button>
        </div>
      </div>
      `;
  });
  label.innerHTML = result;
  confirm();
  editForm();
}
