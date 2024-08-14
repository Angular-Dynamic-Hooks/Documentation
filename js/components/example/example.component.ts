import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
  standalone: true
})
export class ExampleComponent{
  @Input() customMessage: string|null = '🚀 Hello from ExampleComponent!';
}
