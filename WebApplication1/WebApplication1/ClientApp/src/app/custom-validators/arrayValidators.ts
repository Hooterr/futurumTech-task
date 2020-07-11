import { ValidatorFn, AbstractControl } from "@angular/forms";

export class CustomValidators {

  static arrayMinLength(minLen: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return Array.isArray(control.value) && control.value.length < minLen ? { 'minLength': true } : null;
    }
  }
}
