import { Subjects } from './../subject';
import { Component, OnInit } from '@angular/core';
import { Student } from './student';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { StudentService } from './student.service';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms'; 
declare var $: any;

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})

export class StudentComponent implements OnInit {
  contactForm: FormGroup;
  StudentList: Student[] = [];
  newStudent: Student = new Student();
  editStudent: Student = new Student();
  subjects:Subjects[]=[]
  form: FormGroup = new FormGroup({});  
  
  GetSubject()
  {
    this.subjects = [
      {id: 39, name: "Hindi" , isSelected: false},
      {id: 40, name: "English", isSelected: false},
      {id: 41, name: "Math", isSelected: false},
      {id: 42, name: "Urdu", isSelected: false},
      {id: 43, name: "Social Science", isSelected: false}
    ];
    
  }
  constructor(private studentService: StudentService, private fb: FormBuilder) { 
    this.form = fb.group({  
      mobileNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]  
    })  
  }

  ngOnInit(): void {
    this.GetAll();
    this.GetSubject();

    this.contactForm = this.fb.group({
      country: [null]
    });


    $(document).ready(function(){
    $("#btn1").click(function () {
      $("#maindiv").slideToggle(1000)
      });
    })
 
  }
  
  GetAll() {
    this.studentService.GetAllStudent().subscribe
      ((response) => {
        // console.log(Response)
        this.StudentList = response;
      },
        (error) => {
          console.log(error);
        }
      )
  }
  // GetData():void{
  //   let tmp = [];
  //   this.http.get<any>('https://localhost:44390/api/Checkeditems/api/subject').subscribe
  //     ((data) => {
  //       for(let i=0; i < data.length; i++){
  //         tmp.push({ item_id: i, item_text: data[i].name });
  //       }
  //       // console.log(Response)
  //       this.dropdownList = tmp;
  //     },
  //       (error) => {
  //         console.log(error);
  //       }
  //     )
  // }
  //Save Student Code
  saveClick() {
    if (this.newStudent.name == "" || this.newStudent.name == null) {
      alert('Please Enter The Name')
      return;
    }
    this.newStudent.id = 0;
    this.studentService.saveStudent(this.newStudent).subscribe((response) => {
      this.GetAll();
      this.newStudent.name = "";
      this.newStudent.age = "";
      this.newStudent.phoneNumber = "";
      this.newStudent.email = "";
      this.newStudent.gender = "";
      this.newStudent.address = "";
      this.newStudent.age = "";
      this.newStudent.subjectName="";
      this.newStudent.subjectid="";
      this.newStudent.subjectList
    },
      (error) => {
        console.log(error);
      }
    )
  };
  editClick(e: any, i: number) {
    // alert(i);
    this.editStudent = this.StudentList[i];
  }
  updateClick() {
    this.studentService.updateStudent(this.editStudent).subscribe((response) => {
      this.GetAll();
    },
      (error) => {
        console.log(error);
      });
  }

  deleteClick(e: any, i: number) {
    // alert(i)
    let ans = confirm(" Are You Sure Want To Delete Data")
    if (!ans) return;
    this.studentService.deleteStudent(this.StudentList[i].id).subscribe((response) => {
      this.GetAll();
    },
      (error) => {
        console.log(error);
      });
  }
  MultiDropBox(e:any)
  {
    //debugger;
    let ss = e.value;
    this.newStudent.subjectList = ss;
  }
}
