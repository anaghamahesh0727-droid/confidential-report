import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { NavBar } from "@/components/NavBar";
import { fireConfetti, fireFireworks, fireHearts } from "@/lib/confetti";
import { assetUrl } from "@/lib/utils";

export const Route = createFileRoute("/video")({
  head: () => ({ meta: [{ title: "🎬 Video Dashboard" }] }),
  component: Video,
});

const VIDEOS = [
  {
    src: assetUrl("video/main.mp4"),
    title: "Special Birthday Video",
    description: "A special video message for Hemanth Kumar K R",
    thumbnail: "🎥",
  },
];

function Video() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    fireConfetti();
    fireFireworks(2000);
    fireHearts();
  };

  const video = VIDEOS[currentVideo];

  return (
    <div className="relative min-h-screen pb-20">
      <NavBar />
      
      <div className="mx-auto mt-6 max-w-5xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl sm:text-5xl font-black gradient-text text-glow">
            🎬 Video Dashboard
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Special videos for the birthday boy
          </p>
        </motion.div>

        {/* Main Video Player */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-strong overflow-hidden rounded-3xl p-4"
        >
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black">
            {!error ? (
              <video
                ref={videoRef}
                src={video.src}
                className="h-full w-full"
                onEnded={handleVideoEnd}
                onError={() => setError(true)}
                controls
                playsInline
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-8 text-center">
                <div className="text-6xl">🎬</div>
                <p className="text-lg font-semibold">Video not found</p>
                <p className="text-sm text-muted-foreground">
                  Make sure the video is at: <code className="rounded bg-white/10 px-2 py-1">public/video/main.mp4</code>
                </p>
              </div>
            )}
          </div>

          {/* Video Info */}
          <div className="mt-4">
            <h2 className="text-2xl font-bold gradient-warm-text">{video.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{video.description}</p>
          </div>

          {/* Video Controls */}
          <div className="mt-4 flex flex-wrap gap-2">
            {!isPlaying ? (
              <button
                onClick={handlePlay}
                className="rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-lg neon-glow sm:px-5 sm:py-3 sm:text-sm"
              >
                ▶ Play Video
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-lg neon-glow sm:px-5 sm:py-3 sm:text-sm"
              >
                ⏸ Pause
              </button>
            )}
            <button
              onClick={handleFullscreen}
              className="rounded-xl bg-white/10 px-4 py-2 text-xs font-semibold hover:bg-white/20 sm:px-5 sm:py-3 sm:text-sm"
            >
              ⛶ Fullscreen
            </button>
            <button
              onClick={() => {
                fireConfetti();
                fireFireworks(2000);
                fireHearts();
              }}
              className="rounded-xl bg-white/10 px-4 py-2 text-xs font-semibold hover:bg-white/20 sm:px-5 sm:py-3 sm:text-sm"
            >
              🎊 Celebrate
            </button>
          </div>
        </motion.div>

        {/* Video Grid (for future videos) */}
        {VIDEOS.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <h3 className="mb-4 text-xl font-bold">More Videos</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {VIDEOS.map((v, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCurrentVideo(i);
                    setError(false);
                    setIsPlaying(false);
                  }}
                  className={`glass rounded-2xl p-4 text-left transition hover:scale-105 ${
                    i === currentVideo ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <div className="mb-3 flex aspect-video items-center justify-center rounded-xl bg-gradient-to-br from-pink-500/40 to-fuchsia-500/40 text-6xl">
                    {v.thumbnail}
                  </div>
                  <h4 className="font-bold">{v.title}</h4>
                  <p className="mt-1 text-xs text-muted-foreground">{v.description}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Birthday Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-strong mt-8 rounded-3xl p-6 text-center"
        >
          <div className="text-5xl">🎂</div>
          <h3 className="mt-3 text-2xl font-bold gradient-text">
            Happy Birthday Hemanth Kumar K R!
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Hope you enjoy this special video 🎉❤️
          </p>
        </motion.div>
      </div>
    </div>
  );
}
