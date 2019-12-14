import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LogarPage } from './logar.page';

describe('LogarPage', () => {
  let component: LogarPage;
  let fixture: ComponentFixture<LogarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LogarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
