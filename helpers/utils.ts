export type Modify<T, R> = Omit<T, keyof R> & R // override only specified fields
export type Monad<T> = [T | null, any | null] // monads for error catching

export function isiOS() {
    return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform)
    // iPad on iOS 13 detection
    || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  }