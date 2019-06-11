import { RequirementModuleModule } from './requirement-module.module';

describe('RequirementModuleModule', () => {
  let requirementModuleModule: RequirementModuleModule;

  beforeEach(() => {
    requirementModuleModule = new RequirementModuleModule();
  });

  it('should create an instance', () => {
    expect(requirementModuleModule).toBeTruthy();
  });
});
