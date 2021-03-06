import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { GlobalObjectService } from '../services/shared/global-object.service';

@Component({
  selector: 'app-button-down',
  templateUrl: './button-down.component.html',
  styleUrls: ['./button-down.component.css'],
})
export class ButtonDownComponent implements OnInit {
  windowRef: any;
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    windowService: GlobalObjectService
  ) {
    this.windowRef = windowService.getWindow();
  }
  @Input() buttonClass = '';
  @Input() elementHeight: number;

  ngOnInit(): void {
    setTimeout(() => {
      this.buttonClass = 'pulsar';
    }, 5000);
  }

  goToBottom() {
    this.buttonClass = '';
    this.elementHeight = this.elementHeight + 4000;
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: this.elementHeight, behavior: 'smooth' });
      // this.windowRef.scrollTo({ top: this.elementHeight, behavior: 'smooth' });
    }
  }
}
