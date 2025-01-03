import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.scss'
})
export class ConfirmationModalComponent implements OnDestroy{
  isVisible = false;
  message = '';
  private confirmAction?: () => void;
  private subscription: Subscription;

  constructor(private modalService: ModalService){
    this.subscription = this.modalService.modalState$.subscribe(({message, onConfirm}) => {
      this.message = message;
      this.confirmAction = onConfirm;
      this.isVisible = true;
    });
  }
  
  confirm() {
    if (this.confirmAction) this.confirmAction();
    this.closeModal();
  }
  
  closeModal() {
    this.isVisible = false;
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
