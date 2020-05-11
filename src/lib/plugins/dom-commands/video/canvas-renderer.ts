function videoCanvas(video) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const view: HTMLElement = document.getElementById('IV-view');
  canvas.width = view.clientWidth;
  canvas.height = view.clientHeight;

  video.onplaying = () => {
    const $this = video;
    (function loop() {
      if (!$this.paused && !$this.ended) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        setTimeout(loop, 1000 / 30);
      }
    })();
  };

  return canvas;
}

export default videoCanvas;
