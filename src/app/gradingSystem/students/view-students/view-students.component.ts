import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
export interface Student {
  id?: string; // Firestore document ID
  fullName: string;
  matricNumber: string;
  email: string;
  phone: string;
  gender: string;
  dob: string;
  department: string;
  level: string;
  course: string;
  address?: string;
  guardianName?: string;
  guardianPhone?: string;
  createdAt: any;
}

@Component({
  selector: 'app-view-students',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './view-students.component.html',
  styleUrl: './view-students.component.css'
})
export class ViewStudentsComponent implements OnInit {
  students$: Observable<Student[]>;
  editForm!: FormGroup;
  editingId: string | null = null;

  constructor(private firestore: Firestore, private fb: FormBuilder) {
    const studentRef = collection(this.firestore, 'students');
    this.students$ = collectionData(studentRef, { idField: 'id' }) as Observable<Student[]>;
  }

  ngOnInit() {
    this.editForm = this.fb.group({
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

  startEdit(student: Student) {
    this.editingId = student.id!;
    this.editForm.patchValue(student);
  }

  cancelEdit() {
    this.editingId = null;
    this.editForm.reset();
  }

  async updateStudent() {
    if (this.editForm.invalid || !this.editingId) return;

    const studentRef = doc(this.firestore, 'students', this.editingId);
    await updateDoc(studentRef, this.editForm.value);
    this.cancelEdit();
    alert('Student updated successfully!');
  }

  async deleteStudent(id: string) {
    if (confirm('Are you sure you want to delete this student?')) {
      await deleteDoc(doc(this.firestore, 'students', id));
      alert('Student deleted.');
    }
  }
}
