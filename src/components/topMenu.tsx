"use client";

interface TopMenuProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export const TopMenu = ({ activeTab = 'classement', onTabChange }: TopMenuProps) => {
  const handleClick = (tab: string) => {
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <div className="flex w-full justify-between space-x-4 p-4">
      <button 
        className={`w-1/2 px-6 py-2 rounded-lg font-medium transition-colors duration-200 
          ${activeTab === 'classement' 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
        onClick={() => handleClick('classement')}
      >
        Classement
      </button>
      <button 
        className={`w-1/2 px-6 py-2 rounded-lg font-medium transition-colors duration-200 
          ${activeTab === 'graphiques' 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
        onClick={() => handleClick('graphiques')}
      >
        Stats
      </button>
    </div>
  );
}
