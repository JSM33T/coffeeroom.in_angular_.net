import { Component, OnInit } from '@angular/core';

import lgZoom from 'lightgallery/plugins/zoom';
import { BeforeSlideDetail } from 'lightgallery/lg-events';
import lgFullscreen from 'lightgallery/plugins/fullscreen';
import lgVideo from 'lightgallery/plugins/video';
import lgPager from 'lightgallery/plugins/pager';

interface GalleryItem {
    colSize: number;
    href: string;
    thumbSrc: string;
    altText: string;
    style?: string;
}

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit{
    ngOnInit(): void {
        
    }
    settings: any = {
        counter: false,
        plugins: [lgZoom, lgFullscreen, lgVideo],
        mode: 'lg-slide,lg-events',
        speed: 600,
        thumbnail: true,
        toolbar: {
            enabled: true,
            buttons: [
                {
                    id: 'lg-fullscreen',
                    label: 'Fullscreen',
                    icon: 'lg-fullscreen-icon',
                    tooltip: 'Fullscreen',
                },
                {
                    id: 'lg-zoom-in',
                    label: 'Zoom In',
                    icon: 'lg-zoom-in-icon',
                    tooltip: 'Zoom In',
                },
                {
                    id: 'lg-zoom-out',
                    label: 'Zoom Out',
                    icon: 'lg-zoom-out-icon',
                    tooltip: 'Zoom Out',
                },
                {
                    id: 'lg-play',
                    label: 'Play',
                    icon: 'lg-play-icon',
                    tooltip: 'Play',
                },
                {
                    id: 'lg-pause',
                    label: 'Pause',
                    icon: 'lg-pause-icon',
                    tooltip: 'Pause',
                },
                {
                    id: 'lg-download',
                    label: 'Download',
                    icon: 'lg-download-icon',
                    tooltip: 'Download',
                },
                {
                    id: 'lg-share',
                    label: 'Share',
                    icon: 'lg-share-icon',
                    tooltip: 'Share',
                },
                {
                    id: 'lg-close',
                    label: 'Close',
                    icon: 'lg-close-icon',
                    tooltip: 'Close',
                },
            ],
        },
    };

    onBeforeSlide = (detail: BeforeSlideDetail): void => {
        const { index, prevIndex } = detail;
        console.log(index, prevIndex);
    };
}
