import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopoverOptionsPage } from './popover-options.page';

describe('PopoverOptionsPage', () => {
  let component: PopoverOptionsPage;
  let fixture: ComponentFixture<PopoverOptionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopoverOptionsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopoverOptionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
