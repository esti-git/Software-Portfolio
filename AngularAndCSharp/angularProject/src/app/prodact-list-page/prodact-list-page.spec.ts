import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdactsListPage } from './prodact-list-page';

describe('ProdactListPage', () => {
  let component: ProdactsListPage;
  let fixture: ComponentFixture<ProdactsListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdactsListPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdactsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
