import { AfterViewInit, Component, ElementRef, NgZone } from '@angular/core';
import { gsap } from "gsap";

@Component({
  selector: '.l-guide',
  templateUrl: './landingGuide.component.html',
  styleUrls: ['./landingGuide.component.scss'],
  standalone: true
})
export class LandingGuideComponent implements AfterViewInit {
  isAtTop: boolean = true;

  constructor(private hostElement: ElementRef, private ngZone: NgZone) {}

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.registerGuideScrollAnimation();
    });
  }
  
  private registerGuideScrollAnimation () {
    const steps = this.hostElement.nativeElement.querySelectorAll('.l-guide-step,.l-guide-arrow');
    for (const step of steps) {
      gsap.fromTo(step, {
        y: 100,
        opacity: 0
      },{
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: step,
          start: 'top bottom+=100px',             // when the top of the trigger hits the bottom of the viewport. +100 to compensate for starting position.
          end: '+=200px',                         // end after scrolling 200px beyond the start
          // scrub: 1,                            // Bind anim progress to scrollbar. takes 1 second to "catch up" to the scrollbar. Disable to just trigger anim on scroll pos.
          toggleActions: "play none none reset"   // Play on trigger, do nothing when leaving, do nothing when entering again backwards and reset when scrolling up past the beginning again
        },
      });
    }
  }
}
