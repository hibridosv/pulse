/**
 * Extrae de config las carateristicas activadas
 * @param configurations 
 * @returns 
 */

export const extractActiveFeature = (configurations: any[]): string[] => {
  const activeFeatures: string[] = [];
  configurations.forEach(config => {
    if (config.active === 1) {
      activeFeatures.push(config.feature);
    }
  });
  return activeFeatures;
};
