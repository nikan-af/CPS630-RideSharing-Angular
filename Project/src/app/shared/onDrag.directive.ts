import { Directive, Input, HostListener, Output, EventEmitter, Host } from '@angular/core';

@Directive({
    selector: '[onDrag]'
})
export class OnDrag {
    @Output() onDragStartEvent = new EventEmitter();
    @Input() order;

    constructor() { }

    @HostListener('dragstart', ['$event'])
    onDragStart(event) {
        console.log(this.order);
        event.dataTransfer.setData("text/plain", JSON.stringify(this.order));
    }
}