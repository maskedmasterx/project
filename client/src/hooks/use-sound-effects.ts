import { useCallback } from 'react';

export const useSoundEffects = () => {
  const playSound = useCallback((type: 'click' | 'hover' | 'success' | 'error') => {
    // Create audio context for web audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    const createBeep = (frequency: number, duration: number, volume: number = 0.1) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    };

    switch (type) {
      case 'click':
        // Matrix-style click sound
        createBeep(800, 0.1, 0.05);
        setTimeout(() => createBeep(1200, 0.05, 0.03), 50);
        break;
      case 'hover':
        // Subtle hover beep
        createBeep(600, 0.08, 0.02);
        break;
      case 'success':
        // Success sequence
        createBeep(523, 0.15, 0.04); // C
        setTimeout(() => createBeep(659, 0.15, 0.04), 100); // E
        setTimeout(() => createBeep(784, 0.2, 0.04), 200); // G
        break;
      case 'error':
        // Error buzzer
        createBeep(200, 0.3, 0.06);
        setTimeout(() => createBeep(150, 0.2, 0.04), 150);
        break;
    }
  }, []);

  return { playSound };
};