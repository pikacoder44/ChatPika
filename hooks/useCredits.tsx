"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";

export type ModelType = "fast" | "pro";

export interface CreditsState {
  creditsRemaining: number;
  maxCredits: number;
  selectedModel: ModelType;
  isPro: boolean;
  isModalOpen: boolean;
  lastResetDate: string;
  timeUntilReset: string;
}

export interface CreditsContextValue extends CreditsState {
  setSelectedModel: (model: ModelType) => void;
  getModelCost: (model?: ModelType) => number;
  canAfford: (model?: ModelType) => boolean;
  deductCredits: (modelOrCost?: ModelType | number) => boolean;
  refundCredits: (amount: number) => void;
  addCredits: (amount: number) => void;
  upgradeToPro: () => void;
  resetDailyCredits: () => void;
  openRechargeModal: () => void;
  closeRechargeModal: () => void;
  setIsModalOpen: (open: boolean) => void;
}

const STORAGE_KEY = "chatpika_energy_credits_v1";
const FREE_TIER_DAILY_ALLOWANCE = 10;

export const MODEL_COSTS: Record<ModelType, number> = {
  fast: 1, // Standard Model: Pika Fast (1 credit/message)
  pro: 2,  // Advanced Model: Pika Pro (2 credits/message)
};

function getUtcDateString(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

function getTimeUntilUtcMidnight(): string {
  const now = new Date();
  const nextMidnightUtc = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + 1,
      0,
      0,
      0,
      0
    )
  );
  const diffMs = Math.max(0, nextMidnightUtc.getTime() - now.getTime());
  const totalSeconds = Math.floor(diffMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
}

// Global broadcast channel / custom event for real-time reactivity across all components
const CREDIT_CHANGE_EVENT = "pika:credit_update";

function notifyCreditChange(data: Partial<CreditsState>) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(CREDIT_CHANGE_EVENT, { detail: data }));
  }
}

const CreditsContext = createContext<CreditsContextValue | null>(null);

export function CreditsProvider({ children }: { children: React.ReactNode }) {
  const [creditsRemaining, setCreditsRemaining] = useState<number>(FREE_TIER_DAILY_ALLOWANCE);
  const [selectedModel, setSelectedModel] = useState<ModelType>("fast");
  const [isPro, setIsPro] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [lastResetDate, setLastResetDate] = useState<string>(getUtcDateString());
  const [timeUntilReset, setTimeUntilReset] = useState<string>(getTimeUntilUtcMidnight());
  const isHydratedRef = useRef(false);

  // Initialize and check 00:00 UTC daily refresh
  const syncWithStorageAndReset = useCallback(() => {
    if (typeof window === "undefined") return;

    const currentUtc = getUtcDateString();
    setTimeUntilReset(getTimeUntilUtcMidnight());

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const storedDate = parsed.lastResetDate;

        // Check if a new UTC day has arrived (00:00 UTC daily refresh)
        if (storedDate !== currentUtc) {
          // Free tier daily refresh: restore to full 10 daily energy
          const newCredits = FREE_TIER_DAILY_ALLOWANCE;
          setCreditsRemaining(newCredits);
          setLastResetDate(currentUtc);
          setIsPro(Boolean(parsed.isPro));
          setSelectedModel(parsed.selectedModel === "pro" ? "pro" : "fast");

          const updated = {
            ...parsed,
            creditsRemaining: newCredits,
            lastResetDate: currentUtc,
          };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } else {
          setCreditsRemaining(
            typeof parsed.creditsRemaining === "number"
              ? parsed.creditsRemaining
              : FREE_TIER_DAILY_ALLOWANCE
          );
          setLastResetDate(parsed.lastResetDate || currentUtc);
          setIsPro(Boolean(parsed.isPro));
          setSelectedModel(parsed.selectedModel === "pro" ? "pro" : "fast");
        }
      } else {
        // First visit: initialize with 10 Daily Energy
        const initial = {
          creditsRemaining: FREE_TIER_DAILY_ALLOWANCE,
          lastResetDate: currentUtc,
          isPro: false,
          selectedModel: "fast",
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
        setCreditsRemaining(FREE_TIER_DAILY_ALLOWANCE);
        setLastResetDate(currentUtc);
      }
    } catch (e) {
      console.error("Failed to read credits from localStorage:", e);
    }
  }, []);

  // Run on mount
  useEffect(() => {
    isHydratedRef.current = true;
    syncWithStorageAndReset();

    // Check timer every 30 seconds for 00:00 UTC boundary and countdown
    const timer = setInterval(() => {
      syncWithStorageAndReset();
    }, 30000);

    // Sync across tabs and custom events
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (typeof parsed.creditsRemaining === "number") {
            setCreditsRemaining(parsed.creditsRemaining);
          }
          if (typeof parsed.isPro === "boolean") {
            setIsPro(parsed.isPro);
          }
          if (parsed.selectedModel) {
            setSelectedModel(parsed.selectedModel);
          }
        } catch {
          // ignore
        }
      }
    };

    const handleCustomEvent = (e: Event) => {
      const customEvent = e as CustomEvent<Partial<CreditsState>>;
      if (customEvent.detail) {
        if (typeof customEvent.detail.creditsRemaining === "number") {
          setCreditsRemaining(customEvent.detail.creditsRemaining);
        }
        if (typeof customEvent.detail.isPro === "boolean") {
          setIsPro(customEvent.detail.isPro);
        }
        if (customEvent.detail.selectedModel) {
          setSelectedModel(customEvent.detail.selectedModel);
        }
        if (typeof customEvent.detail.isModalOpen === "boolean") {
          setIsModalOpen(customEvent.detail.isModalOpen);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener(CREDIT_CHANGE_EVENT, handleCustomEvent);
    window.addEventListener("focus", syncWithStorageAndReset);

    return () => {
      clearInterval(timer);
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(CREDIT_CHANGE_EVENT, handleCustomEvent);
      window.removeEventListener("focus", syncWithStorageAndReset);
    };
  }, [syncWithStorageAndReset]);

  // Persist helper
  const persistState = useCallback(
    (credits: number, pro: boolean, model: ModelType) => {
      if (typeof window === "undefined") return;
      try {
        const payload = {
          creditsRemaining: credits,
          lastResetDate: getUtcDateString(),
          isPro: pro,
          selectedModel: model,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      } catch (err) {
        console.error("Failed to save credits to localStorage:", err);
      }
    },
    []
  );

  const getModelCost = useCallback((model?: ModelType) => {
    const targetModel = model || selectedModel;
    return MODEL_COSTS[targetModel] ?? 1;
  }, [selectedModel]);

  const canAfford = useCallback(
    (model?: ModelType) => {
      if (isPro) return true;
      const cost = getModelCost(model);
      return creditsRemaining >= cost;
    },
    [isPro, creditsRemaining, getModelCost]
  );

  const openRechargeModal = useCallback(() => {
    setIsModalOpen(true);
    notifyCreditChange({ isModalOpen: true });
  }, []);

  const closeRechargeModal = useCallback(() => {
    setIsModalOpen(false);
    notifyCreditChange({ isModalOpen: false });
  }, []);

  // Optimistic deduction before calling AI endpoint
  const deductCredits = useCallback(
    (modelOrCost?: ModelType | number): boolean => {
      if (isPro) {
        // Unlimited for Pro users
        return true;
      }

      let cost = 1;
      if (typeof modelOrCost === "number") {
        cost = modelOrCost;
      } else if (modelOrCost) {
        cost = MODEL_COSTS[modelOrCost] ?? 1;
      } else {
        cost = MODEL_COSTS[selectedModel] ?? 1;
      }

      if (creditsRemaining < cost || creditsRemaining <= 0) {
        // Out of credits: trigger modal and block request
        openRechargeModal();
        return false;
      }

      const nextCredits = Math.max(0, creditsRemaining - cost);
      setCreditsRemaining(nextCredits);
      persistState(nextCredits, isPro, selectedModel);
      notifyCreditChange({ creditsRemaining: nextCredits });
      return true;
    },
    [creditsRemaining, isPro, selectedModel, openRechargeModal, persistState]
  );

  // Refund credits if request failed
  const refundCredits = useCallback(
    (amount: number) => {
      if (isPro) return;
      setCreditsRemaining((prev) => {
        const next = prev + amount;
        persistState(next, isPro, selectedModel);
        notifyCreditChange({ creditsRemaining: next });
        return next;
      });
    },
    [isPro, selectedModel, persistState]
  );

  // Buy credit pack
  const addCredits = useCallback(
    (amount: number) => {
      setCreditsRemaining((prev) => {
        const next = prev + amount;
        persistState(next, isPro, selectedModel);
        notifyCreditChange({ creditsRemaining: next });
        return next;
      });
    },
    [isPro, selectedModel, persistState]
  );

  // Upgrade to Pro
  const upgradeToPro = useCallback(() => {
    setIsPro(true);
    persistState(creditsRemaining, true, selectedModel);
    notifyCreditChange({ isPro: true });
  }, [creditsRemaining, selectedModel, persistState]);

  // Manual reset for testing/demo
  const resetDailyCredits = useCallback(() => {
    setCreditsRemaining(FREE_TIER_DAILY_ALLOWANCE);
    const today = getUtcDateString();
    setLastResetDate(today);
    persistState(FREE_TIER_DAILY_ALLOWANCE, isPro, selectedModel);
    notifyCreditChange({ creditsRemaining: FREE_TIER_DAILY_ALLOWANCE });
  }, [isPro, selectedModel, persistState]);

  const handleSetSelectedModel = useCallback(
    (model: ModelType) => {
      setSelectedModel(model);
      persistState(creditsRemaining, isPro, model);
      notifyCreditChange({ selectedModel: model });
    },
    [creditsRemaining, isPro, persistState]
  );

  const value: CreditsContextValue = {
    creditsRemaining,
    maxCredits: FREE_TIER_DAILY_ALLOWANCE,
    selectedModel,
    isPro,
    isModalOpen,
    lastResetDate,
    timeUntilReset,
    setSelectedModel: handleSetSelectedModel,
    getModelCost,
    canAfford,
    deductCredits,
    refundCredits,
    addCredits,
    upgradeToPro,
    resetDailyCredits,
    openRechargeModal,
    closeRechargeModal,
    setIsModalOpen,
  };

  return (
    <CreditsContext.Provider value={value}>{children}</CreditsContext.Provider>
  );
}

export function useCredits(): CreditsContextValue {
  const context = useContext(CreditsContext);
  if (!context) {
    throw new Error("useCredits must be used within a <CreditsProvider />");
  }
  return context;
}

