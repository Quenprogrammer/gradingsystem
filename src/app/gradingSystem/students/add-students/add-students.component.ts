import { Component } from '@angular/core';
import { addDoc, collection, Firestore, Timestamp } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-students',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-students.component.html',
  styleUrl: './add-students.component.css'
})
export class AddStudentsComponent {
  studentForm!: FormGroup;

  constructor(private fb: FormBuilder, private firestore: Firestore) {
    this.studentForm = this.fb.group({
      fullName: ['', Validators.required],
      matricNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      department: ['', Validators.required],
      level: ['', Validators.required],
      course: ['', Validators.required],
      address: [''],
      guardianName: [''],
      guardianPhone: ['']
    });
  }

  async onSubmit() {
    if (this.studentForm.valid) {
      const data = {
        ...this.studentForm.value,
        createdAt: Timestamp.now()
      };
      const studentRef = collection(this.firestore, 'students');
      await addDoc(studentRef, data);
      alert('Student added successfully!');
      this.studentForm.reset();
    } else {
      alert('Please fill all required fields.');
    }
  }
}
