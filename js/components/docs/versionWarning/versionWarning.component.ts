import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import { VersionService } from '../../../services/versionService';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: '.version-warning-link',
  templateUrl: './versionWarning.component.html',
  styleUrls: ['./versionWarning.component.scss'],
  standalone: true
})
export class VersionWarningComponent implements AfterViewInit {
  url: string|null = null;

  constructor(private hostElement: ElementRef, private versionService: VersionService) {}

  ngAfterViewInit() {
    this.addLink();
  }

  private async addLink() {
    this.versionService.latestVersion$
    .pipe(
      switchMap(latestVersion => this.versionService.matchUrlForDocsVersion(location.pathname, latestVersion).pipe(map(url => ({latestVersion, url})))),
      switchMap(({latestVersion, url}) => url ? of(url) : this.versionService.generateDocsUrl(latestVersion))
    ).subscribe(url => {
      this.hostElement.nativeElement.setAttribute('href', url)
    });
  }
}
