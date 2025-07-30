import {Component, inject, OnInit, signal} from '@angular/core';
import {Router} from '@angular/router';
import {collection, doc, Firestore, getCountFromServer, getDoc} from '@angular/fire/firestore';
import {DashboardResults} from './dashboard-results/dashboard-results';
import {Exampro} from './exampro/exampro';
import {IncomeVsExpensisComponent} from './income-vs-expensis/income-vs-expensis.component';

@Component({
  selector: 'app-grading-dashboard',
  imports: [
    DashboardResults,
    Exampro,
    IncomeVsExpensisComponent
  ],
  templateUrl: './grading-dashboard.component.html',
  styleUrl: './grading-dashboard.component.css'
})
export class GradingDashboardComponent implements OnInit {



  statisticsDashboard=[
    {name:'Students', value:3, details:'Registered students'},
    {name:'Courses', value:3, details:'Added courses'},
    {name:'Result', value:3 ,details:'Validated students results'},
  ]
  firestore = inject(Firestore);
  stats = signal<any>(null);
  loading = signal(true);

  async ngOnInit() {
    // Reference the 'statistics/data' document in Firestore
    const docRef = doc(this.firestore, 'statistics', 'data');
    const snapshot = await getDoc(docRef);

    // Set statistics data if it exists, otherwise initialize defaults
    if (snapshot.exists()) {
      this.stats.set(snapshot.data());
    } else {
      this.stats.set({
        male: 0,
        female: 0,
        level100: 0,
        level200: 0,
        level300: 0,
        level400: 0
      });
    }

    // Fetch document counts for key collections
    await Promise.all([
      this.getCollectionCount('students', this.studentCount),
      this.getCollectionCount('results', this.resultCount),
      this.getCollectionCount('courses', this.courseCount),
      this.getCollectionCount('pin', this.pinCount)
    ]);

    // Mark loading complete
    this.loading.set(false);
  }


  studentCount = signal<number>(0);
  resultCount = signal<number>(0);
  courseCount = signal<number>(0);
  pinCount = signal<number>(0);

  private async getCollectionCount(collectionName: string, signalVar: any) {
    const col = collection(this.firestore, collectionName);
    const snapshot = await getCountFromServer(col);
    signalVar.set(snapshot.data().count);
  }

}
