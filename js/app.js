//selectors
const appointmentListInfo = document.getElementById("app_List");
const appointment = document.getElementById("appointment");
const saveAppointment = document.getElementById("save_btn");

//events or listeners

saveAppointment.addEventListener("click", (event) => {
  event.preventDefault();
  printAppointment();
});

let cites = [];

//functions
function printAppointment() {
  const petName = document.getElementById("name_pet");
  const ownerName = document.getElementById("name_owner");
  const phone = document.getElementById("phone");
  const dateAppointment = document.getElementById("date_appointment");
  const timeAppointment = document.getElementById("time_appointment");
  const description = document.getElementById("description");

  let cita = {
    petName: "",
    ownerName: "",
    phone: "",
    dateAppointment: "",
    timeAppointment: "",
    description: "",
  };

  cita.petName = petName.value;
  cita.ownerName = ownerName.value;
  cita.phone = phone.value;
  cita.dateAppointment = dateAppointment.value;
  cita.timeAppointment = timeAppointment.value;
  cita.description = description.value;

  cites.unshift(cita);

  localStorage.setItem("citasVeterinaria", JSON.stringify(cites));

  appointmentList();
  appointmentListInfo.addEventListener("click", (event) => {
    selectCite(event.target.textContent);
  });
}

function appointmentList() {
  appointmentListInfo.innerHTML = "";
  cites.forEach((appointment) => {
    appointmentListInfo.innerHTML += ` <li><a class="dropdown-item" id="appointment">${appointment["ownerName"]}</a></li>`;
  });
}

function selectCite(ownerPet) {
  const namePetText = document.createElement("h5");
  const ownerNameText = document.createElement("h5");
  const ownerPhoneText = document.createElement("h5");
  const dateAppointmentText = document.createElement("h5");
  const timeAppointmentText = document.createElement("h5");
  const descriptionText = document.createElement("h5");

  const appointmentContainer = document.querySelector(".appointment_container");

  appointmentContainer.textContent = "";

  cites.forEach((cita) => {
    if (cita.ownerName == ownerPet) {
      namePetText.textContent = `Pet name: ${cita.petName}`;
      ownerNameText.textContent = `Pet owner: ${cita.ownerName}`;
      ownerPhoneText.textContent = `Pet owner phone: ${cita.phone}`;
      dateAppointmentText.textContent = `Date appointment: ${cita.dateAppointment}`;
      timeAppointmentText.textContent = `Time appointment: ${cita.timeAppointment}`;
      descriptionText.textContent = `Description: ${cita.description}`;

      appointmentContainer.appendChild(namePetText);
      appointmentContainer.appendChild(ownerNameText);
      appointmentContainer.appendChild(ownerPhoneText);
      appointmentContainer.appendChild(dateAppointmentText);
      appointmentContainer.appendChild(timeAppointmentText);
      appointmentContainer.appendChild(descriptionText);

      //edit appointment

      const editAppointmentBtn = document.createElement("button");
      editAppointmentBtn.textContent = "Edit";
      editAppointmentBtn.classList.add("btn", "btn-warning", "w-40");
      editAppointmentBtn.id = "editAppointmentBtn";
      editAppointmentBtn.addEventListener("click", () => editAppointment(cita));

      //delete appointment

      const deleteAppointmentBtn = document.createElement("button");
      deleteAppointmentBtn.textContent = "Delete";
      deleteAppointmentBtn.classList.add("btn", "btn-danger", "w-40");
      deleteAppointmentBtn.id = "deleteAppointmentBtn";

      deleteAppointmentBtn.addEventListener("click", () => {
        deleteAppointment(cita);
        appointmentContainer.textContent = "";
        buttonZone.textContent = "";
      });

      //appendchild buttons (delete - edit)

      const buttonZone = document.querySelector(".button_zone");
      buttonZone.textContent = "";
      buttonZone.appendChild(editAppointmentBtn);
      buttonZone.appendChild(deleteAppointmentBtn);
    }
  });
}

function editAppointment(cita) {
  const petNameInput = document.getElementById("name_pet");
  const ownerNameInput = document.getElementById("name_owner");
  const phoneInput = document.getElementById("phone");
  const dateAppointmentInput = document.getElementById("date_appointment");
  const timeAppointmentInput = document.getElementById("time_appointment");
  const descriptionInput = document.getElementById("description");

  petNameInput.value = cita.petName;
  ownerNameInput.value = cita.ownerName;
  phoneInput.value = cita.phone;
  dateAppointmentInput.value = cita.dateAppointment;
  timeAppointmentInput.value = cita.timeAppointment;
  descriptionInput.value = cita.description;

  const saveButton = document.getElementById("save_btn");
  saveButton.textContent = "Save Changes";
  saveButton.removeEventListener("click", printAppointment);
  saveButton.addEventListener("click", () => saveChanges(cita));
}

function deleteAppointment(cita) {
  const index = cites.indexOf(cita);
  if (index !== -1) {
    cites.splice(index, 1);
    appointmentList();
    document.getElementById("name_pet").value = "";
    document.getElementById("name_owner").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("date_appointment").value = "";
    document.getElementById("time_appointment").value = "";
    document.getElementById("description").value = "";
    alert("Appointment Deleted");
  }
}
