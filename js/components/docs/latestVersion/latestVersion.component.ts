import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-latestversion',
  templateUrl: './latestVersion.component.html',
  styleUrls: ['./latestVersion.component.scss'],
  standalone: true
})
export class LatestVersionComponent {
  lsKey = 'latestVersion';
  version: string|null = null;

  constructor(private http: HttpClient) {
    this.init();
  }

  private async init() {

    if (typeof(Storage) !== "undefined") {
      const lsValue = window.localStorage.getItem(this.lsKey);
      if (lsValue) {
        const cached = JSON.parse(lsValue);
        const oneHour = 60 * 60 * 1000; // ms
        if ((new Date()).getTime() - cached.timestamp < oneHour) {
          this.version = cached.value as string;
        }
      }
    } 
    
    // If not fetched yet or cached version stale, fetch new
    if (!this.version) {
      this.http.get<any>('https://registry.npmjs.org/ngx-dynamic-hooks').subscribe(result => {
        const latestVersion: string = result['dist-tags'].latest;

        if (typeof(Storage) !== "undefined") {
          window.localStorage.setItem(this.lsKey, JSON.stringify({
            timestamp: (new Date).getTime(),
            value: latestVersion
          }));
        }

        this.version = latestVersion;
      });
    }
  }
}
