import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BloghomeComponent } from './bloghome.component';
import { BlogviewerComponent } from './blogviewer.component';
import { BloghomesidepanelComponent } from '../../components/bloghomesidepanel.component';

const routes = [
    {
        path: '',
        component: BloghomeComponent,
    },
    { path: 'view', component: BlogviewerComponent },
];

@NgModule({
    declarations: [BloghomeComponent,BlogviewerComponent,BloghomesidepanelComponent],
    imports: [CommonModule, RouterModule.forChild(routes)],
})
export class BlogModule {}
