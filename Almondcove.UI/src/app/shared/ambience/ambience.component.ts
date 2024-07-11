// ambience.component.ts
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-ambience',
  templateUrl: './ambience.component.html',
  styleUrls: ['./ambience.component.css']
})
export class AmbienceComponent implements AfterViewInit {
  @ViewChild('backgroundAudio') backgroundAudio!: ElementRef<HTMLAudioElement>;

  ngAfterViewInit() {
    setTimeout(() => {
      this.backgroundAudio.nativeElement.play();
    }, 10000);
    
  }
}
