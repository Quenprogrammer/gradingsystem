import {Component, EventEmitter, inject, Output, signal, TemplateRef, ViewChild, WritableSignal} from '@angular/core';
import { GuardService } from './guard.service';
import { FormsModule } from '@angular/forms';
import {NgClass, NgIf, NgStyle} from '@angular/common';
import {RouterLink} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-password-modal',
  standalone: true,
  imports: [FormsModule, NgIf, NgClass, RouterLink, NgStyle, ],
  templateUrl: './password-modal.component.html',
  styleUrl: './password-modal.component.css'
})
export class PasswordModalComponent {

  password:WritableSignal<string>= signal('');
  error = false;
  attemptCount = 0;
  maxAttempts = signal<number>(5);
  isLocked = false;

  @Output() unlocked = new EventEmitter<boolean>();

  constructor(private passwordService: GuardService) {}

  submit(): void {
    if (this.isLocked) return;

    this.attemptCount++;
    const isValid = this.passwordService.checkPassword(this.password());
    this.error = !isValid;
    this.unlocked.emit(isValid);

    if (!isValid && this.attemptCount >= this.maxAttempts()) {
      this.isLocked = true;
    }
  }

  closeModal(): void {
    this.unlocked.emit(false);
  }


  @ViewChild('content') myTemplate: TemplateRef<any> | undefined;
  private modalService = inject(NgbModal);

  closeResult = '';




  open(content: TemplateRef<any>) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      backdropClass: 'backdrop-class',
      windowClass: 'window-class',
      centered: true
    }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }


  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }

}
