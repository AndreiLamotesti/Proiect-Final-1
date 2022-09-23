const addForm = document.getElementById("add");

addForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(addForm);
  let dataArr = [...formData];

  let checkboxes = document.querySelectorAll('input[name="sports"]:checked');
  let sports = [];
  checkboxes.forEach((checkbox) => {
    sports.push(checkbox.value);
  });
  console.log(sports);

  fetch("http://127.0.0.1:3000/users", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: dataArr[0][1],
      lastName: dataArr[1][1],
      address: {
        streetAndNumber: dataArr[2][1],
        postalCode: dataArr[3][1],
        city: dataArr[4][1],
        country: dataArr[5][1],
      },
      sports: sports,
      gender: dataArr[6][1],
      age: dataArr[7][1],
      activity_class: dataArr[8][1],
    }),
  })
    .then((res) => {
      if (res) {
        showToast();
      }
    })
    .then(function (response) {
      return response.json();
    })
    .catch((error) => console.log(error))
    .then(
      setTimeout(function () {
        window.location.reload();
      }, 4000)
    );
});

function showToast() {
  var x = document.getElementById("toast-save");

  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 5000);
}
