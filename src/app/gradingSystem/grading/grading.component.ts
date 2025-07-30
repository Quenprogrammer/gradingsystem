import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-grading',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './grading.component.html',
  styleUrl: './grading.component.css'
})
export class GradingComponent {
  gradingForm: FormGroup;
  gpa: number | null = null;
  comment = '';

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
        grade: grade,
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
}
