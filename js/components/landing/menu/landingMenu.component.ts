import { AfterViewInit, Component, ElementRef, NgZone } from '@angular/core';

@Component({
  selector: '.l-header',
  templateUrl: './landingMenu.component.html',
  styleUrls: ['./landingMenu.component.scss'],
  standalone: true
})
export class LandingMenuComponent implements AfterViewInit {
  isAtTop: boolean = true;

  constructor(private hostElement: ElementRef, private ngZone: NgZone) {}

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.checkScrollPos();

      document.addEventListener('scroll', event => {
        this.checkScrollPos();
      })
    });
  }

  checkScrollPos() {
    const scrollPos = document.scrollingElement!.scrollTop;
    const header = this.hostElement.nativeElement;

    if (scrollPos > 0 && !header.classList.contains('opaque')) {
      header!.classList.add('opaque');
    } else if (scrollPos === 0 && header!.classList.contains('opaque')) {
      header!.classList.remove('opaque');
    }
  }
}
