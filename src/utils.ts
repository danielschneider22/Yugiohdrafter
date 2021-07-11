export type Modify<T, R> = Omit<T, keyof R> & R // override only specified fields
export type Monad<T> = [T | null, any | null] // monads for error catching