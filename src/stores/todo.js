import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', () => {
  // 状态
  const todos = ref([])
  const nextId = ref(1)

  // Getters
  const completedTodos = computed(() => {
    return todos.value.filter(todo => todo.completed)
  })

  const pendingTodos = computed(() => {
    return todos.value.filter(todo => !todo.completed)
  })

  const totalTodos = computed(() => {
    return todos.value.length
  })

  const todoStats = computed(() => {
    return {
      total: totalTodos.value,
      completed: completedTodos.value.length,
      pending: pendingTodos.value.length,
      completionRate: totalTodos.value > 0 ? Math.round((completedTodos.value.length / totalTodos.value) * 100) : 0
    }
  })

  // Actions
  function addTodo(title) {
    const newTodo = {
      id: nextId.value++,
      title,
      completed: false,
      createdAt: new Date()
    }
    todos.value.push(newTodo)
  }

  function toggleTodo(id) {
    const todo = todos.value.find(todo => todo.id === id)
    if (todo) {
      todo.completed = !todo.completed
    }
  }

  function deleteTodo(id) {
    todos.value = todos.value.filter(todo => todo.id !== id)
  }

  function clearCompleted() {
    todos.value = pendingTodos.value
  }

  function toggleAll(completed) {
    todos.value.forEach(todo => {
      todo.completed = completed
    })
  }

  // 异步Action示例
  async function fetchTodosFromApi() {
    // 模拟API请求
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 模拟API返回数据
    const mockTodos = [
      { id: nextId.value++, title: '学习Pinia', completed: false, createdAt: new Date() },
      { id: nextId.value++, title: '构建Vue应用', completed: true, createdAt: new Date() },
      { id: nextId.value++, title: '编写测试', completed: false, createdAt: new Date() }
    ]
    
    todos.value = mockTodos
  }

  return {
    // 状态
    todos,
    // Getters
    completedTodos,
    pendingTodos,
    totalTodos,
    todoStats,
    // Actions
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    toggleAll,
    fetchTodosFromApi
  }
})