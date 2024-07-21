import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import InitAnimateOnScroll from '../../library/invokers/animate-on-scroll';
import InitSmoothScroll from '../../library/invokers/smooth-scroll';
import { HttpService } from '../../core/services/http.service';
import { Observable } from 'rxjs';
import { handleResponse } from '../../library/utility/response-handler';
import { APIResponse } from '../../core/interfaces/api-response.model';
import { ActivatedRoute } from '@angular/router';
import lightgalleryToImage from '../../library/utility/lightgalleryToImage';
import { deinitializeLightGallery, initializeLightGallery } from '../../library/invokers/lightgallery';

@Component({
    selector: 'app-blogviewer',
    template: `
        <!-- Page container-->
        <section class="container pt-5 mt-5">
            <!-- Breadcrumb-->
            <nav aria-label="breadcrumb">
                <ol class="pt-lg-3 pb-lg-4 pb-2 breadcrumb">
                    <li class="breadcrumb-item"><a routerLink="/">Home</a></li>
                    <li class="breadcrumb-item"><a routerLink="/blogs">Blog</a></li>
                    <li class="breadcrumb-item active" aria-current="page">
                        <span *ngIf="!isLoading; else placeholder">{{ blogTitle }}</span>
                        <ng-template #placeholder>
                            <span class="placeholder glow col-sm-12 bg-primary w-200"></span>
                        </ng-template>
                    </li>
                </ol>
            </nav>

            <div class="row">
                <div class="col-lg-9 col-xl-8 pe-lg-4 pe-xl-0">
                    <!-- Post title + post meta -->
                    <h1 class="pb-2 pb-lg-3">{{ blogTitle }}</h1>
                    <div class="d-flex flex-wrap align-items-center justify-content-between border-bottom mb-4">
                        <div class="d-flex align-items-center mb-4 me-4">
                            <span class="fs-sm me-2">By:</span>
                            <ng-container *ngFor="let author of authors; let last = last">
                              
                                    <a class="nav-link position-relative fw-semibold p-0" [routerLink]="'/user/' + author.username">
                                        {{ author.firstName + ' ' + author.lastName }}
                                    </a>
                                    <span *ngIf="!last" class="fw-semibold">,&nbsp;</span>
                               
                            </ng-container>

                            
                        </div>
                        <div class="d-flex align-items-center mb-4">
                            <span class="fs-sm me-2">Share post:</span>
                            <div class="d-flex">
                                <a class="nav-link p-2 me-2" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Instagram" aria-label="Instagram">
                                    <i class="ai-instagram"></i>
                                </a>
                                <a class="nav-link p-2 me-2" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Facebook" aria-label="Facebook">
                                    <i class="ai-facebook"></i>
                                </a>
                                <a class="nav-link p-2 me-2" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Telegram" aria-label="Telegram">
                                    <i class="ai-telegram fs-sm"></i>
                                </a>
                                <a class="nav-link p-2" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="X" aria-label="X">
                                    <i class="ai-x"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Post content -->
                    <div class="blogContainer" appBlogContainer>
                        <div data-aos="fade-in" data-aos-duration="500" *ngIf="!isLoading; else contentPlaceholder" [innerHTML]="blogContent"></div>
                        <ng-template #contentPlaceholder>
                            <div class="card " aria-hidden="true">
                                <div class="position-relative placeholder-wave">
                                    <div class="card-img-top placeholder ratio ratio-16x9"></div>
                                    <i class="ai-image position-absolute top-50 start-50 translate-middle fs-1 opacity-50"></i>
                                </div>
                                <div class="card-body">
                                    <h5 class="card-title placeholder-glow">
                                        <span class="placeholder col-6"></span>
                                        <span class="visually-hidden">Heading</span>
                                    </h5>
                                    <p class="card-text placeholder-glow">
                                        <span class="placeholder placeholder-sm col-7 me-2"></span>
                                        <span class="placeholder placeholder-sm col-4"></span>
                                        <span class="placeholder placeholder-sm col-4 me-2"></span>
                                        <span class="placeholder placeholder-sm col-6"></span>
                                        <span class="placeholder placeholder-sm col-8"></span>
                                    </p>
                                    <a href="#" tabindex="-1" class="btn btn-primary disabled placeholder col-6 placeholder-wave"></a>
                                </div>
                            </div>
                        </ng-template>
                    </div>

                    <!-- Tags -->
                    <div class="d-flex flex-wrap pb-5 pt-3 pt-md-4 pt-xl-5 mt-xl-n2">
                        <h3 class="h6 py-1 mb-0 me-4">Relevant tags:</h3>
                        <a class="nav-link fs-sm py-1 px-0 me-3" href="#">
                            <span class="text-primary">#</span>
                            Inspiration
                        </a>
                        <a class="nav-link fs-sm py-1 px-0 me-3" href="#">
                            <span class="text-primary">#</span>
                            Travel
                        </a>
                        <a class="nav-link fs-sm py-1 px-0 me-3" href="#">
                            <span class="text-primary">#</span>
                            Books
                        </a>
                    </div>
                </div>

                <!-- Sidebar (offcanvas on sreens < 992px) -->
                <aside class="col-lg-3 offset-xl-1">
                    <div class="offcanvas-lg offcanvas-end" id="sidebar">
                        <div class="offcanvas-header">
                            <h4 class="offcanvas-title">Sidebar</h4>
                            <button class="btn-close ms-auto" type="button" data-bs-dismiss="offcanvas" data-bs-target="#sidebar" aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body">
                            <!-- Relevant topics -->
                            <h4 class="pt-3 pt-lg-1 mb-4">Tags:</h4>
                            <div class="d-flex flex-wrap mt-n3 ms-n3 mb-lg-5 mb-4 pb-3 pb-lg-0">
                                <a class="btn btn-outline-secondary rounded-pill mt-3 ms-3 disabled" href="#">Reading</a>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </section>

        <!-- Sidebar toggle button -->
        <button class="d-lg-none btn btn-sm fs-sm btn-primary w-100 rounded-0 fixed-bottom" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebar">
            <i class="ai-layout-column me-2"></i>
            Sidebar
        </button>
    `,
})
export class BlogviewerComponent implements OnInit, AfterViewInit, OnDestroy {
    blogTitle: string = '';
    blogContent: string = '';
    authors: any | undefined;
    isLoading = true;

    constructor(private httpService: HttpService, private route: ActivatedRoute) {}
    ngOnDestroy(): void {
        // deinitializeLightGallery();
    }

    ngOnInit(): void {
        InitAnimateOnScroll();
        InitSmoothScroll();
        this.route.paramMap.subscribe((params) => {
            const slug = params.get('slug');
            if (slug) {
                this.loadBlog(slug);
            }
        });
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            // lightgalleryToImage();
            // initializeLightGallery();
            console.log('dpef');
        }, 100);
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
                }
            },
            error: () => {
                this.isLoading = false;
            },
        });
    }
}