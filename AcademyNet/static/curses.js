const select = document.querySelector(".form-select");
const form = document.querySelector(".curse-name");
const registerContainer = document.querySelector(".register-container");
const instructorId = document.querySelector("#instructor-id");

const infoClose = document.querySelector("#close");
const infoCurseName = document.querySelector(".info-curse-name");
const infoInstructorName = document.querySelector("#info-instructor-name");
const infoMaxStudents = document.querySelector(".info-max-students");
const infoNumStudents = document.querySelector(".info-num-students");
const infoTime = document.querySelector(".info-time");
const infoDays = document.querySelector(".info-days");
const infoInputDays = document.querySelectorAll("input.day");
const infoInputId = document.querySelector("#info-curse-id");

const btnAddStudents = document.querySelector("#btn-add-students");
const studentsContainer = document.querySelector(".add-students-container");
const studentsContainerSelect = document.querySelector(".students-container-select");

const infoOptionInstructorName = document.getElementsByName("info-instructor-name")[0].getElementsByTagName("option");

const inputSearch = document.querySelector("#search");
const studentsSearchContainer = document.querySelector(".students-container");
const addStudentsContainer = document.querySelector(".add-students-container");
const infoForm = document.querySelector(".info-form");

const closesBtn = document.querySelectorAll(".close");

pageReturn.value = "curses"

let curseId = 0;
let curseNumber = 0;
let maxStudents = 0;
let numStudents = 0;

let studentRemove;

mainContainer.addEventListener("click", function(e){
    addStudentsContainer.classList.remove("show-in");
    infoForm.classList.remove("show-out");

    if (e.target.tagName == "SECTION") {
        return;
    }

    if (document.querySelector(".curse-info-selected")) {
        document.querySelector(".curse-info-selected").classList.remove("curse-info-selected");
    }
    e.target.closest('.curse-info').classList.add("curse-info-selected");

    curseNumber = e.target.closest('.curse-info').id - 1;
    curse = cursesDb[curseNumber];
    curseInfo = Object.keys(curse);
    curseId = curse["id"];

    for (i = 0; i < infoOptionInstructorName.length; i++) {
        if (infoOptionInstructorName[i].id == curse["instructor_id"]) {
            infoOptionInstructorName[i].selected = 'selected';
        }
    }

    infoInputId.value = curse.id;

    if (e.target.tagName != "SECTION") {
        for (i = 0; i < 7; i++) {
            infoInputDays[i].checked = false;
            infoInputDays[i].nextElementSibling.classList.remove("day-select");
        }

        infoForm.classList.add("fade-in");
        extraContainer.style.transform = "rotateY(180deg)";

        if (extraContainer.style.transform == "rotateY(180deg)") {
            infoForm.classList.remove("fade-in");
            setTimeout(() => {
                infoForm.classList.add("fade-in");
            }, 300);
        }

        days = curse[curseInfo[1]].split(",");

        for (i = 0; i < days.length; i++) {
            for (j = 0; j < infoInputDays.length; j++) {
                if (days[i].replace(/[^a-zA-Z]/g, '') == infoInputDays[j].value) {
                    infoInputDays[j].checked = true;
                    infoInputDays[j].nextElementSibling.classList.add("day-select");
                    break;
                }
            }
        }

        infoCurseName.value = curse[curseInfo[0]];
        infoMaxStudents.value = curse[curseInfo[4]];
        maxStudents = curse[curseInfo[4]]
        getNumStudents();
        setTimeout(() => {
            numStudents = document.querySelector("#info-num-students").innerHTML.split(":")[1];
        }, 500)

        infoTime.value = curse[curseInfo[7]];

        studentsContainerSelect.replaceChildren();
        getStudents();
        async function getStudents() {
            let response = await fetch("/get_students_in_curse?q=" + curseId);
            let data = await response.json();
            data = data["students"]
            if (!data && studentsContainerSelect.children.length == 0) {
                let studentContainer = document.createElement("div");
                let student = document.createElement("p");
                student.innerHTML = "Sem alunos cadastrados no curso";
                studentContainer.appendChild(student);
                studentsContainerSelect.appendChild(studentContainer);
            } else {
                for (const student of data.split(", ")) {
                    let studentParagraph = document.createElement("p");
                    studentParagraph.innerHTML = student;
                    studentParagraph.classList.add("student-paragraph");
                    studentsContainerSelect.appendChild(studentParagraph);
                }
            }
        }

    }

    extraContainer.scrollIntoView({ behavior: 'smooth' });
});

closesBtn[0].addEventListener('click', function(){
    infoForm.classList.add("fade-in");
    extraContainer.style.transform = "rotateY(0deg)";
    document.querySelector(".curse-info-selected").classList.remove("curse-info-selected");
    inputSearch.value = "";
    studentsSearchContainer.replaceChildren();
});

closesBtn[1].addEventListener('click', function() {
    addStudentsContainer.classList.remove("show-in");
    infoForm.classList.remove("show-out");
    getNumStudents();
})

select.addEventListener('change', function(e){
    if (this.value == "Novo") {
        select.classList.add("hidden");
        form.classList.remove("hidden");

        form.name = 'curse-name';
        select.name = '';
    }

});

document.querySelector(".days").addEventListener('click', function(e){
    if (e.target.tagName == "P"){
        e.target.classList.toggle("day-select");
    }
});

infoDays.addEventListener('click', function(e){
    if (e.target.tagName == "P"){
        e.target.classList.toggle("day-select");
    }
});

formDeleteBtn.addEventListener('click', function(e) {
    deleteId.value = infoInputId.value;
})

btnAddStudents.addEventListener('click', function(e) {
    e.preventDefault();
    addStudentsContainer.classList.add("show-in");
    infoForm.classList.add("show-out");
    inputSearch.value = "";
    studentsSearchContainer.replaceChildren();
})

studentsContainer.addEventListener('click', function(e) {
    if (e.target.tagName == "H2") {
        if (e.target.classList.contains("student-selected")) {
            async function removeStudents() {
                let response = await fetch("/remove_students?q=" + e.target.innerHTML + "-" + curseId);
                updateStudentsInCurse();
            }
            removeStudents();
            getNumStudents();
            e.target.classList.remove("student-selected");
        } else {
            async function addStudents() {
                let response = await fetch("/add_students?q=" + e.target.innerHTML + "-" + curseId);
                let data = await response.json();
                if (data["code"] == "Valid"){
                    updateStudentsInCurse();
                    getNumStudents();
                    e.target.classList.add("student-selected");
                } else {
                    const newElement = document.createElement('div');
                    newElement.className = 'temp';
                    newElement.textContent = 'Número máximo de alunos atingido!';

                    document.querySelector('.students-container').appendChild(newElement);

                    setTimeout(() => {
                        newElement.classList.add("appear");

                    }, 500)

                    setTimeout(() => {
                        newElement.classList.add("disappear");
                    }, 2500)

                    setTimeout(() => {
                        newElement.remove();
                    }, 3500);
                }
            }
            addStudents();
        }
    }
})

inputSearch.addEventListener("input", async function() {

    studentsInCurse = await getStudentsInCurse();

    let response = await fetch("/search_students?q=" + inputSearch.value + "-" + studentsInCurse);
    let students = await response.text();

    if (!students && !studentsContainer.children) {
        studentsSearchContainer.innerHTML = '<p>Nenhum estudente com este nome!</p>';
    } else if (inputSearch.value) {
        studentsSearchContainer.innerHTML = students;
    } else {
        studentsSearchContainer.innerHTML = "";
    }
});

async function updateStudentsInCurse() {
    let response = await fetch("/update_students_in_curse?q=" + curseId);
    let students = await response.text();

    studentsContainerSelect.innerHTML = students
}

async function getStudentsInCurse() {
    let response = await fetch("/return_students?q=" + curseId);
    let studentsInCurse = await response.json();
    return studentsInCurse;
};

async function getNumStudents() {
    let response = await fetch("/get_num_students_curse?q=" + curseId);
    const data = await response.json();
    infoNumStudents.innerHTML = "Número de Alunos: " + data["valor"];
    return data["valor"];
}
