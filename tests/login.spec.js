import { test, expect } from "@playwright/test";

// login gagal karena password salah
test("login gagal dengan password salah", async ({ page }) => {
  await page.goto("http://127.0.0.1:8000/login");
  await page.fill('input[name="username"]', "testpw");
  await page.fill('input[name="password"]', "adilijokowi");
  await page.click('button[type="submit"]');

  await page.waitForTimeout(6000);

  await expect(page).toHaveURL("http://127.0.0.1:8000/login");
  await expect(page.locator("body")).toContainText("Username atau password salah.");
});

// tidak bisa login jika username kosong
test("tidak bisa login jika username kosong (HTML5 validation)", async ({ page }) => {
  await page.goto("http://127.0.0.1:8000/login");
  await page.fill('input[name="password"]', "12345");
  await page.click('button[type="submit"]');
  await page.waitForTimeout(6000);

  // cek validasi bawaan browser
  const usernameInput = page.locator('input[name="username"]');
  const validationMessage = await usernameInput.evaluate((el) => el.validationMessage);
  expect(validationMessage).toContain("Please fill out this field");
});

