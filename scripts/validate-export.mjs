import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

for (const slug of [
  "docker-dockge-setup",
  "rclone-encrypted-backup-google-drive",
  "rustdesk-server-setup",
  "digitalocean-droplet-spaces-setup",
]) {
  test(`published article /blogs/${slug}/ remains accessible`, () => {
    assert.ok(existsSync(`out/blogs/${slug}/index.html`), "article route is exported");
    const html = readFileSync(`out/blogs/${slug}/index.html`, "utf8");
    assert.match(html, /<article\b/);
    assert.doesNotMatch(html, /<h1[^>]*>Not found<|<h1[^>]*>Tidak ditemukan</);
  });
}

test("the default Indonesian footer uses the translated work label", () => {
  const html = readFileSync("out/index.html", "utf8");
  const footer = html.match(/<footer\b[\s\S]*?<\/footer>/)?.[0];
  assert.ok(footer, "homepage has a footer");
  assert.match(footer, /href="\/portfolio\/?"[^>]*>Karya<\/a>/);
});

test("the contact section has one email action", () => {
  const html = readFileSync("out/index.html", "utf8");
  const section = html.match(/<section id="contact"[\s\S]*?<\/section>/)?.[0];
  assert.ok(section, "homepage has a contact section");
  assert.equal([...section.matchAll(/href="mailto:/g)].length, 1);
  assert.match(section, /href="https:\/\/github.com\/arcahyadi"/);
});
