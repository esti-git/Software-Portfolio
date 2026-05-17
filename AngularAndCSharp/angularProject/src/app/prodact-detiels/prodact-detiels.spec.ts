import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdactDetiels } from './prodact-detiels';

describe('ProdactDetiels', () => {
  let component: ProdactDetiels;
  let fixture: ComponentFixture<ProdactDetiels>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdactDetiels]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdactDetiels);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
