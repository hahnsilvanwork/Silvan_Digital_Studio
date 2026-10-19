import Image from 'next/image';

interface BrandLogoProps {
  readonly tone?: 'navy' | 'white';
  readonly className?: string;
  readonly priority?: boolean;
}

export function BrandLogo({tone='navy',className,priority=false}:BrandLogoProps) {
  return <Image
    alt="SILVAN Digital Studio"
    className={className}
    src={`/images/brand/silvan-logo-${tone}.svg`}
    width={1684}
    height={507}
    unoptimized
    priority={priority}
  />;
}
