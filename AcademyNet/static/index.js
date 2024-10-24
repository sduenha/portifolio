const timelineContainer = document.querySelector(".timeline-container");
let timelineSpace = document.createElement("div");
let timelineLabel = document.createElement("label");
let time = document.createElement("p");
let timelineLine = document.createElement("div");
let timelineEventContainer = document.createElement("div");
let timelineEvent = document.createElement("div");
let timelineEventInfo = document.createElement("p");
let eventTime;
let eventCount = 0;
let curseInfo = "";
let curseMaxStudents = "";
let curseNumStudents = "";

if (curses[0]) {
    curseInfo = Object.keys(curses[0]);
}

let lastTime;
let sameTime = 0;

for (i = 1; i <= 24; i++) {
    timelineSpace.classList.add("timeline-space");
    timelineSpace.setAttribute("id", i)
    timelineLabel.classList.add("timeline-label");
    timelineLine.classList.add("timeline-line");
    timelineEventContainer.classList.add("timeline-event-container");

    if (eventCount < curses.length) {
        while (curses[eventCount]['time'].split(":")[0] == i) {

            timelineEvent = document.createElement("div");
            timelineEvent.classList.add("timeline-event");
            timelineEventContainer.appendChild(timelineEvent);


            for (j = 0; j < curseInfo.length; j++){
                timelineEventInfo = document.createElement("p");
                timelineEventInfo.classList.add(curseInfo[j]);
                if (curseInfo[j] == "curse_name") {
                    timelineEventInfo.innerHTML = curses[eventCount][curseInfo[j]].split(" ")[0];
                    timelineEvent.appendChild(timelineEventInfo);
                } else if (curseInfo[j] == "time") {
                    timelineEvent.style.top = parseInt(curses[eventCount][curseInfo[j]].split(":")[1][0]) + "rem";
                    timelineEventInfo.innerHTML = curses[eventCount][curseInfo[j]];
                    timelineEvent.appendChild(timelineEventInfo);

                }else if (curseInfo[j] == "instructor_id"){
                    for (k = 0; k < instructorsDb.length; k++) {
                        if (instructorsDb[k]["id"] == curses[eventCount][curseInfo[j]]) {
                            timelineEventInfo.innerHTML = instructorsDb[k]["name"].split(" ")[0];
                            timelineEvent.appendChild(timelineEventInfo);
                            break;
                        }
                    }
                } else if (curseInfo[j] == "max_students")  {
                    curseMaxStudents = curses[eventCount][curseInfo[j]];
                } else if (curseInfo[j] == "num_students") {
                    curseNumStudents = curses[eventCount][curseInfo[j]];
                    timelineEventInfo.innerHTML = curseNumStudents + "/" + curseMaxStudents;
                    timelineEvent.appendChild(timelineEventInfo);
                }

            };

            if (lastTime == curses[eventCount]['time']) {
                sameTime ++;
                timelineEvent.style.left = (sameTime * 6) + (2 * sameTime) + "rem";
            }

            lastTime = curses[eventCount]['time'];
            eventCount ++;

            if (eventCount >= curses.length) {
                break;
            };
        };
    };



    time.innerHTML = i.toString().padStart(2, "0") + ":00";

    timelineLabel.appendChild(time);
    timelineSpace.appendChild(timelineLabel);
    timelineSpace.appendChild(timelineLine);
    timelineSpace.appendChild(timelineEventContainer);
    timelineContainer.appendChild(timelineSpace);



    timelineLine.style.gridColumn = "2 / -1";
    timelineLine.style.gridRow = 1;

    timelineEventContainer.style.gridColumn = "2 / -1";
    timelineEventContainer.style.gridRow = 1;

    timelineSpace = document.createElement("div");
    timelineLabel = document.createElement("label");
    time = document.createElement("p");
    timelineLine = document.createElement("div");
    timelineEventContainer = document.createElement("div");
};

let lines = document.querySelectorAll(".timeline-line");
let rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
let widthLines = ((sameTime + 1) * 6) + (2 * (sameTime + 1));
if (widthLines * rem > mainContainer.offsetWidth) {
    for (let i = 0; i < lines.length; i ++) {
        lines[i].style.width = ((sameTime + 1) * 6) + (2 * (sameTime + 1)) + "rem";
    }
}

let element;
timelineContainer.addEventListener('click', function(e){
    if (document.querySelector(".front-element")) {
        document.querySelector(".front-element").classList.remove("front-element");
    }
    if (e.target.classList[0] == "timeline-event") {
        element = e.target;
    } else if (e.target.parentNode.classList[0] == "timeline-event") {
        element = e.target.parentNode;
    }
    if (element) {
        element.classList.add("front-element");
    }
})

time = parseInt(document.querySelector(".timeline-event").children[3].innerHTML.split(":")[0]);

window.onload = function() {
    setTimeout(function() {
        document.getElementById(time).scrollIntoView({ behavior: 'smooth' });
    }, 250)
}
