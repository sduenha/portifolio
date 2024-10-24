const mainContainer = document.querySelector(".main-container");
const formDeleteBtn = document.querySelector(".delete-btn");
const modal = document.querySelector(".modal");
const closeModalX = document.querySelector(".cancel-x");
const cancelBtnModal = document.querySelector(".cancel-btn-modal");
const pageReturn = document.querySelector("#page-return");
const deleteId = document.querySelector("#delete-id");
const extraContainer = document.querySelector(".extra-container");

if(mainContainer) {


if(mainContainer.children[0]) {
    if (mainContainer.children[0].tagName == "H1") {
        mainContainer.style.alignContent = "center";
    }
}
}

if (formDeleteBtn){
    formDeleteBtn.addEventListener('click', function(e) {
        e.preventDefault();
        modal.classList.remove("hidden");
    })
}

modal.addEventListener("click", function(e) {
    if (e.target.classList[0] == "cancel-x") {
        modal.classList.add("hidden");
    }
})

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      modal.classList.add("hidden");
    }
});

cancelBtnModal.addEventListener("click", function(e) {
    e.preventDefault();
    modal.classList.add("hidden");
})
