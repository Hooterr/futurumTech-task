import { ValidatorFn, AbstractControl } from "@angular/forms";

// Custom validators
export class CustomValidators {

  /// Minimum length for an array
  static arrayMinLength(minLen: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return Array.isArray(control.value) && control.value.length < minLen ? { 'minLength': true } : null;
    }
  }
}
