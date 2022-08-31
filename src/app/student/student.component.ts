import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Student } from './student';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { StudentService } from './student.service';
declare var $: any;

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})

export class StudentComponent implements OnInit {
  contactForm: FormGroup;
  StudentList: Student[] = [];
  subjectList = [];
  AvailableSubjects=[];
  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings = {}
  newStudent: Student = new Student();
  editStudent: Student = new Student();
  constructor(private studentService: StudentService, private fb: FormBuilder,private http: HttpClient) { }

  ngOnInit(): void {
    this.GetAll();
    this.GetData();

    this.contactForm = this.fb.group({
      country: [null]
    });

    $(document).ready(function(){
    $("#btn1").click(function () {
      $("#maindiv").slideToggle(3000)
      });
    })
  
     this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
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
  GetData():void{
    let tmp = [];
    this.http.get<any>('https://localhost:44390/api/Checkeditems/api/subject').subscribe
      ((data) => {
        for(let i=0; i < data.length; i++){
          tmp.push({ item_id: i, item_text: data[i].name });
        }
        // console.log(Response)
        this.dropdownList = tmp;
      },
        (error) => {
          console.log(error);
        }
      )
  }
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
      this.newStudent.department = "";
      this.newStudent.age = "";
      this.newStudent.subjects
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
}
