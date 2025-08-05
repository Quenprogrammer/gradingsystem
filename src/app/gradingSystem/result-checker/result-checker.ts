import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { collection, Firestore, getDocs, query, where } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import {HeaderTag} from '../header-tag/header-tag';

@Component({
  selector: 'app-result-checker',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HeaderTag],
  templateUrl: './result-checker.html',
})
export class ResultChecker {
  form: FormGroup;
  studentResult: any = null;
  notFound: boolean = false;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private firestore: Firestore) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      matric: ['', Validators.required],
    });
  }

  async onSubmit() {
    if (this.form.invalid) return;

    this.loading = true;
    this.studentResult = null;
    this.notFound = false;

    const email = this.form.value.email.trim().toLowerCase();
    const matric = this.form.value.matric.trim().toUpperCase();

    try {
      const resultsRef = collection(this.firestore, 'results');
      const q = query(resultsRef,
        where('email', '==', email),
        where('matricNumber', '==', matric)
      );

      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        this.studentResult = snapshot.docs[0].data();
      } else {
        this.notFound = true;
      }

    } catch (error) {
      console.error('Error fetching result:', error);
      this.notFound = true;
    }

    this.loading = false;
  }
}
