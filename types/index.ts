export interface FeatureCard {
  title: string;
  description: string;
}

export interface ProjectData {
  name: string;
  description: string;
  problemStatement: string;
  solution: string;
  backendStack: string[];
  frontendStack: string[];
  mainFeatures: FeatureCard[];
  benefits: string[];
}
