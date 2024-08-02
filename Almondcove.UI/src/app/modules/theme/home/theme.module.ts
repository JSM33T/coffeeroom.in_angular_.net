import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeComponent } from './theme.component';

const routes = [
    {
        path: '',
        component: ThemeComponent,
    },
];

@NgModule({
    declarations: [ThemeComponent],
    imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ThemeModule {}
