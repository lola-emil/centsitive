import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert-dialog',
  standalone: true,
  imports: [],
  template: `
    @if(visible) {
      <div  class="fixed left-0 top-0 h-screen w-full bg-neutral-950/50"></div>
    <div  class="fixed w-9/12 bg-neutral-950 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow p-5">
      <p class="text-lg">{{message}}</p>
      <br>
      <div class="flex gap-5">
        <button (click)="cancel()" class="p-4 bg-neutral-500 w-full rounded hover:scale-105 transition-transform cursor-pointer">Cancel</button>
        <button (click)="confirm()" class="p-4 bg-blue-500 w-full rounded hover:scale-105 transition-transform cursor-pointer">Confirm</button>
      </div>
    </div>
    }
  `,
  styleUrl: './alert-dialog.component.css'
})
export class AlertDialogComponent {

  @Input() message = "";
  @Input() visible = false;

  @Output() onCancel = new EventEmitter();
  @Output() onConfirm = new EventEmitter();

  
  cancel() {
    this.onCancel.emit();
  }

  confirm() {
    this.onConfirm.emit();
  }
}
