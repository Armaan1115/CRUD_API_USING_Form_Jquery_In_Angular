import { Subjects } from './subject';
import { Component, OnInit } from '@angular/core';
import { Student } from './student';
import { StudentService } from './student.service';
import { FormBuilder, FormGroup, FormControl, Validators, Form} from '@angular/forms'; 
import Swal from 'sweetalert2/dist/sweetalert2.js';  

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
  RegisterForm:FormGroup;
  registerForm:Form;
  submitted = false;
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
  constructor(private studentService: StudentService, private formBuilder: FormBuilder) { 
  }
  ngOnInit(): void {
    this.GetAll();
    this.GetSubject();
    // this.contactForm = this.formBuilder.group({country: [null]});
    //Validations
    this.RegisterForm=this.formBuilder.group({
      Name:['',Validators.required],
      Age:['',Validators.required],
      Address:['',[Validators.required,Validators.minLength(3)]],
      PhoneNumber:['',Validators.required],
      Email:['',[Validators.required,Validators.email]],
      Subject:['',Validators.required],
      gender:['',Validators.required],  
    })

    $('#CancelBtn').click(function(){   // Cancel Button For Clear form fields
    $('#MainForm').each(function(){ 
      this.reset()
  });
    })
    $(document).ready(function(){       //Cancel Button For Reload The Form
    $('#CancelBtn').click(function(){
      location.reload();
    });
    });
    $(document).ready(function(){       //Form Slide Down Animation
    $("#btn1").click(function () {
      $("#maindiv").slideToggle(1000)
      });
    })
    $(document).ready(function(){       //Regex For Phone Number
  
      $("#phone_number").on("blur", function(){
            var mobNum = $(this).val();
            var filter = /^(\+\d{1,3}[- ]?)?\d{10}$/;
              if (filter.test(mobNum)) {
                if(mobNum.length==10){
                      // alert("valid");
                 } else {
                    alert('Please put 10  digit mobile number');
                  }
                }
                else {
                  alert('Not a valid number');
               }
      });
    });
    $(document).ready(function () {     //Regex For Email Validations   
      $("#emailValidation").change(function () {    
      var inputValues = $(this).val();    
      var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;    
      if(!regex.test(inputValues)){    
      alert("invalid email id");  }    
      });    
    });
   
  }
  //Validations
  onSubmit(){
    this.submitted=true;
    if(this.RegisterForm.invalid){
      return;
    }
    alert("success") ;
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
  saveClick() {
    if (this.newStudent.name == "" || this.newStudent.name == null) {
      // alert('Please Enter The Name')
      return;
    }
    this.newStudent.id = 0;
    this.studentService.saveStudent(this.newStudent).subscribe((response) => {
      this.GetAll();
      Swal.fire('Thank you...', 'You submitted successfully!', 'success')
      window.location.reload();
      this.newStudent.name = "";
      this.newStudent.age = "";
      this.newStudent.phoneNumber = "";
      this.newStudent.email = "";
      this.newStudent.gender = "";
      this.newStudent.address = "";
      this.newStudent.age = "";
      this.newStudent.subjectName="";
      this.newStudent.subjectid="";
      this.newStudent.subjectList=[];
      
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