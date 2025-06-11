import React, { useState, useEffect, useRef } from 'react';

// Enhanced Journey Experience Components
const JourneyEnvironments = {
  desert: {
    name: 'Ancient Desert',
    workGradient: 'from-yellow-200 via-orange-300 to-red-400',
    breakGradient: 'from-amber-200 via-yellow-300 to-orange-400',
    unlockRequirement: 0, // Always available
    description: 'Begin your journey in the endless dunes'
  },
  mountain: {
    name: 'Mystic Peaks',
    workGradient: 'from-slate-300 via-blue-300 to-purple-400',
    breakGradient: 'from-blue-200 via-indigo-300 to-purple-400',
    unlockRequirement: 10,
    description: 'Ascend to ancient mountain temples'
  },
  ocean: {
    name: 'Ethereal Waters',
    workGradient: 'from-cyan-200 via-blue-300 to-teal-400',
    breakGradient: 'from-teal-200 via-cyan-300 to-blue-400',
    unlockRequirement: 25,
    description: 'Traverse mystical ocean depths'
  },
  aurora: {
    name: 'Northern Lights',
    workGradient: 'from-purple-200 via-pink-300 to-green-400',
    breakGradient: 'from-green-200 via-purple-300 to-pink-400',
    unlockRequirement: 50,
    description: 'Dance beneath the cosmic aurora'
  }
};

const TravelerVariants = {
  novice: { name: 'Novice Traveler', unlockRequirement: 0, color: '#2d1b69' },
  seeker: { name: 'Truth Seeker', unlockRequirement: 15, color: '#7c2d12' },
  sage: { name: 'Ancient Sage', unlockRequirement: 30, color: '#1e40af' },
  enlightened: { name: 'Enlightened One', unlockRequirement: 75, color: '#059669' }
};

const JournalModal = ({ isOpen, onClose, onSave, sessionData }) => {
  const [reflection, setReflection] = useState('');
  const [mood, setMood] = useState('focused');

  const handleSave = () => {
    onSave({ reflection, mood, timestamp: new Date().toISOString() });
    setReflection('');
    setMood('focused');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 max-w-md w-full shadow-2xl">
        <h3 className="text-xl font-light text-gray-800 mb-4">Journey Reflection</h3>
        
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-2">How was this session?</label>
          <select 
            value={mood} 
            onChange={(e) => setMood(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-300 bg-white/80"
          >
            <option value="focused">🎯 Focused & Productive</option>
            <option value="distracted">😔 Distracted & Scattered</option>
            <option value="breakthrough">✨ Had a Breakthrough</option>
            <option value="peaceful">🕊️ Calm & Peaceful</option>
            <option value="energized">⚡ Energized & Motivated</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-2">Your thoughts (optional)</label>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="What did you accomplish? How do you feel? Any insights?"
            className="w-full h-24 p-3 rounded-lg border border-gray-300 bg-white/80 resize-none"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2 px-4 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300 transition-colors"
          >
            Skip
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2 px-4 bg-blue-500 rounded-lg text-white hover:bg-blue-600 transition-colors"
          >
            Save Reflection
          </button>
        </div>
      </div>
    </div>
  );
};

const UnlockNotification = ({ achievement, onClose }) => {
  if (!achievement) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full shadow-lg z-50 animate-bounce">
      <div className="text-center">
        <div className="text-sm font-light">🎉 Unlocked!</div>
        <div className="font-medium">{achievement}</div>
      </div>
    </div>
  );
};

// Custom SVG Traveler Components with variants
const TravelerSprite = ({ phase = 'walking', variant = 'novice', className = "" }) => {
  // Your beautiful robed figure sprite
  const baseSprite = (
    <svg viewBox="0 0 96 121" className={`${className}`}>
      <path d="M47.208 21.3547C50.8017 21.3547 53.9424 19.4484 55.6924 16.5943C53.0987 13.2921 49.7861 10.5631 47.0153 10.5631C44.3017 10.5631 41.0727 13.1152 38.5049 16.2453C40.2185 19.2923 43.4685 21.3547 47.208 21.3547Z" fill="currentColor"/>
      <path d="M70.588 78.3747C71.7963 77.3903 72.4839 76.3955 72.1869 75.9372C71.8953 75.4893 70.7651 75.6924 69.4213 76.3487L68.2911 74.6039C68.6401 72.0413 67.7078 69.6299 67.6557 69.5101C67.6922 68.8747 67.6817 68.1924 67.6088 67.4789L64.9214 42.6096C64.9214 42.6096 59.2963 39.6304 58.3068 38.8908C58.1922 38.8075 49.0151 32.5731 47.1506 31.2397C45.4579 32.6616 41.1506 36.1616 36.3642 39.1095C33.4163 40.8751 29.7027 42.5835 29.7027 42.5835L27.8746 67.4435C27.8225 68.1518 27.8329 68.8289 27.885 69.4591C27.8225 69.5788 27.7548 69.6882 27.6923 69.8184C26.9266 71.4747 26.5777 73.5736 26.8746 74.8758L25.9162 76.3498C24.5725 75.6935 23.437 75.4904 23.1506 75.9383C22.8538 76.3966 23.5413 77.3914 24.7496 78.3758L0.202896 116.042L3.91116 115.48L26.9218 79.7866C28.2968 80.4741 29.474 80.6928 29.7708 80.2397C30.0624 79.7918 29.4166 78.8387 28.2708 77.8804L30.3905 74.62C31.104 73.8596 32.9842 70.6252 32.9842 70.6252C33.5936 69.6877 33.5623 68.5836 32.9113 68.1616C32.8019 68.0939 32.6821 68.0522 32.5572 68.0262C32.5624 67.948 35.2654 42.0728 35.2654 42.0728L35.2706 42.0312V66.7445C35.2706 67.3435 35.3644 68.5466 35.3644 68.6248L39.9737 117.655C39.9737 119.317 41.3226 120.666 42.9841 120.666C44.6456 120.666 45.9945 119.317 45.9945 117.655L45.9893 70.1194C46.3591 70.1351 47.8748 70.1351 48.2445 70.1194V117.646C48.2445 119.308 49.5934 120.657 51.2549 120.657C52.9164 120.657 54.2653 119.308 54.2653 117.646L58.6872 69.3808C58.6872 69.3339 58.9684 67.6672 58.9684 66.7453V39.6826L62.8955 67.9893V67.9997C62.7288 68.0153 62.5674 68.0622 62.4267 68.1508C61.7757 68.5726 61.7445 69.6768 62.3538 70.6144C62.3538 70.6144 64.4945 74.2446 65.1872 74.9737L67.0674 77.8748C65.9216 78.8331 65.2757 79.7914 65.5622 80.2341C65.8591 80.6872 67.031 80.4737 68.4112 79.781L91.4218 115.478L95.1301 116.041L70.588 78.3747Z" fill="currentColor"/>
      <path d="M32.7293 25.4893C32.7293 20.2653 40.7815 9.31733 47.016 9.31733C53.2505 9.31733 61.3187 20.6351 61.3187 25.8747C61.3187 25.8747 61.2926 27.109 61.2562 27.2965C62.0062 26.3122 62.4385 24.7757 62.4385 22.484L59.8082 12.708C56.0478 2.9216 53.8759 0.666399 47.0218 0.666399C40.1625 0.666399 37.2458 2.1768 33.8551 12.708L31.5999 22.1091C31.6728 24.3017 32.0999 25.8227 32.7822 26.8591C32.7458 26.6872 32.7293 25.4893 32.7293 25.4893Z" fill="currentColor"/>
      <path d="M35.672 38.068C41.7084 34.3544 47.0783 29.6513 47.0783 29.6513C47.0783 29.6513 53.3387 34.1877 58.6824 37.6409C61.7761 39.6253 63.422 40.6097 64.7553 41.1825L63.8595 32.9273C63.8491 32.7867 63.6459 30.8961 62.7241 29.7971C61.7762 28.4012 61.3751 28.2763 60.9063 28.0159C61.0834 27.8544 61.1928 27.6148 61.2553 27.2919C61.0782 27.5315 59.9064 28.4013 59.1512 28.1044C56.4012 27.0211 51.3438 23.2295 47.12 23.2295C42.9064 23.2295 37.8336 26.9847 34.9637 27.818C34.6147 27.917 34.2918 27.9795 34.0158 27.9795H34.0054C33.8908 27.917 32.9845 27.167 32.7866 26.8545C32.8595 27.292 33.1877 27.8024 33.1356 27.8284C33.1252 27.8284 33.1252 27.8388 33.1095 27.8388C32.9585 27.9378 32.1772 28.4013 31.7502 29.1722C31.6252 29.3961 30.6148 30.891 30.4794 32.3648C30.4533 32.5003 29.8075 41.1774 29.8075 41.1774C31.5835 40.4378 35.5367 38.1721 35.672 38.068Z" fill="currentColor"/>
      <path d="M8.42666 101.136L23.12 78.5893C21.4741 76.9227 21.7451 75.8081 22.1044 75.2612C22.3023 74.9591 22.7762 74.4539 23.7762 74.4539C24.3127 74.4539 24.9064 74.5997 25.4429 74.7977L25.5627 74.6154C25.5262 74.2872 25.5054 73.9383 25.521 73.5268C25.5731 72.1727 26.6044 69.2247 26.6252 69.1831C26.5939 68.5893 26.5835 67.98 26.6356 67.3497L27.8231 51.2044C24.672 65.3551 17.7867 90.0591 7.24444 95.1111C4.73924 96.3038 5.68183 98.5475 8.42666 101.136Z" fill="currentColor"/>
      <path d="M29.8853 77.6773C31.4375 79.3024 31.1666 80.3804 30.8176 80.9169C30.6197 81.219 30.1457 81.7242 29.151 81.7242C28.5884 81.7242 27.9687 81.5628 27.401 81.3544L12.5316 104.406C19.2139 109.089 32.485 115.99 38.6143 116.578L34.3121 70.7716C34.2288 70.9539 29.8853 77.6773 29.8853 77.6773Z" fill="currentColor"/>
      <path d="M66.188 81.724C65.1932 81.724 64.714 81.2188 64.5213 80.9167C64.1724 80.3803 63.8963 79.297 65.4536 77.6771L61.3078 71.2968C60.3703 69.8542 60.4953 68.1614 61.5369 67.2864L60.214 57.7552V66.7448C60.214 67.4896 59.9223 69.5104 59.9223 69.5104L55.5526 117.218C64.8963 117.244 76.3126 109.291 82.7979 104.406L67.9379 81.3539C67.3702 81.5622 66.7505 81.724 66.188 81.724Z" fill="currentColor"/>
      <path d="M68.896 69.2653C68.922 69.3278 69.8804 73.2913 69.5887 74.3279L69.8908 74.7914C70.4325 74.5987 71.021 74.4477 71.5575 74.4477C72.5523 74.4477 73.0315 74.9529 73.2293 75.255C73.5835 75.8018 73.8595 76.9164 72.2137 78.5831L86.8644 101.062C90.6873 97.567 92.4894 94.494 89.5206 93.2336C77.5988 88.1503 70.89 68.979 67.5473 55.379L68.839 67.3426C68.9119 67.9832 68.922 68.6299 68.896 69.2653Z" fill="currentColor"/>
    </svg>
  );

  // Apply different colors based on phase and variant
  const getPhaseStyles = () => {
    const variantColor = TravelerVariants[variant]?.color || '#2d1b69';
    
    switch (phase) {
      case 'walking': 
        return {
          color: variantColor,
          glow: `shadow-[0_0_20px_${variantColor}80]`
        };
      case 'resting': 
        return {
          color: variantColor,
          glow: `shadow-[0_0_20px_${variantColor}60]`
        };
      case 'celebrating': 
        return {
          color: '#fbbf24', // Golden for celebration
          glow: 'shadow-[0_0_25px_rgba(251,191,36,0.9)]'
        };
      default: 
        return {
          color: variantColor,
          glow: `shadow-[0_0_20px_${variantColor}80]`
        };
    }
  };

  const styles = getPhaseStyles();

  return (
    <div 
      className={`${className} ${styles.glow} animate-pulse`}
      style={{ color: styles.color }}
    >
      {baseSprite}
    </div>
  );
};

const JourneyPomodoro = () => {
  // Timer states
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState('work');
  const [sessionCount, setSessionCount] = useState(0);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [isPilgrimageMode, setIsPilgrimageMode] = useState(false);
  
  // Journey Experience states
  const [currentEnvironment, setCurrentEnvironment] = useState('desert');
  const [currentTraveler, setCurrentTraveler] = useState('novice');
  const [unlockedEnvironments, setUnlockedEnvironments] = useState(['desert']);
  const [unlockedTravelers, setUnlockedTravelers] = useState(['novice']);
  const [journalEntries, setJournalEntries] = useState([]);
  const [showJournal, setShowJournal] = useState(false);
  const [showUnlock, setShowUnlock] = useState(null);
  const [sessionJustCompleted, setSessionJustCompleted] = useState(false);

  const intervalRef = useRef(null);

  // Time configurations
  const timeConfig = {
    normal: {
      work: 25 * 60,
      shortBreak: 5 * 60,
      longBreak: 15 * 60
    },
    pilgrimage: {
      work: 5,
      shortBreak: 3,
      longBreak: 8
    }
  };

  const getCurrentConfig = () => isPilgrimageMode ? timeConfig.pilgrimage : timeConfig.normal;

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('journeyPomodoro');
    if (saved) {
      const data = JSON.parse(saved);
      setSessionCount(data.sessionCount || 0);
      setCompletedPomodoros(data.completedPomodoros || 0);
      setCurrentEnvironment(data.currentEnvironment || 'desert');
      setCurrentTraveler(data.currentTraveler || 'novice');
      setUnlockedEnvironments(data.unlockedEnvironments || ['desert']);
      setUnlockedTravelers(data.unlockedTravelers || ['novice']);
      setJournalEntries(data.journalEntries || []);
    }
    
    // Set environment based on time of day if still default
    if (!saved || !JSON.parse(saved).currentEnvironment) {
      setEnvironmentByTime();
    }
  }, []);

  // Save to localStorage when important state changes
  useEffect(() => {
    localStorage.setItem('journeyPomodoro', JSON.stringify({
      sessionCount,
      completedPomodoros,
      currentEnvironment,
      currentTraveler,
      unlockedEnvironments,
      unlockedTravelers,
      journalEntries
    }));
  }, [sessionCount, completedPomodoros, currentEnvironment, currentTraveler, unlockedEnvironments, unlockedTravelers, journalEntries]);

  // Set environment based on time of day
  const setEnvironmentByTime = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) {
      setCurrentEnvironment('desert'); // Morning - Desert sunrise
    } else if (hour >= 12 && hour < 18) {
      setCurrentEnvironment('mountain'); // Afternoon - Mountain peaks
    } else if (hour >= 18 && hour < 22) {
      setCurrentEnvironment('ocean'); // Evening - Ocean sunset
    } else {
      setCurrentEnvironment('aurora'); // Night - Aurora
    }
  };

  // Check for unlocks
  const checkUnlocks = (newCompletedPomodoros) => {
    const newUnlocks = [];
    
    // Check environment unlocks
    Object.entries(JourneyEnvironments).forEach(([key, env]) => {
      if (newCompletedPomodoros >= env.unlockRequirement && !unlockedEnvironments.includes(key)) {
        setUnlockedEnvironments(prev => [...prev, key]);
        newUnlocks.push(env.name);
      }
    });
    
    // Check traveler unlocks
    Object.entries(TravelerVariants).forEach(([key, traveler]) => {
      if (newCompletedPomodoros >= traveler.unlockRequirement && !unlockedTravelers.includes(key)) {
        setUnlockedTravelers(prev => [...prev, key]);
        setCurrentTraveler(key); // Auto-upgrade traveler
        newUnlocks.push(traveler.name);
      }
    });
    
    if (newUnlocks.length > 0) {
      setShowUnlock(newUnlocks[0]);
      setTimeout(() => setShowUnlock(null), 4000);
    }
  };

  // Timer logic
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
      
      if (timeLeft === 0) {
        // Phase completed
        handlePhaseComplete();
      }
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  const handlePhaseComplete = () => {
    if (currentPhase === 'work') {
      const newCompletedPomodoros = completedPomodoros + 1;
      setCompletedPomodoros(newCompletedPomodoros);
      checkUnlocks(newCompletedPomodoros);
      
      // Determine next break type
      const isLongBreak = newCompletedPomodoros % 4 === 0;
      const nextPhase = isLongBreak ? 'longBreak' : 'shortBreak';
      
      setCurrentPhase(nextPhase);
      setTimeLeft(getCurrentConfig()[nextPhase]);
      setSessionCount(prev => prev + 1);
      setSessionJustCompleted(true);
      
      // Show journal after work session
      setTimeout(() => setShowJournal(true), 1000);
    } else {
      // Break completed, back to work
      setCurrentPhase('work');
      setTimeLeft(getCurrentConfig().work);
      setSessionCount(prev => prev + 1);
      setSessionJustCompleted(false);
    }
    
    setIsRunning(false);
  };

  const saveJournalEntry = (entry) => {
    const newEntry = {
      ...entry,
      sessionNumber: completedPomodoros,
      environment: currentEnvironment,
      traveler: currentTraveler
    };
    setJournalEntries(prev => [newEntry, ...prev]);
    setShowJournal(false);
  };

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);
  
  const resetTimer = () => {
    setIsRunning(false);
    setCurrentPhase('work');
    setTimeLeft(getCurrentConfig().work);
  };

  const togglePilgrimageMode = () => {
    setIsPilgrimageMode(prev => {
      const newMode = !prev;
      const config = newMode ? timeConfig.pilgrimage : timeConfig.normal;
      
      // Reset timer with new configuration
      setIsRunning(false);
      setCurrentPhase('work');
      setTimeLeft(config.work);
      
      return newMode;
    });
  };

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate progress for sun timer
  const getTotalTime = () => getCurrentConfig()[currentPhase];
  const getProgress = () => ((getTotalTime() - timeLeft) / getTotalTime()) * 100;

  // Calculate traveler position based on completed pomodoros
  const getTravelerPosition = () => {
    const basePosition = 10; // Start position
    const maxPosition = 85; // End position
    const progressPerPomodoro = (maxPosition - basePosition) / 20; // Assume 20 pomodoros for full journey
    return Math.min(basePosition + (completedPomodoros * progressPerPomodoro), maxPosition);
  };

  const getPhaseLabel = () => {
    switch (currentPhase) {
      case 'work': return 'Focus Time';
      case 'shortBreak': return 'Short Rest';
      case 'longBreak': return 'Long Rest';
      default: return 'Focus Time';
    }
  };

  const getBackgroundGradient = () => {
    const env = JourneyEnvironments[currentEnvironment];
    if (currentPhase === 'work') {
      return env.workGradient;
    } else {
      return env.breakGradient;
    }
  };

  // Get traveler sprite phase based on current state
  const getTravelerPhase = () => {
    if (currentPhase !== 'work') return 'resting';
    if (completedPomodoros > 0 && completedPomodoros % 4 === 0) return 'celebrating';
    return 'walking';
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient()} transition-all duration-1000 flex flex-col items-center justify-center p-4 relative`}>
      
      {/* Unlock Notification */}
      <UnlockNotification achievement={showUnlock} onClose={() => setShowUnlock(null)} />
      
      {/* Journey Journal Modal */}
      <JournalModal 
        isOpen={showJournal}
        onClose={() => setShowJournal(false)}
        onSave={saveJournalEntry}
        sessionData={{ pomodoros: completedPomodoros, environment: currentEnvironment }}
      />

      {/* Environment & Traveler Selection */}
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
          <div className="text-xs text-white/80 mb-2">Environment</div>
          <select 
            value={currentEnvironment}
            onChange={(e) => setCurrentEnvironment(e.target.value)}
            className="bg-white/30 text-white text-xs rounded px-2 py-1 border-none outline-none"
          >
            {Object.entries(JourneyEnvironments).map(([key, env]) => (
              <option 
                key={key} 
                value={key} 
                disabled={!unlockedEnvironments.includes(key)}
                className="text-gray-800"
              >
                {env.name} {!unlockedEnvironments.includes(key) ? `(${env.unlockRequirement} 🍅)` : ''}
              </option>
            ))}
          </select>
        </div>
        
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
          <div className="text-xs text-white/80 mb-2">Traveler</div>
          <select 
            value={currentTraveler}
            onChange={(e) => setCurrentTraveler(e.target.value)}
            className="bg-white/30 text-white text-xs rounded px-2 py-1 border-none outline-none"
          >
            {Object.entries(TravelerVariants).map(([key, traveler]) => (
              <option 
                key={key} 
                value={key} 
                disabled={!unlockedTravelers.includes(key)}
                className="text-gray-800"
              >
                {traveler.name} {!unlockedTravelers.includes(key) ? `(${traveler.unlockRequirement} 🍅)` : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Pilgrimage Mode Toggle */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button
          onClick={togglePilgrimageMode}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
            isPilgrimageMode 
              ? 'bg-white/30 text-white border border-white/50' 
              : 'bg-black/20 text-white/80 border border-white/30'
          }`}
        >
          {isPilgrimageMode ? 'Test Mode' : 'Normal Mode'}
        </button>
        
        {journalEntries.length > 0 && (
          <button
            onClick={() => setShowJournal(true)}
            className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white/80 border border-white/30 hover:bg-white/30 transition-all duration-300"
          >
            📖 Journal ({journalEntries.length})
          </button>
        )}
      </div>

      {/* Main Timer Container */}
      <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 shadow-2xl max-w-md w-full text-center">
        
        {/* Sun Timer */}
        <div className="relative w-48 h-48 mx-auto mb-8">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="8"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 40}`}
              strokeDashoffset={`${2 * Math.PI * 40 * (1 - getProgress() / 100)}`}
              className="transition-all duration-1000 ease-linear"
              strokeLinecap="round"
            />
          </svg>
          
          {/* Sun center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-yellow-300 rounded-full shadow-lg flex items-center justify-center">
              <div className="w-8 h-8 bg-yellow-400 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Timer Display */}
        <div className="mb-6">
          <h2 className="text-2xl font-light text-white/90 mb-2">{getPhaseLabel()}</h2>
          <div className="text-6xl font-light text-white mb-4 font-mono">
            {formatTime(timeLeft)}
          </div>
          <div className="text-white/70 text-sm">
            Session {sessionCount} • {completedPomodoros} Pomodoros Completed
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={isRunning ? stopTimer : startTimer}
            className="px-8 py-3 bg-white/30 backdrop-blur-sm rounded-full text-white font-medium hover:bg-white/40 transition-all duration-300 shadow-lg"
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={resetTimer}
            className="px-8 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white/80 font-medium hover:bg-white/30 transition-all duration-300 shadow-lg"
          >
            Reset
          </button>
        </div>

        {/* Journey Path */}
        <div className="relative h-12 bg-white/10 rounded-full overflow-hidden">
          {/* Path */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/40"></div>
          
          {/* Traveler */}
          <div 
            className="absolute top-1/2 transform -translate-y-1/2 transition-all duration-1000 ease-out"
            style={{ left: `${getTravelerPosition()}%` }}
          >
            {/* Animated glow ring around traveler */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              <div 
                className={`absolute inset-0 rounded-full border-2 animate-ping ${
                  currentPhase === 'work' 
                    ? 'border-purple-900/60' 
                    : currentPhase === 'celebrating'
                    ? 'border-blue-800/70'
                    : 'border-amber-800/60'
                }`}
                style={{ animationDuration: '3s' }}
              />
              <div 
                className={`absolute inset-2 rounded-full border animate-pulse ${
                  currentPhase === 'work' 
                    ? 'border-purple-700/40' 
                    : currentPhase === 'celebrating'
                    ? 'border-blue-600/50'
                    : 'border-amber-700/40'
                }`}
                style={{ animationDuration: '2s' }}
              />
              <div className="w-12 h-12 flex items-center justify-center relative z-10">
                <TravelerSprite phase={getTravelerPhase()} variant={currentTraveler} className="w-full h-full" />
              </div>
            </div>
          </div>
          
          {/* Milestone markers */}
          {[25, 50, 75].map((position) => (
            <div
              key={position}
              className="absolute top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white/50 rounded-full"
              style={{ left: `${position}%` }}
            ></div>
          ))}
        </div>
        
        <div className="text-xs text-white/60 mt-2">
          Your journey continues with each completed focus session
        </div>
        
        {/* Environment Description */}
        <div className="text-xs text-white/70 mt-1 italic">
          {JourneyEnvironments[currentEnvironment].description}
        </div>
      </div>
    </div>
  );
};

export default JourneyPomodoro;
