'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AccordionItemProps {
  title: string
  children: React.ReactNode
  isOpen: boolean
  onToggle: () => void
}

function AccordionItem({ title, children, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="border-b last:border-b-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-4 px-4 text-left font-medium transition-colors hover:bg-accent/50"
      >
        <span>{title}</span>
        <ChevronDown
          className={cn(
            'h-4 w-4 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-200',
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="px-4 pb-4 text-sm text-muted-foreground">{children}</div>
      </div>
    </div>
  )
}

export function AccordionDemo() {
  const [openItems, setOpenItems] = useState<string[]>(['1'])

  const toggleItem = (id: string) => {
    setOpenItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  return (
    <div className="w-full bg-white">
      <div className="px-4 py-3 border-b bg-gray-50">
        <h3 className="font-semibold text-gray-900">Accordion Demo</h3>
      </div>
      <AccordionItem
        title="What is Xaui?"
        isOpen={openItems.includes('1')}
        onToggle={() => toggleItem('1')}
      >
        Xaui is a modern React Native UI library inspired by Flutter, designed to
        help you build beautiful and consistent mobile applications.
      </AccordionItem>
      <AccordionItem
        title="Key Features"
        isOpen={openItems.includes('2')}
        onToggle={() => toggleItem('2')}
      >
        <ul className="list-disc list-inside space-y-1">
          <li>Flutter-inspired API</li>
          <li>Smooth animations with Reanimated</li>
          <li>Complete design system</li>
          <li>TypeScript support</li>
        </ul>
      </AccordionItem>
      <AccordionItem
        title="Getting Started"
        isOpen={openItems.includes('3')}
        onToggle={() => toggleItem('3')}
      >
        Install Xaui using npm or yarn, wrap your app with XUIProvider, and start
        building with our comprehensive component library.
      </AccordionItem>
    </div>
  )
}
