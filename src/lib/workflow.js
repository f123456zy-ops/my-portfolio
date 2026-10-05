export function getWorkflowStage(progress, count) {
  if (!Number.isFinite(count) || count <= 0) {
    return 0;
  }

  const normalizedProgress = Number.isFinite(progress) ? progress : 0;
  const clampedProgress = Math.min(1, Math.max(0, normalizedProgress));
  return Math.min(count - 1, Math.floor(clampedProgress * count));
}
