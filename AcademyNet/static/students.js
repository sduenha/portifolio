const studentForm = document.querySelector(".students-form");
const editStudentForm = document.querySelector(".edit-students-form");
const editId = document.getElementById("student-id");
const editName = document.getElementById("edit-name");
const editCpf = document.getElementById("edit-cpf");
const editPhone = document.getElementById("edit-phone");
const editMail = document.getElementById("edit-mail");
const editAddress = document.getElementById("edit-address");
const editParent = document.getElementById("edit-parent");
const close = document.querySelector(".close");

pageReturn.value = "students";



mainContainer.addEventListener("click", function(e){
    if (e.target.tagName == "SECTION") {
        return;
    }
    editStudentForm.classList.add("fade-in");

    student = studentsDb[e.target.closest('.student-info').id - 1];

    if (extraContainer.style.transform == "rotateY(180deg)") {
        editStudentForm.classList.remove("fade-in");
        setTimeout(() => {
            refreshInfo();
            editStudentForm.classList.add("fade-in");
        }, 300);
    } else {
        refreshInfo();
    }
    extraContainer.style.transform = "rotateY(180deg)";

    extraContainer.scrollIntoView({ behavior: 'smooth' });
});

close.addEventListener("click", function(e) {
    extraContainer.style.transform = "rotateY(0deg)";
})

formDeleteBtn.addEventListener('click', function(e) {
    deleteId.value = editId.value;
})

const refreshInfo = function() {
    editId.value = student["id"];
    editName.value = student["name"];
    editCpf.value = student["cpf"];
    editPhone.value = student["phone"];
    editMail.value = student["mail"];
    editAddress.value = student["address"];
    editParent.value = student["parent"];
}
