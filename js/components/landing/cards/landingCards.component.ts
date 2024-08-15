import { AfterViewInit, Component, ElementRef, NgZone } from '@angular/core';
import { gsap } from "gsap";

@Component({
  selector: '.l-cards',
  templateUrl: './landingCards.component.html',
  styleUrls: ['./landingCards.component.scss'],
  standalone: true
})
export class LandingCardsComponent implements AfterViewInit {
  isAtTop: boolean = true;

  constructor(private hostElement: ElementRef, private ngZone: NgZone) {}

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.registerCardsScrollAnimation();
    });
  }
  
  private registerCardsScrollAnimation() {
    const shapeA = this.hostElement.nativeElement.querySelector('.l-cards-shape.a');
    const shapeB = this.hostElement.nativeElement.querySelector('.l-cards-shape.b');
    const shapeC = this.hostElement.nativeElement.querySelector('.l-cards-shape.c');
    const shapeD = this.hostElement.nativeElement.querySelector('.l-cards-shape.d');
  
    gsap.fromTo(shapeA, {
      top: "50%",
    }, {
      top: "0%",
      scrollTrigger: {
        trigger: '.l-cards',  // When no start/end pos defined, defaults to start/end of trigger element
        scrub: 1,
      },
    });
  
    gsap.fromTo(shapeB, {
      top: "60%",
    }, {
      top: "40%",
      scrollTrigger: {
        trigger: '.l-cards',
        scrub: 1,
      },
    });
  
    gsap.fromTo(shapeC, {
      top: "30%",
    }, {
      top: "10%",
      scrollTrigger: {
        trigger: '.l-cards',
        scrub: 1,
      },
    });
  
    gsap.fromTo(shapeD, {
      top: "60%",
    }, {
      top: "40%",
      scrollTrigger: {
        trigger: '.l-cards',
        scrub: 1,
      },
    });
  }
}
