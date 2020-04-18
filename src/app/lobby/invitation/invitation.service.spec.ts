import { TestBed } from '@angular/core/testing';

import { InvitationService } from './invitation.service';

describe('InvitationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InvitationService = TestBed.get(InvitationService);
    expect(service).toBeTruthy();
  });
});
