import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColleaguesSayComponent } from './colleagues-say.component';

describe('ColleaguesSayComponent', () => {
  let component: ColleaguesSayComponent;
  let fixture: ComponentFixture<ColleaguesSayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColleaguesSayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColleaguesSayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
