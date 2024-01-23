import { useEffect } from "react";

export function OnMount(mountFunc: () => void) {
  useEffect(() => {
    mountFunc()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
}

export function OnUnmount(unmountFunc: () => void) {
  useEffect(() => {
    return () => {
      unmountFunc()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
}