import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DestinosApiPage } from './destinos-api.page';

describe('DestinosApiPage', () => {
  let component: DestinosApiPage;
  let fixture: ComponentFixture<DestinosApiPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DestinosApiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
