import { RequirementRoutingModule } from './requirement-routing.module';

describe('RequirementRoutingModule', () => {
  let requirementRoutingModule: RequirementRoutingModule;

  beforeEach(() => {
    requirementRoutingModule = new RequirementRoutingModule();
  });

  it('should create an instance', () => {
    expect(requirementRoutingModule).toBeTruthy();
  });
});
