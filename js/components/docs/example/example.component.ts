import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
  imports: [NgClass],
  standalone: true
})
export class ExampleComponent{
  @Input() message: string|null = '🚀 Hello from ExampleComponent!';
  animationActive: boolean = false;

  onClick() {
    if (!this.animationActive) {
      this.animationActive = true;
      setTimeout(() => {
        this.animationActive = false;
      }, 300)
    }
  }
}
