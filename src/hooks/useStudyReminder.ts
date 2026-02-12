import { useEffect, useRef, useCallback } from "react";
import { toast } from "sonner";

const STORAGE_KEY = "kma-res-timetable";
const REMINDER_SETTINGS_KEY = "kma-res-reminder-settings";

interface TimetableEntry {
  id: string;
  day: string;
  session: string;
  subject: string;
  note: string;
}

interface ReminderSettings {
  enabled: boolean;
  minutesBefore: number;
}

const SESSION_START: Record<string, { hour: number; minute: number }> = {
  "Sáng": { hour: 7, minute: 0 },
  "Chiều": { hour: 13, minute: 0 },
  "Tối": { hour: 18, minute: 0 },
};

const DAY_MAP: Record<string, number> = {
  "Thứ 2": 1,
  "Thứ 3": 2,
  "Thứ 4": 3,
  "Thứ 5": 4,
  "Thứ 6": 5,
  "Thứ 7": 6,
  "Chủ nhật": 0,
};

export function getDefaultReminderSettings(): ReminderSettings {
  return { enabled: false, minutesBefore: 15 };
}

export function loadReminderSettings(): ReminderSettings {
  try {
    const stored = localStorage.getItem(REMINDER_SETTINGS_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return getDefaultReminderSettings();
}

export function saveReminderSettings(settings: ReminderSettings) {
  localStorage.setItem(REMINDER_SETTINGS_KEY, JSON.stringify(settings));
}

function requestNotificationPermission() {
  if ("Notification" in window && Notification.permission === "default") {
    Notification.requestPermission();
  }
}

function sendBrowserNotification(title: string, body: string) {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(title, { body, icon: "/favicon.ico" });
  }
}

export function useStudyReminder() {
  const notifiedRef = useRef<Set<string>>(new Set());
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const check = useCallback(() => {
    const settings = loadReminderSettings();
    if (!settings.enabled) return;

    let entries: TimetableEntry[] = [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) entries = JSON.parse(stored);
    } catch {}

    const now = new Date();
    const currentDayOfWeek = now.getDay(); // 0=Sun

    entries.forEach((entry) => {
      const entryDayNum = DAY_MAP[entry.day];
      if (entryDayNum === undefined || entryDayNum !== currentDayOfWeek) return;

      const start = SESSION_START[entry.session];
      if (!start) return;

      const sessionTime = new Date(now);
      sessionTime.setHours(start.hour, start.minute, 0, 0);

      const diffMs = sessionTime.getTime() - now.getTime();
      const diffMin = diffMs / 60000;

      // Notify if within the reminder window (0 to minutesBefore) and not already notified
      const key = `${entry.id}-${now.toDateString()}`;
      if (diffMin > 0 && diffMin <= settings.minutesBefore && !notifiedRef.current.has(key)) {
        notifiedRef.current.add(key);
        const mins = Math.round(diffMin);
        const message = `Còn ${mins} phút nữa bạn có buổi học "${entry.subject}" (${entry.session})`;

        toast.info(`📚 ${entry.subject}`, { description: message, duration: 10000 });
        sendBrowserNotification("Nhắc lịch học - KMA-RES", message);
      }
    });
  }, []);

  useEffect(() => {
    const settings = loadReminderSettings();
    if (settings.enabled) {
      requestNotificationPermission();
    }

    // Check every 30 seconds
    check();
    intervalRef.current = setInterval(check, 30000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [check]);

  // Reset notified set daily
  useEffect(() => {
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const msUntilMidnight = midnight.getTime() - Date.now();

    const timer = setTimeout(() => {
      notifiedRef.current.clear();
    }, msUntilMidnight);

    return () => clearTimeout(timer);
  }, []);
}
