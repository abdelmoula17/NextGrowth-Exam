var users = [
  {
    id: "123456789",
    createdDate: "2021-01-06T00:00:00.000Z",
    status: "En validation",
    firstName: "Mohamed",
    lastName: "Taha",
    userName: "mtaha",
    registrationNumber: "2584",
  },
  {
    id: "987654321",
    createdDate: "2021-07-25T00:00:00.000Z",
    status: "Validé",
    firstName: "Hamid",
    lastName: "Orrich",
    userName: "horrich",
    registrationNumber: "1594",
  },
  {
    id: "852963741",
    createdDate: "2021-09-15T00:00:00.000Z",
    status: "Rejeté",
    firstName: "Rachid",
    lastName: "Mahidi",
    userName: "rmahidi",
    registrationNumber: "3576",
  },
];

var tbdoy = document.getElementsByTagName("tbody");
var addButton = document.getElementById("addUser");
var closeButton = document.getElementById("close");
var modal = document.getElementsByClassName("modalContainer");
var form = document.getElementById("ajoutProduit");
var submit = document.getElementById("enregistrer");
const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};
const handleDelete = (i) => {
  console.log(i);
  users.splice(i, 1); // remove one element from the specific index
  tableState(users);
  console.log("removed");
};
const statusColor = {
  valide: "#FDB64D",
  rejected: "#FF0000",
  onValidation: "#5BE881",
};

// handle modal functions
submit.onclick = (event) => {
  event.preventDefault();
  if (!isEmpty(form) && validateDate(form.elements["createdDate"])) {
    let createdAt = form.elements["createdDate"].value;
    let firstName = form.elements["firstName"].value;
    let lastName = form.elements["lastName"].value;
    let userName = form.elements["userName"].value;
    let registrationNumber = form.elements["registrationNumber"].value;
    let status = form.elements["status"].value;
    users.push({
      id: getRandomInt(1000000), // random number between 0 and 1000000
      createdDate: new Date(createdAt).toUTCString(),
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      registrationNumber: registrationNumber,
      status: status,
    });
    tableState(users);
    modal[0].style.display = "none";
  }
};

closeButton.onclick = () => {
  modal[0].style.display = "none";
};
addButton.onclick = () => {
  modal[0].style.display = "block";
};

const closeModal = (event) => {
  if (event.target == modal[0]) {
    modal[0].style.display = "none";
  }
};
window.onclick = (event) => closeModal(event);

// end handle modal functions

// render Ui
const tableState = (users) => {
  var tr = "";

  users.map((user, i) => {
    tr +=
      "<tr><td data-label='ID'>" +
      user.id +
      "</td><td data-label='Date de creation'>" +
      new Date(user.createdDate).toLocaleString().split(",")[0] +
      `</td><td  data-label="Etat"><span style="font-weight:small;background-color:${
        user.status === "En validation"
          ? statusColor.valide
          : user.status === "Validé"
          ? statusColor.onValidation
          : user.status === "Rejeté"
          ? statusColor.rejected
          : ""
      }">` +
      user.status +
      "</span></td><td  data-label='Prénom'>" +
      user.firstName +
      "</td><td data-label='Nom'>" +
      user.lastName +
      `</td><td data-label='Nom Utilisateur'>` +
      user.userName +
      "</td><td data-label='Matricule'>" +
      user.registrationNumber +
      "</td><td data-label='Action'>" +
      `<button onClick="handleDelete(${i})"  style="background-color:white"><img src='./icons/trash.png' width="16" height="16"/></button>` +
      "</td></tr>";
  });
  tbdoy[0].innerHTML = tr;
};
tableState(users);
// end Render Ui

// input validation functions
const validateDate = (date) => {
  const regex = /^(0?[1-9]|1[012])[\-](0?[1-9]|[12][0-9]|3[01])[\-]\d{4}$/g;
  var found = date?.value.match(regex);
  date.style.borderColor = "red";
  date.parentNode.querySelector("small").innerText = "Format incorrecte!";
  console.log(found);
  return found === null ? false : true;
};
const isEmpty = (form) => {
  let createdAt = form.elements["createdDate"];
  let firstName = form.elements["firstName"];
  let lastName = form.elements["lastName"];
  let userName = form.elements["userName"];
  let registrationNumber = form.elements["registrationNumber"];
  let status = form.elements["status"];
  var empty = 0;
  [createdAt, firstName, lastName, userName, registrationNumber, status].map(
    (item) => {
      if (item.value.trim() === "") {
        empty++;
        item.style.borderColor = "red";
        item.parentNode.querySelector("small").innerText = "champs requis";
      }
    }
  );
  return empty === 0 ? false : true;
};
// end input validation
