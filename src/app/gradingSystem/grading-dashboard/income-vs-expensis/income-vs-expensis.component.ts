import {AfterViewInit, Component, ElementRef, ViewChild, computed, inject, signal, effect} from '@angular/core';
 import { toSignal } from '@angular/core/rxjs-interop';
import {CurrencyPipe, DecimalPipe, NgStyle} from '@angular/common';

interface FirebaseDocument {
  totalAmount?: number;
}

@Component({
  selector: 'app-income-vs-expensis',
  standalone: true,
  templateUrl: './income-vs-expensis.component.html',
  imports: [CurrencyPipe, DecimalPipe, NgStyle, ],
  styleUrls: ['./income-vs-expensis.component.css']
})
export class IncomeVsExpensisComponent implements AfterViewInit {
  isLoading = signal<boolean>(false);

  @ViewChild('pieCanvas', { static: true }) pieCanvas!: ElementRef<HTMLCanvasElement>;




  expensePercentage=60
  incomePercentage=100
  @ViewChild('expensesCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  // Pie chart data
  data = computed(() => [
    this.expensePercentage,
    this.incomePercentage
  ]);
  // Example: 40% expenses, 60% income
  colors = ['red', 'black'];
  labels = ['Expenses', 'Income'];

  ngAfterViewInit(): void {

    this.drawPieChart();

  }

  constructor() {
    effect(() => {
      // Trigger redraw when data updates
      this.drawPieChart();
    });
  }
  drawPieChart(): void {
    const canvas = this.pieCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const data = this.data(); // <-- Use signal value
    const total = data.reduce((sum, value) => sum + value, 0);
    const centerX = 200;
    const centerY = 200;
    const radius = 150;
    let currentAngle = -0.4 * Math.PI;

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas before redraw

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
