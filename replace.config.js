module.exports = {
  files: "docs/*.html",
  from: [/\/amstramgramVideoPlayer\./g, "amstramgramVideoPlayerPolyfill.js"],
  to: ["/amstramgramVideoPlayer.min.", "amstramgramVideoPlayerPolyfill.min.js"]
};