import { Room } from './types'

export const mockRooms: Room[] = [
  {
    id: '1',
    name: 'Project Alpha Team',
    lastMessage: 'Let\'s schedule a meeting for tomorrow',
    lastMessageTime: '10:45 AM',
    unreadCount: 3,
    isActive: true,
    isFavorite: true,
    isArchived: false,
    participants: [
      {
        id: '101',
        name: 'Alex Johnson',
        avatar: 'https://i.pravatar.cc/150?img=1',
        isOnline: true,
      },
      {
        id: '102',
        name: 'Maria Garcia',
        avatar: 'https://i.pravatar.cc/150?img=5',
        isOnline: true,
      },
      {
        id: '103',
        name: 'James Wilson',
        avatar: 'https://i.pravatar.cc/150?img=3',
        isOnline: false,
      }
    ]
  },
  {
    id: '2',
    name: 'Design Team',
    lastMessage: 'I just uploaded the new mockups',
    lastMessageTime: '9:32 AM',
    unreadCount: 0,
    isActive: true,
    isFavorite: true,
    isArchived: false,
    participants: [
      {
        id: '201',
        name: 'Emma Thompson',
        avatar: 'https://i.pravatar.cc/150?img=4',
        isOnline: true,
      },
      {
        id: '202',
        name: 'David Rodriguez',
        avatar: 'https://i.pravatar.cc/150?img=7',
        isOnline: false,
      }
    ]
  },
  {
    id: '3',
    name: 'Marketing Strategy',
    lastMessage: 'The campaign results are in!',
    lastMessageTime: 'Yesterday',
    unreadCount: 5,
    isActive: true,
    isFavorite: false,
    isArchived: false,
    participants: [
      {
        id: '301',
        name: 'Sophia Chen',
        avatar: 'https://i.pravatar.cc/150?img=9',
        isOnline: true,
      },
      {
        id: '302',
        name: 'Daniel Kim',
        avatar: 'https://i.pravatar.cc/150?img=12',
        isOnline: true,
      },
      {
        id: '303',
        name: 'Olivia Martinez',
        avatar: 'https://i.pravatar.cc/150?img=11',
        isOnline: false,
      }
    ]
  },
  {
    id: '4',
    name: 'Product Launch',
    lastMessage: 'All systems go for next week',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    isActive: true,
    isFavorite: false,
    isArchived: false,
    participants: [
      {
        id: '401',
        name: 'Liam Johnson',
        avatar: 'https://i.pravatar.cc/150?img=13',
        isOnline: false,
      },
      {
        id: '402',
        name: 'Ava Williams',
        avatar: 'https://i.pravatar.cc/150?img=15',
        isOnline: false,
      }
    ]
  },
  {
    id: '5',
    name: 'Support Team',
    lastMessage: 'New ticket assigned to you',
    lastMessageTime: '2 days ago',
    unreadCount: 1,
    isActive: true,
    isFavorite: false,
    isArchived: false,
    participants: [
      {
        id: '501',
        name: 'Noah Brown',
        avatar: 'https://i.pravatar.cc/150?img=17',
        isOnline: true,
      },
      {
        id: '502',
        name: 'Isabella Jones',
        avatar: 'https://i.pravatar.cc/150?img=19',
        isOnline: true,
      }
    ]
  },
  {
    id: '6',
    name: 'Developer Hangout',
    lastMessage: 'Anyone tried the new framework yet?',
    lastMessageTime: '3 days ago',
    unreadCount: 0,
    isActive: true,
    isFavorite: false,
    isArchived: true,
    participants: [
      {
        id: '601',
        name: 'William Davis',
        avatar: 'https://i.pravatar.cc/150?img=21',
        isOnline: false,
      },
      {
        id: '602',
        name: 'Mia Miller',
        avatar: 'https://i.pravatar.cc/150?img=23',
        isOnline: true,
      },
      {
        id: '603',
        name: 'Benjamin Wilson',
        avatar: 'https://i.pravatar.cc/150?img=25',
        isOnline: false,
      }
    ]
  },
];