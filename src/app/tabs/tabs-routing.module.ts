import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'home/announce-detail',
        loadChildren: () => import('../announce-detail/announce-detail.module').then(m => m.AnnounceDetailPageModule)
      },
      {
        path: 'signout',
        loadChildren: () => import('../signout/signout.module').then(m => m.SignoutPageModule)
      },
      {
        path: 'signin',
        loadChildren: () => import('../signin/signin.module').then(m => m.SigninPageModule)
      },
      {
        path: 'announce',
        loadChildren: () => import('../announce/announce.module').then(m => m.AnnouncePageModule)
      },
      {
        path: 'announce/announce-detail',
        loadChildren: () => import('../announce-detail/announce-detail.module').then(m => m.AnnounceDetailPageModule)
      },
      {
        path: 'report',
        loadChildren: () => import('../report/report.module').then(m => m.ReportPageModule)
      },
      {
        path: 'report/report-detail',
        loadChildren: () => import('../report-detail/report-detail.module').then(m => m.ReportDetailPageModule)
      },
      {
        path: 'form',
        loadChildren: () => import('../form/form.module').then(m => m.FormPageModule)
      },
      {
        path: 'form-lists/form-step1',
        loadChildren: () => import('../form-step1/form-step1.module').then(m => m.FormStep1PageModule)
      },
      {
        path: 'form-lists/form-step1/form-step2',
        loadChildren: () => import('../form-step2/form-step2.module').then(m => m.FormStep2PageModule)
      },
      {
        path: 'why',
        loadChildren: () => import('../why/why.module').then(m => m.WhyPageModule)
      },
      {
        path: 'form-lists',
        loadChildren: () => import('../form-lists/form-lists.module').then(m => m.FormListsPageModule)
      },
      {
        path: 're-password',
        loadChildren: () => import('../re-password/re-password.module').then(m => m.RePasswordPageModule)
      },
      {
        path: 'news',
        loadChildren: () => import('../news/news.module').then(m => m.NewsPageModule)
      },
      {
        path: 'news/news-detail',
        loadChildren: () => import('../news-detail/news-detail.module').then(m => m.NewsDetailPageModule)
      },
      {
        path: 'contact',
        loadChildren: () => import('../contact/contact.module').then(m => m.ContactPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/announce',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'home-new',
    loadChildren: () => import('../home-new/home-new.module').then(m => m.HomeNewPageModule)
  },
  {
    path: '',
    redirectTo: 'home-new',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
