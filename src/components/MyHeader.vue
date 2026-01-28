<script setup>
import { ref, onMounted, onUnmounted, reactive } from 'vue'
import { barnerImagesData1 } from '@/assets/banner'

const container = ref(null)
const layers = reactive(
  barnerImagesData1.map((item, index) => ({
    id: index,
    url: item.url,
    width: item.width,
    height: item.height,
    blur: item.blur,
    opacity: item.opacity,
    transform: item.transform, // [scaleX, skewY, skewX, scaleY, translateX, translateY]
    a: item.a || 0, // Parallax factor
    g: item.g || 0, // Vertical parallax factor or similar
    style: {
      transform: `translate(${item.transform ? item.transform[4] : 0}px, ${item.transform ? item.transform[5] : 0}px)`,
      opacity: Array.isArray(item.opacity) ? item.opacity[1] : (item.opacity || 1),
      filter: item.blur ? `blur(${item.blur}px)` : 'none'
    },
    baseStyle: {
      zIndex: index + 1,
      mixBlendMode: item.blendMode || 'normal',
      ...(item.style || {})
    }
  }))
)

const handleMouseMove = (e) => {
  if (!container.value) return

  const mouseX = e.clientX
  // Calculate offset relative to center
  const percentage = (mouseX / window.innerWidth) - 0.5

  layers.forEach((layer) => {
    // Basic parallax calculation
    // 'a' seems to be the sensitivity factor based on the data provided
    // We multiply by a large number because 'a' values are small (0.01 - 0.2)
    const offset = percentage * layer.a * 1000

    // Initial transform from data
    const initialX = layer.transform ? layer.transform[4] : 0
    const initialY = layer.transform ? layer.transform[5] : 0

    // Construct transform string
    // We keep the initial translation and add the parallax offset
    layer.style = {
      transform: `translate(${initialX + offset}px, ${initialY}px)`,
      opacity: Array.isArray(layer.opacity) ? layer.opacity[1] : (layer.opacity || 1)
    }

    // Handle blur if present in data
    if (layer.blur) {
      layer.style.filter = `blur(${layer.blur}px)`
    }
  })
}

const handleResize = () => {
  // Optional: Recalculate if needed
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div
    class="relative w-full h-[180px] overflow-hidden bg-[#090b1a] mb-5 shadow-[0_4px_12px_rgba(0,0,0,0.1)] flex justify-center items-center"
    ref="container">
    <div v-for="layer in layers" :key="layer.id"
      class="absolute top-0 left-0 w-full h-full flex justify-center items-center pointer-events-none"
      :style="{ ...layer.baseStyle, ...layer.style }">
      <img :src="layer.url" class="block max-w-none" :style="{ width: layer.width + 'px' }" alt="" />
    </div>
  </div>
</template>

<style scoped></style>
