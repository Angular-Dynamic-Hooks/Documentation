import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';

@Component({
  selector: '.sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true
})
export class SidebarComponent implements AfterViewInit {
  toggleButtonElement = document.querySelector('#sidebar-toggle');
  wrapperElement = document.querySelector('#wrapper');
  articleTitleElements = document.querySelectorAll('.article > h1, .article > h2, .article > h3, .article > h4') || null;
  sidebarIsToggled: boolean = false;

  constructor(private hostElement: ElementRef) {}

  ngAfterViewInit() {
    this.registerToggleFunctionality();
    this.registerSections();
  }

  // Sidebar toggle
  // -------------------------------------------------

  private registerToggleFunctionality() {     

    this.toggleButtonElement!.addEventListener('click', () => {
      if (this.sidebarIsToggled) {
        this.hideSidebar();
      } else {
        this.showSidebar();
      }
    });

    // Clicking outside closes sidebar automatically
    document.addEventListener('click', event => {
      if (!this.toggleButtonElement!.contains(event.target as Node) && !this.hostElement.nativeElement!.contains(event.target as Node)) {
        this.hideSidebar();
      }
    });

    // Resizing to desktop mode also closes it
    window.addEventListener('resize', event => {
      if (this.sidebarIsToggled && window.innerWidth >= 1024) {
        this.hideSidebar();
      }
    });
  }

  private showSidebar() {
    this.sidebarIsToggled = true;
    this.hostElement.nativeElement!.classList.add('toggled');
    this.wrapperElement!.classList.add('locked');
  }

  private hideSidebar() {
    this.sidebarIsToggled = false;
    this.hostElement.nativeElement!.classList.remove('toggled');
    this.wrapperElement!.classList.remove('locked');
  }

  // Sidebar sections
  // -------------------------------------------------

  private registerSections() {
    const sectionsWithChildren: NodeListOf<HTMLElement> = this.hostElement.nativeElement.querySelectorAll('.sidebar-section');
    for (const section of Array.from(sectionsWithChildren)) {
      this.registerSectionToggleButtons(section);
      this.registerSectionScrollListeners(section);
    }
  }

  private registerSectionToggleButtons(section: HTMLElement) {
    const toggleButton = section.querySelector('.sidebar-title-toggle');
    toggleButton?.addEventListener('click', () => {
      if (section!.classList.contains('toggled')) {
        section!.classList.remove('toggled');
      } else {
        section!.classList.add('toggled');
      }
    });
  }

  private registerSectionScrollListeners(section: HTMLElement) {
    if (!section.classList.contains('hasChildren') || !section.classList.contains('active')) {
      return;
    }

    const sidebarTitleElements = section.querySelectorAll('.sidebar-ul .sidebar-link') || null;

    const visibilityStates: {element: Element, link: string; visible: boolean}[] = [];
    for (const sidebarTitleElement of sidebarTitleElements!) {
      if (sidebarTitleElement.hasAttribute('href')) {
        visibilityStates.push({
          element: sidebarTitleElement,
          link: sidebarTitleElement.getAttribute('href')!, 
          visible: false
        });
      }
    }

    const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        const anchorLink = `${ location.pathname.split('#')[0] + '#' + entry.target.id }`;
        const sidebarTitleState = visibilityStates.find(state => state.link === anchorLink);
        if (sidebarTitleState) {
          sidebarTitleState.visible = entry.isIntersecting;
        }
      }

      const firstVisibleTitleState = visibilityStates.find(state => state.visible);
      if (firstVisibleTitleState) {
          // Reset all
          visibilityStates.forEach(state => state.element.closest('.sidebar-li')?.classList.remove('active'));
        
          // Set new title to active
          firstVisibleTitleState.element.closest('.sidebar-li')?.classList.add('active');
      }
    }, {
      rootMargin: "0px",
      threshold: 1.0,
    });

    for (const titleElement of this.articleTitleElements) {
      observer.observe(titleElement);
    }
  }

}
