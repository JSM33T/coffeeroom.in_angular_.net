import { Component, OnInit } from '@angular/core';
import InitAnimateOnScroll from '../../library/invokers/animate-on-scroll';
import InitSmoothScroll from '../../library/invokers/smooth-scroll';
import { HttpService } from '../../core/services/http.service';
import { APIResponse } from '../../core/interfaces/api-response.model';
import { Observable } from 'rxjs';
import { handleResponse } from '../../library/utility/response-handler';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-bloghome',
    template: `
        <!-- Page container -->
        <div class="container pt-5 pb-lg-5 pb-md-4 pb-2 my-5">
            <!-- Breadcrumb -->

            <nav aria-label="breadcrumb">
                <ol class="pt-lg-3 pb-lg-4 pb-2 breadcrumb">
                    <li class="breadcrumb-item">
                        <a routerLink="/" data-aos="flip-up" data-aos-duration="500">Home</a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page" data-aos="flip-down" data-aos-duration="900">Blog</li>
                </ol>
            </nav>

            <div class="row mb-md-2 mb-xl-4">
                <!-- Blog posts -->
                <div class="col-lg-9 pe-lg-4 pe-xl-5">
                    <h1 class="pb-3 pb-lg-4" data-aos="fade-in" data-aos-duration="900">Blogs (ID)</h1>

                    <!-- Post -->
                    <div *ngFor="let blog of blogs">
                        <article class="row g-0 border-0 mb-4">
                            <a class="col-sm-5 bg-repeat-0 bg-size-cover bg-position-center rounded-5" [routerLink]="'/blogs/view/' + blog.slug"
                            [style.backgroundImage]="'url(' + cover +'/content/blogs/' + blog.slug + '/cover.webp)'" style="min-height: 14rem" aria-label="Post image"></a>
                            <div class="col-sm-7">
                                <div class="pt-4 pb-sm-4 ps-sm-4 pe-lg-4">
                                    <h3>
                                        <!-- <a [routerLink]="'blog/2024?id=' + blog.id">{{ blog.title }}</a> -->
                                        <a routerLink='/blogs/view'>{{ blog.title }}</a>
                                    </h3>
                                    <p class="d-sm-none d-md-block">{{ blog.description }}</p>
                                    <div class="d-flex flex-wrap align-items-center mt-n2">
                                        <a class="nav-link text-body-secondary fs-sm fw-normal p-0 mt-2 me-3" href="#">
                                            {{ blog.shares }}
                                            <i class="ai-share fs-lg ms-1"></i>
                                        </a>
                                        <a class="nav-link text-body-secondary fs-sm fw-normal d-flex align-items-end p-0 mt-2" href="#">
                                            {{ blog.comments }}
                                            <i class="ai-message fs-lg ms-1"></i>
                                        </a>
                                        <span class="fs-xs opacity-20 mt-2 mx-3">|</span>
                                        <span class="fs-sm text-body-secondary mt-2">{{ blog.timeAgo }}</span>
                                        <span class="fs-xs opacity-20 mt-2 mx-3">|</span>
                                        <a class="badge text-nav fs-xs border mt-2" href="#">{{ blog.category }}</a>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                    <!-- Pagination -->
                    <div class="row gy-3 align-items-center mt-lg-5 pt-2 pt-md-4 pt-lg-0">
                        <div class="col col-md-4 col-6 order-md-1 order-1">
                            <div class="d-flex align-items-center">
                                <span class="text-body-secondary fs-sm">Show</span>
                                <select class="form-select form-select-flush w-auto">
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                    <option value="25">25</option>
                                </select>
                            </div>
                        </div>
                        <div class="col col-md-4 col-12 order-md-2 order-3 text-center">
                            <button class="btn btn-primary w-md-auto w-100" type="button">Load more posts</button>
                        </div>
                        <div class="col col-md-4 col-6 order-md-3 order-2">
                            <nav aria-label="Page navigation">
                                <ul class="pagination pagination-sm justify-content-end">
                                    <li class="page-item active" aria-current="page">
                                        <span class="page-link">
                                            1
                                            <span class="visually-hidden">(current)</span>
                                        </span>
                                    </li>
                                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                                    <li class="page-item"><a class="page-link" href="#">4</a></li>
                                    <li class="page-item"><a class="page-link" href="#">5</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
                <aside class="col-lg-3">
                    <app-bloghomesidepanel></app-bloghomesidepanel>
                </aside>
            </div>
        </div>

        <!-- Sidebar toggle button -->
        <button class="d-lg-none btn btn-sm fs-sm btn-primary w-100 rounded-0 fixed-bottom" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarBlog">
            <i class="ai-layout-column me-2"></i>
            Sidebar
        </button>
    `,
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
