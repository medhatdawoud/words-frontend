import { Directive, ElementRef, Renderer, Input, TemplateRef, ViewContainerRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[bw-pattern]'
})
export class PatternComponent {
  @Input('bw-pattern') imgUrl = { value: '', pattern: '' };
  typingTimer;
  constructor() {
    //renderer.setElementStyle(el.nativeElement,'backgroundColor','red');
  }
  @HostListener('keyup') onkeyup() {
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      if (this.imgUrl.value.match(this.imgUrl.pattern)) {
        console.log(this.imgUrl.pattern, "Successful match", this.imgUrl.value);
      } else {
        console.log(this.imgUrl.pattern, "No match", this.imgUrl.value);
      }
    }, 2000);

  }
  @HostListener('keydown') onkeydown() {
    clearTimeout(this.typingTimer);
  }

}
