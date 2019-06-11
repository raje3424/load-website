import { InfluencerModuleModule } from './influencer-module.module';

describe('InfluencerModuleModule', () => {
  let influencerModuleModule: InfluencerModuleModule;

  beforeEach(() => {
    influencerModuleModule = new InfluencerModuleModule();
  });

  it('should create an instance', () => {
    expect(influencerModuleModule).toBeTruthy();
  });
});
