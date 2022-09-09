import { RequiredValidator } from "@angular/forms";

export class Student {
    id: any;
    name: any;
    age: any;
    phoneNumber:any;
    email: any;
    gender: any;
    address: any;
    subjectName:any;
    subjectid:any;
    subjectList:[];
   
  
    constructor() {
      this.id = null;
      this.age = null;
      this.name = null;
      this.phoneNumber=null;
      this.email = null;
      this.gender = null;
      this.address = null;
      this.subjectName = "";
      this.subjectid=0;
      this.subjectList=[]
    }
  }
  