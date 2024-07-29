import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BloghomeComponent } from './home/bloghome.component';
import { BlogviewerComponent } from './viewer/blogviewer.component';
import { BloghomesidepanelComponent } from '../../components/bloghomesidepanel.component';
import { BlogContainerDirective } from '../../core/directives/blog-container-directive.directive';
import { ReactiveFormsModule } from '@angular/forms';

const routes = [
    {
        path: '',
        component: BloghomeComponent,
    },
    { path: 'view/:slug', component: BlogviewerComponent }    
];

@NgModule({
    declarations: [BloghomeComponent, BlogviewerComponent, BloghomesidepanelComponent, BlogContainerDirective],
    imports: [CommonModule,ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class BlogModule {}
