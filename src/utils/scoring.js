export function scoreInitiative(scores, weights) {
  const total = weights.impact + weights.effort + weights.risk + weights.alignment;
  return (
    (scores.impact * weights.impact +
      scores.effort * weights.effort +
      (10 - scores.risk) * weights.risk +
      scores.alignment * weights.alignment) /
    total
  ).toFixed(1);
}

export function getPriorityTier(score) {
  const numericScore = Number(score);
  if (numericScore >= 7.5) return "P0";
  if (numericScore >= 6) return "P1";
  return "P2";
}
