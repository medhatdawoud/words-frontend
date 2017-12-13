import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[bw-pattern]',
})
export class PatternComponent {

  // patterns= {imgUrl: "^https?://(?:[a-z0-9\-]+\.)+[a-z0-9]{2,6}(?:/[^/#?]+)+\.(?:jpg|gif|png|jpeg|svg)$"};
  constructor(private el: ElementRef, private renderer: Renderer) {
    renderer.setElementStyle(el.nativeElement,'backgroundColor','red');
  }

}
