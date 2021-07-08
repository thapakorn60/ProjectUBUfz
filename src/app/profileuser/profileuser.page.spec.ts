import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfileuserPage } from './profileuser.page';

describe('ProfileuserPage', () => {
  let component: ProfileuserPage;
  let fixture: ComponentFixture<ProfileuserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileuserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileuserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
