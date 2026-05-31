import { assetUrl } from "./utils";

// Photos uploaded to public/photos/
export const PHOTOS: string[] = [
  "1.jpeg","2.jpeg","4.jpeg","5.jpeg","6.jpeg","7.jpeg","8.jpeg","9.jpeg",
  "10.jpeg","11.jpeg","12.jpeg","13.jpeg","14.jpeg","15.jpeg","16.jpeg",
  "17.jpeg","18.jpeg","19.jpeg","20.jpeg",
];

// Fallback gradient "memories" so the site looks alive without photos.
export const PLACEHOLDER_GRADIENTS = [
  "linear-gradient(135deg,#ff4fa3,#c084fc)",
  "linear-gradient(135deg,#ffb84f,#ff4fa3)",
  "linear-gradient(135deg,#7afcff,#c084fc)",
  "linear-gradient(135deg,#ffe066,#ffb84f)",
  "linear-gradient(135deg,#c084fc,#7afcff)",
  "linear-gradient(135deg,#ff4fa3,#ffe066)",
  "linear-gradient(135deg,#7afcff,#ff4fa3)",
  "linear-gradient(135deg,#ffb84f,#c084fc)",
  "linear-gradient(135deg,#ffe066,#7afcff)",
  "linear-gradient(135deg,#c084fc,#ffb84f)",
];

export function getPhotoSources(): { src?: string; gradient?: string; label: string }[] {
  if (PHOTOS.length > 0) {
    return PHOTOS.map((f) => ({ src: assetUrl(`photos/${f}`), label: "" }));
  }
  return PLACEHOLDER_GRADIENTS.map((g) => ({ gradient: g, label: "" }));
}

// Videos for reel (add your video filenames here)
export const VIDEOS: string[] = [];

export function getMediaSources(): { type: "photo" | "video"; src?: string; gradient?: string; label: string }[] {
  const media: { type: "photo" | "video"; src?: string; gradient?: string; label: string }[] = [];
  
  // Add photos only (videos moved to separate page)
  if (PHOTOS.length > 0) {
    PHOTOS.forEach((f) => media.push({ type: "photo", src: assetUrl(`photos/${f}`), label: "" }));
  } else {
    PLACEHOLDER_GRADIENTS.forEach((g) => media.push({ type: "photo", gradient: g, label: "" }));
  }
  
  return media;
}

// Get videos for the video page
export function getVideoSources(): { src: string; label: string }[] {
  return [{ src: assetUrl("video/main.mp4"), label: "Special Birthday Video" }];
}

export const FUNNY_CAPTIONS = [
  "😂 Rare Media spotted.",
  "😂 VIP without verification.",
  "😂 National Headache Award Winner.",
  "😂 Certified Stress Booster.",
  "😂 Friendship Department's Most Wanted.",
  "😂 Professional Reel Sender.",
  "😂 Human version of software bugs.",
  "😂 Drama King detected.",
  "😂 Evidence collected successfully.",
  "😂 Mediuu in natural habitat.",
  "😂 Too handsome to be trusted.",
  "😂 Loading more nonsense...",
  "😂 Walking notification detected.",
  "😂 Lowda spotted in the wild.",
  "😂 Ohh my goduu moment captured.",
  "😂 Yen media doing media things.",
  "😂 Professional chaos creator.",
  "😂 Certified entertainment package.",
  "😂 Legend in the making.",
];

export const EMOTIONAL_CAPTIONS = [
  "❤️ Behind all the jokes...",
  "❤️ Thank you for all the memories.",
  "❤️ Thank you for always being there.",
  "❤️ Life is more fun with you in it.",
  "❤️ You are one of the best people in my life.",
  "❤️ Happy Birthday Mediaaa ❤️",
];