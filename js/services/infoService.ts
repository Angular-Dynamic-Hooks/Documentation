import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, ReplaySubject, switchMap, from } from "rxjs";
import {  } from 'rxjs/operators'

export interface InfoJson {
  pages: {title: string, url: string}[];
}

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  baseUrl = (window as any).baseUrl;
  private infoJsonRequested: boolean = false;
  private _infoJson$: ReplaySubject<InfoJson> = new ReplaySubject();
  get infoJson$() {
    if (!this.infoJsonRequested) {
      this.infoJsonRequested = true;
      this.http.get<InfoJson>(this.baseUrl + '/assets/info.json').subscribe(infoJson => this.infoJson$.next(infoJson));
    }

    return this._infoJson$;
  }

  constructor(private http: HttpClient) {}
}