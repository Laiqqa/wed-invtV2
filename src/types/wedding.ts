export interface Person {
  nickname: string;
  fullName: string;
  parentNames: string;
  role: string;
  instagram?: string;
  bio: string;
  photo: string;
}

export interface Couple {
  groom: Person;
  bride: Person;
  hashtag: string;
}

export interface EventDetail {
  id: string;
  title: string;
  subtitle: string;
  date: string; // ISO date string or formatted
  displayDate: string;
  time: string;
  timezone: string;
  locationName: string;
  address: string;
  mapUrl: string;
  dressCode?: {
    theme: string;
    description: string;
    colors: { name: string; hex: string }[];
  };
  calendarEvent: {
    title: string;
    description: string;
    location: string;
    startDate: string; // YYYYMMDDTHHMMSS
    endDate: string;
  };
}

export interface StoryMilestone {
  year: string;
  chapter: string;
  title: string;
  description: string;
  location: string;
  photo?: string;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  type: 'bank' | 'ewallet' | 'qris';
  qrisUrl?: string;
}

export interface RsvpData {
  id: string;
  name: string;
  attendance: 'attending' | 'not-attending' | 'undecided';
  pax: number;
  message: string;
  createdAt: string;
}

export interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  side: 'A' | 'B';
  album: string;
  year: string;
  src?: string;
  duration: string;
}

