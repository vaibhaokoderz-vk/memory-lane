type ExportCardInput = {
  title: string;
  subtitle: string;
  lines: [string, string][];
  color: string;
  fileName: string;
};

function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const w of words) {
    const next = current ? `${current} ${w}` : w;
    if (ctx.measureText(next).width > maxWidth && current) {
      lines.push(current);
      current = w;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export function exportEntryCard({
  title,
  subtitle,
  lines,
  color,
  fileName,
}: ExportCardInput) {
  const W = 900;
  const H = 1200;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, "#f5f3ff");
  bg.addColorStop(0.55, "#fff1f2");
  bg.addColorStop(1, "#fffbeb");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "rgba(0,0,0,0.08)";
  ctx.lineWidth = 2;
  const pad = 48;
  ctx.beginPath();
  ctx.roundRect(pad, pad, W - pad * 2, H - pad * 2, 36);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = color || "#8b5cf6";
  ctx.beginPath();
  ctx.roundRect(pad, pad, W - pad * 2, 14, 8);
  ctx.fill();

  let y = pad + 110;
  ctx.fillStyle = "#1f1235";
  ctx.font = "bold 54px Georgia, serif";
  ctx.fillText(title, pad + 48, y);

  y += 48;
  ctx.fillStyle = "#6b5f80";
  ctx.font = "28px system-ui, sans-serif";
  ctx.fillText(subtitle, pad + 48, y);

  y += 60;
  const maxWidth = W - pad * 2 - 96;

  for (const [label, value] of lines) {
    if (y > H - 120) break;
    ctx.fillStyle = "#9b8fb0";
    ctx.font = "600 20px system-ui, sans-serif";
    ctx.fillText(label.toUpperCase(), pad + 48, y);
    y += 32;

    ctx.fillStyle = "#25183d";
    ctx.font = "26px system-ui, sans-serif";
    for (const l of wrap(ctx, value || "—", maxWidth)) {
      ctx.fillText(l, pad + 48, y);
      y += 34;
    }
    y += 18;
  }

  ctx.fillStyle = "#9b8fb0";
  ctx.font = "22px system-ui, sans-serif";
  ctx.fillText("DigitalSlamBook", pad + 48, H - pad - 40);

  const link = document.createElement("a");
  link.download = `${fileName}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}
