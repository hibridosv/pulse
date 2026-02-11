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


export const  successSound = () => {
  const audio = new Audio('/sounds/success.mp3');
  audio.play();
}

export const  errorSound = () => {
  const audio = new Audio('/sounds/error.mp3');
  audio.play();
}

export const  screenSound = () => {
  const audio = new Audio('/sounds/screen.mp3');
  audio.play();
}
