import { TestBed } from '@angular/core/testing';

import { LanguagesServicesService } from './languages-services.service';

describe('LanguagesServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LanguagesServicesService = TestBed.get(LanguagesServicesService);
    expect(service).toBeTruthy();
  });
});
