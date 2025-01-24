import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMunicipioComponent } from './add-municipio.component';

describe('AddMunicipioComponent', () => {
  let component: AddMunicipioComponent;
  let fixture: ComponentFixture<AddMunicipioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMunicipioComponent]
    });
    fixture = TestBed.createComponent(AddMunicipioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
