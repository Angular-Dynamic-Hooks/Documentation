import { NgClass } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-articletoc',
  templateUrl: './articleToc.component.html',
  styleUrls: ['./articleToc.component.scss'],
  imports: [NgClass],
  standalone: true
})
export class ArticleTocComponent implements AfterViewInit {
  @ViewChildren('tocEntry') tocEntryElements: QueryList<ElementRef> = new QueryList();
  public titleElements = document.querySelectorAll('.article > h1, .article > h2, .article > h3, .article > h4') || null;
  public activeTitleId: string|null = null;
  public location = location;

  constructor() {}

  ngAfterViewInit() {
    this.initTocScrollListener();
  }

  private initTocScrollListener() {
    const visibilityStates: Map<string, boolean> = new Map();
    for (const titleElement of this.titleElements!) {
      visibilityStates.set(titleElement.id, false);
    }
  
    const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        visibilityStates.set(entry.target.id, entry.isIntersecting);
      }
  
      const firstVisibleTitle = Array.from(visibilityStates).find(entry => entry[1] === true);
      if (firstVisibleTitle) {
        this.activeTitleId = firstVisibleTitle[0];
      }
    }, {
      rootMargin: "0px",
      threshold: 1.0,
    });
  
    for (const titleElement of this.titleElements!) {
      observer.observe(titleElement);
    }
  }

}