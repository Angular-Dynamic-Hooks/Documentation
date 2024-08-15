import { Component, Input } from '@angular/core';
import { InfoService } from '../../../services/infoService';
import { SafePipe } from '../../../pipes/safe';

@Component({
  selector: 'app-stackblitz',
  templateUrl: './stackblitz.component.html',
  styleUrls: ['./stackblitz.component.scss'],
  imports: [SafePipe],
  standalone: true
})
export class StackblitzComponent{
  @Input() url: string|undefined;  
  @Input() fileQueryParam: string|undefined;
  @Input() image: string|undefined;
  embedQueryParams: string = "embed=1&hideNavigation=1";
  embedLoaded: boolean = false;

  constructor(public infoService: InfoService) {}
}
