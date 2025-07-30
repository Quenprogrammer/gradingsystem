import { Component } from '@angular/core';
import {collection, collectionData, deleteDoc, doc, Firestore, updateDoc} from '@angular/fire/firestore';
import {Course} from '../add-courses/add-courses.component';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-view-courses',
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './view-courses.component.html',
  styleUrl: './view-courses.component.css'
})
export class ViewCoursesComponent {
  courses$: Observable<Course[]>;
  editingCourseId: string | null = null;
  editForm!: FormGroup;

  constructor(private firestore: Firestore, private fb: FormBuilder) {
    const courseRef = collection(this.firestore, 'courses');
    this.courses$ = collectionData(courseRef, { idField: 'id' }) as Observable<Course[]>;
  }

  ngOnInit() {
    this.editForm = this.fb.group({
      title: ['', Validators.required],
      code: ['', Validators.required],
      creditUnit: [1, [Validators.required, Validators.min(1)]],
      semester: ['First', Validators.required],
      level: ['100L', Validators.required],
      lecturer: ['']
    });
  }

  async deleteCourse(id: string) {
    const docRef = doc(this.firestore, 'courses', id);
    await deleteDoc(docRef);
  }

  startEdit(course: Course) {
    this.editingCourseId = course.id!;
    this.editForm.patchValue(course);
  }

  cancelEdit() {
    this.editingCourseId = null;
    this.editForm.reset();
  }

  async updateCourse() {
    if (!this.editingCourseId || this.editForm.invalid) return;

    const docRef = doc(this.firestore, 'courses', this.editingCourseId);
    await updateDoc(docRef, {
      ...this.editForm.value
    });

    this.cancelEdit();
  }
}
