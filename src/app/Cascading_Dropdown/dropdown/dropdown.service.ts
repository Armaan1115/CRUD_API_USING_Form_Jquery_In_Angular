import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {
  

  constructor( private httpClient:HttpClient) { }
 GetAllCOuntry(){
  return this.httpClient.get('https://localhost:44390/api/CntStaCity/GetCountry');
 }
 GetStateByid(countryid:number){
  return this.httpClient.get('https://localhost:44390/api/CntStaCity/GetStateById/' + countryid);
 }
 GetCityByid(stateid:number){
  return this.httpClient.get('https://localhost:44390/api/CntStaCity/GetStateById/' + stateid);
 }
  }

