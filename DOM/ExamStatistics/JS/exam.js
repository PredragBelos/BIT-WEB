
let exams = [];

/*functions*/
class Exam{
    constructor(subject, student, grade){

        if(!subject){
            throw new Error("Subject must be defined!");
        }

        if(!student){
            throw new Error("Student must be defined!");
        }

        if(!grade){
            throw new Error("Grade must be defined!");
        }

        if(!(subject instanceof Subject)){
            throw new Error("Subject must be instance of class Subject!");
        }

        if(!(student instanceof Student)){
            throw new Error("Student must be instance of class Student!");
        }

        if(typeof grade != "number"){
            throw new Error("Input for student exam grade must be a number!");
        }

        if(grade < 1 || grade > 10){
            throw new Error("Grede must be between 1 and 10!");
        }

        this.subject = subject;
        this.student = student;
        this.grade = grade;
    
    }

    getExamInfo(){
        let result = "";
        result += this.subject.subjectName + ", " + this.student.studentName + " " + this.student.studentSurname;
        return result;
    }

    hasPassed(){
        let result = "failed";

        if(this.grade > 5){
            result = "passed";
        }

        return result;
    }
}

//TESTING


