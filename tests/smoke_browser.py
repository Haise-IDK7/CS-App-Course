"""Prueba de humo en navegador: abre todas las pantallas, secciones y documentos y falla si hay errores de JavaScript.

Uso:  npm run build && npx vite preview --port 4174 &   y luego   python tests/smoke_browser.py [carpeta_capturas]
"""
import json, re, sys
from pathlib import Path
from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:4174/"
ROOT = Path(__file__).resolve().parent.parent
shots = Path(sys.argv[1]) if len(sys.argv) > 1 else None
docs = [str(p.relative_to(ROOT / "fuente")).replace("\\", "/") for p in (ROOT / "fuente").rglob("*.md")]
errors = []

with sync_playwright() as p:
    b = p.chromium.launch(channel="chrome", headless=True)
    page = b.new_page(viewport={"width": 1320, "height": 900})
    page.on("pageerror", lambda e: errors.append(f"pageerror @ {page.url}: {e}"))
    page.on("console", lambda m: errors.append(f"console @ {page.url}: {m.text}") if m.type == "error" and "ERR_" not in m.text and "Failed to load resource" not in m.text else None)
    def go(path, wait=250):
        page.goto(BASE + "#/" + path); page.wait_for_timeout(wait)
        if page.locator("text=No se pudo mostrar").count(): errors.append(f"fallo al mostrar {path}")
    def shot(n):
        if shots: shots.mkdir(parents=True, exist_ok=True); page.screenshot(path=str(shots / f"{n}.png"))
    go("", 600); shot("inicio")
    sections = [a.get_attribute("href").split("/")[-1] for a in page.locator(".side a[href^='#/seccion/']").all()]
    for r in ["guia", "plan", "planificador", "temas", "docs", "progreso"]:
        go(r); shot(r)
    for s in sections:
        go(f"seccion/{s}")
        if page.locator(".course").count() == 0: errors.append(f"sección sin cursos: {s}")
    go("seccion/core-systems"); page.locator(".st").first.click(); page.locator(".st").first.click(); page.wait_for_timeout(150); shot("seccion")
    for d in docs:
        go(f"doc/{d}", 120)
        if page.locator("article.prose").count() == 0: errors.append(f"documento vacío: {d}")
        bad = page.locator("article.prose a[href^='#']:not([href^='#/'])").count()
        if bad: errors.append(f"{bad} enlace(s) interno(s) sin convertir en {d}")
    go("planificador"); page.locator(".checks input[type=checkbox]").first.check(); page.wait_for_timeout(200); shot("planificador2")
    go("progreso"); shot("progreso2")
    page.keyboard.press("Control+k"); page.keyboard.type("grafos"); page.wait_for_timeout(200)
    if page.locator(".palette li a").count() == 0: errors.append("el buscador no encontró «grafos»")
    b.close()

print(json.dumps({"secciones": len(sections), "documentos": len(docs), "errores": errors}, ensure_ascii=False, indent=1))
sys.exit(1 if errors else 0)
