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
        path: 'announce-detail',
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
        path: 'form-lists/form-step1/form-step2/:id',
        loadChildren: () => import('../form-step2/form-step2.module').then(m => m.FormStep2PageModule)
      },
      {
        path: 'form/form-step1/:id',
        loadChildren: () => import('../form-step1/form-step1.module').then(m => m.FormStep1PageModule)
      },
      {
        path: 'form/form-step1/form-step2/:id',
        loadChildren: () => import('../form-step2/form-step2.module').then(m => m.FormStep2PageModule)
      },
      {
        path: 'why',
        loadChildren: () => import('../why/why.module').then(m => m.WhyPageModule)
      },
      {
        path: 'form/form-lists/:id',
        loadChildren: () => import('../form-lists/form-lists.module').then(m => m.FormListsPageModule)
      },
      {
        path: 'form/form-lists/:id/form-complete/:id-detail',
        loadChildren: () => import('../form-complete/form-complete.module').then(m => m.FormCompletePageModule)
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
        path: 'news/news-detail/:id',
        loadChildren: () => import('../news-detail/news-detail.module').then(m => m.NewsDetailPageModule)
      },
      {
        path: 'contact',
        loadChildren: () => import('../contact/contact.module').then(m => m.ContactPageModule)
      },
      {
        path: 'register',
        loadChildren: () => import('../register/register.module').then(m => m.RegisterPageModule)
      },
      {
        path: 'register/registertwo',
        loadChildren: () => import('../registertwo/registertwo.module').then(m => m.RegistertwoPageModule)
      },
      {
        path: 'form/form-general/:id',
        loadChildren: () => import('../form-general/form-general.module').then(m => m.FormGeneralPageModule)
      },
      {
        path: 'form/form-general/form-general2/:id',
        loadChildren: () => import('../form-general2/form-general2.module').then(m => m.FormGeneral2PageModule)
      },
      {
        path: 'form/form-two/:id',
        loadChildren: () => import('../form-two/form-two.module').then(m => m.FormTwoPageModule)
      },
      {
        path: 'form/form-two/form-two2/:id',
        loadChildren: () => import('../form-two2/form-two2.module').then(m => m.FormTwo2PageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'form/form',
        loadChildren: () => import('../formone/form/form.module').then(m => m.FormPageModule)
      },
      {
        path: 'form/form/form-step1',
        loadChildren: () => import('../formone/form-step1/form-step1.module').then(m => m.FormStep1PageModule)
      },
      {
        path: 'form/formone-lists/:id',
        loadChildren: () => import('../formone/form-lists/form-lists.module').then(m => m.FormListsPageModule)
      },
      {
        path: 'form/formone-lists/:id/formone-detail/:id',
        loadChildren: () => import('../formone/formone-detail/formone-detail.module').then(m => m.FormoneDetailPageModule)
      },
      {
        path: 'form/formtwo-lists/:id',
        loadChildren: () => import('../formtwo/form-lists/form-lists.module').then(m => m.FormListsPageModule)
      },
      {
        path: 'form/formtwo-lists/:id/formtwo-detail/:id',
        loadChildren: () => import('../formtwo/formtwo-detail/formtwo-detail.module').then(m => m.FormtwoDetailPageModule)
      },
      {
        path: 'form/formthree-lists/:id',
        loadChildren: () => import('../formthree/form-lists/form-lists.module').then(m => m.FormListsPageModule)
      },
      {
        path: 'form/formthree-lists/:id/formthree-lists-detail/:VIL/:MOO/:A1',
        loadChildren: () => import('../formthree/form-lists-detail/form-lists-detail.module').then(m => m.FormListsDetailPageModule)
      },
      {
        path: 'form/formthree-lists/:id/formthree-lists-detail/:VIL/:MOO/:A1/formthree-detail/:id',
        loadChildren: () => import('../formthree/formthree-detail/formthree-detail.module').then(m => m.FormthreeDetailPageModule)
      },
      {
        path: 'report/report-employee',
        loadChildren: () => import('../report-employee/report-employee.module').then(m => m.ReportEmployeePageModule)
      },
      {
        path: 'report/report-head',
        loadChildren: () => import('../report-head/report-head.module').then(m => m.ReportHeadPageModule)
      },
      {
        path: 'report/report-head/report-head-people-type',
        loadChildren: () => import('../report-head-people-type/report-head-people-type.module').then(m => m.ReportHeadPeopleTypePageModule)
      },
      {
        path: 'report/report-head/report-head-people-type/report-head-people/:id',
        loadChildren: () => import('../report-head-people/report-head-people.module').then(m => m.ReportHeadPeoplePageModule)
      },
      {
        path: 'report/report-head/report-head-lists',
        loadChildren: () => import('../report-head-lists/report-head-lists.module').then(m => m.ReportHeadListsPageModule)
      },
      {
        path: 'report/report-admin',
        loadChildren: () => import('../report-admin/report-admin.module').then(m => m.ReportAdminPageModule)
      },
      {
        path: 'report/report-admin/report-admintwo',
        loadChildren: () => import('../report-admintwo/report-admintwo.module').then(m => m.ReportAdmintwoPageModule)
      },
      {
        path: 'form/formone-draft',
        loadChildren: () => import('../formone/form-draft/form-draft.module').then( m => m.FormDraftPageModule)
      },
      {
        path: 'form/formtwo-draft',
        loadChildren: () => import('../formtwo/form-draft/form-draft.module').then( m => m.FormDraftPageModule)
      },
      {
        path: 'form/formthree-draft',
        loadChildren: () => import('../formthree/form-draft/form-draft.module').then( m => m.FormDraftPageModule)
      },
      {
        path: 'explore',
        loadChildren: () => import('../explore/explore.module').then( m => m.ExplorePageModule)
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
