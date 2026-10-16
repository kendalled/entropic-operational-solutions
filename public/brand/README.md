# Gyroscope logo collection

24 transparent SVGs: three designs × four colorways × two layouts.
Lettering is outlined, so wordmarks require no fonts. All assets use vector
geometry and scale without losing resolution.

## Compare the designs

With the Nuxt dev server running, open `/brand/logo-preview.html`.
The sheet shows every wordmark, a 64px icon, and 32px/24px icon samples.

| Design | Character |
| --- | --- |
| `gimbal` | Classic interlocking rings and tilted spindle; default |
| `orbital` | Open ring, elliptical rotor, and instrument base |
| `precision` | Geometric hexagonal frame and diamond hub |

| Colorway | Primary | Use |
| --- | --- | --- |
| `bronze` | `#986238` | Warm metallic palette, light backgrounds |
| `monochrome` | `#25282B` | Single ink, light backgrounds |
| `maroon` | `#711E37` | Deep wine palette, light backgrounds |
| `white` | `#FFFFFF` | Single ink, dark backgrounds |

## Use in Nuxt

Files live in `public/brand/logos/`, Nuxt's static asset directory. Reference
them by `/brand/logos/...`, without `public` in the URL. No imports or SVG
loader are required.

The auto-imported `app/components/BrandLogo.vue` component defaults to a bronze
gimbal, showing a 40px icon below 640px and a 280px wordmark at wider viewports:

```vue
<BrandLogo />
<BrandLogo design="orbital" color="maroon" />
<BrandLogo design="precision" color="monochrome" layout="icon" :icon-size="48" />
<BrandLogo color="white" layout="wordmark" :wordmark-width="320" />
```

Wrap it in your own navigation link when needed:

```vue
<NuxtLink to="/" aria-label="Entropic Operational Solutions home">
  <BrandLogo alt="" />
</NuxtLink>
```

For a plain image:

```html
<img
  src="/brand/logos/gyroscope-gimbal-bronze-wordmark.svg"
  width="324"
  height="96"
  alt="Entropic Operational Solutions"
>
```

Filename pattern: `gyroscope-{design}-{color}-{icon|wordmark}.svg`.
Icons have a `128 × 128` viewBox; wordmarks have a `432 × 128` viewBox.
For very small placements, use an icon rather than the full wordmark.
The SVG's fixed colors are self-contained; choose `white` for dark surfaces.
