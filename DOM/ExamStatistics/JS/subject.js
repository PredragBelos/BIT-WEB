
var subjects = [];

/*Functions*/
class Subject{
    constructor(subjectName){

        if(!subjectName){
            throw new Error("Subject name must be defiined!");
        }

        if(typeof subjectName != "string"){
            throw new Error("Input for subject name must be a string!");
        }

        this.subjectName = subjectName;
    }

    getSubjectName(){
        return this.subjectName;
    }
}

//TESTING
