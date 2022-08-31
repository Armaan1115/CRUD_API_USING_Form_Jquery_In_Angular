import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DropdownService } from './dropdown.service';


@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  createAccountForm: FormGroup;

  countries: any;
  states: any;
  cities: any;
  constructor(private dropdownService: DropdownService) { }

  ngOnInit(): void {
    this.dropdownService.GetAllCOuntry().subscribe(
      data => this.countries = data
    );
    this.createAccountForm = new FormGroup({
      country: new FormControl(''),
      state: new FormControl(''),
      city: new FormControl('')
    });
  }
  onChangeCountry(countryId: number) {
    if (countryId) {
      this.dropdownService.GetStateByid(countryId).subscribe(
        data => {
          this.states = data;
          this.cities = null;
        }
      );
    } else {
      this.states = null;
      this.cities = null;
    }
  }
  onChangeState(stateId: number) {
    if (stateId) {
      this.dropdownService.GetCityByid(stateId).subscribe(
        data => this.cities = data
      );
    } else {
      this.cities = null;
    }
  }
}


