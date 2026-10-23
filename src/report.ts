import { Capacitor } from '@capacitor/core';
import { dateKey, reportCsv } from './progress';
import type { Progress } from './progress';

// Browsers download the CSV; the Android app writes it to its cache and opens the share
// sheet, because a WebView ignores download links.
export async function exportReport(progress: Progress) {
  const csv = reportCsv(progress), name = `quvnoq-bolajon-${dateKey()}.csv`;
  if (Capacitor.isNativePlatform()) {
    const [{ Directory, Encoding, Filesystem }, { Share }] = await Promise.all([import('@capacitor/filesystem'), import('@capacitor/share')]);
    const { uri } = await Filesystem.writeFile({ path: name, data: csv, directory: Directory.Cache, encoding: Encoding.UTF8 });
    await Share.share({ title: 'Quvnoq bolajon natijalari', files: [uri] });
    return;
  }
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
  const link = document.createElement('a'); link.href = url; link.download = name; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
}
