<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  os: 'win7' | 'macos' | 'linux' | 'ios' | 'android' | 'wp'
}>()

const display = ref('0')
const prevValue = ref<number | null>(null)
const operator = ref<string | null>(null)
const waitingForNextValue = ref(false)

const clear = () => {
  display.value = '0'
  prevValue.value = null
  operator.value = null
  waitingForNextValue.value = false
}

const inputDigit = (digit: string) => {
  if (waitingForNextValue.value) {
    display.value = digit
    waitingForNextValue.value = false
  } else {
    display.value = display.value === '0' ? digit : display.value + digit
  }
}

const inputDot = () => {
  if (waitingForNextValue.value) {
    display.value = '0.'
    waitingForNextValue.value = false
    return
  }
  if (!display.value.includes('.')) {
    display.value += '.'
  }
}

const performOperation = (nextOperator: string) => {
  const inputValue = parseFloat(display.value)

  if (prevValue.value === null) {
    prevValue.value = inputValue
  } else if (operator.value) {
    const currentValue = prevValue.value || 0
    let newValue = 0

    switch (operator.value) {
      case '+': newValue = currentValue + inputValue; break
      case '-': newValue = currentValue - inputValue; break
      case '*': newValue = currentValue * inputValue; break
      case '/': newValue = currentValue / inputValue; break
    }

    display.value = String(newValue)
    prevValue.value = newValue
  }

  waitingForNextValue.value = true
  operator.value = nextOperator
}

const calculate = () => {
  if (!operator.value) return
  performOperation(operator.value)
  operator.value = null
}

const toggleSign = () => {
  display.value = String(parseFloat(display.value) * -1)
}

const percentage = () => {
  display.value = String(parseFloat(display.value) / 100)
}

const isWinStyle = computed(() => props.os === 'win7' || props.os === 'wp')
const isMacStyle = computed(() => props.os === 'macos' || props.os === 'ios')
const isAndroidStyle = computed(() => props.os === 'linux' || props.os === 'android')
</script>

<template>
  <div
    class="flex flex-col h-full select-none transition-colors duration-300"
    :class="{
      'bg-[#f0f0f0] font-[SegoeUI] p-1': isWinStyle,
      'bg-[#1c1c1c] text-white p-4 rounded-3xl': isMacStyle,
      'bg-[#f7f2fa] p-4 font-sans': isAndroidStyle
    }"
  >
    <!-- Display -->
    <div
      class="flex items-end justify-end mb-4 px-4 overflow-hidden"
      :class="{
        'bg-white border border-[#919191] h-16 text-4xl text-black': isWinStyle,
        'h-24 text-6xl font-light': isMacStyle,
        'h-20 text-5xl text-[#1d1b20] font-medium': isAndroidStyle
      }"
    >
      {{ display }}
    </div>

    <!-- Buttons Grid -->
    <div
      class="grid grid-cols-4 gap-2 flex-1"
      :class="{
        'gap-1': isWinStyle,
        'gap-3': isMacStyle,
        'gap-2': isAndroidStyle
      }"
    >
      <!-- Row 1 -->
      <button
        @click="clear"
        :class="[
          'flex items-center justify-center transition-all active:scale-95',
          isWinStyle ? 'bg-[#e1e1e1] text-black border border-[#adadad] hover:bg-[#e5f1fb] hover:border-[#0078d7]' : '',
          isMacStyle ? 'bg-[#a5a5a5] text-black rounded-full text-2xl font-medium' : '',
          isAndroidStyle ? 'bg-[#fdd8e5] text-[#31111d] rounded-[28px] text-xl font-bold' : ''
        ]"
      >C</button>
      <button
        @click="toggleSign"
        :class="[
          'flex items-center justify-center transition-all active:scale-95',
          isWinStyle ? 'bg-[#e1e1e1] text-black border border-[#adadad] hover:bg-[#e5f1fb]' : '',
          isMacStyle ? 'bg-[#a5a5a5] text-black rounded-full text-2xl font-medium' : '',
          isAndroidStyle ? 'bg-[#ffd8e4] text-[#31111d] rounded-[28px] text-xl font-bold font-bold' : ''
        ]"
      >±</button>
      <button
        @click="percentage"
        :class="[
          'flex items-center justify-center transition-all active:scale-95',
          isWinStyle ? 'bg-[#e1e1e1] text-black border border-[#adadad] hover:bg-[#e5f1fb]' : '',
          isMacStyle ? 'bg-[#a5a5a5] text-black rounded-full text-2xl font-medium' : '',
          isAndroidStyle ? 'bg-[#ffd8e4] text-[#31111d] rounded-[28px] text-xl font-bold font-bold' : ''
        ]"
      >%</button>
      <button
        @click="performOperation('/')"
        :class="[
          'flex items-center justify-center transition-all active:scale-95',
          isWinStyle ? 'bg-[#e1e1e1] text-black border border-[#adadad] hover:bg-[#e5f1fb]' : '',
          isMacStyle ? 'bg-[#ff9f0a] text-white rounded-full text-3xl font-medium' : '',
          isAndroidStyle ? 'bg-[#ffd8e4] text-[#31111d] rounded-[28px] text-xl font-bold font-bold' : ''
        ]"
      >÷</button>

      <!-- Row 2 -->
      <button v-for="n in ['7', '8', '9']" :key="n" @click="inputDigit(n)"
        :class="[
          'flex items-center justify-center transition-all active:scale-95',
          isWinStyle ? 'bg-[#f0f0f0] text-black border border-[#adadad] hover:bg-[#e5f1fb]' : '',
          isMacStyle ? 'bg-[#333333] text-white rounded-full text-3xl font-medium' : '',
          isAndroidStyle ? 'bg-[#eaddff] text-[#21005d] rounded-[28px] text-xl font-bold font-bold' : ''
        ]"
      >{{ n }}</button>
      <button
        @click="performOperation('*')"
        :class="[
          'flex items-center justify-center transition-all active:scale-95',
          isWinStyle ? 'bg-[#e1e1e1] text-black border border-[#adadad] hover:bg-[#e5f1fb]' : '',
          isMacStyle ? 'bg-[#ff9f0a] text-white rounded-full text-3xl font-medium' : '',
          isAndroidStyle ? 'bg-[#ffd8e4] text-[#31111d] rounded-[28px] text-xl font-bold font-bold' : ''
        ]"
      >×</button>

      <!-- Row 3 -->
      <button v-for="n in ['4', '5', '6']" :key="n" @click="inputDigit(n)"
        :class="[
          'flex items-center justify-center transition-all active:scale-95',
          isWinStyle ? 'bg-[#f0f0f0] text-black border border-[#adadad] hover:bg-[#e5f1fb]' : '',
          isMacStyle ? 'bg-[#333333] text-white rounded-full text-3xl font-medium' : '',
          isAndroidStyle ? 'bg-[#eaddff] text-[#21005d] rounded-[28px] text-xl font-bold font-bold' : ''
        ]"
      >{{ n }}</button>
      <button
        @click="performOperation('-')"
        :class="[
          'flex items-center justify-center transition-all active:scale-95',
          isWinStyle ? 'bg-[#e1e1e1] text-black border border-[#adadad] hover:bg-[#e5f1fb]' : '',
          isMacStyle ? 'bg-[#ff9f0a] text-white rounded-full text-3xl font-medium' : '',
          isAndroidStyle ? 'bg-[#ffd8e4] text-[#31111d] rounded-[28px] text-xl font-bold font-bold' : ''
        ]"
      >−</button>

      <!-- Row 4 -->
      <button v-for="n in ['1', '2', '3']" :key="n" @click="inputDigit(n)"
        :class="[
          'flex items-center justify-center transition-all active:scale-95',
          isWinStyle ? 'bg-[#f0f0f0] text-black border border-[#adadad] hover:bg-[#e5f1fb]' : '',
          isMacStyle ? 'bg-[#333333] text-white rounded-full text-3xl font-medium' : '',
          isAndroidStyle ? 'bg-[#eaddff] text-[#21005d] rounded-[28px] text-xl font-bold font-bold' : ''
        ]"
      >{{ n }}</button>
      <button
        @click="performOperation('+')"
        :class="[
          'flex items-center justify-center transition-all active:scale-95',
          isWinStyle ? 'bg-[#e1e1e1] text-black border border-[#adadad] hover:bg-[#e5f1fb]' : '',
          isMacStyle ? 'bg-[#ff9f0a] text-white rounded-full text-3xl font-medium' : '',
          isAndroidStyle ? 'bg-[#ffd8e4] text-[#31111d] rounded-[28px] text-xl font-bold font-bold' : ''
        ]"
      >+</button>

      <!-- Row 5 -->
      <button
        @click="inputDigit('0')"
        :class="[
          'col-span-2 flex items-center justify-start pl-8 transition-all active:scale-95',
          isWinStyle ? 'bg-[#f0f0f0] text-black border border-[#adadad] hover:bg-[#e5f1fb] justify-center pl-0' : '',
          isMacStyle ? 'bg-[#333333] text-white rounded-full text-3xl font-medium' : '',
          isAndroidStyle ? 'bg-[#eaddff] text-[#21005d] rounded-full text-xl font-bold justify-center pl-0' : ''
        ]"
      >0</button>
      <button
        @click="inputDot"
        :class="[
          'flex items-center justify-center transition-all active:scale-95',
          isWinStyle ? 'bg-[#f0f0f0] text-black border border-[#adadad] hover:bg-[#e5f1fb]' : '',
          isMacStyle ? 'bg-[#333333] text-white rounded-full text-3xl font-medium' : '',
          isAndroidStyle ? 'bg-[#eaddff] text-[#21005d] rounded-[28px] text-xl font-bold font-bold font-bold' : ''
        ]"
      >.</button>
      <button
        @click="calculate"
        :class="[
          'flex items-center justify-center transition-all active:scale-95',
          isWinStyle ? 'bg-[#2188ff] text-white border border-[#adadad] hover:bg-[#005cc5]' : '',
          isMacStyle ? 'bg-[#ff9f0a] text-white rounded-full text-3xl font-medium' : '',
          isAndroidStyle ? 'bg-[#4f378b] text-white rounded-[28px] text-xl font-bold font-bold font-bold' : ''
        ]"
      >=</button>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&display=swap');

button {
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}
</style>
