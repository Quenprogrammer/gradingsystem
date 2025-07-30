import {Component, inject} from '@angular/core';
import {NgForOf} from '@angular/common';
import {doc, Firestore, getDoc} from '@angular/fire/firestore';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-result-view',
  imports: [
    NgForOf
  ],
  templateUrl: './result-view.html',
  styleUrl: './result-view.scss'
})
export class ResultView {


  route = inject(ActivatedRoute);
  firestore = inject(Firestore);
  result: any = null;

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const docRef = doc(this.firestore, 'results', id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        this.result = snapshot.data();
      }
    }
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
