# Cherry Homz — Generative Image Prompts

Every image below currently holds a **temporary stock photo (Unsplash)** at the listed path.
Generate the real image with any AI image tool (Midjourney, DALL·E, Imagen, Firefly…),
then **save it over the same path with the same filename**.

> After replacing a file, bump its version in the code so browsers drop the cached copy:
> search the `src/` folder for `?v=2` on that filename and change it to `?v=3`
> (the version lives in `src/data/properties.ts`, the page files, and `AboutPageContent.tsx`).

**Global style suffix — append to every prompt:**
> photorealistic, professional real-estate photography, golden-hour natural light, shot on full-frame camera 24mm lens, high dynamic range, no people unless specified, no watermarks, no text

---

## Page hero banners — 1600 × 900 (16:9)

| Save to | Prompt |
|---|---|
| `public/images/hero-buy.png` | Aerial drone view of Sydney Harbour at golden hour, luxury waterfront homes of Mosman in the foreground with terracotta roofs and pools, Sydney Opera House and Harbour Bridge glowing in the distance, soft pink dusk sky |
| `public/images/hero-rent.png` | Stylish young couple's modern Sydney apartment balcony with outdoor furniture and potted plants, city skyline view at dusk, warm interior light spilling out through floor-to-ceiling glass doors |
| `public/images/hero-sold.png` | Elegant Federation-style Sydney house at twilight with warm lights on, a tasteful dark-red "SOLD" sign on the manicured front lawn, jacaranda tree in bloom, celebratory and warm atmosphere |
| `public/images/hero-land.png` | Sweeping aerial view of a new master-planned housing estate in north-west Sydney, freshly surveyed green blocks with white boundary pegs, winding new roads, blue mountains on the horizon, morning light |
| `public/images/hero-about.png` | Cherry blossom branches in full bloom framing a softly blurred elegant Sydney terrace house, dreamy shallow depth of field, romantic soft pink and deep cherry-red tones |
| `public/images/hero-contact.png` | Bright welcoming boutique real-estate office reception in Sydney CBD, warm timber desk, cherry-blossom arrangement in a vase, floor-to-ceiling windows with George Street view, inviting and professional |

## Property listing photos — 1200 × 900 (4:3)

| Save to | Prompt |
|---|---|
| `public/images/prop-surry-hills-terrace.png` | Renovated Victorian terrace house exterior in Surry Hills Sydney, dark heritage facade with white iron-lace balcony, designer front door, leafy inner-city street, late afternoon light |
| `public/images/prop-manly-beach-house.png` | Contemporary two-storey coastal family home near Manly Beach, white render and timber cladding, ocean glimpse behind, native coastal garden, blue sky with soft clouds |
| `public/images/prop-cronulla-duplex.png` | Brand-new modern duplex in Cronulla, crisp white and grey facade with timber battens, double garage, landscaped low-maintenance front yard, bright midday coastal light |
| `public/images/prop-bondi-apartment.png` | Interior of a renovated Bondi Beach apartment living room, floor-to-ceiling windows with uninterrupted Pacific Ocean view, stone island kitchen, coastal styling in whites and warm timber |
| `public/images/prop-parramatta-apartment.png` | View from level 45 of a new Parramatta high-rise apartment, floor-to-ceiling glass, river and city skyline below, modern kitchen with stone island, dusk city lights |
| `public/images/prop-newtown-terrace.png` | Charming double-fronted terrace house in Newtown Sydney, colourful heritage facade, ornate iron fence, street trees, relaxed inner-west atmosphere, morning light |
| `public/images/prop-chatswood-apartment.png` | Modern two-bedroom apartment interior in Chatswood, north-facing living room with district skyline views, neutral styling, bright natural light |
| `public/images/prop-box-hill-land.png` | Level vacant residential block of land in Box Hill NSW with fresh survey pegs and a sold sticker on the estate sign, new homes under construction next door, big open sky |

## Team portraits — 800 × 1000 (4:5)

Style for all: *corporate portrait, upper body, warm genuine smile, navy or charcoal business attire, softly blurred bright office background with a hint of cherry-blossom pink, studio-quality lighting*

| Save to | Prompt |
|---|---|
| `public/images/team-sophie-nguyen.png` | Professional portrait of an Australian-Vietnamese woman in her early 40s, principal real-estate agent, confident and approachable |
| `public/images/team-daniel-rossi.png` | Professional portrait of an Italian-Australian man in his late 30s, head of sales, tailored suit, friendly confident expression |
| `public/images/team-aisha-khan.png` | Professional portrait of a South-Asian Australian woman in her early 30s, senior property manager, blazer, warm smile |
| `public/images/team-oliver-bennett.png` | Professional portrait of an Australian man in his late 20s, buyers agent, smart-casual blazer no tie, energetic friendly look |
| `public/images/team-grace-taylor.png` | Professional portrait of an Australian woman in her mid 30s, marketing director, creative smart attire, bright genuine smile |

## About page — 1600 × 1200 (4:3)

| Save to | Prompt |
|---|---|
| `public/images/about-office.png` | Boutique real-estate agency storefront office on George Street Sydney, cherry-red and white branding, large windows displaying property listings, staff visible working inside, pedestrians passing, warm afternoon light |

---

### Tips
- Keep the exact filename and PNG format so the site picks the new image up automatically.
- Heroes get a dark gradient overlay in the UI, so slightly bright images work best.
- Property photos are cropped to 4:3 cards — keep the subject centred.
