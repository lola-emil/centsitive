import { Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [],
  template: `
  <div class="h-screen w-full gap-5 flex justify-center items-center flex-col">
    <p class="text-3xl text-center">
        404 Page Not Found
      </p>

      <a href="/" class="text-center text-blue-500 underline">Back to Home</a>
  </div>
  `,
  styles: ``
})
export class PageNotFoundComponent {

}
