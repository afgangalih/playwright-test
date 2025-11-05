import { test, expect } from "@playwright/test";

// Test 1: Login berhasil
test("login dengan username dan password yang benar", async ({ page }) => {
  await page.goto("http://127.0.0.1:8000/login");
  await page.fill('input[name="username"]', "testpw");
  await page.fill('input[name="password"]', "12345");
  await page.click('button[type="submit"]');

  // Verifikasi masuk ke dashboard
  await expect(page).toHaveURL(/admin\/dashboard/);
  await expect(page.locator("body")).toContainText(/Dashboard|Admin|Tracer Study/i);

  // Screenshot hasil login berhasil
  const screenshot = await page.screenshot({ path: "screenshot_login_berhasil.png" });
  await test.info().attach("Screenshot Login Berhasil", {
    body: screenshot,
    contentType: "image/png",
  });
});

// Test 2: Login gagal karena password salah
test("login gagal dengan password salah", async ({ page }) => {
  await page.goto("http://127.0.0.1:8000/login");
  await page.fill('input[name="username"]', "testpw");
  await page.fill('input[name="password"]', "adilijokowi");
  await page.waitForSelector('button[type="submit"]:enabled');
  await page.click('button[type="submit"]');

  // Verifikasi pesan error muncul dan tetap di halaman login
  await page.locator("text=Username atau password salah.").waitFor();
  await expect(page).toHaveURL("http://127.0.0.1:8000/login");
  await expect(page.locator("body")).toContainText("Username atau password salah.");

  // Screenshot hasil login gagal
  const screenshot = await page.screenshot({ path: "screenshot_login_gagal.png" });
  await test.info().attach("Screenshot Login Gagal", {
    body: screenshot,
    contentType: "image/png",
  });
});

// Test 3: Username kosong (HTML5 validation)
test("tidak bisa login jika username kosong (HTML5 validation)", async ({ page }) => {
  await page.goto("http://127.0.0.1:8000/login");
  await page.fill('input[name="password"]', "12345");
  const usernameInput = page.locator('input[name="username"]');
  await page.click('button[type="submit"]');

  // Verifikasi pesan validasi HTML5
  const validationMessage = await usernameInput.evaluate((el) => el.validationMessage);
  expect(validationMessage).toContain("Please fill out this field");

  // Screenshot pesan validasi username kosong
  const screenshot = await page.screenshot({ path: "screenshot_username_kosong.png" });
  await test.info().attach("Screenshot Username Kosong", {
    body: screenshot,
    contentType: "image/png",
  });
});

// Test 4: Password kosong meskipun username benar
test("tidak bisa login jika password kosong meskipun username benar", async ({ page }) => {
  await page.goto("http://127.0.0.1:8000/login");
  await page.fill('input[name="username"]', "testpw");
  const passwordInput = page.locator('input[name="password"]');
  await page.click('button[type="submit"]');

  // Verifikasi pesan validasi HTML5
  const validationMessage = await passwordInput.evaluate((el) => el.validationMessage);
  expect(validationMessage).toContain("Please fill out this field");

  // Screenshot pesan validasi password kosong
  const screenshot = await page.screenshot({ path: "screenshot_password_kosong.png" });
  await test.info().attach("Screenshot Password Kosong", {
    body: screenshot,
    contentType: "image/png",
  });
});
