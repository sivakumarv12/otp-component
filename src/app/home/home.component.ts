import { NgIf } from '@angular/common';
import {Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, ViewChild} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from "@angular/material/card";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

import {BwcCardModule, BwcFormModule, BwcOneTimePinComponent} from "@aviato/components";

@Component({
    selector: 'app-home',
    imports: [
      MatCardModule,
      BwcCardModule,
      MatInputModule,
      MatFormFieldModule,
      ReactiveFormsModule,
      MatRadioModule,
      BwcFormModule,
      MatButtonModule,
      BwcOneTimePinComponent,
      NgIf
    ],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent implements OnInit {
  constructor(private fb: UntypedFormBuilder){}
  @ViewChild('oneTimePin') oneTimePin;
  public content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt';

  //  myOneTimePinForm = new FormGroup({
  //   myOneTimePin: new FormControl(''),
  // });

  public form: UntypedFormGroup;

  //  formGroup = new FormGroup({
  //   dateOfBirth: new FormControl({ value: '', disabled: false }),
  //   dateOfBirth1: new FormControl({ value: '', disabled: false }),
  //   dateOfBirth2: new FormControl({ value: '', disabled: false }),
  // });
  hintText: 'Enter your date of birth as stated on your passport';
 minDateOfNull = null;
maxDateOfNull = null;

  isExpired = false;
  length = 5;

  onErrorHidden(param){
    console.log('onErrorHidden');
  }

  onErrorShown(param,e){
     console.log('onErrorShown');
  }
  checked =false;
  disabled = false;
  labelPosition= 'before';

  ngOnInit(): void {
    this.form = this.fb.group({
      otpData: '',
    })
  }

  validate(fields: string[]) {
    if (!fields.length) {
      fields = Object.keys(this.form.controls);
    }

    fields.forEach((field) => {
      this.form.get(field).markAsTouched({ onlySelf: true });
    });

    if (!this.form.get('otpData').valid) {
      this.oneTimePin.focusInput(0);
    }


  }
}
