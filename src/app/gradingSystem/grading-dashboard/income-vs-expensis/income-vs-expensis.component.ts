import {AfterViewInit, Component, ElementRef, ViewChild, computed, inject, signal, effect, OnInit} from '@angular/core';
 import { toSignal } from '@angular/core/rxjs-interop';
import {CurrencyPipe, DecimalPipe, NgIf, NgStyle} from '@angular/common';
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
interface FirebaseDocument {
  totalAmount?: number;
}

@Component({
  selector: 'app-income-vs-expensis',
  standalone: true,
  templateUrl: './income-vs-expensis.component.html',
  imports: [CurrencyPipe, DecimalPipe, NgStyle, NgIf,],
  styleUrls: ['./income-vs-expensis.component.css']
})
export class IncomeVsExpensisComponent implements AfterViewInit, OnInit {
// Canvas reference
  @ViewChild('pieCanvas', { static: true }) pieCanvas!: ElementRef<HTMLCanvasElement>;

  // Firestore
  firestore = inject(Firestore);

  // Signals
  passCount = signal<number>(0);
  failCount = signal<number>(0);
  isLoading = signal<boolean>(false);

  // Computed chart data
  data = computed(() => [
    this.failCount(),
    this.passCount()
  ]);
  colors = ['red', 'black'];
  labels = ['Fail', 'Pass'];

  constructor() {
    effect(() => {
      this.drawPieChart();
    });
  }

  ngOnInit(): void {
    this.loadStatistics();
  }

  ngAfterViewInit(): void {
    this.drawPieChart();
  }

  async loadStatistics(): Promise<void> {
    this.isLoading.set(true);

    const statsRef = doc(this.firestore, 'statistics', 'data');
    const statsSnap = await getDoc(statsRef);

    if (statsSnap.exists()) {
      const data = statsSnap.data();
      this.passCount.set(data['pass'] || 0);
      this.failCount.set(data['fail'] || 0);
    } else {
      this.passCount.set(0);
      this.failCount.set(0);
    }


    this.isLoading.set(false);
  }

  drawPieChart(): void {
    const canvas = this.pieCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const data = this.data();
    const total = data.reduce((sum, value) => sum + value, 0);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 150;
    let currentAngle = -0.4 * Math.PI;

    // Clear canvas before redraw
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < data.length; i++) {
      const sliceAngle = (data[i] / total) * 2 * Math.PI;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
      ctx.closePath();

      ctx.fillStyle = this.colors[i];
      ctx.fill();

      currentAngle += sliceAngle;
    }
  }

}
