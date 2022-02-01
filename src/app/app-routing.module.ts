import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'signout',
    loadChildren: () => import('./signout/signout.module').then( m => m.SignoutPageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./signin/signin.module').then( m => m.SigninPageModule)
  },
  {
    path: 'announce',
    loadChildren: () => import('./announce/announce.module').then( m => m.AnnouncePageModule)
  },
  {
    path: 'announce-detail',
    loadChildren: () => import('./announce-detail/announce-detail.module').then( m => m.AnnounceDetailPageModule)
  },
  {
    path: 'report',
    loadChildren: () => import('./report/report.module').then( m => m.ReportPageModule)
  },
  {
    path: 'report-detail',
    loadChildren: () => import('./report-detail/report-detail.module').then( m => m.ReportDetailPageModule)
  },
  {
    path: 'form',
    loadChildren: () => import('./form/form.module').then( m => m.FormPageModule)
  },
  {
    path: 'home-new/why',
    loadChildren: () => import('./why/why.module').then( m => m.WhyPageModule)
  },
  {
    path: 'form-step1',
    loadChildren: () => import('./form-step1/form-step1.module').then( m => m.FormStep1PageModule)
  },
  {
    path: 'home-new',
    loadChildren: () => import('./home-new/home-new.module').then( m => m.HomeNewPageModule)
  },
  {
    path: 'form-lists',
    loadChildren: () => import('./form-lists/form-lists.module').then( m => m.FormListsPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 're-password',
    loadChildren: () => import('./re-password/re-password.module').then( m => m.RePasswordPageModule)
  },
  {
    path: 'news',
    loadChildren: () => import('./news/news.module').then( m => m.NewsPageModule)
  },
  {
    path: 'news-detail',
    loadChildren: () => import('./news-detail/news-detail.module').then( m => m.NewsDetailPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then( m => m.ContactPageModule)
  },  {
    path: 'form-step2',
    loadChildren: () => import('./form-step2/form-step2.module').then( m => m.FormStep2PageModule)
  },
  {
    path: 'form-success',
    loadChildren: () => import('./form-success/form-success.module').then( m => m.FormSuccessPageModule)
  },
  {
    path: 'form-complete',
    loadChildren: () => import('./form-complete/form-complete.module').then( m => m.FormCompletePageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'register-success',
    loadChildren: () => import('./register-success/register-success.module').then( m => m.RegisterSuccessPageModule)
  },
  {
    path: 'form-general',
    loadChildren: () => import('./form-general/form-general.module').then( m => m.FormGeneralPageModule)
  },
  {
    path: 'form-two',
    loadChildren: () => import('./form-two/form-two.module').then( m => m.FormTwoPageModule)
  },
  {
    path: 'form-two2',
    loadChildren: () => import('./form-two2/form-two2.module').then( m => m.FormTwo2PageModule)
  },
  {
    path: 'form-general2',
    loadChildren: () => import('./form-general2/form-general2.module').then( m => m.FormGeneral2PageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  }




];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
