import { Component, Input } from '@angular/core';
import { LoadingHandler } from './loading-handler.class';

@Component({
  selector: 'app-loading-template',
  templateUrl: './loading-template.component.html',
  styleUrls: ['loading-template.component.scss'],
})
export class LoadingTemplateComponent {
  @Input() public loading;

  public STATUS = LoadingHandler.STATUS;
}
