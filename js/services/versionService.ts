import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { catchError, map, shareReplay, switchMap } from "rxjs/operators";

import { InfoService } from "./infoService";
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class VersionService {
  baseUrl = (window as any).baseUrl;
  availableVersions$: Observable<number[]> = this.getAvailableVersions().pipe(shareReplay(1));
  latestVersion$: Observable<number> = this.getLatestVersion().pipe(shareReplay(1));

  constructor(private http: HttpClient, private infoService: InfoService) {
  }

  private getAvailableVersions() {
    return this.infoService.infoJson$.pipe(map(infoJson => {
      const versions: number[] = [];

      for (const page of infoJson.pages) {
        if (page.url.startsWith('/documentation/')) {
          const versionNr = this.getDocsVersionFromUrl(page.url)!;
          if (versionNr && !versions.includes(versionNr)) {
            versions.push(versionNr);
          }
        }
      }
  
      // Sort
      versions.sort();
  
      // Add the current version as +1 of the highest found version
      versions.push(versions[versions.length - 1] + 1);
  
      return versions;   
    }));
  }

  private getLatestVersion() {
    return this.getAvailableVersions().pipe(map(versions => {
      return versions[versions.length - 1];
    }));    
  }

  /**
   * Extracts the version of the specified url
   */
  getDocsVersionFromUrl(url: string): number|null {
    const match = url.match(/\/documentation\/v(\d)\//);
    if (match) {
      return parseInt(match[1]);
    } else {
      return null;
    }
  }

  /**
   * Generates the docs url for the specified version and path
   */
  generateDocsUrl(version: number, docsPath: string = '') {
    return this.getLatestVersion().pipe(map(latestVersion => {
      return this.baseUrl + '/documentation/' + (latestVersion === version ? '' : `v${version}/`) + docsPath;
    }));    
  }
  
  /**
   * Transforms a full docs url to the equivalent of a different version (irrespective if the page actually exists or not)
   */
  transformUrlForDocsVersion(url: string, version: number): Observable<string|null> {
    if (url.includes('/documentation/')) {
      // Don't use regex in case github pages project path is also 'documentation'
      const split = url.split('/documentation/');
      let path = split[split.length - 1];

      // Cut off "/vX/" from front if exists
      const match = path.match(/^(?:v\d+\/)?(.*)/);
      if (match) {
        path = match[1];
      }

      return this.generateDocsUrl(version, path);
    } else {
      return of(null);
    }
  }

  /**
   * Transform a full docs url to the equivalent of a different version and returns it only if the page actually exists.
   * Otherwise, returns the index page for the different version.
   */
  matchUrlForDocsVersion(url: string, version: number) {
    // Get current url adjusted for selected version
    return this.transformUrlForDocsVersion(url, version).pipe(
      // Get info json as well
      switchMap(targetUrl => {
        if (!targetUrl) throwError(() => 'No target url possible');
        return this.infoService.infoJson$.pipe(map(infoJson => ({infoJson, targetUrl})));
      }),
      // Try to find targetUrl in list of existing docs pages
      switchMap(({infoJson, targetUrl}) => {
        let matchingUrl: string|null = null;
        for (const page of infoJson.pages) {
          const testUrl = this.infoService.baseUrl + page.url.replace('.html', '');
          if (testUrl === targetUrl) {
            matchingUrl = testUrl;
            break;
          }
        }

        // Return if found. Otherwise return index page of docs version.
        return of(matchingUrl) || this.generateDocsUrl(version);
      }), 
      catchError(err => {
        return of(null);
      })
    )
  }
}