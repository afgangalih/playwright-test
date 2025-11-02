import { test, expect } from '@playwright/test';

test('login dan logout admin Tracer Study', async ({ page }) => {
  // 1. Buka halaman login
  await page.goto('http://127.0.0.1:8000/login');

  // 2. Isi form login
  await page.fill('input[name="username"]', 'testpw');
  await page.fill('input[name="password"]', '12345');

  // 3. Klik tombol SIGN IN
  await page.click('button[type="submit"]');

  // 4. Pastikan diarahkan ke dashboard admin
  await expect(page).toHaveURL(/admin\/dashboard/);

  // 5. Pastikan halaman dashboard muncul
  await expect(page.locator('body')).toContainText(/Dashboard|Admin|Tracer Study/i);

  // 6. Scroll ke sidebar supaya tombol Logout terlihat
  const sidebar = page.locator('nav.sidebar');
  await sidebar.scrollIntoViewIfNeeded();

  // 7. Pilih tombol Logout di sidebar secara spesifik
  const logoutButton = sidebar.locator('text=Logout');

  // 8. Tunggu sampai tombol Logout terlihat
  await logoutButton.waitFor({ state: 'visible' });

  // 9. Klik tombol Logout
  await logoutButton.click();

  // 10. Pastikan diarahkan ke landing page setelah logout
  await expect(page).toHaveURL('http://127.0.0.1:8000/');

  // 11. Pastikan konten landing page muncul (misal teks selamat datang)
  await expect(page.locator('body')).toContainText(/Tracer Study|Selamat Datang/i);
});
