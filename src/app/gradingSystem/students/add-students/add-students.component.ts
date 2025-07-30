import { Component } from '@angular/core';
import {addDoc, collection, doc, Firestore, getDoc, setDoc, Timestamp, updateDoc} from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {increment} from '@angular/fire/database';

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
      fullName: ['', ],
      matricNumber: ['', ],
      email: ['', [ Validators.email]],
      phone: ['', ],
      gender: ['', ],
      dob: ['', ],
      department: ['', ],
      level: ['', ],
      course: ['', ],
      address: [''],
      guardianName: [''],
      guardianPhone: ['']
    });
  }

  async onSubmit() {
    if (!this.studentForm.valid) {
      alert('Please fill all required fields.');
      return;
    }

    const data = {
      ...this.studentForm.value,
      createdAt: Timestamp.now()
    };

    try {
      const studentRef = collection(this.firestore, 'students');
      await addDoc(studentRef, data);

      // === Update statistics collection ===
      const statsRef = doc(this.firestore, 'statistics', 'data');
      const statsSnap = await getDoc(statsRef);

      const gender = this.studentForm.get('gender')?.value?.toLowerCase(); // 'male' or 'female'
      const level = this.studentForm.get('level')?.value; // e.g., '100', '200'

      const updates: any = {};
      if (gender === 'male') updates.male = increment(1);
      if (gender === 'female') updates.female = increment(1);

      if (level === '100') updates.level100 = increment(1);
      else if (level === '200') updates.level200 = increment(1);
      else if (level === '300') updates.level300 = increment(1);
      else if (level === '400') updates.level400 = increment(1);

      if (statsSnap.exists()) {
        await updateDoc(statsRef, updates);
      } else {
        await setDoc(statsRef, {
          male: gender === 'male' ? 1 : 0,
          female: gender === 'female' ? 1 : 0,
          level100: level === '100' ? 1 : 0,
          level200: level === '200' ? 1 : 0,
          level300: level === '300' ? 1 : 0,
          level400: level === '400' ? 1 : 0
        });
      }

      // === Finish ===
      alert('Student added successfully!');
      this.studentForm.reset();

    } catch (error) {
      console.error('Error adding student:', error);
      alert('Failed to add student. Please try again.');
    }
  }

}
