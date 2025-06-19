import { TestBed } from '@angular/core/testing';

import { ListaSelectorService } from './lista-selector.service';

describe('ListaSelectorService', () => {
  let service: ListaSelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaSelectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
