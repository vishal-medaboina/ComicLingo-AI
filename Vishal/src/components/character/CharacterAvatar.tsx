import React, { useId } from 'react';
import type { 
  Character, 
  CharacterAppearance, 
  ExpressionType, 
  ActionType, 
  EntranceAnimation 
} from '../../types/comiclingo';

interface CharacterAvatarProps {
  character?: Partial<Character>;
  appearance?: CharacterAppearance;
  expression?: ExpressionType;
  action?: ActionType;
  animation?: EntranceAnimation;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  facing?: 'left' | 'right';
  isSpeaking?: boolean;
  className?: string;
  onClick?: () => void;
  showShadow?: boolean;
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  character,
  appearance: propAppearance,
  expression: propExpression,
  action: propAction,
  animation: propAnimation,
  size = 'md',
  facing = 'right',
  isSpeaking = false,
  className = '',
  onClick,
  showShadow = true,
}) => {
  const uniqueId = useId().replace(/:/g, '');

  const appearance: CharacterAppearance = propAppearance || character?.appearance || {
    skinTone: '#ffd1b3',
    hairStyle: 'short',
    hairColor: '#3d2314',
    outfitStyle: 'casual',
    outfitColor: '#1b6170',
    accentColor: '#ff5c45',
    accessories: [],
    eyeColor: '#2b2b2b',
    facialHair: 'none',
  };

  const expression: ExpressionType = propExpression || character?.currentExpression || 'default';
  const action: ActionType = propAction || character?.currentAction || 'idle';
  const entranceAnim: EntranceAnimation = propAnimation || character?.currentAnimation || 'pop-in';

  // Dimension scaling
  const sizeMap = {
    xs: { w: 48, h: 64 },
    sm: { w: 72, h: 96 },
    md: { w: 120, h: 160 },
    lg: { w: 180, h: 240 },
    xl: { w: 240, h: 320 },
    hero: { w: 320, h: 420 },
  };
  const { w, h } = sizeMap[size] || sizeMap.md;

  // Entrance animation classes
  const entranceClassMap: Record<EntranceAnimation, string> = {
    'slide-up': 'animate-in fade-in slide-in-from-bottom-8 duration-500 ease-out',
    'slide-down': 'animate-in fade-in slide-in-from-top-8 duration-500 ease-out',
    'slide-left': 'animate-in fade-in slide-in-from-right-8 duration-500 ease-out',
    'slide-right': 'animate-in fade-in slide-in-from-left-8 duration-500 ease-out',
    'fade-in': 'animate-in fade-in duration-500 ease-out',
    'pop-in': 'animate-in zoom-in-75 fade-in duration-400 ease-out',
    'zoom-in': 'animate-in zoom-in-50 fade-in duration-500 ease-out',
    'bounce-in': 'animate-bounce duration-700 ease-out',
    'walk-in': 'animate-in slide-in-from-left-12 fade-in duration-700 ease-in-out',
  };

  // Action gesture transforms
  let bodyActionClass = '';
  let headTiltDeg = 0;
  let leftArmTransform = '';
  let rightArmTransform = '';

  switch (action) {
    case 'talk':
      bodyActionClass = 'animate-pulse';
      headTiltDeg = facing === 'right' ? 2 : -2;
      break;
    case 'wave':
      rightArmTransform = 'rotate(-35 85 95)';
      break;
    case 'point':
      rightArmTransform = 'rotate(-20 85 95) translate(8, -8)';
      break;
    case 'think':
      headTiltDeg = -6;
      rightArmTransform = 'rotate(-55 85 95) translate(-4, -12)';
      break;
    case 'celebrate':
      leftArmTransform = 'rotate(45 35 95) translate(-8, -16)';
      rightArmTransform = 'rotate(-45 85 95) translate(8, -16)';
      headTiltDeg = 0;
      break;
    case 'laugh':
      bodyActionClass = 'animate-bounce-subtle';
      headTiltDeg = 4;
      break;
    case 'nod':
      bodyActionClass = 'animate-bounce';
      break;
    case 'walk':
      bodyActionClass = 'animate-pulse';
      break;
    case 'react':
      headTiltDeg = facing === 'right' ? -8 : 8;
      break;
    case 'idle':
    default:
      bodyActionClass = '';
      break;
  }

  // Mouth rendering based on expression and isSpeaking
  const renderMouth = () => {
    if (isSpeaking || action === 'talk') {
      return (
        <ellipse cx="60" cy="67" rx="6" ry="4.5" fill="#5c1010" stroke="#0f2b32" strokeWidth="1.5">
          <animate attributeName="ry" values="2;5;2" dur="0.25s" repeatCount="indefinite" />
        </ellipse>
      );
    }
    switch (expression) {
      case 'happy':
      case 'laughing':
      case 'proud':
        return <path d="M 52 64 Q 60 74 68 64" fill="#8a1818" stroke="#0f2b32" strokeWidth="2" strokeLinecap="round" />;
      case 'sad':
      case 'crying':
      case 'disappointed':
        return <path d="M 53 69 Q 60 62 67 69" fill="none" stroke="#0f2b32" strokeWidth="2.2" strokeLinecap="round" />;
      case 'surprised':
      case 'shocked':
        return <ellipse cx="60" cy="66" rx="5" ry="6.5" fill="#5c1010" stroke="#0f2b32" strokeWidth="2" />;
      case 'angry':
      case 'frustrated':
        return <path d="M 53 68 L 67 65" stroke="#0f2b32" strokeWidth="2.5" strokeLinecap="round" />;
      case 'confused':
        return <path d="M 53 67 Q 58 64 64 69" fill="none" stroke="#0f2b32" strokeWidth="2" strokeLinecap="round" />;
      case 'worried':
      case 'nervous':
      case 'scared':
        return <path d="M 54 67 Q 58 69 62 67 Q 65 65 67 68" fill="none" stroke="#0f2b32" strokeWidth="2" strokeLinecap="round" />;
      case 'thinking':
        return <path d="M 55 66 Q 60 67 65 65" fill="none" stroke="#0f2b32" strokeWidth="2" strokeLinecap="round" />;
      default:
        return <path d="M 54 66 Q 60 70 66 66" fill="none" stroke="#0f2b32" strokeWidth="2" strokeLinecap="round" />;
    }
  };

  // Eyebrows based on expression
  const renderEyebrows = () => {
    switch (expression) {
      case 'angry':
      case 'frustrated':
      case 'determined':
        return (
          <>
            <path d="M 45 42 L 54 46" stroke="#0f2b32" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 75 42 L 66 46" stroke="#0f2b32" strokeWidth="2.5" strokeLinecap="round" />
          </>
        );
      case 'surprised':
      case 'shocked':
      case 'scared':
        return (
          <>
            <path d="M 45 39 Q 50 36 55 40" fill="none" stroke="#0f2b32" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M 65 40 Q 70 36 75 39" fill="none" stroke="#0f2b32" strokeWidth="2.2" strokeLinecap="round" />
          </>
        );
      case 'worried':
      case 'sad':
      case 'nervous':
        return (
          <>
            <path d="M 46 45 Q 50 41 55 43" fill="none" stroke="#0f2b32" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M 65 43 Q 70 41 74 45" fill="none" stroke="#0f2b32" strokeWidth="2.2" strokeLinecap="round" />
          </>
        );
      case 'confused':
      case 'curious':
        return (
          <>
            <path d="M 45 40 Q 50 36 55 40" fill="none" stroke="#0f2b32" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M 66 44 L 75 43" stroke="#0f2b32" strokeWidth="2.2" strokeLinecap="round" />
          </>
        );
      default:
        return (
          <>
            <path d="M 46 43 Q 50 41 55 43" fill="none" stroke="#0f2b32" strokeWidth="2" strokeLinecap="round" />
            <path d="M 65 43 Q 70 41 74 43" fill="none" stroke="#0f2b32" strokeWidth="2" strokeLinecap="round" />
          </>
        );
    }
  };

  // Eyes rendering
  const renderEyes = () => {
    if (expression === 'laughing' || expression === 'happy') {
      return (
        <>
          <path d="M 47 50 Q 51 46 55 50" fill="none" stroke="#0f2b32" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 65 50 Q 69 46 73 50" fill="none" stroke="#0f2b32" strokeWidth="2.5" strokeLinecap="round" />
        </>
      );
    }
    const pupilR = expression === 'surprised' || expression === 'shocked' ? 2 : 3.5;
    return (
      <>
        {/* Left Eye */}
        <ellipse cx="51" cy="50" rx="5" ry="5.5" fill="#ffffff" stroke="#0f2b32" strokeWidth="1.5" />
        <circle cx={facing === 'right' ? 52.5 : 49.5} cy="50" r={pupilR} fill={appearance.eyeColor} />
        <circle cx={facing === 'right' ? 53.5 : 48.5} cy="48.5" r="1.2" fill="#ffffff" />

        {/* Right Eye */}
        <ellipse cx="69" cy="50" rx="5" ry="5.5" fill="#ffffff" stroke="#0f2b32" strokeWidth="1.5" />
        <circle cx={facing === 'right' ? 70.5 : 67.5} cy="50" r={pupilR} fill={appearance.eyeColor} />
        <circle cx={facing === 'right' ? 71.5 : 66.5} cy="48.5" r="1.2" fill="#ffffff" />
      </>
    );
  };

  // Hairstyle rendering
  const renderHair = () => {
    const hair = appearance.hairStyle;
    const color = appearance.hairColor;

    switch (hair) {
      case 'spiky':
      case 'anime':
        return (
          <path
            d="M 38 45 L 35 32 L 44 34 L 46 22 L 56 26 L 60 18 L 68 25 L 75 20 L 78 30 L 85 32 L 82 46 Q 86 32 78 22 Q 65 14 45 22 Z"
            fill={color}
            stroke="#0f2b32"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        );
      case 'curly':
      case 'afro':
        return (
          <path
            d="M 38 45 C 30 40 30 25 40 22 C 42 15 55 12 60 16 C 68 12 80 16 80 23 C 88 26 88 40 82 48 C 84 34 78 24 60 22 C 44 24 38 35 38 45 Z"
            fill={color}
            stroke="#0f2b32"
            strokeWidth="2"
          />
        );
      case 'long':
        return (
          <>
            <path
              d="M 36 44 C 32 55 30 75 34 85 C 38 78 40 68 40 55"
              fill={color}
              stroke="#0f2b32"
              strokeWidth="2"
            />
            <path
              d="M 84 44 C 88 55 90 75 86 85 C 82 78 80 68 80 55"
              fill={color}
              stroke="#0f2b32"
              strokeWidth="2"
            />
            <path
              d="M 38 42 C 38 24 50 18 60 18 C 70 18 82 24 82 42 C 78 32 72 26 60 26 C 48 26 42 32 38 42 Z"
              fill={color}
              stroke="#0f2b32"
              strokeWidth="2"
            />
          </>
        );
      case 'bob':
        return (
          <path
            d="M 36 56 C 34 38 42 22 60 22 C 78 22 86 38 84 56 C 81 44 76 30 60 30 C 44 30 39 44 36 56 Z"
            fill={color}
            stroke="#0f2b32"
            strokeWidth="2"
          />
        );
      case 'ponytail':
        return (
          <>
            <path
              d="M 76 28 C 88 24 95 35 90 48 C 86 42 82 36 76 33"
              fill={color}
              stroke="#0f2b32"
              strokeWidth="2"
            />
            <circle cx="76" cy="31" r="3" fill="#ff5c45" />
            <path
              d="M 38 42 C 38 24 50 20 60 20 C 70 20 82 24 82 42 C 78 30 70 25 60 25 C 50 25 42 30 38 42 Z"
              fill={color}
              stroke="#0f2b32"
              strokeWidth="2"
            />
          </>
        );
      case 'buzz':
      case 'short':
      default:
        return (
          <path
            d="M 39 42 C 39 26 48 20 60 20 C 72 20 81 26 81 42 C 77 31 70 26 60 26 C 50 26 43 31 39 42 Z"
            fill={color}
            stroke="#0f2b32"
            strokeWidth="2"
          />
        );
    }
  };

  // Outfit & Props
  const renderOutfit = () => {
    const outfit = appearance.outfitStyle;
    const prim = appearance.outfitColor;
    const sec = appearance.accentColor;

    switch (outfit) {
      case 'suit':
      case 'formal':
        return (
          <>
            {/* Jacket */}
            <path d="M 38 90 L 32 140 L 88 140 L 82 90 Z" fill={prim} stroke="#0f2b32" strokeWidth="2.5" />
            {/* White Shirt V */}
            <polygon points="52,90 68,90 60,115" fill="#ffffff" stroke="#0f2b32" strokeWidth="1.5" />
            {/* Tie */}
            <polygon points="58,95 62,95 64,120 60,126 56,120" fill={sec} stroke="#0f2b32" strokeWidth="1.2" />
            {/* Lapels */}
            <path d="M 38 90 L 52 115 L 48 135" stroke="#0f2b32" strokeWidth="2" fill="none" />
            <path d="M 82 90 L 68 115 L 72 135" stroke="#0f2b32" strokeWidth="2" fill="none" />
          </>
        );
      case 'labcoat':
      case 'scrubs':
        return (
          <>
            {/* Labcoat / Scrubs */}
            <path d="M 38 90 L 30 145 L 90 145 L 82 90 Z" fill={outfit === 'scrubs' ? '#34a0b7' : '#f8fafc'} stroke="#0f2b32" strokeWidth="2.5" />
            <polygon points="54,90 66,90 60,110" fill="#38bdf8" />
            {/* Stethoscope if doctor */}
            {appearance.accessories.includes('stethoscope') && (
              <path d="M 48 94 C 48 114 72 114 72 94 M 60 114 L 60 124" stroke="#475569" strokeWidth="2.5" fill="none" />
            )}
            <rect x="70" y="118" width="10" height="12" rx="2" fill="#ffffff" stroke="#0f2b32" strokeWidth="1.5" />
          </>
        );
      case 'detective':
        return (
          <>
            {/* Trench Coat */}
            <path d="M 36 90 L 28 150 L 92 150 L 84 90 Z" fill="#b49372" stroke="#0f2b32" strokeWidth="2.5" />
            <polygon points="52,90 68,90 60,118" fill="#ffffff" />
            <polygon points="58,94 62,94 63,116 60,122 57,116" fill="#0f2b32" />
            <line x1="38" y1="126" x2="82" y2="126" stroke="#876543" strokeWidth="4" />
          </>
        );
      case 'scifi':
      case 'hero':
        return (
          <>
            {/* Armor / Hero tunic */}
            <path d="M 38 90 L 34 140 L 86 140 L 82 90 Z" fill={prim} stroke="#0f2b32" strokeWidth="2.5" />
            <path d="M 44 95 L 60 115 L 76 95" fill={sec} stroke="#0f2b32" strokeWidth="1.8" />
            {/* Glowing emblem */}
            <circle cx="60" cy="116" r="6" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" className="animate-pulse" />
          </>
        );
      case 'chef':
        return (
          <>
            <path d="M 38 90 L 30 142 L 90 142 L 82 90 Z" fill="#ffffff" stroke="#0f2b32" strokeWidth="2.5" />
            <circle cx="56" cy="105" r="2" fill="#0f2b32" />
            <circle cx="64" cy="105" r="2" fill="#0f2b32" />
            <circle cx="56" cy="120" r="2" fill="#0f2b32" />
            <circle cx="64" cy="120" r="2" fill="#0f2b32" />
            <path d="M 52 90 L 60 98 L 68 90" fill="#ee3e25" />
          </>
        );
      case 'hoodie':
      case 'casual':
      default:
        return (
          <>
            {/* Casual Shirt / Hoodie */}
            <path d="M 38 90 L 34 140 L 86 140 L 82 90 Z" fill={prim} stroke="#0f2b32" strokeWidth="2.5" />
            <path d="M 52 90 Q 60 98 68 90" fill="none" stroke="#0f2b32" strokeWidth="2" />
            {/* Stripe / accent */}
            <path d="M 42 110 L 78 110" stroke={sec} strokeWidth="3" strokeLinecap="round" />
          </>
        );
    }
  };

  // Accessories
  const renderAccessories = () => {
    return (
      <>
        {appearance.accessories.includes('glasses') && (
          <g stroke="#0f2b32" strokeWidth="2" fill="none">
            <rect x="44" y="44" width="13" height="11" rx="2" fill="rgba(255,255,255,0.4)" />
            <rect x="63" y="44" width="13" height="11" rx="2" fill="rgba(255,255,255,0.4)" />
            <line x1="57" y1="49" x2="63" y2="49" />
          </g>
        )}
        {appearance.accessories.includes('sunglasses') && (
          <g stroke="#0f2b32" strokeWidth="2" fill="#0f2b32">
            <path d="M 44 45 L 58 45 L 56 56 L 46 56 Z" rx="2" />
            <path d="M 62 45 L 76 45 L 74 56 L 64 56 Z" rx="2" />
            <line x1="58" y1="47" x2="62" y2="47" strokeWidth="2.5" />
          </g>
        )}
        {appearance.accessories.includes('headphone') && (
          <g stroke="#0f2b32" strokeWidth="2.5" fill="none">
            <path d="M 36 50 C 36 28 84 28 84 50" stroke="#ff5c45" strokeWidth="3.5" />
            <rect x="33" y="46" width="6" height="14" rx="2" fill="#ff5c45" />
            <rect x="81" y="46" width="6" height="14" rx="2" fill="#ff5c45" />
          </g>
        )}
        {appearance.accessories.includes('hat') && (
          <g>
            <ellipse cx="60" cy="27" rx="32" ry="7" fill="#876543" stroke="#0f2b32" strokeWidth="2" />
            <path d="M 44 26 C 44 14 76 14 76 26 Z" fill="#876543" stroke="#0f2b32" strokeWidth="2" />
            <line x1="44" y1="23" x2="76" y2="23" stroke="#ee3e25" strokeWidth="3" />
          </g>
        )}
        {appearance.accessories.includes('antenna') && (
          <g>
            <line x1="60" y1="20" x2="60" y2="10" stroke="#0f2b32" strokeWidth="2.5" />
            <circle cx="60" cy="8" r="4" fill="#38bdf8" stroke="#0f2b32" strokeWidth="1.5" className="animate-ping" />
          </g>
        )}
      </>
    );
  };

  const flipStyle = facing === 'left' ? { transform: 'scaleX(-1)' } : undefined;

  return (
    <div
      onClick={onClick}
      className={`relative inline-block select-none ${bodyActionClass} ${entranceClassMap[entranceAnim]} ${className} ${onClick ? 'cursor-pointer' : ''}`}
      style={{ width: `${w}px`, height: `${h}px` }}
      title={character?.name ? `${character.name} (${character.role || 'Character'})` : 'Character Avatar'}
    >
      <svg
        viewBox="0 0 120 160"
        width="100%"
        height="100%"
        className="overflow-visible"
        style={flipStyle}
      >
        <defs>
          <filter id={`shadow-${uniqueId}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="2" stdDeviation="0" floodColor="#0f2b32" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Floor Shadow */}
        {showShadow && (
          <ellipse cx="60" cy="154" rx="34" ry="6" fill="rgba(15, 43, 50, 0.2)" />
        )}

        {/* Back Hair */}
        {appearance.hairStyle === 'long' && (
          <path
            d="M 32 50 C 26 70 28 100 34 115 L 86 115 C 92 100 94 70 88 50 Z"
            fill={appearance.hairColor}
            stroke="#0f2b32"
            strokeWidth="2"
          />
        )}

        {/* Left Arm (behind/along body) */}
        <g transform={leftArmTransform}>
          <rect x="26" y="94" width="12" height="34" rx="6" fill={appearance.outfitColor} stroke="#0f2b32" strokeWidth="2" />
          <circle cx="32" cy="132" r="5.5" fill={appearance.skinTone} stroke="#0f2b32" strokeWidth="1.5" />
        </g>

        {/* Legs / Lower Pants */}
        <g>
          <rect x="42" y="136" width="14" height="20" rx="3" fill="#2d3748" stroke="#0f2b32" strokeWidth="2" />
          <rect x="64" y="136" width="14" height="20" rx="3" fill="#2d3748" stroke="#0f2b32" strokeWidth="2" />
          {/* Shoes */}
          <ellipse cx="48" cy="154" rx="9" ry="4.5" fill="#0f2b32" />
          <ellipse cx="72" cy="154" rx="9" ry="4.5" fill="#0f2b32" />
        </g>

        {/* Torso / Outfit */}
        {renderOutfit()}

        {/* Right Arm (in front for gestures) */}
        <g transform={rightArmTransform}>
          <rect x="82" y="94" width="12" height="34" rx="6" fill={appearance.outfitColor} stroke="#0f2b32" strokeWidth="2" />
          <circle cx="88" cy="132" r="5.5" fill={appearance.skinTone} stroke="#0f2b32" strokeWidth="1.5" />
        </g>

        {/* Neck */}
        <rect x="54" y="78" width="12" height="14" fill={appearance.skinTone} stroke="#0f2b32" strokeWidth="2" />

        {/* Head Group (can tilt based on gesture) */}
        <g transform={`rotate(${headTiltDeg} 60 55)`}>
          {/* Ears */}
          <circle cx="38" cy="54" r="5.5" fill={appearance.skinTone} stroke="#0f2b32" strokeWidth="1.8" />
          <circle cx="82" cy="54" r="5.5" fill={appearance.skinTone} stroke="#0f2b32" strokeWidth="1.8" />

          {/* Face Base */}
          <ellipse cx="60" cy="54" rx="22" ry="25" fill={appearance.skinTone} stroke="#0f2b32" strokeWidth="2.5" />

          {/* Facial Hair */}
          {appearance.facialHair === 'beard' && (
            <path d="M 42 56 C 42 76 78 76 78 56 Z" fill={appearance.hairColor} stroke="#0f2b32" strokeWidth="2" />
          )}
          {appearance.facialHair === 'mustache' && (
            <path d="M 48 62 Q 60 59 72 62" stroke={appearance.hairColor} strokeWidth="3" strokeLinecap="round" />
          )}

          {/* Blush for kids / cute / happy */}
          {(expression === 'happy' || expression === 'embarrassed') && (
            <>
              <circle cx="45" cy="56" r="3.5" fill="#ff7a66" opacity="0.4" />
              <circle cx="75" cy="56" r="3.5" fill="#ff7a66" opacity="0.4" />
            </>
          )}

          {/* Eyes & Eyebrows */}
          {renderEyes()}
          {renderEyebrows()}

          {/* Nose */}
          <path d="M 60 52 L 59 58 L 62 58" fill="none" stroke="#0f2b32" strokeWidth="1.8" strokeLinecap="round" />

          {/* Mouth */}
          {renderMouth()}

          {/* Hair Front */}
          {renderHair()}

          {/* Accessories (glasses, headphones, hats) */}
          {renderAccessories()}
        </g>
      </svg>
    </div>
  );
};
