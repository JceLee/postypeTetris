export default class GameOverModal {
  constructor() {
    this.isVisible = false;
    this.modalWrapper = document.createElement("div");
    this.modalWrapper.className = "modal-wrapper";
    this.modalWrapper.classList.add("hidden");
    document.querySelector("#app").appendChild(this.modalWrapper);

    this.render();
  }

  toggleModal() {
    this.isVisible = !this.isVisible;
    const modal = document.querySelector(".modal-wrapper");
    modal.classList.toggle("hidden");
  }

  showModal(data) {
    this.toggleModal();
    this.render();
  }

  onClose() {
    this.toggleModal();
    this.modalWrapper.innerHTML = "";
  }

  render() {
    if (!this.isVisible) return;
    const overlay = document.createElement("div");
    overlay.className = "overlay";

    const modalContents = document.createElement("section");
    modalContents.className = "modal-contents";

    const modalTitle = document.createElement("p");
    modalTitle.className = "modal-title";
    modalTitle.innerText = "GameOver";

    overlay.addEventListener("click", () => {
      this.onClose();
    });

    modalContents.appendChild(modalTitle);
    this.modalWrapper.appendChild(overlay);
    this.modalWrapper.appendChild(modalContents);
  }
}
