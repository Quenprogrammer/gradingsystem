import {Component, inject, signal, WritableSignal} from '@angular/core';
import {AsyncPipe, NgForOf} from '@angular/common';
import {collection, collectionData, deleteDoc, doc, Firestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-results',
  imports: [
    AsyncPipe,
    NgForOf
  ],
  templateUrl: './results.html',
  styleUrl: './results.scss'
})
export class Results {
  firestore = inject(Firestore);
  results$: Observable<any[]>;
  ModalOpen: WritableSignal<boolean> = signal<boolean>(false);
  selectedResult: any = null;

  constructor(private router: Router) {
    const resultsRef = collection(this.firestore, 'results');
    this.results$ = collectionData(resultsRef, { idField: 'id' });
  }

  viewResult(result: any) {
    this.router.navigate(['/view-result', encodeURIComponent(result.studentName)]);
  }

  async deleteResult(id: string) {
    const confirmed = confirm('Are you sure you want to delete this result?');
    if (!confirmed) return;

    const docRef = doc(this.firestore, 'results', id);
    await deleteDoc(docRef);
    alert('Result deleted!');
  }

  formatDate(timestamp: any): string {
    if (!timestamp) return 'N/A';
    let date: Date;

    if (timestamp.toDate) {
      date = timestamp.toDate();
    } else if (typeof timestamp === 'string' || timestamp instanceof Date) {
      date = new Date(timestamp);
    } else {
      return 'Invalid date';
    }

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
}
