import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NotirequestPage } from './notirequest.page';

describe('NotirequestPage', () => {
  let component: NotirequestPage;
  let fixture: ComponentFixture<NotirequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotirequestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NotirequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
