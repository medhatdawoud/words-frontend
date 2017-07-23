import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiImagesComponent } from './multi-images.component';

describe('MultiImagesComponent', () => {
  let component: MultiImagesComponent;
  let fixture: ComponentFixture<MultiImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
