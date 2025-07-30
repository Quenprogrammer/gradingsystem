import { Component } from '@angular/core';
import {ResultView} from '../result-view/result-view';

@Component({
  selector: 'app-debug',
  imports: [
    ResultView
  ],
  templateUrl: './debug.html',
  styleUrl: './debug.scss'
})
export class Debug {

}
