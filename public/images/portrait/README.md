# Portrait asset

`portrait.webp` is the approved photograph of Silvan Hahn, rendered on the about
page. It is stored pre-cropped at **1360 × 1700** (4:5) so the frame declares the
same ratio the file already has and the composition is never cut a second time.

Do not substitute a generated likeness. If the photograph is ever withdrawn,
restore the explicit placeholder rather than leaving an empty frame — an absent
portrait must be stated, not implied.

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

Then update the alternative text in `src/content/de.ts` and `src/content/en.ts`.
Describe what the photograph verifiably shows and nothing more — no inferred
mood, identity, or other detail that cannot be read off the approved source. The
`aspect-ratio` in `.portraitImage` and the `1360 × 1700` above are pinned by
`tests/unit/design-contract.test.ts`; change all three together or the test
fails.
