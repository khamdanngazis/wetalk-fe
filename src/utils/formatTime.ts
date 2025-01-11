export function formatMessageTime(date: string): string {
    const t = new Date(date);
    if (isNaN(t.getTime())) {
      return '';
    }
    const now = new Date();
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
  
    const isToday =
      t.getFullYear() === now.getFullYear() &&
      t.getMonth() === now.getMonth() &&
      t.getDate() === now.getDate();
  
    const isYesterday =
      t.getFullYear() === yesterday.getFullYear() &&
      t.getMonth() === yesterday.getMonth() &&
      t.getDate() === yesterday.getDate();
  
    if (isToday) {
      return t.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
    } else if (isYesterday) {
      return "Yesterday";
    } else {
      return t.toISOString().split("T")[0];
    }
  }

  export function formatDateToTime(dateString: string, locale: string = 'en-ID'): string {
    const date = new Date(dateString);
  
    if (isNaN(date.getTime())) {
      // Return a default message if the date is invalid
      return 'Invalid Date';
    }
  
    return date.toLocaleString(locale, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // 24-hour format
    });
  }

  export function formatDateToHeader(dateString: string, locale: string = 'en-ID'): string {
    const date = new Date(dateString);
  
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
  
    return date.toLocaleDateString(locale, {
      weekday: 'long', // Full name of the day (e.g., Monday)
      year: 'numeric',
      month: 'long',  // Full month name (e.g., January)
      day: 'numeric',
    });
  }  