import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'app-ambience',
    templateUrl: './ambience.component.html',
    styleUrls: ['./ambience.component.css'],
})
export class AmbienceComponent implements AfterViewInit {
    @ViewChild('backgroundAudio') backgroundAudio!: ElementRef<HTMLAudioElement>;
    isPlaying: boolean = false;

    ngAfterViewInit() {
        // setTimeout(() => {
        //     this.play();
        // }, 10000);
    }

    play() {
        this.backgroundAudio.nativeElement.play();
        this.isPlaying = true;
    }

    pause() {
        this.backgroundAudio.nativeElement.pause();
        this.isPlaying = false;
    }

    togglePlayPause() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }
}