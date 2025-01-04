import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from '../../services/modal/modal.service';
import { CircularProgressComponent } from "../circular-progress/circular-progress.component";

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [CircularProgressComponent],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.scss'
})
export class ConfirmationModalComponent implements OnDestroy{
  isVisible = false;
  message = '';
  private confirmAction?: () => void;
  private subscription: Subscription;
  public confirmClicked = false;

  constructor(private modalService: ModalService){
    this.subscription = this.modalService.modalState$.subscribe(({message, onConfirm}) => {
      this.message = message;
      this.confirmAction = onConfirm;
      this.isVisible = true;
    });
  }
  
  confirm() {
    if (this.confirmAction){
      this.confirmClicked = true;
      this.confirmAction();
      this.closeModal();
    }
  }
  
  closeModal() {
    this.isVisible = false;
    this.confirmClicked = false;
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
