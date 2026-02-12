# Fotók Hozzáadása / Adding Photos

## Lépések / Steps:

1. **Készíts egy `public/images` mappát:**
   ```
   valentine-website/
   └── public/
       └── images/
           ├── you-1.jpg
           ├── you-2.jpg
           ├── you-3.jpg
           ├── you-4.jpg
           ├── you-5.jpg
           ├── you-6.jpg
           ├── you-7.jpg
           ├── other-1.jpg
           └── other-2.jpg
   ```

2. **Add hozzá a képeket:**
   - 7 kép veled (`you-1.jpg` - `you-7.jpg`) - ezek lesznek a helyes válaszok
   - 2 "zavaró" kép (`other-1.jpg`, `other-2.jpg`) - pl. virágok, szívek, stb.

3. **A képek automatikusan megjelennek a captcha-ban!**

## Tippek:
- A képek lehetnek `.jpg`, `.png`, vagy `.webp` formátumban
- Négyzet alakú képek a legjobbak (pl. 300x300px)
- Ha más neveket használsz, frissítsd a `components/ImageCaptcha.tsx` fájlt
