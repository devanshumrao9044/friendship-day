import catsHug from "@/assets/cats-hug.jpg";
import catRose from "@/assets/cat-rose.jpg";
import flowerBasket from "@/assets/flower-basket.jpg";
import frogDoodle from "@/assets/frog-doodle.jpg";
import tulipNote from "@/assets/tulip-note.jpg";
import lilyCat from "@/assets/lily-cat.jpg";
import catsLaugh from "@/assets/cats-laugh.jpg";
import daisies from "@/assets/daisies.png";

export const images = {
  catsHug,
  catRose,
  flowerBasket,
  frogDoodle,
  tulipNote,
  lilyCat,
  catsLaugh,
  daisies,
};

export type Photo = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export const photos: Photo[] = [
  {
    id: "lily",
    src: lilyCat,
    alt: "A tiny cat peeking out of a pink lily",
    caption: "the flower you said looked like us",
    width: 1024,
    height: 1280,
  },
  {
    id: "hug",
    src: catsHug,
    alt: "Two cartoon cats hugging each other",
    caption: "We haven't met yet but A friendship that never needed distance to feel close.",
    width: 1024,
    height: 1024,
  },
  {
    id: "rose",
    src: catRose,
    alt: "A small white kitten holding a red rose",
    caption: "one rose, zero occasion",
    width: 1024,
    height: 1280,
  },
  {
    id: "basket",
    src: flowerBasket,
    alt: "A wicker basket full of pink roses and daisies",
    caption: "If I could, I'd send you flower basket like these from market.",
    width: 1024,
    height: 1024,
  },
  {
    id: "tulips",
    src: tulipNote,
    alt: "Hand drawn pink tulips surrounded by little hearts",
    caption: "a little doodle that reminded me of you.",
    width: 1024,
    height: 1280,
  },
  {
    id: "frog",
    src: frogDoodle,
    alt: "A crayon doodle of a green frog with a heart",
    caption: "our entire inside joke, illustrated",
    width: 1024,
    height: 1024,
  },
  {
    id: "laugh",
    src: catsLaugh,
    alt: "Two cartoon cats laughing side by side",
    caption: "1-2am chats, endless conversations & memories.",
    width: 1024,
    height: 1024,
  },
];

export type TimelineEntry = {
  year: string;
  title: string;
  body: string;
  image: string;
  alt: string;
};

export const timeline: TimelineEntry[] = [
  {
    year: "The beginning",
    title: "One unexpected message",
    body: "It all started with a simple message on Telegram. We were complete strangers, but one conversation turned into countless chats, laughs, and memories neither of us expected.",
    image: catsLaugh,
    alt: "Two cartoon cats laughing together",
  },
  {
    year: "first year",
    title: "the 2am phone messages",
    body: "Nothing important, ever. Just the comfort of someone staying on the line until one of us fell asleep.",
    image: frogDoodle,
    alt: "A crayon frog doodle",
  },
  {
    year: "the hard season",
    title: "you showed up anyway",
    body: "You noticed something was off before I said a word, and you didn't leave until I was okay again.",
    image: catsHug,
    alt: "Two cats hugging",
  },
  {
    year: "the good season",
    title: "flowers for no reason",
    body: "A basket from the market, a rose from a corner shop, a doodle on a napkin. Small things, kept forever.",
    image: flowerBasket,
    alt: "A basket of pink roses",
  },
  {
    year: "today",
    title: "still my favourite person",
    body: "Every year this day comes around and I think the same thing: I got so lucky with you.",
    image: lilyCat,
    alt: "A cat inside a pink lily",
  },
];

export type FlipCard = {
  id: string;
  image: string;
  alt: string;
  back: string;
};

export const flipCards: FlipCard[] = [
  { id: "f1", image: lilyCat, alt: "Cat in a lily", back: "still one of the funniest nights of my life." },
  { id: "f2", image: catsHug, alt: "Cats hugging", back: "nothing happened this day. that was the best part." },
  { id: "f3", image: catRose, alt: "Kitten with a rose", back: "you left this on my desk and pretended you didn't." },
  { id: "f4", image: flowerBasket, alt: "Basket of roses", back: "four hours at a market for eight flowers." },
  { id: "f5", image: tulipNote, alt: "Tulip doodle", back: "i love you the mostest — your words, not mine." },
  { id: "f6", image: frogDoodle, alt: "Frog doodle", back: "ILYSM. that's the whole message." },
];

export type ScratchTruth = { id: string; index: string; title: string; body: string };

export const scratchTruths: ScratchTruth[] = [
  {
    id: "s1",
    index: "01",
    title: "you show up",
    body: "You notice something's off before I've said a word. That's the whole thing.",
  },
  {
    id: "s2",
    index: "02",
    title: "you're funny",
    body: "Half my best memories are us doing nothing and laughing until it hurt.",
  },
  {
    id: "s3",
    index: "03",
    title: "you're honest",
    body: "You tell me the thing I don't want to hear, kindly, and you're usually right.",
  },
  {
    id: "s4",
    index: "04",
    title: "you're home",
    body: "Any room becomes easier the second you walk into it.",
  },
  {
    id: "s5",
    index: "05",
    title: "you remember",
    body: "Tiny details I mentioned once, months ago. You keep them like they matter.",
  },
  {
    id: "s6",
    index: "06",
    title: "you stayed",
    body: "Through every version of me. Not one of them scared you off.",
  },
];

export type Letter = { id: string; title: string; date: string; body: string[] };

export const letters: Letter[] = [
  {
    id: "note",
    title: "A Note For You",
    date: "written late, as usual",
    body: [
      "Hey you,",
      "I'm not great at saying this stuff out loud, so I made you a page instead — a song, our photos, and a few things I actually mean.",
      "Thank you for the years of picking up the phone, for the advice I didn't ask for and definitely needed, and for never once making me explain myself twice.",
      "You've seen every version of me and stayed for all of them.",
      "Happy Friendship Day.",
    ],
  },
  {
    id: "thanks",
    title: "Thank You, Properly",
    date: "the one I kept rewriting",
    body: [
      "Some people are weather. You're climate.",
      "You made the bad year survivable and the good year twice as loud. You drove out at midnight. You sat with me in silence when talking would have ruined it.",
      "I don't say thank you enough, so here it is in writing where you can't interrupt me.",
    ],
  },
  {
    id: "future",
    title: "For Later",
    date: "open on a bad day",
    body: [
      "If you're reading this on a rough day — you're not as alone as it feels right now.",
      "Call me. Even if it's nothing. Especially if it's nothing.",
      "You've been the person for so many people. Let me be it for you.",
    ],
  },
];

export type Track = { id: string; title: string; subtitle: string; src: string; cover: string };

export const playlist: Track[] = [
  {
    id: "t1",
    title: "Our Song",
    subtitle: "the one that's ours",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: catsLaugh,
  },
  {
    id: "t2",
    title: "Long Drives",
    subtitle: "windows down, no destination",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    cover: flowerBasket,
  },
  {
    id: "t3",
    title: "Slow Sunday",
    subtitle: "for doing absolutely nothing",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: catsHug,
  },
];

export const wishes = [
  {
    from: "from me",
    text: "May you always have someone who answers on the first ring. (It's me. I'm someone.)",
  },
  { from: "for your year", text: "Softer mornings, louder laughs, and fewer people who deserve none of you." },
  { from: "for the road", text: "Long drives with good playlists and no reason to hurry back." },
  { from: "for the hard days", text: "A short memory for the bad ones and a long one for days like this." },
  { from: "for us", text: "A hundred more inside jokes nobody else will ever understand." },
  { from: "always", text: "Whatever you're quietly hoping for — I hope it arrives early." },
];

export const navLinks = [
  { to: "/home", label: "Home" },
  { to: "/timeline", label: "Timeline" },
  { to: "/gallery", label: "Gallery" },
  { to: "/memories", label: "Memories" },
  { to: "/scratch", label: "Scratch" },
  { to: "/letters", label: "Letters" },
  { to: "/music", label: "Music" },
  { to: "/games", label: "Games" },
  { to: "/wishes", label: "Wishes" },
  { to: "/ending", label: "The End" },
] as const;
