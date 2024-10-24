const instructorForm = document.querySelector(".instructor-form");
const editInstructorForm = document.querySelector(".edit-instructor-form");
const editId = document.getElementById("intructor-id");
const editName = document.getElementById("edit-name");
const editCpf = document.getElementById("edit-cpf");
const editPhone = document.getElementById("edit-phone");
const editMail = document.getElementById("edit-mail");
const editAddress = document.getElementById("edit-address");
const editPix = document.getElementById("edit-pix");
const close = document.querySelector(".close");

pageReturn.value = "instructors"

mainContainer.addEventListener("click", function(e){
    if (e.target.tagName == "SECTION") {
        return;
    }
    editInstructorForm.classList.add("fade-in");
    instructor = instructorsDb[e.target.closest('.instructor-info').id - 1];

    if (extraContainer.style.transform == "rotateY(180deg)") {
        editInstructorForm.classList.remove("fade-in");
        setTimeout(() => {
            refreshInfo();
            editInstructorForm.classList.add("fade-in");
        }, 300);
    } else {
        refreshInfo();
    }
    extraContainer.style.transform = "rotateY(180deg)";

    document.querySelector(".extra-container").style.transform = "rotateY(180deg)";

    extraContainer.scrollIntoView({ behavior: 'smooth' });

});

const refreshInfo = function() {
    editId.value = instructor["id"];
    deleteId.value = editId.value
    editName.value = instructor["name"];
    editCpf.value = instructor["cpf"];
    editPhone.value = instructor["phone"];
    editMail.value = instructor["mail"];
    editAddress.value = instructor["address"];
    editPix.value = instructor["pix"];
}


close.addEventListener("click", function(e) {
    document.querySelector(".extra-container").style.transform = "rotateY(0deg)";
})

formDeleteBtn.addEventListener('click', function(e) {
    deleteId.value = editId.value;
})
