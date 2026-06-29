import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'danger' | 'outline'
  size?: 'sm' | 'md'
  children: ReactNode
}

export function Button({ variant = 'primary', size = 'md', className = '', children, ...props }: ButtonProps) {
  const base = 'inline-flex items-center gap-2 font-medium transition-colors rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
  const sizes = { sm: 'px-3 py-1.5 text-xs', md: 'px-4 py-2 text-sm' }
  const variants = {
    primary: 'bg-[#6366F1] hover:bg-[#5558E8] text-white',
    ghost: 'text-[#64748B] hover:text-[#F1F5F9] hover:bg-[#1E1E2E]',
    danger: 'bg-[#EF4444] hover:bg-[#DC2626] text-white',
    outline: 'border border-[#1E1E2E] text-[#F1F5F9] hover:bg-[#1E1E2E]',
  }
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
