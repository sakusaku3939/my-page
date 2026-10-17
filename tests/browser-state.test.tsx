import assert from "node:assert/strict";
import test, { type TestContext } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { createHeaderScrollStore, darkModeStore, nfcSupportStore } from "../src/hooks/browserStores";
import { useDarkMode } from "../src/hooks/useDarkMode";
import NFCWriter from "../src/components/atom/NFCWriter/NFCWriter";

function replaceGlobal(t: TestContext, name: string, value: unknown) {
  const original = Object.getOwnPropertyDescriptor(globalThis, name);
  Object.defineProperty(globalThis, name, { configurable: true, value });
  t.after(() => {
    if (original) Object.defineProperty(globalThis, name, original);
    else Reflect.deleteProperty(globalThis, name);
  });
}

function Theme() {
  return <span>{useDarkMode() ? "dark" : "light"}</span>;
}

const nfcProps = {
  url: "https://example.com/post",
  onSuccess: () => {},
  onError: () => {},
  onInfo: () => {}
};

test("server rendering never reads browser APIs or exposes an NFC action", () => {
  assert.equal(typeof window, "undefined");
  for (const store of [darkModeStore, createHeaderScrollStore("header"), nfcSupportStore]) {
    assert.equal(store.getSnapshot(), false);
    assert.equal(store.getServerSnapshot(), false);
  }
  assert.equal(renderToStaticMarkup(<Theme />), "<span>light</span>");
  assert.equal(renderToStaticMarkup(<NFCWriter {...nfcProps} />), "");
});

test("the hydration snapshot stays deterministic even for dark-mode NFC browsers", (t) => {
  replaceGlobal(t, "window", {
    matchMedia: () => ({ matches: true }),
    location: { protocol: "https:" },
    NDEFReader: class { constructor() { assert.fail("render must not request NFC access"); } }
  });
  assert.equal(darkModeStore.getSnapshot(), true);
  assert.equal(nfcSupportStore.getSnapshot(), true);
  assert.equal(renderToStaticMarkup(<Theme />), "<span>light</span>");
  assert.equal(renderToStaticMarkup(<NFCWriter {...nfcProps} />), "");
});

test("dark mode follows both OS theme changes and unsubscribes on cleanup", (t) => {
  const mediaQuery = Object.assign(new EventTarget(), { matches: false });
  replaceGlobal(t, "window", {
    matchMedia: (query: string) => {
      assert.equal(query, "(prefers-color-scheme: dark)");
      return mediaQuery;
    }
  });
  const snapshots: boolean[] = [];
  const unsubscribe = darkModeStore.subscribe(() => snapshots.push(darkModeStore.getSnapshot()));
  assert.equal(darkModeStore.getSnapshot(), false);
  mediaQuery.matches = true;
  mediaQuery.dispatchEvent(new Event("change"));
  mediaQuery.matches = false;
  mediaQuery.dispatchEvent(new Event("change"));
  assert.deepEqual(snapshots, [true, false]);
  unsubscribe();
  mediaQuery.dispatchEvent(new Event("change"));
  assert.equal(snapshots.length, 2);
});

test("browsers without matchMedia keep the safe light-mode fallback", (t) => {
  replaceGlobal(t, "window", {});
  assert.equal(darkModeStore.getSnapshot(), false);
  darkModeStore.subscribe(() => assert.fail("no media subscription exists"))();
});

test("header state handles restored scroll, strict threshold, resize and bfcache restoration", (t) => {
  const browser = Object.assign(new EventTarget(), { scrollY: 450 });
  const header = { offsetHeight: 300 };
  let observed: unknown;
  let onResize: (() => void) | undefined;
  let disconnected = false;
  replaceGlobal(t, "window", browser);
  replaceGlobal(t, "document", { querySelector: () => header });
  replaceGlobal(t, "ResizeObserver", class {
    constructor(callback: () => void) { onResize = callback; }
    observe(element: unknown) { observed = element; }
    disconnect() { disconnected = true; }
  });
  const store = createHeaderScrollStore(".blogHeader");
  assert.equal(store.getSnapshot(), true, "restored scroll is read before the first event");
  const snapshots: boolean[] = [];
  const unsubscribe = store.subscribe(() => snapshots.push(store.getSnapshot()));
  assert.equal(observed, header);
  browser.scrollY = 300;
  browser.dispatchEvent(new Event("scroll"));
  browser.scrollY = 301;
  browser.dispatchEvent(new Event("scroll"));
  header.offsetHeight = 500;
  browser.dispatchEvent(new Event("resize"));
  browser.scrollY = 600;
  browser.dispatchEvent(new Event("pageshow"));
  header.offsetHeight = 700;
  onResize?.();
  assert.deepEqual(snapshots, [false, true, false, true, false]);
  unsubscribe();
  assert.equal(disconnected, true);
  for (const event of ["scroll", "resize", "pageshow"]) browser.dispatchEvent(new Event(event));
  assert.equal(snapshots.length, 5);
});

test("missing header and ResizeObserver preserve safe scroll behavior", (t) => {
  const browser = Object.assign(new EventTarget(), { scrollY: 0 });
  replaceGlobal(t, "window", browser);
  replaceGlobal(t, "document", { querySelector: () => null });
  replaceGlobal(t, "ResizeObserver", undefined);
  const store = createHeaderScrollStore(".blogHeader");
  assert.equal(store.getSnapshot(), false);
  browser.scrollY = 1;
  assert.equal(store.getSnapshot(), true);
  store.subscribe(() => {})();
});

test("NFC detection requires HTTPS and a callable reader without constructing it", (t) => {
  const browser = { location: { protocol: "https:" }, NDEFReader: undefined as unknown };
  replaceGlobal(t, "window", browser);
  for (const [protocol, reader, expected] of [
    ["https:", class { constructor() { assert.fail("detection must not write"); } }, true],
    ["http:", class {}, false],
    ["https:", undefined, false],
    ["https:", {}, false]
  ] as const) {
    browser.location.protocol = protocol;
    browser.NDEFReader = reader;
    assert.equal(nfcSupportStore.getSnapshot(), expected);
    nfcSupportStore.subscribe()();
  }
});
