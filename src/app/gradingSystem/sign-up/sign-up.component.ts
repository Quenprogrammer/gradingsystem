import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'] // ✅ Fixed typo: styleUrl → styleUrls
})
export class SignUpComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private firestore: Firestore
  ) {
    this.registerForm = this.fb.group(
      {
        fullName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
        termsAccepted: [false, Validators.requiredTrue]
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return password === confirm ? null : { mismatch: true };
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;

      const userData = {
        fullName: formValue.fullName,
        lastName: formValue.lastName,
        email: formValue.email,
        password: formValue.password,
        createdAt: new Date()
      };

      try {
        const userCollection = collection(this.firestore, 'users');
        await addDoc(userCollection, userData);
        console.log('✅ User successfully registered!');
        this.registerForm.reset();
      } catch (err) {
        console.error('❌ Error registering user:', err);
      }
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
