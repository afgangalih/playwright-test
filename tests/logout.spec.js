import { test, expect } from "@playwright/test";

test("login dan logout Tracer Study", async ({ page }) => {
  // login
  await page.goto("http://127.0.0.1:8000/login");
  await page.fill('input[name="username"]', "testpw");
  await page.fill('input[name="password"]', "12345");
  await page.click('button[type="submit"]');

  // verifikasi dashboard
  await expect(page).toHaveURL(/admin\/dashboard/);
  await expect(page.locator("body")).toContainText(/Dashboard|Admin|Tracer Study/i);

  // logout
  const sidebar = page.locator("nav.sidebar");
  await sidebar.scrollIntoViewIfNeeded();
  const logoutButton = sidebar.locator("text=Logout");
  await logoutButton.waitFor({ state: "visible" });
  await logoutButton.click();

  // verifikasi logout sukses
  await expect(page).toHaveURL("http://127.0.0.1:8000/");
  await expect(page.locator("body")).toContainText(/Tracer Study|Selamat Datang/i);
});
