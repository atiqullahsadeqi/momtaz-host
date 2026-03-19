export function vpsDisplayName(cores: number, ramGB: number): string {
  return `VPS ${cores}C-${ramGB}G`;
}

export function dedicatedDisplayName(cpu: string, ramGB: number): string {
  let short = "";
  const ryzen = cpu.match(/Ryzen[™®\s]*(\d+)/i);
  const intel = cpu.match(/Core[™®\s]*i(\d)/i) || cpu.match(/\bi(\d)[- ]/i);
  const xeon = cpu.match(/Xeon[™®\s]*(\w+)/i);
  if (ryzen) short = `R${ryzen[1]}`;
  else if (intel) short = `i${intel[1]}`;
  else if (xeon) short = `X${xeon[1]}`;
  else {
    // Fallback: grab first meaningful word + number
    const m = cpu.match(/[A-Z]\w*\s*\d+/i);
    short = m ? m[0].replace(/\s+/g, "") : "Pro";
  }
  return `Server ${short}-${ramGB}G`;
}
