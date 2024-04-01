import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoverecipeComponent } from './removerecipe.component';

describe('RemoverecipeComponent', () => {
  let component: RemoverecipeComponent;
  let fixture: ComponentFixture<RemoverecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoverecipeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RemoverecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
