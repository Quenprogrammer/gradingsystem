import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import {
  addDoc,
  collection,
  collectionData,
  doc,
  Firestore,
  getDoc,
  setDoc,
  updateDoc
} from '@angular/fire/firestore';
import { increment } from 'firebase/firestore';

@Component({
  selector: 'app-grading',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './grading.component.html',
  styleUrl: '../courses/view-courses/view-courses.component.css'
})
export class GradingComponent {
  ModalOpen: WritableSignal<boolean> = signal(false);
  ModalOpenStudent: WritableSignal<boolean> = signal(false);
  selectedCourseIndex: number | null = null;

  gradingForm: FormGroup;
  gpa: number | null = null;
  comment = '';

  firestore = inject(Firestore);
  courses$: Observable<any[]> = new Observable();
  students$: Observable<any[]> = new Observable();

  constructor(private fb: FormBuilder) {
    this.gradingForm = this.fb.group({
      studentName: ['', Validators.required],
      matricNumber: ['', Validators.required],
      department: [''],
      level: [''],
      semester: [''],
      courses: this.fb.array([this.createCourse()])
    });
  }

  ngOnInit(): void {
    const courseCollection = collection(this.firestore, 'courses');
    const studentsCollection = collection(this.firestore, 'students');
    this.courses$ = collectionData(courseCollection, { idField: 'id' });
    this.students$ = collectionData(studentsCollection, { idField: 'id' });
  }

  get courses(): FormArray {
    return this.gradingForm.get('courses') as FormArray;
  }

  createCourse(): FormGroup {
    return this.fb.group({
      courseTitle: ['', Validators.required],
      creditUnit: [1, [Validators.required, Validators.min(1)]],
      score: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      grade: [''],
      gradePoint: [0]
    });
  }

  addCourse(): void {
    this.courses.push(this.createCourse());
  }

  removeCourse(index: number): void {
    if (this.courses.length > 1) {
      this.courses.removeAt(index);
    }
  }

  openModalForCourse(index: number): void {
    this.selectedCourseIndex = index;
    this.ModalOpen.set(true);
  }

  selectCourseFromModal(course: any): void {
    if (this.selectedCourseIndex !== null) {
      const targetForm = this.courses.at(this.selectedCourseIndex);
      targetForm.patchValue({
        courseTitle: course.title,
        creditUnit: course.creditUnit
      });
      this.ModalOpen.set(false);
    }
  }

  getGrade(score: number): string {
    if (score >= 70) return 'A';
    if (score >= 60) return 'B';
    if (score >= 50) return 'C';
    if (score >= 45) return 'D';
    if (score >= 40) return 'E';
    return 'F';
  }

  getGradePoint(score: number): number {
    if (score >= 70) return 5;
    if (score >= 60) return 4;
    if (score >= 50) return 3;
    if (score >= 45) return 2;
    if (score >= 40) return 1;
    return 0;
  }

  generateComment(gpa: number): string {
    if (gpa >= 4.5) return 'Excellent performance. Keep it up!';
    if (gpa >= 3.5) return 'Very good performance. Aim higher!';
    if (gpa >= 2.4) return 'Good effort. There is room for improvement.';
    if (gpa >= 1.5) return 'Fair. Consider putting in more work.';
    if (gpa >= 1.0) return 'Pass. Strive harder next semester.';
    return 'Failed. Serious improvement needed.';
  }

  calculateGrades(): void {
    let totalCU = 0;
    let totalWeightedGP = 0;

    this.courses.controls.forEach(courseCtrl => {
      const score = courseCtrl.get('score')?.value;
      const cu = courseCtrl.get('creditUnit')?.value;
      const grade = this.getGrade(score);
      const gp = this.getGradePoint(score);

      courseCtrl.patchValue({
        grade,
        gradePoint: gp
      });

      totalCU += cu;
      totalWeightedGP += cu * gp;
    });

    this.gpa = totalCU > 0 ? parseFloat((totalWeightedGP / totalCU).toFixed(2)) : 0;
    this.comment = this.generateComment(this.gpa);
  }

  printResult(): void {
    window.print();
  }

  openStudentModal(): void {
    this.ModalOpenStudent.set(true);
  }

  selectStudentFromModal(student: any): void {
    this.gradingForm.patchValue({
      studentName: student.fullName || '',
      matricNumber: student.matricNumber || '',
      department: student.department || '',
      level: student.level || '',
      semester: student.semester || ''
    });
    this.ModalOpenStudent.set(false);
  }

  async saveResult(): Promise<void> {
    if (this.gradingForm.invalid) {
      alert('Please fill all required fields.');
      return;
    }

    this.calculateGrades(); // Ensure GPA & comment are updated

    const resultData = {
      ...this.gradingForm.value,
      gpa: this.gpa,
      comment: this.comment,
      createdAt: new Date().toISOString()
    };

    try {
      // 1. Save result
      const resultCollection = collection(this.firestore, 'results');
      await addDoc(resultCollection, resultData);

      // 2. Update statistics/stats (pass or fail)
      const statsRef = doc(this.firestore, 'statistics', 'data');
      const statsSnap = await getDoc(statsRef);

      const updates: any = {};
      if ((this.gpa ?? 0) >= 1.0) {
        updates.pass = increment(1);
      } else {
        updates.fail = increment(1);
      }

      if (statsSnap.exists()) {
        await updateDoc(statsRef, updates);
      } else {
        await setDoc(statsRef, {
          pass: (this.gpa ?? 0) >= 1.0 ? 1 : 0,
          fail: (this.gpa ?? 0) < 1.0 ? 1 : 0
        });
      }

      alert('Result saved and statistics updated successfully!');

      // 3. Reset form
      this.gradingForm.reset();
      this.courses.clear();
      this.courses.push(this.createCourse());
      this.gpa = null;
      this.comment = '';

    } catch (error) {
      console.error('Error saving result:', error);
      alert('Failed to save result. Please try again.');
    }
  }

  onSubmit(): void {
    if (this.gradingForm.invalid) {
      alert('Please fill all required fields correctly.');
      return;
    }

    this.saveResult();
  }
}
