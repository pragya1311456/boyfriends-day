# LoveStory Studio ❤️

A modern, interactive romantic storybook website and personalized love letter platform.

This website allows anyone—with **zero coding knowledge**—to personalize an emotional storybook for their partner, complete with:
- **Full Website Experience**: Hero showcase with live couple sandbox, feature walkthrough, interactive chapter demo, romantic music lounge, real testimonials, and FAQ.
- **Animated Storybook Experience**: Cute teddy bear blowing out a romantic candle, followed by the cute couple running towards each other from both sides, an adorable warm huggy, and a sweet romantic kiss!
- **3D Wax-Sealed Envelope**: Realistic tactile wax seal with smooth paper sliding animation.
- **Polaroid Memory Gallery**: Draggable, tilted snapshots with handwritten captions and lightbox zoom.
- **Reasons I Love You Cards**: Sweet reasons why they have your heart.
- **Milestone Love Timeline**: Chronological milestones with couple illustrations.
- **Final Love Letter & Secret Message**: Parchment paper letter with typewriter secret message reveal.
- **Romantic Background Music & Heart Rain**: Audio synthesizer presets and falling heart rain.
- **Instant Sharing**: One magic link to send on WhatsApp, iMessage, or Instagram.

---

## 🎨 Design Philosophy: Fixed Design vs Editable Content

To maintain a consistent, premium, and magical aesthetic:

* **DESIGN = FIXED (RED + WHITE)**
  * The visual theme, colors (`#c62845`, `#ffffff`, `#fff5f7`), typography, button designs, 3D envelope structure, cute teddy bear animations, Polaroid shadows, and confetti effects are strictly fixed.
  * No theme switchers, color pickers, or CSS overrides are exposed to users.
* **CONTENT = 100% USER-EDITABLE**
  * Names, opening messages, photos, captions, love reasons, timeline milestones, background music, secret messages, and personal love letters can all be freely customized.

---

## 🚀 1. How to Run the Project

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   This launches the Express + Vite server at `http://localhost:3000`.
3. **Build for Production**:
   ```bash
   npm run build
   npm start
   ```

---

## ✏️ 2. How the Customization System Works

1. Tap **"Customize Story ✏️"** or open the app and tap **"Create Your Own"**.
2. An intuitive tabbed editor guides you through every step:
   * **1. Names & Intro**: Enter your name, partner's name, envelope text, surprise opening prompt, toggle the **Heart Rain Effect 🌧️❤️**, and pick your favorite **Cute Couple Pose 👫** (Holding Hands, Warm Hug, Sweet Kiss, or Cozy Bench).
   * **2. Polaroids**: Upload and caption photos.
   * **3. Reasons**: Add or remove things you love about them.
   * **4. Timeline**: Chronicle the journey from first meeting to the present.
   * **5. Custom Chapters**: Add new custom chapters.
   * **6. Song**: Choose or upload music.
   * **7. Love Letters**: Write the mystery gift surprise and the final typewriter love letter.
3. Tap **"Preview ❤️"** at any moment to test the story.

---

## 📸 3. How Users Upload Photos

* Under the **Polaroids** tab, tap **"Upload Photos"**.
* Select any JPG, PNG, or WebP files from your phone or computer.
* Files are instantly converted into base64 image data and styled with authentic Polaroid white borders, handwritten captions, drop shadows, and natural slight rotations (-3° to +3°).
* Users can reorder photos (Move Up/Down), edit captions, or delete photos without needing to rename files.
* Clicking any Polaroid in the story enlarges it in a romantic lightbox.

---

## 🎵 4. How Users Upload Music

* Under the **Song 🎵** tab (or via the floating music player's "Change Song" button), tap **"Choose Your Song 🎵"**.
* Select any MP3, WAV, or AAC audio file.
* The music starts playing gently after the recipient taps the romantic envelope, loops continuously, and features volume and play/pause controls.
* If no file is uploaded, the app synthesizes a sweet, romantic chime lullaby using the HTML5 Web Audio API out-of-the-box.

---

## 📚 5. How Users Create Chapters

* Under the **Custom Chapters** tab, tap **"+ Add Chapter"**.
* Provide a **Chapter Title**, **Date/Memory Note**, and **Story Content**.
* Use **Move Up** and **Move Down** to reorder chapters seamlessly.
* Any number of chapters can be added; they will appear in order in the storybook navigation.

---

## 💾 6. How Users Save Their Story

* When the user taps **"Save My Story 💾"** or **"Save & Share 🔗"**:
  1. The story is saved to the local device's `localStorage` (so they can continue editing anytime).
  2. The story is also saved to the server via the `POST /api/stories` endpoint under a unique ID (e.g., `love-m8x9y2-abc1`).
  3. Person A's story will **never** overwrite Person B's story.
  4. The original template remains untouched.

---

## 🔗 7. How Sharing Works

* After saving, the **"Your Love Story Is Ready! ❤️"** modal appears.
* It provides a unique shareable link (e.g. `https://your-domain.com/?story=love-123456`).
* Features a one-tap **"Copy Link"** button, a direct **"Send on WhatsApp"** button, and an **"Open Link"** preview button.

---

## 🌐 8. How Personalized URLs Work

* When the recipient opens the link:
  * The query parameter `?story=ID` instructs the app to load that specific story from the backend database/filesystem (`/api/stories/:id`).
  * If offline or standalone, the URL can also encode the story state via `?data=BASE64`, allowing standalone portable distribution without server storage dependencies.

---

## 🗄️ 9. What Backend / Database Is Required for Permanent Cross-Device Sharing?

For true permanent cross-device sharing:
1. **Current Built-in Implementation**:
   * An Express backend in `server.ts` with a persistent JSON storage directory (`./data/stories/`).
   * When Person A saves their story, the server writes `./data/stories/[id].json`. When Person B opens `?story=[id]`, the server responds with that JSON.
2. **Production Database Options for Scaling to Millions of Users**:
   * **Google Cloud Firestore / Firebase**: Realtime document database with simple client SDK or server routes.
   * **PostgreSQL / Cloud SQL**: Relational storage storing JSONB payloads for every story ID.
   * **Redis / Cloud Storage (GCS/S3)**: Highly scalable object storage bucket where `[id].json` files are served via CDN.

---

## 📂 10. Which Files Control the Fixed Design?

* `src/index.css`: Defines the fixed CSS color variables (`--primary: #c62845`, `--background: #fff5f7`), fonts, keyframe animations (candle flicker, teddy breathing, puff cheeks, floating hearts, Polaroid tilt).
* `src/components/TeddyAndCake.tsx`: Fixed SVG vector artwork and animation geometry for the teddy bear and cake.
* `src/components/CartoonCouple.tsx`: Fixed SVG vector artwork for Chapter 1 chibi couple.
* `src/components/EnvelopeScene.tsx`: Fixed 3D CSS envelope flaps, wax seal heart, and fold animation.
* `src/components/StoryChapterView.tsx`: Fixed chapter layout structure, polaroid styling, card layouts, and typewriter finale.
