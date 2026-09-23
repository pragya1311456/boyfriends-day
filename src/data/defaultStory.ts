import { StoryData } from '../types/story';

export const DEFAULT_STORY: StoryData = {
  id: 'template-default',
  yourName: 'Maya',
  partnerName: 'Alex',
  partnerRoleText: 'For the boy who stole my heart... 💗',
  openingMessage: 'Someone has a little surprise for you... ❤️',
  chapter1Title: 'The Beginning',
  chapter1Story: 'Somewhere between ordinary days and quiet moments, you walked into my life. What started as simple conversations turned into the sweetest chapter I never knew I was waiting for. Every glance, every laugh, and every gentle word made me realize that you were someone truly special.',
  chapters: [
    {
      id: 'chap-extra-1',
      number: 'Special Chapter',
      title: 'Under The Starlit Sky',
      story: 'Do you remember that evening when we lost track of time talking about everything and nothing at all? The world outside faded away, and for the first time in a very long time, my heart felt completely at peace.',
      memoryDate: '14 February',
      memoryTitle: 'Midnight Conversations'
    }
  ],
  photos: [
    {
      id: 'p1',
      url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop&q=80',
      caption: 'The day we laughed until our stomachs hurt ❤️',
      rotation: -3,
      date: 'Summer 2024'
    },
    {
      id: 'p2',
      url: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&auto=format&fit=crop&q=80',
      caption: 'Holding your hand is my favorite feeling in the whole world',
      rotation: 2,
      date: 'Autumn Walk'
    },
    {
      id: 'p3',
      url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&auto=format&fit=crop&q=80',
      caption: 'Our cozy little coffee date on a rainy afternoon ☕',
      rotation: -1,
      date: 'November Evening'
    },
    {
      id: 'p4',
      url: 'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=800&auto=format&fit=crop&q=80',
      caption: 'Forever looking at you with all the love in my eyes ✨',
      rotation: 3,
      date: 'Golden Hour'
    }
  ],
  reasons: [
    {
      id: 'r1',
      emoji: '❤️',
      title: 'Your Smile',
      description: 'The way your eyes light up whenever you laugh genuinely brightens even my gloomiest days.'
    },
    {
      id: 'r2',
      emoji: '🥹',
      title: 'The Way You Care',
      description: 'You notice the tiniest little things about me, from how I take my tea to when I need a silent embrace.'
    },
    {
      id: 'r3',
      emoji: '😂',
      title: 'Your Silly Side',
      description: 'How you dance unexpectedly in the kitchen just to make me smile when I am tired.'
    },
    {
      id: 'r4',
      emoji: '🤍',
      title: 'Your Hugs',
      description: 'Wrapping my arms around you feels like coming home after the longest journey.'
    },
    {
      id: 'r5',
      emoji: '🌷',
      title: 'The Way You Make Me Happy',
      description: 'Being with you is effortless, safe, and filled with a warmth I cherish every single day.'
    },
    {
      id: 'r6',
      emoji: '🌟',
      title: 'How You Believe In Me',
      description: 'Whenever doubt creeps in, your unwavering faith in me gives me strength to fly.'
    }
  ],
  memories: [
    'The first time our fingers gently touched',
    'Staying up until 3 AM sharing our deepest dreams',
    'Getting caught in the sudden rain and laughing under an umbrella'
  ],
  timeline: [
    {
      id: 't1',
      date: '12 March 2024',
      title: 'The Day We Met ❤️',
      story: 'Our story started here. An ordinary day turned magical the exact second you smiled and said hello.'
    },
    {
      id: 't2',
      date: '28 April 2024',
      title: 'Our Very First Date ☕',
      story: 'We planned for a quick one-hour coffee, but four hours vanished in what felt like four sweet minutes.'
    },
    {
      id: 't3',
      date: '19 August 2024',
      title: 'The First "I Love You" ✨',
      story: 'Underneath a quiet night sky, whispered softly, yet loud enough to echo in my heart forever.'
    },
    {
      id: 't4',
      date: 'Present Day & Always',
      title: 'Every Day With You 💖',
      story: 'Still choosing you in every heartbeat, in every dawn, and in every tomorrow yet to come.'
    }
  ],
  music: 'preset:romantic-piano',
  musicTitle: 'Sweet Romantic Lullaby 🎵',
  secretMessage: 'PS: In a room full of art, my eyes would always search for you. You are my greatest adventure and my quietest safe haven. I made this entire story just to make your heart smile today! 🎁✨',
  finalLetterGreeting: 'Happy Boyfriend Day, my love.',
  finalLetterBody: `Thank you for being my safe place, my favourite person, and my happiest memory. 

No matter where life takes us, through every storm and every sunshine, having your hand in mine makes everything beautiful. You have shown me what gentle, patient, and unconditional love looks like.

I love you more than words could ever describe. ❤️`,
  finalLetterSignoff: 'Forever & Always Yours, Maya',
  finalSecretMessage: 'And if I had to do it all over again in a thousand different lifetimes, I would still search the universe until I found you. I love you, Alex! ❤️',
  enableHeartRain: true,
  coupleStyle: 'holding-hands'
};
