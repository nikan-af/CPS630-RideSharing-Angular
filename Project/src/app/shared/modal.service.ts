import { Injectable } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  closeResult;
  modalRef;
  loginRef;

  constructor(private modalService: NgbModal, private dataService: DataService) {};

  // opens the modal
  open(content, options: NgbModalOptions = {ariaLabelledBy: 'modal-basic-title'}) {
    this.modalRef = this.modalService.open(content, options);
    this.dataService.loginRef = content;
  }

  // closes the modal
  close(content) {
    this.modalRef.close(content);
  }
}
