'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Task, TaskTier, Category } from '@/lib/types'

interface Props {
  onAdd: (task: Omit<Task, 'id' | 'completed'>) => void
}

export function QuickAddModal({ onAdd }: Props) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [tier, setTier] = useState<TaskTier>('enhancer')
  const [category, setCategory] = useState<Category>('brain')
  const [xp, setXp] = useState('25')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    onAdd({ title: title.trim(), tier, category, xp: Number(xp) || 25 })
    setTitle('')
    setTier('enhancer')
    setCategory('brain')
    setXp('25')
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
          Quick Add
        </motion.button>
      </DialogTrigger>
      <DialogContent className="bg-[#0d0d1a] border-white/10 text-white sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-sm font-bold">Add Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3 mt-1">
          <Input
            placeholder="Task title..."
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="bg-white/5 border-white/10 text-white placeholder:text-slate-600 text-sm h-9"
            autoFocus
          />
          <div className="grid grid-cols-2 gap-2">
            <Select value={tier} onValueChange={v => setTier(v as TaskTier)}>
              <SelectTrigger className="bg-white/5 border-white/10 text-white h-9 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#0d0d1a] border-white/10 text-white">
                <SelectItem value="non-negotiable" className="text-xs">Non-negotiable</SelectItem>
                <SelectItem value="enhancer" className="text-xs">Enhancer</SelectItem>
                <SelectItem value="optional" className="text-xs">Optional</SelectItem>
              </SelectContent>
            </Select>
            <Select value={category} onValueChange={v => setCategory(v as Category)}>
              <SelectTrigger className="bg-white/5 border-white/10 text-white h-9 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#0d0d1a] border-white/10 text-white">
                <SelectItem value="body" className="text-xs text-emerald-400">Body</SelectItem>
                <SelectItem value="brain" className="text-xs text-cyan-400">Brain</SelectItem>
                <SelectItem value="spirit" className="text-xs text-violet-400">Spirit</SelectItem>
                <SelectItem value="execution" className="text-xs text-amber-400">Execution</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder="XP"
              value={xp}
              onChange={e => setXp(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-slate-600 text-sm h-9"
            />
            <Button type="submit" size="sm" className="bg-violet-600 hover:bg-violet-500 text-white border-0 h-9 px-4 text-xs">
              Add
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
