// Deterministic animation utilities based strictly on currentFrame / t

export function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

export function lerp(start, end, t) {
  return start + (end - start) * clamp(t, 0, 1);
}

// Easing Functions
export function easeIn(t) {
  const clamped = clamp(t, 0, 1);
  return clamped * clamped;
}

export function easeOut(t) {
  const clamped = clamp(t, 0, 1);
  return clamped * (2 - clamped);
}

export function easeInOut(t) {
  const clamped = clamp(t, 0, 1);
  return clamped < 0.5
    ? 2 * clamped * clamped
    : -1 + (4 - 2 * clamped) * clamped;
}

export function cubicEaseInOut(t) {
  const clamped = clamp(t, 0, 1);
  return clamped < 0.5
    ? 4 * clamped * clamped * clamped
    : 1 - Math.pow(-2 * clamped + 2, 3) / 2;
}

/**
 * Interpolates a frame/time value between input and output ranges with optional easing and extrapolation limits
 */
export function interpolate(val, inputRange, outputRange, options = {}) {
  const { easing = (t) => t, extrapolate = 'clamp' } = options;
  const [inMin, inMax] = inputRange;
  const [outMin, outMax] = outputRange;

  if (inMin === inMax) return outMin;

  let progress = (val - inMin) / (inMax - inMin);

  if (extrapolate === 'clamp') {
    progress = clamp(progress, 0, 1);
  }

  const easedProgress = easing(progress);
  return outMin + easedProgress * (outMax - outMin);
}

/**
 * Fade helper: returns opacity [0..1]
 */
export function fade(currentFrame, startFrame, durationFrames, type = 'in') {
  if (type === 'in') {
    return interpolate(currentFrame, [startFrame, startFrame + durationFrames], [0, 1], {
      easing: easeOut
    });
  } else if (type === 'out') {
    return interpolate(currentFrame, [startFrame, startFrame + durationFrames], [1, 0], {
      easing: easeIn
    });
  } else {
    // crossfade / in-out
    const mid = startFrame + durationFrames / 2;
    if (currentFrame <= mid) {
      return interpolate(currentFrame, [startFrame, mid], [0, 1], { easing: easeOut });
    } else {
      return interpolate(currentFrame, [mid, startFrame + durationFrames], [1, 0], { easing: easeIn });
    }
  }
}

/**
 * Scale helper: returns scale value [startScale..endScale]
 */
export function scale(currentFrame, startFrame, durationFrames, startScale = 0.8, endScale = 1, easing = easeOut) {
  return interpolate(currentFrame, [startFrame, startFrame + durationFrames], [startScale, endScale], {
    easing
  });
}

/**
 * Slide helper: returns translation value in pixels [startPos..endPos]
 */
export function slide(currentFrame, startFrame, durationFrames, startPos = 50, endPos = 0, easing = easeOut) {
  return interpolate(currentFrame, [startFrame, startFrame + durationFrames], [startPos, endPos], {
    easing
  });
}

/**
 * Stagger delay per index helper
 */
export function stagger(index, baseFrame, delayPerItemFrames = 5) {
  return baseFrame + index * delayPerItemFrames;
}

/**
 * Number counter interpolation (e.g., counting up to 200,000)
 */
export function countUp(currentFrame, startFrame, durationFrames, targetVal, formatFn = (n) => Math.round(n).toLocaleString('id-ID')) {
  const val = interpolate(currentFrame, [startFrame, startFrame + durationFrames], [0, targetVal], {
    easing: easeOut
  });
  return formatFn(val);
}
