import { TestBed } from '@angular/core/testing';

import { FunctionsGlobalsService } from './functionsglobals.service';

describe('FunctionsGlobalsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FunctionsGlobalsService = TestBed.get(FunctionsGlobalsService);
    expect(service).toBeTruthy();
  });
});
