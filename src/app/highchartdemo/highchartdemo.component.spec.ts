import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighchartdemoComponent } from './highchartdemo.component';

describe('HighchartdemoComponent', () => {
  let component: HighchartdemoComponent;
  let fixture: ComponentFixture<HighchartdemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighchartdemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HighchartdemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
