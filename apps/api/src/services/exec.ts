import { spawn } from 'child_process';

export class ToolExecutionError extends Error {
  constructor(public tool: string, public stderr: string, public code: number | null) {
    super(`${tool} exited with code ${code}: ${stderr.slice(0, 2000)}`);
  }
}

/**
 * Runs a CLI binary with a fixed timeout and no shell interpolation
 * (args passed as an array => immune to shell injection).
 */
export function runBinary(
  bin: string,
  args: string[],
  opts: { timeoutMs?: number; cwd?: string } = {}
): Promise<{ stdout: string; stderr: string }> {
  const timeoutMs = opts.timeoutMs ?? 120_000;

  return new Promise((resolve, reject) => {
    const child = spawn(bin, args, { cwd: opts.cwd, shell: false });
    let stdout = '';
    let stderr = '';
    let timedOut = false;

    const timer = setTimeout(() => {
      timedOut = true;
      child.kill('SIGKILL');
    }, timeoutMs);

    child.stdout.on('data', (d) => (stdout += d.toString()));
    child.stderr.on('data', (d) => (stderr += d.toString()));

    child.on('error', (err) => {
      clearTimeout(timer);
      reject(err);
    });

    child.on('close', (code) => {
      clearTimeout(timer);
      if (timedOut) {
        reject(new ToolExecutionError(bin, 'Processing timed out', code));
        return;
      }
      if (code !== 0) {
        reject(new ToolExecutionError(bin, stderr, code));
        return;
      }
      resolve({ stdout, stderr });
    });
  });
}
