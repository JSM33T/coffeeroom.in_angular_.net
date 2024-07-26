import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { HttpService } from '../../../core/services/http.service';
import { Observable } from 'rxjs';
import { handleResponse } from '../../../library/utility/response-handler';
import { APIResponse } from '../../../core/interfaces/api-response.model';
import { ActivatedRoute } from '@angular/router';
import lightgalleryToImage from '../../../library/utility/lightgalleryToImage';
import { deinitializeLightGallery, initializeLightGallery } from '../../../library/invokers/lightgallery';

@Component({
    selector: 'app-blogviewer',
 templateUrl: './blogviewer.component.html'
})
export class BlogviewerComponent implements OnInit, AfterViewInit, OnDestroy {
    blogTitle: string = '';
    blogContent: string = '';
    blogTags: string = '';
    authors: any | undefined;
    isLoading = true;
    tags: string[] = [];

    constructor(private httpService: HttpService, private route: ActivatedRoute) {}
    ngOnDestroy(): void {
        deinitializeLightGallery();
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            const slug = params.get('slug');
            if (slug) {
                this.loadBlog(slug);
            }
        });
    }

    ngAfterViewInit(): void {
        setTimeout(() => {}, 200);
    }

    loadBlog(slug: string) {
        const response$: Observable<APIResponse<any>> = this.httpService.get(`api/blogs/blog-details/${slug}`);
        handleResponse(response$, false).subscribe({
            next: (response) => {
                this.isLoading = false;
                if (response.status == 200) {
                    console.log(response.data);
                    this.blogTitle = response.data.title;
                    this.blogContent = response.data.contentMD;
                    this.authors = response.data.authors;
                    this.blogTags = response.data.tags;
                    this.tags = this.blogTags.split(',').map((tag) => tag.trim());
                    setTimeout(() => {
                        lightgalleryToImage('blogContainer');
                        initializeLightGallery();
                    }, 1000);
                }
            },
            error: () => {
                this.isLoading = false;
            },
        });
    }
}
