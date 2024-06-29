export function getLevel(xp: number | undefined) {
  if (!xp)
    return 0;
  return Math.floor(0.025 * Math.sqrt(xp));
}

export function getLevelProgress(xp: number | undefined) {
  const level = getLevel(xp);
  const range = [(level / 0.025) ** 2, ((level + 1) / 0.025) ** 2];
  return (((xp ?? 0) - range[0]) / (range[1] - range[0])) * 100;
}
