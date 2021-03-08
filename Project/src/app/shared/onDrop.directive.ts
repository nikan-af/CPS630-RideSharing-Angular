import { Directive, Input, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
    selector: '[onDrop]'
})
export class OnDrop {
    @Output() onDropEvent = new EventEmitter();

    constructor() { }

    @HostListener('dragover', ['$event'])
    onDragOver(event) {
        event.preventDefault();
    }

    @HostListener('drop', ['$event'])
    onDrop(event) {
        const order = JSON.parse(event.dataTransfer.getData("text"));
        this.onDropEvent.emit(order);
    }
}