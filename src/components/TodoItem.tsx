import { Check, Trash2, Edit2 } from 'lucide-react'
import { useState } from 'react'

interface TodoItemProps {
  todo: {
    id: number
    text: string
    completed: boolean
  }
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onEdit: (id: number, newText: string) => void
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleSubmit = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText)
      setIsEditing(false)
    }
  }

  return (
    <div className="group flex items-center justify-between rounded-lg bg-white p-4 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center gap-3">
        <button
          onClick={() => onToggle(todo.id)}
          className={`rounded-full border-2 p-1 transition-colors ${
            todo.completed
              ? 'border-green-500 bg-green-500 text-white'
              : 'border-gray-300 hover:border-green-500'
          }`}
        >
          <Check size={16} className={todo.completed ? 'opacity-100' : 'opacity-0'} />
        </button>
        
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSubmit}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            className="rounded-md border border-gray-300 px-2 py-1 focus:border-blue-500 focus:outline-none"
            autoFocus
          />
        ) : (
          <span className={`${todo.completed ? 'text-gray-500 line-through' : ''}`}>
            {todo.text}
          </span>
        )}
      </div>
      
      <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          onClick={() => setIsEditing(true)}
          className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-blue-600"
        >
          <Edit2 size={18} />
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-red-600"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  )
}
