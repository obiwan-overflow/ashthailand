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
    path: 'formone/form2',
    loadChildren: () => import('./formone/form2/form2.module').then( m => m.Form2PageModule)
  },
  {
    path: 'formone/form3',
    loadChildren: () => import('./formone/form3/form3.module').then( m => m.Form3PageModule)
  },
  {
    path: 'formone/form4',
    loadChildren: () => import('./formone/form4/form4.module').then( m => m.Form4PageModule)
  },
  {
    path: 'formone/form-step1',
    loadChildren: () => import('./formone/form-step1/form-step1.module').then( m => m.FormStep1PageModule)
  },
  {
    path: 'formone/form-step2',
    loadChildren: () => import('./formone/form-step2/form-step2.module').then( m => m.FormStep2PageModule)
  },
  {
    path: 'formone/form-step3',
    loadChildren: () => import('./formone/form-step3/form-step3.module').then( m => m.FormStep3PageModule)
  },
  {
    path: 'formone/form-step4',
    loadChildren: () => import('./formone/form-step4/form-step4.module').then( m => m.FormStep4PageModule)
  },
  {
    path: 'formone/form-step5',
    loadChildren: () => import('./formone/form-step5/form-step5.module').then( m => m.FormStep5PageModule)
  },
  {
    path: 'formtwo',
    loadChildren: () => import('./formtwo/form/form.module').then( m => m.FormPageModule)
  },
  {
    path: 'formtwo/form2',
    loadChildren: () => import('./formtwo/form2/form2.module').then( m => m.Form2PageModule)
  },
  {
    path: 'formtwo/form3',
    loadChildren: () => import('./formtwo/form3/form3.module').then( m => m.Form3PageModule)
  },
  {
    path: 'formtwo/form4',
    loadChildren: () => import('./formtwo/form4/form4.module').then( m => m.Form4PageModule)
  },
  {
    path: 'formtwo/form-step1',
    loadChildren: () => import('./formtwo/form-step1/form-step1.module').then( m => m.FormStep1PageModule)
  },
  {
    path: 'formtwo/form-step2',
    loadChildren: () => import('./formtwo/form-step2/form-step2.module').then( m => m.FormStep2PageModule)
  },
  {
    path: 'formtwo/form-step3',
    loadChildren: () => import('./formtwo/form-step3/form-step3.module').then( m => m.FormStep3PageModule)
  },
  {
    path: 'formtwo/form-step4',
    loadChildren: () => import('./formtwo/form-step4/form-step4.module').then( m => m.FormStep4PageModule)
  },
  {
    path: 'formtwo/form-step5',
    loadChildren: () => import('./formtwo/form-step5/form-step5.module').then( m => m.FormStep5PageModule)
  },
  {
    path: 'formtwo/form-step6',
    loadChildren: () => import('./formtwo/form-step6/form-step6.module').then( m => m.FormStep6PageModule)
  },
  {
    path: 'formthree',
    loadChildren: () => import('./formthree/form/form.module').then( m => m.FormPageModule)
  },
  {
    path: 'formthree/form2',
    loadChildren: () => import('./formthree/form2/form2.module').then( m => m.Form2PageModule)
  },
  {
    path: 'formthree/form3',
    loadChildren: () => import('./formthree/form3/form3.module').then( m => m.Form3PageModule)
  },
  {
    path: 'formthree/form4/:id',
    loadChildren: () => import('./formthree/form4/form4.module').then( m => m.Form4PageModule)
  },
  {
    path: 'formthree/form-step1/:id',
    loadChildren: () => import('./formthree/form-step1/form-step1.module').then( m => m.FormStep1PageModule)
  },
  {
    path: 'formthree/form-step2/:id',
    loadChildren: () => import('./formthree/form-step2/form-step2.module').then( m => m.FormStep2PageModule)
  },
  {
    path: 'formthree/form-step3/:id',
    loadChildren: () => import('./formthree/form-step3/form-step3.module').then( m => m.FormStep3PageModule)
  },
  {
    path: 'formthree/form-step3b/:id',
    loadChildren: () => import('./formthree/form-step3b/form-step3b.module').then( m => m.FormStep3bPageModule)
  },
  {
    path: 'formthree/form-step4/:id',
    loadChildren: () => import('./formthree/form-step4/form-step4.module').then( m => m.FormStep4PageModule)
  },
  {
    path: 'formthree/form-step4b/:id',
    loadChildren: () => import('./formthree/form-step4b/form-step4b.module').then( m => m.FormStep4bPageModule)
  },
  {
    path: 'formthree/form-step5/:id',
    loadChildren: () => import('./formthree/form-step5/form-step5.module').then( m => m.FormStep5PageModule)
  },
  {
    path: 'formthree/form-step5-count/:id',
    loadChildren: () => import('./formthree/form-step5-count/form-step5-count.module').then( m => m.FormStep5CountPageModule)
  },
  {
    path: 'formthree/form-step6/:id',
    loadChildren: () => import('./formthree/form-step6/form-step6.module').then( m => m.FormStep6PageModule)
  },
  {
    path: 'formthree/form-step6-count/:id',
    loadChildren: () => import('./formthree/form-step6-count/form-step6-count.module').then( m => m.FormStep6CountPageModule)
  },
  {
    path: 'formthree/form-step7/:id',
    loadChildren: () => import('./formthree/form-step7/form-step7.module').then( m => m.FormStep7PageModule)
  },
  {
    path: 'formthree/form-step8/:id',
    loadChildren: () => import('./formthree/form-step8/form-step8.module').then( m => m.FormStep8PageModule)
  },
  {
    path: 'formthree/form-step9/:id',
    loadChildren: () => import('./formthree/form-step9/form-step9.module').then( m => m.FormStep9PageModule)
  },
  {
    path: 'formthree/form-step10/:id',
    loadChildren: () => import('./formthree/form-step10/form-step10.module').then( m => m.FormStep10PageModule)
  },
  {
    path: 'formthree/form-step11/:id',
    loadChildren: () => import('./formthree/form-step11/form-step11.module').then( m => m.FormStep11PageModule)
  },
  {
    path: 'formthree/form-step12/:id',
    loadChildren: () => import('./formthree/form-step12/form-step12.module').then( m => m.FormStep12PageModule)
  },
  {
    path: 'formthree/form-response/:id',
    loadChildren: () => import('./formthree/form-response/form-response.module').then( m => m.FormResponsePageModule)
  },
  {
    path: 'formthree/form-family-lists/:MOO/:VIL/:A1/:status',
    loadChildren: () => import('./formthree/form-family-lists/form-family-lists.module').then( m => m.FormFamilyListsPageModule)
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
  {
    path: 'form-lists',
    loadChildren: () => import('./formtwo/form-lists/form-lists.module').then( m => m.FormListsPageModule)
  },
  {
    path: 'formtwo-detail',
    loadChildren: () => import('./formtwo/formtwo-detail/formtwo-detail.module').then( m => m.FormtwoDetailPageModule)
  },
  {
    path: 'form-lists',
    loadChildren: () => import('./formthree/form-lists/form-lists.module').then( m => m.FormListsPageModule)
  },
  {
    path: 'formthree-detail',
    loadChildren: () => import('./formthree/formthree-detail/formthree-detail.module').then( m => m.FormthreeDetailPageModule)
  },
  {
    path: 'form-draft',
    loadChildren: () => import('./formone/form-draft/form-draft.module').then( m => m.FormDraftPageModule)
  },
  {
    path: 'form-draft',
    loadChildren: () => import('./formtwo/form-draft/form-draft.module').then( m => m.FormDraftPageModule)
  },
  {
    path: 'form-draft',
    loadChildren: () => import('./formthree/form-draft/form-draft.module').then( m => m.FormDraftPageModule)
  },
  {
    path: 'family-lists',
    loadChildren: () => import('./formthree/family-lists/family-lists.module').then( m => m.FamilyListsPageModule)
  },
  {
    path: 'form-lists-detail',
    loadChildren: () => import('./formthree/form-lists-detail/form-lists-detail.module').then( m => m.FormListsDetailPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
