import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from './student';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  baseUrl="http://localhost:60204/api/student";

  constructor(private httpClient:HttpClient) { }

  GetAllStudent(): Observable<any> 
  {
    return this.httpClient.get<any>(this.baseUrl);
  }
  saveStudent(newStudent:Student):Observable<Student>
  {
    return this.httpClient.post<Student>(this.baseUrl,newStudent);
  }
  updateStudent(editStudent:Student):Observable<Student>
  {
    return this.httpClient.put<Student>(this.baseUrl,editStudent);
  }
  deleteStudent(id:number):Observable<any>
  {
    return this.httpClient.delete<any>("http://localhost:60204/api/student/" + id);
  } 
 
}
