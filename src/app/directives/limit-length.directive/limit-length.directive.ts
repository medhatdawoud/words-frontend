import { Directive, ElementRef, HostListener, Input } from '@angular/core';
declare var jquery: any;
declare var $: any;

@Directive({
  selector: '[appLimitLength]'
})

export class LimitLengthDirective {
  @Input() maxLength: number;
  @Input() countDown: number;

  textarea = (<HTMLInputElement>document.getElementById('resizableTextarea'));
  textareaContainer = (<HTMLInputElement>document.getElementById('textarea-container'));
  backdrop = (<HTMLInputElement>document.getElementById('backdrop'));
  textareaHighlights = (<HTMLInputElement>document.getElementById('textarea-highlights'));

  // yeah, browser sniffing sucks, but there are browser-specific quirks to handle that are not a matter of feature detection
  ua = window.navigator.userAgent.toLowerCase();
  isIE = !!this.ua.match(/msie|trident\/7|edge/);
  isWinPhone = this.ua.indexOf('windows phone') !== -1;
  isIOS = !this.isWinPhone && !!this.ua.match(/ipad|iphone|ipod/);

  constructor(private el: ElementRef) {
    if (this.isIOS) {
      this.fixIOS();
    }
    this.bindEvents();
  }

  bindEvents() {
    this.textarea.addEventListener('scroll ', this.handleScroll);
    this.textarea.addEventListener('keyup', this.handleScroll);
  }

  @HostListener('keyup') onkeyup() {
    this.highlight();
    let text = this.textarea.value;
    const counterTextElement = document.getElementById('textarea-countdown');
    const valueExceeded = text.substr(this.maxLength, (text.length - this.maxLength));
    if (valueExceeded) {
      if (counterTextElement.className.indexOf('exceed') === -1) {
        counterTextElement.className += ' exceed';
      }
    } else {
      if (counterTextElement.className.indexOf(' exceed') > -1) {
        counterTextElement.className = counterTextElement.className.substr(0, counterTextElement.className.indexOf(' exceed'));
      }
    }
    const valueAllowedValue = text.substr(0, (this.maxLength));
    counterTextElement.innerHTML = this.countDown.toString();
    if (text.length > this.maxLength) {

      text = text.replace(/\n$/g, '\n\n')
        .replace(new RegExp(valueExceeded + '$'), '<mark>$&</mark>');

      if (this.isIE) {
        // IE wraps whitespace differently in a div vs textarea, this fixes it
        text = text.replace(/ /g, ' <wbr>');
      }
      this.textareaHighlights.innerHTML = text;

    } else {
      this.textareaHighlights.innerHTML = null;
    }
  }

  handleScroll() {
    const scrollTop = document.getElementById('resizableTextarea').scrollTop;
    document.getElementById('backdrop').scrollTop = scrollTop;

    const scrollLeft = document.getElementById('resizableTextarea').scrollLeft;
    document.getElementById('backdrop').scrollLeft = scrollLeft;
  }

  fixIOS() {
    // iOS adds 3px of (unremovable) padding to the left and right of a textarea, so adjust highlights div to match
    this.textareaHighlights.setAttribute('style', 'padding-left:+=3px padding-right +=3px');
  }

  highlight() {
    this.countDown = this.maxLength - this.textarea.value.length;
  }
}
