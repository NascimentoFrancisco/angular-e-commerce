import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modalSubject = new Subject<{
    message: string;
    onConfirm: () => void;
  }>();

  modalState$ = this.modalSubject.asObservable();

  openModal(message: string, onConfirm: () => void) {
    this.modalSubject.next({ message, onConfirm });
  }

}
