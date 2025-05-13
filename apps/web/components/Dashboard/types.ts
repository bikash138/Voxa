export interface Room {
  id: string;
  slug: string;
  adminId: string;
  createdAt: Date;
}

export interface Participant {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
}

export type RoomCategory = 'all' | 'favorites' | 'archived';