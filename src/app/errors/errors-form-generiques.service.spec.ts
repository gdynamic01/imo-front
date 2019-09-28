import { TestBed } from '@angular/core/testing';

import { ErrorsFormGeneriquesService } from './errors-form-generiques.service';

describe('ErrorsFormGeneriquesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErrorsFormGeneriquesService = TestBed.get(ErrorsFormGeneriquesService);
    expect(service).toBeTruthy();
  });
});
