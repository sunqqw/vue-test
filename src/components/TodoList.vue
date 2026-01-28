<script setup>
import { ref, computed, watch, onUnmounted } from 'vue'

const inputSeconds = ref(60)
const remaining = ref(60)
const running = ref(false)
let endTime = 0
let timerId = null

watch(inputSeconds, (v) => {
  if (!running.value) {
    const s = Math.max(0, Number(v) || 0)
    remaining.value = s
  }
})

const pad = (n) => n.toString().padStart(2, '0')
const formatted = computed(() => {
  const s = Math.max(0, remaining.value)
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(sec)}` : `${pad(m)}:${pad(sec)}`
})

const tick = () => {
  const now = Date.now()
  const left = Math.max(0, Math.round((endTime - now) / 1000))
  remaining.value = left
  if (left <= 0) {
    running.value = false
    if (timerId) {
      clearInterval(timerId)
      timerId = null
    }
  }
}

const start = () => {
  if (running.value) return
  const s = Math.max(1, Number(inputSeconds.value) || 0)
  if (remaining.value <= 0 || remaining.value !== s) {
    remaining.value = s
  }
  endTime = Date.now() + remaining.value * 1000
  running.value = true
  if (timerId) clearInterval(timerId)
  timerId = setInterval(tick, 250)
}

const pause = () => {
  if (!running.value) return
  running.value = false
  if (timerId) {
    clearInterval(timerId)
    timerId = null
  }
  const now = Date.now()
  remaining.value = Math.max(0, Math.round((endTime - now) / 1000))
}

const reset = () => {
  running.value = false
  if (timerId) {
    clearInterval(timerId)
    timerId = null
  }
  const s = Math.max(0, Number(inputSeconds.value) || 0)
  remaining.value = s
}

onUnmounted(() => {
  if (timerId) clearInterval(timerId)
})
</script>

<template>
  <div
    class="w-full max-w-md mx-auto bg-white/90 dark:bg-[#181818]/90 backdrop-blur-sm rounded-xl border border-gray-100 dark:border-gray-800 shadow-lg p-6">
    <div class="flex items-center justify-between mb-4">
      <div class="text-3xl font-semibold tabular-nums tracking-tight text-gray-900 dark:text-white">
        {{ formatted }}
      </div>
      <div class="text-xs text-gray-500 dark:text-gray-400">
        {{ running ? '计时中' : '已暂停' }}
      </div>
    </div>
    <div class="flex items-center gap-3 mb-6">
      <input v-model.number="inputSeconds" type="number" min="0" step="1"
        class="w-32 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="秒" />
      <button @click="start"
        class="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
        开始
      </button>
      <button @click="pause"
        class="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">
        暂停
      </button>
      <button @click="reset"
        class="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
        重置
      </button>
    </div>
    <div class="text-xs text-gray-500 dark:text-gray-400">
      输入秒数后点击开始，精确到秒。
    </div>
  </div>
</template>
