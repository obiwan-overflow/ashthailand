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
  },
  {
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
  },
  {
    path: 'formone',
    loadChildren: () => import('./formone/form/form.module').then( m => m.FormPageModule)
  },
  {
    path: 'formone/form-step1',
    loadChildren: () => import('./formone/form-step1/form-step1.module').then( m => m.FormStep1PageModule)
  },
  {
    path: 'formone/form-step1/form-step2',
    loadChildren: () => import('./formone/form-step2/form-step2.module').then( m => m.FormStep2PageModule)
  },
  {
    path: 'formone/form-step1/form-step3',
    loadChildren: () => import('./formone/form-step3/form-step3.module').then( m => m.FormStep3PageModule)
  },
  {
    path: 'formone/form-step1/form-step2/form-step4',
    loadChildren: () => import('./formone/form-step4/form-step4.module').then( m => m.FormStep4PageModule)
  },
  {
    path: 'formone/form-step1/form-step3/form-step4',
    loadChildren: () => import('./formone/form-step4/form-step4.module').then( m => m.FormStep4PageModule)
  },
  {
    path: 'formone/form-step1/form-step2/form-step3/form-step4',
    loadChildren: () => import('./formone/form-step4/form-step4.module').then( m => m.FormStep4PageModule)
  },
  {
    path: 'formone/form-step1/form-step2/form-step4/form-step5',
    loadChildren: () => import('./formone/form-step5/form-step5.module').then( m => m.FormStep5PageModule)
  },
  {
    path: 'formone/form-step1/form-step3/form-step4/form-step5',
    loadChildren: () => import('./formone/form-step5/form-step5.module').then( m => m.FormStep5PageModule)
  },
  {
    path: 'formtwo',
    loadChildren: () => import('./formtwo/form/form.module').then( m => m.FormPageModule)
  },
  {
    path: 'formtwo/form-step1',
    loadChildren: () => import('./formtwo/form-step1/form-step1.module').then( m => m.FormStep1PageModule)
  },
  {
    path: 'formtwo/form-step1/form-step2',
    loadChildren: () => import('./formtwo/form-step2/form-step2.module').then( m => m.FormStep2PageModule)
  },
  {
    path: 'formtwo/form-step1/form-step2/form-step3',
    loadChildren: () => import('./formtwo/form-step3/form-step3.module').then( m => m.FormStep3PageModule)
  },
  {
    path: 'formtwo/form-step1/form-step2/form-step3/form-step4',
    loadChildren: () => import('./formtwo/form-step4/form-step4.module').then( m => m.FormStep4PageModule)
  },
  {
    path: 'formtwo/form-step1/form-step2/form-step3/form-step4/form-step5',
    loadChildren: () => import('./formtwo/form-step5/form-step5.module').then( m => m.FormStep5PageModule)
  },
  {
    path: 'formtwo/form-step1/form-step2/form-step3/form-step4/form-step5/form-step6',
    loadChildren: () => import('./formtwo/form-step6/form-step6.module').then( m => m.FormStep6PageModule)
  },
  {
    path: 'formthree',
    loadChildren: () => import('./formthree/form/form.module').then( m => m.FormPageModule)
  },
  {
    path: 'formthree/form-step1',
    loadChildren: () => import('./formthree/form-step1/form-step1.module').then( m => m.FormStep1PageModule)
  },
  {
    path: 'formthree/form-step1/form-step2',
    loadChildren: () => import('./formthree/form-step2/form-step2.module').then( m => m.FormStep2PageModule)
  },
  {
    path: 'formthree/form-step1/form-step2/form-step3',
    loadChildren: () => import('./formthree/form-step3/form-step3.module').then( m => m.FormStep3PageModule)
  },
  {
    path: 'formthree/form-step1/form-step2/form-step3/form-step3b',
    loadChildren: () => import('./formthree/form-step3b/form-step3b.module').then( m => m.FormStep3bPageModule)
  },
  {
    path: 'form-step4',
    loadChildren: () => import('./formthree/form-step4/form-step4.module').then( m => m.FormStep4PageModule)
  },
  {
    path: 'form-lists',
    loadChildren: () => import('./formone/form-lists/form-lists.module').then( m => m.FormListsPageModule)
  },
  {
    path: 'formone-detail',
    loadChildren: () => import('./formone/formone-detail/formone-detail.module').then( m => m.FormoneDetailPageModule)
  },
  {
    path: 'report-employee',
    loadChildren: () => import('./report-employee/report-employee.module').then( m => m.ReportEmployeePageModule)
  },
  {
    path: 'report-admin',
    loadChildren: () => import('./report-admin/report-admin.module').then( m => m.ReportAdminPageModule)
  },
  {
    path: 'report-head',
    loadChildren: () => import('./report-head/report-head.module').then( m => m.ReportHeadPageModule)
  },
  {
    path: 'report-admintwo',
    loadChildren: () => import('./report-admintwo/report-admintwo.module').then( m => m.ReportAdmintwoPageModule)
  },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
