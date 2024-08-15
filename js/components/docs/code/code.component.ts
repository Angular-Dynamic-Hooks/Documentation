import { Component, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'pre.highlight',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss'],
  standalone: true
})
export class CodeComponent{
  buttonTextContent = '📄 Copy';

  constructor(private hostElement: ElementRef) {}

  onButtonClick() {
    const copyText = this.hostElement.nativeElement.querySelector('code')!.textContent!;
    navigator.clipboard.writeText(copyText);
    this.buttonTextContent = 'Copied!';
  }

  onButtonLeave() {
    this.buttonTextContent = '📄 Copy';
  }
}
