import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-shared-modal',
  templateUrl: './modal.component.html',
  styles: [],
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() show: boolean = false
  @Input() width: string = "mw-600px"
  @Input() title: string = "Modal"
  @Output() toggleModal = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    this.toggleModal.emit();
  }

}
