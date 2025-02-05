import { useState, useEffect } from 'react'
import { CheckCircle, PlusCircle } from 'lucide-react'
import TodoItem from './components/TodoItem'

interface Todo {
  id: number
  text: string
  completed: boolean
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos')
    return saved ? JSON.parse(saved) : []
  })
  const [newTodo, setNewTodo] = useState('')

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo.trim(), completed: false }])
      setNewTodo('')
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const editTodo = (id: number, newText: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ))
  }

  const completedCount = todos.filter(todo => todo.completed).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
      <div className="mx-auto max-w-2xl px-4">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-gray-800">
            <CheckCircle className="mr-2 inline-block text-blue-600" />
            Todo List
          </h1>
          <p className="text-gray-600">
            {completedCount} of {todos.length} tasks completed
          </p>
        </div>

        <form onSubmit={addTodo} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
            />
            <button
              type="submit"
              className="flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
            >
              <PlusCircle size={20} />
              Add
            </button>
          </div>
        </form>

        <div className="space-y-3">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          ))}
          {todos.length === 0 && (
            <div className="text-center text-gray-500">
              No tasks yet. Add one above!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
