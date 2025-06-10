// src/utils/atomUtils.ts
import { RecoilState, atom } from 'recoil';

// Keep track of registered atoms to prevent duplicates during HMR
const registeredAtoms = new Set<string>();

// Wrapper function to create atoms with duplicate key protection
export function createSafeAtom<T>(config: {
  key: string;
  default: T;
}): RecoilState<T> {
  // In development, clear the atom if it already exists (for HMR)
  if (process.env.NODE_ENV === 'development' && registeredAtoms.has(config.key)) {
    console.warn(`[HMR] Re-registering atom with key: ${config.key}`);
  }
  
  registeredAtoms.add(config.key);
  
  return atom({
    key: config.key,
    default: config.default,
  });
}

// Clear all registered atoms (useful for testing or HMR)
export function clearRegisteredAtoms() {
  registeredAtoms.clear();
}
