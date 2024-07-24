import { Component, OnInit } from '@angular/core';
import InitAnimateOnScroll from '../../../library/invokers/animate-on-scroll';
import InitSmoothScroll from '../../../library/invokers/smooth-scroll';
import { HttpService } from '../../../core/services/http.service';
import { APIResponse } from '../../../core/interfaces/api-response.model';
import { Observable } from 'rxjs';
import { handleResponse } from '../../../library/utility/response-handler';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-bloghome',
    templateUrl : './bloghome.component.html'
})
export class BloghomeComponent implements OnInit {
    isLoading = false;
    blogs: any[] = [];
    cover : string = environment.apiUrl;

    constructor(private httpService: HttpService) {}
    ngOnInit(): void {
        InitAnimateOnScroll();
        InitSmoothScroll();
        this.loadBlogs();
    }

    loadBlogs() {
        const response$: Observable<APIResponse<any>> = this.httpService.get('api/blogs/top-5-blogs');
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
