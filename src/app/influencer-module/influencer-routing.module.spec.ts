import { InfluencerRoutingModule } from './influencer-routing.module';

describe('InfluencerRoutingModule', () => {
  let influencerRoutingModule: InfluencerRoutingModule;

  beforeEach(() => {
    influencerRoutingModule = new InfluencerRoutingModule();
  });

  it('should create an instance', () => {
    expect(influencerRoutingModule).toBeTruthy();
  });
});
