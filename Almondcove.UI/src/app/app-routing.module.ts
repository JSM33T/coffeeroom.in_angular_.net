import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './modules/base/about.component';
import { HomeComponent } from './modules/base/home.component';
import { ContactComponent } from './modules/base/contact.component';
import { FaqComponent } from './modules/base/faq.component';
import { ThemeComponent } from './modules/base/theme.component';

const routes: Routes = [
    {
        path: 'about',
        component: AboutComponent,
    },
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'contact',
        component: ContactComponent,
    },
    {
        path: 'faq',
        component: FaqComponent,
    },
    {
        path: 'theme',
        component: ThemeComponent,
    },
    {
        path: 'blog',
        loadChildren: () => import('./modules/blog/blog.module').then((m) => m.BlogModule),
    },
    {
        path: 'auth',
        loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
