// Subtle ambient audio effects for cyberpunk atmosphere
class AudioEffects {
    private audioContext: AudioContext | null = null;
    private masterGain: GainNode | null = null;
    private isInitialized = false;

    initialize() {
        if (this.isInitialized) return;

        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        this.masterGain = this.audioContext.createGain();
        this.masterGain.gain.value = 0.05; // Extremely subtle overall volume
        this.masterGain.connect(this.audioContext.destination);
        this.isInitialized = true;
    }

    // Subtle click sound (like electrical relay)
    playClick() {
        if (!this.audioContext || !this.masterGain) return;

        const now = this.audioContext.currentTime;
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(800, now);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.01);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 0.01);
    }

    // Subtle electrical hum
    playHum(duration = 0.3) {
        if (!this.audioContext || !this.masterGain) return;

        const now = this.audioContext.currentTime;
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(60, now); // Low frequency hum

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(200, now);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.1, now + 0.05);
        gain.gain.linearRampToValueAtTime(0, now + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + duration);
    }

    // Digital glitch sound
    playGlitch() {
        if (!this.audioContext || !this.masterGain) return;

        const now = this.audioContext.currentTime;
        const bufferSize = this.audioContext.sampleRate * 0.05; // 50ms
        const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);

        // Generate white noise
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const source = this.audioContext.createBufferSource();
        const gain = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();

        source.buffer = buffer;

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1000 + Math.random() * 2000, now);
        filter.Q.setValueAtTime(10, now);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

        source.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        source.start(now);
    }

    // Subtle data stream sound
    playDataStream() {
        if (!this.audioContext || !this.masterGain) return;

        const now = this.audioContext.currentTime;
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();

        osc.type = 'square';
        osc.frequency.setValueAtTime(2000, now);
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1000, now);

        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 0.1);
    }

    // Random ambient background
    startAmbience() {
        if (!this.isInitialized) this.initialize();

        const playRandomEffect = () => {
            const effects = [
                () => this.playClick(),
                () => this.playHum(0.2 + Math.random() * 0.3),
                () => this.playGlitch(),
                () => this.playDataStream(),
            ];

            const effect = effects[Math.floor(Math.random() * effects.length)];
            effect();

            // Random interval between 2-8 seconds
            const nextDelay = 2000 + Math.random() * 6000;
            setTimeout(playRandomEffect, nextDelay);
        };

        // Start after a short delay
        setTimeout(playRandomEffect, 1000);
    }

    // Play typing sound
    playTypingSound() {
        if (!this.isInitialized) this.initialize();

        // Alternate between slightly different clicks for variation
        if (Math.random() > 0.5) {
            this.playClick();
        } else {
            this.playDataStream();
        }
    }

    // Sharp crack/static burst
    playCrack() {
        if (!this.audioContext || !this.masterGain) return;

        const now = this.audioContext.currentTime;
        const bufferSize = this.audioContext.sampleRate * 0.1; // 100ms
        const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);

        // Generate high-frequency noise
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.1)); // Decay quickly
        }

        const source = this.audioContext.createBufferSource();
        const gain = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();

        source.buffer = buffer;

        filter.type = 'highpass';
        filter.frequency.setValueAtTime(3000, now);

        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

        source.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        source.start(now);
    }
}

export const audioEffects = new AudioEffects();
