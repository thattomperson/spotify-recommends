import { writable } from 'svelte/store';

export function ReadableUpdatingLoadable(value, update, timeout) {
  const { subscribe: vsubscribe, set: vset } = writable(value);
  const { subscribe: lsubscribe, set: lset } = writable(false);

  if (timeout) {
    let cb = () => {
      lset(true)
      update(vset)
      .catch((e) => console.error(e))
      .then((c) => {if (c !== false) setTimeout(cb, timeout)})
      .then(() => lset(false))
    }
    cb();
  } else {
    update(vset, lset)
  }

  return  {
    subscribe: vsubscribe,
    loading: {subscribe: lsubscribe}
  }
}

export function DereivedLoadable(store, value, update) {
  const { subscribe: vsubscribe, set: vset } = writable(value);
  const { subscribe: lsubscribe, set: lset } = writable(false);

  store.subscribe(async (value) => {
    lset(true)
    await update(value, vset)
    lset(false)
  })

  return {
    subscribe: vsubscribe, 
    loading: {subscribe: lsubscribe}
  }
}