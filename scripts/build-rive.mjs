import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = resolve(import.meta.dirname, '..');
const bundledCli = resolve(root, 'tmp/tools/rive/rive.exe');
const cli = process.env.RIVE_CLI || (existsSync(bundledCli) ? bundledCli : 'rive');
const project = resolve(root, 'animations/quvnoq-bunny');
function run(command, args) {
  const result = spawnSync(command, args, { cwd: root, stdio: 'inherit' });
  if (result.error) { console.error(`Unable to run ${command}: ${result.error.message}. Install the official Rive CLI or set RIVE_CLI to its path.`); process.exit(1); }
  if (result.status !== 0) process.exit(result.status ?? 1);
}
run(process.execPath, [resolve(root, 'scripts/create-rive-bunny.mjs')]);
run(cli, [project, '--verify']);
run(cli, ['inspect', project, '--summary']);
run(cli, [project, '--once']);
mkdirSync(resolve(root, 'public/animations'), { recursive: true });
copyFileSync(resolve(project, 'build/quvnoq-bunny.riv'), resolve(root, 'public/animations/quvnoq-bunny.riv'));
console.log('Updated public/animations/quvnoq-bunny.riv.');
