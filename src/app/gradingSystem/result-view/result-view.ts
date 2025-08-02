import { Component, inject } from '@angular/core';
import { NgForOf } from '@angular/common';
import { collection, Firestore, getDocs, query, where } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-result-view',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './result-view.html',
  styleUrl: './result-view.scss'
})
export class ResultView {

  private firestore = inject(Firestore);
  private route = inject(ActivatedRoute);

  result: any = null;

  async ngOnInit() {
    const nameParam = this.route.snapshot.paramMap.get('name');
    if (nameParam) {
      const decodedName = decodeURIComponent(nameParam);
      const resultsRef = collection(this.firestore, 'results');
      const q = query(resultsRef, where('studentName', '==', decodedName));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docSnap = querySnapshot.docs[0]; // get the first match
        this.result = { id: docSnap.id, ...docSnap.data() };
      }
    }
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

    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric', month: 'short', day: '2-digit',
      hour: '2-digit', minute: '2-digit', hour12: true
    }).format(date);
  }

  print() {
    const printContents = document.querySelector('#printSection')?.innerHTML;
    const originalContents = document.body.innerHTML;
    if (printContents) {
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      location.reload(); // restore page after print
    }
  }
}
