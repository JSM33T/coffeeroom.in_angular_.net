import { Component, OnInit } from '@angular/core';
import { APIResponse } from '../core/interfaces/api-response.model';
import { Observable } from 'rxjs';
import { handleResponse } from '../library/utility/response-handler';
import { HttpService } from '../core/services/http.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
    selector: 'app-bloghomesidepanel',
    template: `
        <!-- Sidebar (offcanvas on sreens < 992px) -->
        <div class="offcanvas-lg offcanvas-end" id="sidebarBlog">
            <div class="offcanvas-header">
                <h4 class="offcanvas-title">Sidebar</h4>
                <button class="btn-close ms-auto" type="button" data-bs-dismiss="offcanvas" data-bs-target="#sidebarBlog" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <!-- Search box -->
                <div class="position-relative mb-4 mb-lg-5">
                    <i class="ai-search position-absolute top-50 start-0 translate-middle-y ms-3"></i>
                    <input class="form-control ps-5" [formControl]="searchControl" type="search" placeholder="Enter keyword" />
                </div>
                <h4 class="pt-1 pt-lg-0 mt-lg-n2">Categories:</h4>
                <ul class="nav flex-column mb-lg-5 mb-4">
                    <li class="mb-2">
                        <a class="nav-link d-flex p-0" [routerLink]="['/blogs']">
                            All
                            <span class="fs-sm text-body-secondary ms-2">(n)</span>
                        </a>
                    </li>
                    <li class="mb-2" *ngFor="let category of blogCategories; let i = index">
                        <a class="nav-link d-flex p-0" [class.active]="false" [routerLink]="['/blogs']" [queryParams]="{ category: category.slug }">
                            {{ category.name }}
                            <span class="fs-sm text-body-secondary ms-2">({{ category.blogCount }})</span>
                        </a>
                    </li>
                </ul>
                <h4 class="pt-1 pt-lg-0 mt-lg-n2">Years:</h4>
                <ul class="nav flex-column mb-lg-5 mb-4">
                    <li class="mb-2">
                        <a class="nav-link d-flex p-0" [routerLink]="['/blogs']">
                            All
                            <!-- <span class="fs-sm text-body-secondary ms-2">()</span> -->
                        </a>
                    </li>
                    <li class="mb-2" *ngFor="let year of years; let i = index">
                        <a class="nav-link d-flex p-0" [class.active]="false" [routerLink]="['/blogs']" [queryParams]="{ year: year }">
                            {{ year }}
                            <!-- <span class="fs-sm text-body-secondary ms-2">()</span> -->
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    `,
})
export class BloghomesidepanelComponent implements OnInit {
    isLoading = true;
    searchControl = new FormControl('');
    blogCategories: any = [];
    years: number[] = [2023, 2024];
    constructor(private httpService: HttpService,private router : Router) {}
    ngOnInit(): void {
        this.loadCategories();
        this.setupSearchListener();
    }

    loadCategories() {
        const response$: Observable<APIResponse<any>> = this.httpService.get('api/blogs/blogcategories');
        handleResponse(response$, false).subscribe({
            next: (response) => {
                this.isLoading = false;
                if (response.status == 200) {
                    this.blogCategories = response.data;
                }
            },
            error: () => {
                this.isLoading = false;
            },
        });
    }
    setupSearchListener() {
        
        this.searchControl.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged()
        ).subscribe(searchTerm => {
            if (searchTerm) {
                this.router.navigate(['/blogs'], { queryParams: { search: searchTerm } });
            } else {
                this.router.navigate(['/blogs']);
            }
        });
    }
}
