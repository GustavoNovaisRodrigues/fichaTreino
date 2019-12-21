import { TestBed } from '@angular/core/testing';

import { MensagenRetornoService } from './mensagen-retorno.service';

describe('MensagenRetornoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MensagenRetornoService = TestBed.get(MensagenRetornoService);
    expect(service).toBeTruthy();
  });
});
