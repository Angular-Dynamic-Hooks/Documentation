import { NgClass } from '@angular/common';
import { AfterViewInit, Component, Input } from '@angular/core';
import { InfoService } from '../../../services/infoService';

@Component({
  selector: 'app-darkmode',
  templateUrl: './darkmode.component.html',
  styleUrls: ['./darkmode.component.scss'],
  imports: [NgClass],
  standalone: true
})
export class DarkModeComponent implements AfterViewInit {
  darkmodeIsActive: boolean = false;
  sunIcon = this.infoService.baseUrl + "/assets/images/sun.svg";
  moonIcon = this.infoService.baseUrl + "/assets/images/halfmoon.svg";

  constructor(private infoService: InfoService) {}

  ngAfterViewInit() {
    this.updateStatus();  
  }

  private updateStatus() {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme && currentTheme === 'dark') {
      this.setDarkmode(true);
    } else {
      this.setDarkmode(false);
    }
  }
  
  public setDarkmode(active: boolean) {
    if (active) {
      document.documentElement.setAttribute("data-theme", 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute("data-theme", 'light');
      localStorage.setItem('theme', 'light');
    }

    this.darkmodeIsActive = active;
  }

}