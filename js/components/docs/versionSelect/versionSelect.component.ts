import { AfterViewInit, Component, ElementRef, Input, NgZone, ViewChild } from '@angular/core';
import { VersionService } from '../../../services/versionService';
import { InfoService } from '../../../services/infoService';
import { NgClass } from '@angular/common';
import { autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-versionselect',
  templateUrl: './versionSelect.component.html',
  styleUrls: ['./versionSelect.component.scss'],
  imports: [NgClass],
  standalone: true
})
export class VersionSelectComponent implements AfterViewInit {
  currentVersion: number|null = null;
  allVersions: number[]|null = null;
  dropdownIsOpen: boolean = false;
  autoUpdateCleanup: (() => void)|null= null;
  @ViewChild('dropdownContainer') dropdownContainerElement: ElementRef|null = null;
  @ViewChild('dropdown') dropdownElement: ElementRef|null = null;

  constructor(public hostElement: ElementRef, public ngZone: NgZone, public infoService: InfoService, public versionService: VersionService) {}

  ngAfterViewInit() {
    // Get version of current page
    this.currentVersion = this.versionService.getDocsVersionFromUrl(location.pathname);
    if (!this.currentVersion) {
      this.versionService.latestVersion$.subscribe(latestVersion => this.currentVersion = latestVersion);
    }

    // Get all versions
    this.versionService.availableVersions$.subscribe(versions => this.allVersions = versions)

    // Always close dropdown in outside click
    document.addEventListener('click', event => {
      if (!this.hostElement.nativeElement.contains(event.target as Element)) {
        this.hideDropdown();
      }
    });
  }

  toggleDropdown() {
    if (!this.dropdownIsOpen) {
      this.showDropdown();
    } else {
      this.hideDropdown();
    }
  }

  showDropdown() {
    this.dropdownIsOpen = true;
    this.dropdownElement!.nativeElement.style.top = '0px';

    // Set initial position
    this.ngZone.runOutsideAngular(() => {
      this.updateDropdownPosition();

      // Automatically runs callback on resize or scroll events. Used to update position.
      this.autoUpdateCleanup = autoUpdate(
        this.hostElement.nativeElement,
        this.dropdownContainerElement!.nativeElement,
        () => {
          if (this.dropdownIsOpen) {
            this.updateDropdownPosition();
          }
        }
      );
    });
  }

  updateDropdownPosition() {
    computePosition(this.hostElement.nativeElement!, this.dropdownContainerElement!.nativeElement, {
      placement: 'bottom-start',
      middleware: [
        offset(10),                         // Spacing between reference element and floating element
        flip(),                             // Flips the placement to the other side if no room
        shift({padding: 5}),                // Shifts the position along specified placement if no room
        // arrow({element: tooltipArrow})   // Gives us positioning info about where exactly to put the tooltip arrow
      ]
    }).then(({x, y, placement, middlewareData}) => {
      Object.assign(this.dropdownContainerElement!.nativeElement.style, {
        left: `${x}px`,
        top: `${y}px`,
      });
    });
  }

  hideDropdown() {
    this.dropdownIsOpen = false;
    this.dropdownElement!.nativeElement.style.top = '5px';

    if (this.autoUpdateCleanup) {
      this.autoUpdateCleanup();
      this.autoUpdateCleanup = null;
    }
  }

  onVersionSelect(version: number) {
    if (version === this.currentVersion) return;

    // Navigate to equivalent url of different version
    this.versionService.matchUrlForDocsVersion(location.pathname, version).pipe(
      switchMap(url => url ? of(url) : this.versionService.generateDocsUrl(version))
    ).subscribe(url => {
      location.pathname = url;
    });    
  }
}