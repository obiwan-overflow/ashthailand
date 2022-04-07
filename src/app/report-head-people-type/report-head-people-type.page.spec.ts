import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReportHeadPeopleTypePage } from './report-head-people-type.page';

describe('ReportHeadPeopleTypePage', () => {
  let component: ReportHeadPeopleTypePage;
  let fixture: ComponentFixture<ReportHeadPeopleTypePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportHeadPeopleTypePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportHeadPeopleTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
