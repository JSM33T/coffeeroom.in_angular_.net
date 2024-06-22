import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import InitLightGallery from '../../../library/invokers/light-gallery';

@Component({
    selector: 'app-album',
    templateUrl: './album.component.html',
    styleUrls: ['./album.component.css'],
})
export class AlbumComponent implements OnInit, AfterViewInit {
    images: any[] = [];

    constructor(
        private route: ActivatedRoute,
        private http: HttpClient,
    ) {}
    ngAfterViewInit(): void {
      
    }

    ngOnInit() {
        const slug = this.route.snapshot.paramMap.get('slug');
        if (slug) {
            this.loadImages(slug);
        }
    }

    loadImages(slug: string) {
        this.http.get<any[]>(`https://localhost:7009/content/gallery/${slug}.json`).subscribe(
            (data) => (this.images = data),
            (error) => console.error('Could not load images:', error),
        );
    }
}
