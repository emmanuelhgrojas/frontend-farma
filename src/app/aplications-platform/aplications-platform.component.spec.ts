import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AplicationsPlatformComponent } from './aplications-platform.component';

describe('AplicationsPlatformComponent', () => {
  let component: AplicationsPlatformComponent;
  let fixture: ComponentFixture<AplicationsPlatformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AplicationsPlatformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AplicationsPlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
