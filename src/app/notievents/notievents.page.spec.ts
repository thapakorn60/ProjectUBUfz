import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NotieventsPage } from './notievents.page';

describe('NotieventsPage', () => {
  let component: NotieventsPage;
  let fixture: ComponentFixture<NotieventsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotieventsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NotieventsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
