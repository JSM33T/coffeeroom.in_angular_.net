import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloghomesidepanelComponent } from './bloghomesidepanel.component';

describe('BloghomesidepanelComponent', () => {
  let component: BloghomesidepanelComponent;
  let fixture: ComponentFixture<BloghomesidepanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BloghomesidepanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BloghomesidepanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
