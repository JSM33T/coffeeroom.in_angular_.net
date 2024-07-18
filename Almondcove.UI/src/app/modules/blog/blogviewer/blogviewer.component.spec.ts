import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogviewerComponent } from './blogviewer.component';

describe('BlogviewerComponent', () => {
    let component: BlogviewerComponent;
    let fixture: ComponentFixture<BlogviewerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BlogviewerComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(BlogviewerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
