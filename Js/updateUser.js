export function editForm() {
  const editBtn = document.querySelectorAll(".edit-member");

  editBtn.forEach(function (e) {
    e.addEventListener("click", function () {
      fetch("http://127.0.0.1:3000/users/" + this.id, { method: "get" })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          document.getElementById("u-id").value = data.id;
          document.getElementById("u-fname").value = data.firstName;
          document.getElementById("u-lname").value = data.lastName;
          document.getElementById("u-address").value = data.address.streetAndNumber;
          document.getElementById("u-zcode").value = data.address.postalCode;
          document.getElementById("u-city").value = data.address.city;
          document.getElementById("u-country").value = data.address.country;
          document.getElementById("u-input7").value = data.gender;
          document.getElementById("u-age").value = data.age;
          let acl = document.querySelectorAll('input[class="u-activityClass"]');
          acl.forEach((radiobox) => {
            if (data.activity_class === radiobox.value) {
              radiobox.checked = true;
            }
          });
          let sports = document.querySelectorAll('input[class="sports"]');
          sports.forEach((checkbox) => {
            data.sports.forEach((m) => {
              if (m == checkbox.value) {
                checkbox.checked = true;
              }
            });
          });
        })

        .then(updateMember);
    });
  });
}

function updateMember() {
  const updateForm = document.getElementById("edit");
  const updateBtn = document.querySelectorAll(".update-member");

  updateBtn.forEach(function (e) {
    e.addEventListener("click", function (e) {
      e.preventDefault();
      const formData = new FormData(updateForm);
      let newDataArr = [...formData];
      let checkboxes = document.querySelectorAll('input[name="sports"]:checked');
      let sports = [];
      checkboxes.forEach((checkbox) => {
        sports.push(checkbox.value);
      });

      fetch("http://127.0.0.1:3000/users/" + newDataArr[2][1], {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: newDataArr[2][1],
          firstName: newDataArr[0][1],
          lastName: newDataArr[1][1],
          address: {
            streetAndNumber: newDataArr[3][1],
            postalCode: newDataArr[4][1],
            city: newDataArr[5][1],
            country: newDataArr[6][1],
          },
          sports: sports,
          gender: newDataArr[7][1],
          age: newDataArr[8][1],
          activity_class: newDataArr[9][1],
        }),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (text) {
          console.log(text);
        })
        .catch(function (error) {
          showToastUpdate();
        })
        .then(location.reload());
    });
  });
}

function showToastUpdate() {
  var x = document.getElementById("toast-update");

  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 5000);
}
