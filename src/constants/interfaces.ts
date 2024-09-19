// Interface for the expected Fluffle API response
export interface FluffleResult {
  id: string;
  stats: {
    count: number;
    elapsedMilliseconds: number;
  };
  results: {
    id: number;
    score: number;
    match: string;
    platform: string;
    location: string;
    isSfw: boolean;
    thumbnail: {
      width: number;
      height: number;
      centerX: number;
      centerY: number;
      location: string;
    };
    credits: {
      id: number;
      name: string;
    }[];
  }[];
}
