import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import InitAnimateOnScroll from '../../../library/invokers/animate-on-scroll';
import InitSmoothScroll from '../../../library/invokers/smooth-scroll';
import { HttpService } from '../../../core/services/http.service';
import { APIResponse } from '../../../core/interfaces/api-response.model';
import { Observable } from 'rxjs';
import { handleResponse } from '../../../library/utility/response-handler';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-bloghome',
    templateUrl: './bloghome.component.html'
})
export class BloghomeComponent implements OnInit {
    isLoading = false;
    blogs: any[] = [];
    cover: string = environment.apiUrl;
    currentCategory: string | null = null;
    currentTag: string | null = null;
    currentYear: number | null = null;
    searchTerm: string = '';

    constructor(
        private httpService: HttpService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        InitAnimateOnScroll();
        InitSmoothScroll();

        // Subscribe to query params changes
        this.route.queryParams.subscribe(params => {
            this.currentCategory = params['category'] || null;
            this.currentTag = params['tag'] || null;
            this.currentYear = params['year'] ? parseInt(params['year']) : null;
            this.searchTerm = params['search'] || '';
            this.loadBlogs();
        });
    }

   
    loadBlogs() {
        this.isLoading = true;
        let endpoint = 'api/blogs';
    
        // Build query parameters
        let queryParams: string[] = [];
        if (this.currentCategory) queryParams.push(`category=${this.currentCategory}`);
        if (this.currentTag) queryParams.push(`tag=${this.currentTag}`);
        if (this.currentYear) queryParams.push(`year=${this.currentYear}`);
        if (this.searchTerm) queryParams.push(`search=${this.searchTerm}`);
    
        // Join query parameters
        const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';
    
        // Make the GET request with the constructed URL
        const response$: Observable<APIResponse<any>> = this.httpService.get(`${endpoint}${queryString}`);
    
        handleResponse(response$, false).subscribe({
            next: (response) => {
                this.isLoading = false;
                if (response.status == 200) {
                    this.blogs = response.data;
                }
            },
            error: () => {
                this.isLoading = false;
            },
        });
    }
}