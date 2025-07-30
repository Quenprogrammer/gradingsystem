import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {addDoc, collection, Firestore} from '@angular/fire/firestore';
export interface Course {
  id?: string; // <-- Add this line
  title: string;
  code: string;
  creditUnit: number;
  semester: 'First' | 'Second';
  level: string;
  lecturer?: string;
  createdAt: Date;
}

@Component({
  selector: 'app-add-courses',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './add-courses.component.html',
  styleUrl: './add-courses.component.css'
})
export class AddCoursesComponent {
  courseForm!: FormGroup;
  loading = false;
  successMessage = '';

  constructor(private fb: FormBuilder, private firestore: Firestore) {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      code: ['', Validators.required],
      creditUnit: [1, [Validators.required, Validators.min(1)]],
      semester: ['First', Validators.required],
      level: ['100L', Validators.required],
      lecturer: ['']
    });
  }

  async submit() {
    if (this.courseForm.invalid) return;

    this.loading = true;

    const formValue = {
      ...this.courseForm.value,
      createdAt: new Date()
    };

    try {
      const courseRef = collection(this.firestore, 'courses');
      await addDoc(courseRef, formValue);
      this.successMessage = 'Course uploaded successfully!';
      this.courseForm.reset({ semester: 'First', level: '100L', creditUnit: 1 });
    } catch (error) {
      console.error('Error uploading course:', error);
    } finally {
      this.loading = false;
    }
  }
}
