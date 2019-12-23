import { TestBed, async, inject } from '@angular/core/testing';

import { ClienteGuardGuard } from './cliente-guard.guard';

describe('ClienteGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClienteGuardGuard]
    });
  });

  it('should ...', inject([ClienteGuardGuard], (guard: ClienteGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
