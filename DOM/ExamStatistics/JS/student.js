
let students = [];

/*Functions*/
class Student{
    constructor(studentName, studentSurname){

        if(!studentName){
            throw new Error("Student name must be defined!");
        }

        if(!studentSurname){
            throw new Error("Student surname must be defined!");
        }

        if(typeof studentName !== "string"){
            throw new Error("Input for student name must be a string!")
        }

        if(typeof studentSurname !== "string"){
            throw new Error("Input for student surname must be a string!")
        }

        this.studentName = studentName;
        this.studentSurname = studentSurname;
    }

    getStudentData(){
        let result = "";
        result += this.studentName + " " + this.studentSurname;
        return result;
    }
}

//TESTING
