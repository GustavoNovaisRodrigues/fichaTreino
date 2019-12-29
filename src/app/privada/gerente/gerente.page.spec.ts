import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GerentePage } from './gerente.page';

describe('GerentePage', () => {
  let component: GerentePage;
  let fixture: ComponentFixture<GerentePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerentePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GerentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
