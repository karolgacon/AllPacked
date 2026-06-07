import type { PackingListTrip } from '@/shared/demo/appDemoData'
import type { PackingListCategory } from './types'

type ExportPackingListOptions = {
  trip: PackingListTrip
  categories: PackingListCategory[]
  periodLabel: string
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function buildExportHtml({
  trip,
  categories,
  periodLabel,
}: ExportPackingListOptions) {
  const sections = categories
    .map((category) => {
      const items = category.items
        .map(
          (item) =>
            `<li style="margin:6px 0;font-size:14px;">${item.checked ? '☑' : '☐'} ${escapeHtml(item.label)}</li>`,
        )
        .join('')

      return `
        <section style="margin-bottom:20px;">
          <h2 style="margin:0 0 8px;font-size:16px;border-bottom:1px solid #e2e8f0;padding-bottom:4px;">
            ${escapeHtml(category.name)}
          </h2>
          <ul style="margin:0;padding-left:18px;">${items}</ul>
        </section>
      `
    })
    .join('')

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>${escapeHtml(trip.name)} — Packing List</title>
    <style>
      body { font-family: Arial, sans-serif; color: #0f172a; margin: 32px; }
      h1 { margin: 0 0 4px; font-size: 24px; }
      .meta { color: #64748b; font-size: 13px; margin-bottom: 24px; }
      @media print { body { margin: 16px; } }
    </style>
  </head>
  <body>
    <h1>${escapeHtml(trip.name)}</h1>
    <p class="meta">${escapeHtml(trip.destination)} · ${escapeHtml(periodLabel)}</p>
    ${sections}
  </body>
</html>`
}

export function exportPackingListToPdf(options: ExportPackingListOptions) {
  const html = buildExportHtml(options)
  const iframe = document.createElement('iframe')
  iframe.setAttribute('title', 'Packing list export')
  iframe.setAttribute('aria-hidden', 'true')
  iframe.style.position = 'fixed'
  iframe.style.right = '0'
  iframe.style.bottom = '0'
  iframe.style.width = '0'
  iframe.style.height = '0'
  iframe.style.border = '0'
  iframe.style.opacity = '0'
  iframe.style.pointerEvents = 'none'

  document.body.appendChild(iframe)

  const frameWindow = iframe.contentWindow
  const frameDocument = iframe.contentDocument ?? frameWindow?.document

  if (!frameWindow || !frameDocument) {
    iframe.remove()
    window.alert('Could not prepare the packing list for export.')
    return
  }

  frameDocument.open()
  frameDocument.write(html)
  frameDocument.close()

  const cleanup = () => {
    window.setTimeout(() => iframe.remove(), 1000)
  }

  const triggerPrint = () => {
    frameWindow.focus()
    frameWindow.print()
    cleanup()
  }

  if (frameDocument.readyState === 'complete') {
    window.setTimeout(triggerPrint, 150)
    return
  }

  iframe.onload = () => {
    window.setTimeout(triggerPrint, 150)
  }
}
