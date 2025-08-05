// src/app/services/lockdown.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LockdownService {
  private locked$ = new BehaviorSubject<boolean>(false);

  setLocked(value: boolean) {
    this.locked$.next(value);
  }

  isLocked() {
    return this.locked$.asObservable();
  }
}
