import { test, expect } from "@playwright/test";

test("login gagal dengan password salah", async ({ page }) => {
  await page.goto("http://127.0.0.1:8000/login");
  await page.fill('input[name="username"]', "testpw");
  await page.fill('input[name="password"]', "adilijokowi");
  await page.click('button[type="submit"]');

  await page.waitForTimeout(4000);

  await expect(page).toHaveURL("http://127.0.0.1:8000/login");
  await expect(page.locator("body")).toContainText(
    "Username atau password salah."
  );
});
