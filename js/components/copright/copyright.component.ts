import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-copyright',
  templateUrl: './copyright.component.html',
  styleUrls: ['./copyright.component.scss'],
  standalone: true
})
export class CopyrightComponent implements AfterViewInit {
  date = new Date().getFullYear().toString();

  constructor(private hostElement: ElementRef) {
  }

  ngAfterViewInit() {
  }
}
