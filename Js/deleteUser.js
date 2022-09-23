export function confirm() {
  const deleteBtn = document.querySelector(".delete-member");
  deleteBtn.addEventListener("click", () => {
    Confirm.open({
      title: "Delete member",
      message: "Are you sure you want to delete member?",
      onok: () => {
        deleteData();
      },
    });
  });

  const Confirm = {
    open(options) {
      options = Object.assign(
        {},
        {
          title: "",
          message: "",
          okText: "OK",
          cancelText: "No",
          onok: function () {},
          oncancel: function () {}, //location.reload(),
        },
        options
      );

      const html = `
        <div class="confirm">
        <div class="confirm__window">
        <div class="confirm__titlebar">
        <span class="confirm__title">${options.title}</span>
        </div>
        <div class="confirm__content">${options.message}</div>
        <div class="confirm__buttons">
        <button class="confirm__button confirm__button--ok confirm__button--fill">${options.okText}</button>
        <button class="confirm__button confirm__button--cancel">${options.cancelText}</button>
        </div>
        </div>
        </div>
        `;

      const template = document.createElement("template");
      template.innerHTML = html;

      const confirmEl = template.content.querySelector(".confirm");
      const btnOk = template.content.querySelector(".confirm__button--ok");
      const btnCancel = template.content.querySelector(".confirm__button--cancel");

      confirmEl.addEventListener("click", (e) => {
        if (e.target === confirmEl) {
          options.oncancel();
          this._close(confirmEl);
        }
      });

      btnOk.addEventListener("click", function deleteData() {
        const deleteBtn = document.querySelector(".delete-member");

        fetch("http://127.0.0.1:3000/users/" + deleteBtn.id, {
          method: "DELETE",
        })
          .then(document.getElementById(`member-label-${deleteBtn.id}`).remove())
          .then(location.reload());
      });

      btnCancel.addEventListener("click", () => {
        options.oncancel();
        this._close(confirmEl);
      });

      document.body.appendChild(template.content);
    },

    _close(confirmEl) {
      confirmEl.classList.add("confirm--close");

      confirmEl.addEventListener("animationend", () => {
        document.body.removeChild(confirmEl);
      });
    },
  };
}
