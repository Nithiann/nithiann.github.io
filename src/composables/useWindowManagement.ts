import { ref } from 'vue'

export interface WindowState {
  isOpen: boolean
  zIndex: number
  x: number
  y: number
  width: number
  height: number
  isMaximized?: boolean
}

export function useWindowManagement(initialWindows: Record<string, WindowState>) {
  const windows = ref(initialWindows)
  const topZIndex = ref(100)

  const focusWindow = (id: string) => {
    if (!windows.value[id]) return
    topZIndex.value += 1
    windows.value[id].zIndex = topZIndex.value
  }

  const openWindow = (id: string) => {
    if (!windows.value[id]) return
    windows.value[id].isOpen = true
    focusWindow(id)
  }

  const closeWindow = (id: string) => {
    if (!windows.value[id]) return
    windows.value[id].isOpen = false
  }

  const handleDrag = (id: string, e: MouseEvent) => {
    const win = windows.value[id]
    if (!win) return
    const startX = e.clientX
    const startY = e.clientY
    const initialX = win.x
    const initialY = win.y

    const onMouseMove = (moveEvent: MouseEvent) => {
      win.x = initialX + (moveEvent.clientX - startX)
      win.y = initialY + (moveEvent.clientY - startY)
    }

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  const handleResize = (id: string, e: MouseEvent, direction: string) => {
    e.stopPropagation()
    const win = windows.value[id]
    if (!win) return
    const startX = e.clientX
    const startY = e.clientY
    const startWidth = win.width
    const startHeight = win.height
    const startXPos = win.x
    const startYPos = win.y

    const onMouseMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - startX
      const dy = moveEvent.clientY - startY

      if (direction.includes('e')) win.width = Math.max(200, startWidth + dx)
      if (direction.includes('s')) win.height = Math.max(150, startHeight + dy)
      if (direction.includes('w')) {
        const newWidth = Math.max(200, startWidth - dx)
        if (newWidth !== 200) {
          win.width = newWidth
          win.x = startXPos + dx
        }
      }
      if (direction.includes('n')) {
        const newHeight = Math.max(150, startHeight - dy)
        if (newHeight !== 150) {
          win.height = newHeight
          win.y = startYPos + dy
        }
      }
    }

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  const updateWindowPosition = (id: string, { dx, dy }: { dx: number, dy: number }) => {
    const win = windows.value[id]
    if (!win) return
    win.x += dx
    win.y += dy
  }

  const updateWindowSize = (id: string, { dx, dy, dw, dh }: { dx: number, dy: number, dw: number, dh: number }) => {
    const win = windows.value[id]
    if (!win) return

    // Position updates
    win.x += dx
    win.y += dy

    // Dimension updates with constraints
    const nextWidth = win.width + dw
    const nextHeight = win.height + dh

    if (nextWidth >= 200) {
      win.width = nextWidth
    } else {
      // If we hit minimum width, we need to adjust X if we were resizing from the west
      if (dx !== 0) {
        win.x -= (200 - nextWidth)
      }
      win.width = 200
    }

    if (nextHeight >= 150) {
      win.height = nextHeight
    } else {
      // If we hit minimum height, we need to adjust Y if we were resizing from the north
      if (dy !== 0) {
        win.y -= (150 - nextHeight)
      }
      win.height = 150
    }
  }

  return {
    windows,
    topZIndex,
    focusWindow,
    openWindow,
    closeWindow,
    handleDrag,
    handleResize,
    updateWindowPosition,
    updateWindowSize
  }
}
