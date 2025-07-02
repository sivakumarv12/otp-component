import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  HostBinding,
  inject,
  Input, OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormArray,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
    selector: 'app-otp',
    imports: [MatInputModule, MatFormFieldModule, ReactiveFormsModule],
    templateUrl: './otp.component.html',
    styleUrls: ['./otp.component.scss'],

})
export class OtpComponent implements OnInit {
   @HostBinding('class.bwc-one-time-pin') componentClass = true;
  @ViewChildren('inputEl') inputEls!: QueryList<ElementRef<HTMLInputElement>>;
  @Input() isExpired = false;

  public size = 5;
  public inputs = this.getFormArray(this.size);
  public _onTouched: () => void;

  private _onChange: (value: string) => void;
  private scheduledFocus: number | null = null;


  constructor() {
    this._onChange = (value: string) => {};
    this._onTouched = () => {};
  }

  @Input()
  set length(length: number) {
    this.inputs = this.getFormArray(length);
    this.size = length;
  }

  ngOnInit() {
    console.log("otp");
  }

  public validate(control: AbstractControl<string, string>): ValidationErrors | null {
    if (!control.value || control.value.length < this.size) {
      return {
        required: true,
      };
    }

    if (this.isExpired) {
      return {
        expired: true,
      };
    }

    return null;
  }

  public writeValue(value: string): void {
    if (value?.length) {
      throw new Error('One-time-pin input is not supposed to be prefilled with data');
    }

    // Reset all input values
    this.inputs.setValue(new Array(this.size).fill(''));
  }

  public registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  public registerOnTouched(fn: any): void {}

  public setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.inputs.disable();
    } else {
      this.inputs.enable();
    }
  }

  public handleKeyDown(event: KeyboardEvent, index: number): void {
    const { key } = event;

    const isNumberKey = /^\d$/.test(key);
    const isControlKey = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(key);
    const isPasteKey = (event.ctrlKey || event.metaKey) && key === 'v';

    if (!isNumberKey && !isControlKey && !isPasteKey) {
      event.preventDefault(); // Block non-numeric and non-control keys
      return;
    }

    if ((key === 'Backspace' || key === 'Delete') && index > 0) {
      this.scheduledFocus = index - 1;
    }
  }

  public handleInput(event: Event): void {
    if (this.scheduledFocus !== null) {
      this.focusInput(this.scheduledFocus);
      this.scheduledFocus = null;
    }

    const input = event.target as HTMLInputElement;
    const rawValue = input?.value || '';
    const digitsOnly = rawValue.replace(/\D/g, ''); // Strip non-digits
    const inputElements = this.inputEls.toArray();
    // Always sanitize current input field
    input.value = digitsOnly;

    // Full paste — exact number of expected digits
    if (digitsOnly.length === this.size) {
      for (let i = 0; i < this.size; i++) {
        this.inputs.controls[i]?.setValue(digitsOnly[i]);
        if (inputElements[i]) {
          inputElements[i].nativeElement.value = digitsOnly[i];
        }
      }
      this.focusInput(this.size - 1);
      this._onTouched();
      this.updatePlainValue();
      return;
    }

    // Single digit input — normal user typing
    if (digitsOnly.length === 1) {
      const index = inputElements.findIndex((el) => el.nativeElement === input);
      if (index !== -1) {
        this.inputs.controls[index]?.setValue(digitsOnly);
        this._onTouched();
        this.updatePlainValue();

        if (index < this.size - 1) {
          this.focusInput(index + 1);
        }
      }
      return;
    }

    // Invalid input (empty, too long, non-digit paste)
    input.value = '';
    this.updatePlainValue();
  }

  public handleFocus(event: FocusEvent): void {
    // Select previously entered value to replace with a new input
    (event.target as HTMLInputElement).select();
  }

  public handlePaste(event: ClipboardEvent, index: number): void {
    event.preventDefault();

    if (index !== 0) {
      return;
    } // Only allow paste in the first input

    const paste = event.clipboardData?.getData('text/plain')?.replace(/\D/g, '') || '';

    if (paste.length !== this.size) {
      return;
    }

    for (let i = 0; i < this.size; i++) {
      this.inputs.controls[i]?.setValue(paste[i]);
    }

    this.focusInput(this.inputEls.length - 1);
    this.updatePlainValue();
    this._onTouched();
  }

  public handleKeyPress(event: KeyboardEvent, index: number): boolean {
    const isDigit = /\d/.test(event.key);

    // Safari fires Cmd + V through keyPress event as well
    // so we need to handle it here and let it through
    if (event.key === 'v' && event.metaKey) {
      return true;
    }

    if (isDigit && index + 1 < this.size) {
      // If user inputs digits & we are not on the last input we want
      // to advance the focus
      this.scheduledFocus = index + 1;
    }

    if (isDigit && this.inputs.controls[index].value) {
      // If user deselects an input which already has a value
      // we want to clear it so that it doesn't have more than 1 digit
      this.inputs.controls[index].setValue('');
    }

    return isDigit;
  }

  public focusInput(index: number): void {
    // In order not to interfere with the input we setTimeout
    // before advancing the focus
    setTimeout(() => this.inputEls.get(index)?.nativeElement.focus());
  }

  private getFormArray(length: number): FormArray {
    const arr = [];

    for (let i = 0; i < length; i++) {
      arr.push(new FormControl(''));
    }

    return new FormArray(arr);
  }

  private updatePlainValue(): void {
    // to expose the value as a plain number
    this._onChange(this.inputs.value.join(''));
  }
}
