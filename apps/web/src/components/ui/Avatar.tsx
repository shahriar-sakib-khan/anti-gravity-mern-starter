import { User } from 'lucide-react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizes = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-20 w-20',
  xl: 'h-32 w-32'
};

export const Avatar = ({ src, alt, size = 'md', className = '' }: AvatarProps) => {
  if (src) {
    return (
      <img
        src={src}
        alt={alt || 'Avatar'}
        className={`${sizes[size]} rounded-full object-cover border-2 border-white/10 ${className}`}
      />
    );
  }

  return (
    <div className={`${sizes[size]} rounded-full bg-white/10 flex items-center justify-center border-2 border-white/10 ${className}`}>
      <User className="text-gray-400" size={size === 'sm' ? 16 : size === 'md' ? 20 : size === 'lg' ? 40 : 64} />
    </div>
  );
};
