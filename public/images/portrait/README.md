# Portrait asset

`portrait.webp` is the approved photograph of Silvan Hahn. It is rendered on the
about page and published as the `image` of the `Person` node in
`src/components/seo/PersonSchema.tsx`, so search engines show the same face the
site shows.

It is stored pre-cropped at **1360 × 1700** (4:5) so the frame declares the ratio
the file already has and the composition is never cut a second time.

Do not substitute a generated likeness. If the photograph is ever withdrawn,
restore the explicit placeholder rather than leaving an empty frame — an absent
portrait must be stated, not implied — and drop the `image` from the Person
markup in the same change. Structured data pointing at a file that is no longer
served is worse than no markup at all.

## Replacing the photograph

Derive the asset from the full-resolution original, not from this file:

```
sharp(source)
  .extract({ left: 0, top: 130, width: 1365, height: 1706 })
  .resize(1360, 1700)
  .webp({ quality: 82, effort: 6 })
```

Sharp drops EXIF by default, which is deliberate: the source frames carry camera
and location metadata that has no business being served. Keep it that way.

Then update, in one change:

- `src/lib/portrait.ts` — the dimensions, which the about page and the Person
  markup both read. Nothing else should hard-code them.
- the `portrait/portrait.webp` entry in `tests/unit/design-contract.test.ts` —
  byte length and SHA-256, pinned the same way the project visuals are.
- the `1360 × 1700` above.
- `portraitAlt` in `src/content/de.ts` and `src/content/en.ts`. Describe what the
  photograph verifiably shows and stop there: no inferred mood, identity, or
  other detail that cannot be read off the approved source.

The tests fail if these fall out of step, which is the point — the size in the
structured data is a claim about the file, so it has to stay true.
