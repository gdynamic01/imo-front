import { TestBed } from '@angular/core/testing';

import { ProfessionnelService } from './professionnel.service';

describe('ProfessionnelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfessionnelService = TestBed.get(ProfessionnelService);
    expect(service).toBeTruthy();
  });
});
