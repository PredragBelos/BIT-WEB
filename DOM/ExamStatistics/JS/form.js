/*Variables*/
let subjectDropDownList = document.querySelector("#subjectDropDownList");
let studentNameAndSurname = document.querySelector("#studentNameAndSurname");
let gradeInput = document.querySelector("#gradeInput");
let addButton = document.querySelector("#addButton");
let passedTable = document.querySelector(".passedTable table");
let failedTable = document.querySelector(".faliedTable table");
let passedNumberParagraph = document.querySelector(".passedNumberParagraph");
let failedNumberParagraph = document.querySelector(".failedNumberParagraph");
let totalStudents = document.querySelector(".statisticSection span");




/*Functions*/

/*Function for creating student*/
function createStudent() {
    try {
        let studentName = "";
        let studentSurname = "";
        let student;
        let studentNameAndSurnameArray = studentNameAndSurname.value.split(" ");

        if (studentNameAndSurnameArray[0] === undefined || studentNameAndSurnameArray[1] === undefined) {
            throw new Error("Input for name and surname must contain both name and surname!");
        }

        studentName = studentNameAndSurnameArray[0].slice(0, 1).toUpperCase() + studentNameAndSurnameArray[0].slice(1, studentNameAndSurnameArray[0].length).toLowerCase();
        studentSurname = studentNameAndSurnameArray[1].slice(0, 1).toUpperCase() + studentNameAndSurnameArray[1].slice(1, studentNameAndSurnameArray[1].length).toLowerCase();

        student = new Student(studentName, studentSurname);

        return student;
    }
    catch (error) {
        alert(error.message);
    }
}

/*Function for creating subject*/
function createSubject() {
    try {
        let subject = new Subject(subjectDropDownList.value);

        return subject;
    }
    catch (error) {
        alert(error.message);
    }
}

/*Function for creating exam*/
function createExam() {
    try {

        try {
            if (!parseInt(gradeInput.value)) {
                throw new Error("You must define student's grade!")
            }
        }
        catch (error) {
            alert(error.message);
        }

        let exam = new Exam(createSubject(), createStudent(), parseInt(gradeInput.value));

        exams.push(exam);

        passedOrFailedExams();
    }
    catch (error) {
        console.log(error.message);
    }

}

/*Function for sort exams to tables*/
function passedOrFailedExams() {


    clearFailedTable();
    clearPassedTable();


    for (let i = 0; i < exams.length; i++) {
        if (exams[i].hasPassed() === "passed") {
            let passedTableRow = document.createElement("tr");
            let passedTableTdReport = document.createElement("td");
            let passedTableGrade = document.createElement("td");
            passedTableRow.setAttribute("class", "passedTableRow");
            passedTableTdReport.textContent = exams[i].subject.getSubjectName() + " - " + exams[i].student.getStudentData();
            passedTableGrade.textContent = exams[i].grade;

            passedTable.appendChild(passedTableRow);
            passedTableRow.appendChild(passedTableTdReport);
            passedTableRow.appendChild(passedTableGrade);

        }
        else {
            let failedTableRow = document.createElement("tr");
            let failedTableTdReport = document.createElement("td");
            let failedTableGrade = document.createElement("td");
            failedTableRow.setAttribute("class", "failedTableRow");
            failedTableTdReport.textContent = exams[i].subject.getSubjectName() + " - " + exams[i].student.getStudentData();
            failedTableGrade.textContent = exams[i].grade;

            failedTable.appendChild(failedTableRow);
            failedTableRow.appendChild(failedTableTdReport);
            failedTableRow.appendChild(failedTableGrade);
        }
    }

    let passedTablesRows = document.querySelectorAll(".passedTableRow").length;
    let failedTablesRows = document.querySelectorAll(".failedTableRow").length;

    totalNumberOfStudents(passedTablesRows, failedTablesRows);

    statistic();
}

/*function for crearing passed Table*/
function clearPassedTable() {
    let passedTableItems = document.querySelectorAll(".passTable .passedTableRow");

    for (let i = 0; i < passedTableItems.length; i++) {
        let passedRow = document.querySelector(".passedTableRow");
        let passedTable = passedRow.parentElement;
        passedTable.removeChild(passedRow);
    }
}

/*function for crearing passed Table*/
function clearFailedTable() {
    let failedTableItems = document.querySelectorAll(".failTable .failedTableRow");

    for (let i = 0; i < failedTableItems.length; i++) {
        let failedRow = document.querySelector(".failedTableRow");
        let failedTable = failedRow.parentElement;
        failedTable.removeChild(failedRow);
    }
}

/*Function for working statistics*/
function statistic() {

    let passTableItems = document.querySelectorAll(".passTable .passedTableRow");
    let failTableItems = document.querySelectorAll(".failTable .failedTableRow");
    let passCount = 0;
    let failCount = 0;

    for (let i = 0; i < passTableItems.length; i++) {
        passCount++;
    }

    for (let i = 0; i < failTableItems.length; i++) {
        failCount++;
    }

    passedNumberParagraph.textContent = passCount;
    failedNumberParagraph.textContent = failCount;
}

/*Function for present total number of tudents*/
function totalNumberOfStudents(a, b) {
    totalStudents.textContent = a + b;
}
