import {icons, LucideProps} from 'lucide-react';

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: keyof typeof icons
}

const Icon = ({name, ...props}: IconProps) => {
  const LucideIcon = icons[name] !== undefined ? icons[name] : ''
  if (!LucideIcon) {
    return ''
  }
  return <LucideIcon color={props.color} size={props.size}/>
}

export default Icon