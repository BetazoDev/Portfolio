
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';

interface SectionHeaderProps extends HTMLMotionProps<'div'> {
  subtitle: string;
  className?: string;
  accentClassName?: string;
  textClassName?: string;
}

export const SectionHeader = ({
  subtitle,
  className,
  accentClassName,
  textClassName,
  ...props
}: SectionHeaderProps) => {
  return (
    <motion.div
      className={cn("flex items-center gap-4 mb-20", className)}
      {...props}
    >
      <span className={cn("w-8 h-[1px] bg-accent", accentClassName)} />
      <span className={cn(
        "text-[10px] font-mono uppercase tracking-[0.4em] text-accent font-medium",
        textClassName
      )}>
        {subtitle}
      </span>
    </motion.div>
  );
};
