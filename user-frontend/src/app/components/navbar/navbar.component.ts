import { Location } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Navigation, Route, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  template: `
    <div class="h-16 flex items-center fixed top-0 left-0 w-full z-40 bg-neutral-950/75 backdrop-blur-md border-b border-neutral-700">
      <div class="container flex gap-4 items-center">
      @if(canPop) {
        <a class="cursor-pointer" (click)="backPage()">
          <svg class="pointer-events-none" width="20" height="20" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15.707 4.293a1 1 0 0 1 0 1.414L9.414 12l6.293 6.293a1 1 0 0 1-1.414 1.414l-7-7a1 1 0 0 1 0-1.414l7-7a1 1 0 0 1 1.414 0Z" fill="#fff"/></svg>
        </a>
      } @else {
        <div class="cursor-pointer" (click)="iconClicked()">
          <svg class="pointer-events-none" width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 17h12a1 1 0 0 1 .117 1.993L15 19H3a1 1 0 0 1-.117-1.993L3 17h12H3Zm0-6h18a1 1 0 0 1 .117 1.993L21 13H3a1 1 0 0 1-.117-1.993L3 11h18H3Zm0-6h15a1 1 0 0 1 .117 1.993L18 7H3a1 1 0 0 1-.117-1.993L3 5h15H3Z" fill="#fff"/></svg>
        </div>
      }
        <p class="font-semibold">{{pageTitle}}</p>
      </div>
    </div>
  `,
  styles: ``
})
export class NavbarComponent {

  constructor(private location: Location) {}

  @Input() pageTitle = "";
  @Output() onIconClicked = new EventEmitter();

  @Input() canPop = false;

  iconClicked() {
    this.onIconClicked.emit();
  }

  backPage() {
    this.location.back();
  }
}
