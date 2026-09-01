import{l as e,o as t}from"./index-B7fxLJ5C.js";import{n}from"./debounce-utils-a2be2932-DuHSsbHd.js";import"./utils-fec71534-SDU5lF7A.js";import{t as r}from"./accessibility-utils-6bcee01d-B6gNwBcn.js";import{r as i,t as a}from"./initialization-utils-18d62c3c-uA-afwMF.js";import"./button-b64416c8-OCr7CNDh.js";import"./heading-1ee122d1-RXH1ifZB.js";import{K as o,N as s,et as c}from"./headless.esm-eaee1560-BcsCVvSB.js";import"./local-storage-utils-e06a332f-B40H51BI.js";import{t as l}from"./generated-answer-common-76c16034-WL9j7BS-.js";var u=`/*
! tailwindcss v3.4.7 | MIT License | https://tailwindcss.com
*//*
1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
*/

*,
::before,
::after {
  box-sizing: border-box; /* 1 */
  border-width: 0; /* 2 */
  border-style: solid; /* 2 */
  border-color: #e5e7eb; /* 2 */
}

::before,
::after {
  --tw-content: '';
}

/*
1. Use a consistent sensible line-height in all browsers.
2. Prevent adjustments of font size after orientation changes in iOS.
3. Use a more readable tab size.
4. Use the user's configured \`sans\` font-family by default.
5. Use the user's configured \`sans\` font-feature-settings by default.
6. Use the user's configured \`sans\` font-variation-settings by default.
7. Disable tap highlights on iOS
*/

html,
:host {
  line-height: 1.5; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
  -moz-tab-size: 4; /* 3 */
  -o-tab-size: 4;
     tab-size: 4; /* 3 */
  font-family: var(--atomic-font-family); /* 4 */
  font-feature-settings: normal; /* 5 */
  font-variation-settings: normal; /* 6 */
  -webkit-tap-highlight-color: transparent; /* 7 */
}

/*
1. Remove the margin in all browsers.
2. Inherit line-height from \`html\` so users can set them as a class directly on the \`html\` element.
*/

body {
  margin: 0; /* 1 */
  line-height: inherit; /* 2 */
}

/*
1. Add the correct height in Firefox.
2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
3. Ensure horizontal rules are visible by default.
*/

hr {
  height: 0; /* 1 */
  color: inherit; /* 2 */
  border-top-width: 1px; /* 3 */
}

/*
Add the correct text decoration in Chrome, Edge, and Safari.
*/

abbr:where([title]) {
  -webkit-text-decoration: underline dotted;
          text-decoration: underline dotted;
}

/*
Remove the default font size and weight for headings.
*/

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}

/*
Reset links to optimize for opt-in styling instead of opt-out.
*/

a {
  color: inherit;
  text-decoration: inherit;
}

/*
Add the correct font weight in Edge and Safari.
*/

b,
strong {
  font-weight: bolder;
}

/*
1. Use the user's configured \`mono\` font-family by default.
2. Use the user's configured \`mono\` font-feature-settings by default.
3. Use the user's configured \`mono\` font-variation-settings by default.
4. Correct the odd \`em\` font sizing in all browsers.
*/

code,
kbd,
samp,
pre {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; /* 1 */
  font-feature-settings: normal; /* 2 */
  font-variation-settings: normal; /* 3 */
  font-size: 1em; /* 4 */
}

/*
Add the correct font size in all browsers.
*/

small {
  font-size: 80%;
}

/*
Prevent \`sub\` and \`sup\` elements from affecting the line height in all browsers.
*/

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/*
1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
3. Remove gaps between table borders by default.
*/

table {
  text-indent: 0; /* 1 */
  border-color: inherit; /* 2 */
  border-collapse: collapse; /* 3 */
}

/*
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
3. Remove default padding in all browsers.
*/

button,
input,
optgroup,
select,
textarea {
  font-family: inherit; /* 1 */
  font-feature-settings: inherit; /* 1 */
  font-variation-settings: inherit; /* 1 */
  font-size: 100%; /* 1 */
  font-weight: inherit; /* 1 */
  line-height: inherit; /* 1 */
  letter-spacing: inherit; /* 1 */
  color: inherit; /* 1 */
  margin: 0; /* 2 */
  padding: 0; /* 3 */
}

/*
Remove the inheritance of text transform in Edge and Firefox.
*/

button,
select {
  text-transform: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Remove default button styles.
*/

button,
input:where([type='button']),
input:where([type='reset']),
input:where([type='submit']) {
  -webkit-appearance: button; /* 1 */
  background-color: transparent; /* 2 */
  background-image: none; /* 2 */
}

/*
Use the modern Firefox focus style for all focusable elements.
*/

:-moz-focusring {
  outline: auto;
}

/*
Remove the additional \`:invalid\` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
*/

:-moz-ui-invalid {
  box-shadow: none;
}

/*
Add the correct vertical alignment in Chrome and Firefox.
*/

progress {
  vertical-align: baseline;
}

/*
Correct the cursor style of increment and decrement buttons in Safari.
*/

::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
}

/*
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/

[type='search'] {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}

/*
Remove the inner padding in Chrome and Safari on macOS.
*/

::-webkit-search-decoration {
  -webkit-appearance: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Change font properties to \`inherit\` in Safari.
*/

::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/*
Add the correct display in Chrome and Safari.
*/

summary {
  display: list-item;
}

/*
Removes the default spacing and border for appropriate elements.
*/

blockquote,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
figure,
p,
pre {
  margin: 0;
}

fieldset {
  margin: 0;
  padding: 0;
}

legend {
  padding: 0;
}

ol,
ul,
menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

/*
Reset default styling for dialogs.
*/
dialog {
  padding: 0;
}

/*
Prevent resizing textareas horizontally by default.
*/

textarea {
  resize: vertical;
}

/*
1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
2. Set the default placeholder color to the user's configured gray 400 color.
*/

input::-moz-placeholder, textarea::-moz-placeholder {
  opacity: 1; /* 1 */
  color: #9ca3af; /* 2 */
}

input::placeholder,
textarea::placeholder {
  opacity: 1; /* 1 */
  color: #9ca3af; /* 2 */
}

/*
Set the default cursor for buttons.
*/

button,
[role="button"] {
  cursor: pointer;
}

/*
Make sure disabled buttons don't get the pointer cursor.
*/
:disabled {
  cursor: default;
}

/*
1. Make replaced elements \`display: block\` by default. (https://github.com/mozdevs/cssremedy/issues/14)
2. Add \`vertical-align: middle\` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
   This can trigger a poorly considered lint error in some tools but is included by design.
*/

img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block; /* 1 */
  vertical-align: middle; /* 2 */
}

/*
Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
*/

img,
video {
  max-width: 100%;
  height: auto;
}

/* Make elements with the HTML hidden attribute stay hidden by default */
[hidden] {
  display: none;
}
  :host {
    display: block;
    /* TODO: remove when upgrading Tailwind > v3.0.23 */
    --tw-ring-inset: var(--tw-empty, /*!*/ /*!*/);
  }

  :host,
  button,
  input,
  select {
  font-family: var(--atomic-font-family);
  font-size: var(--atomic-text-base);
  font-weight: var(--atomic-font-normal);
}

  :host(.atomic-hidden) {
    display: none;
  }

*, ::before, ::after {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position:  ;
  --tw-gradient-via-position:  ;
  --tw-gradient-to-position:  ;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
  --tw-contain-size:  ;
  --tw-contain-layout:  ;
  --tw-contain-paint:  ;
  --tw-contain-style:  ;
}

::backdrop {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position:  ;
  --tw-gradient-via-position:  ;
  --tw-gradient-to-position:  ;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
  --tw-contain-size:  ;
  --tw-contain-layout:  ;
  --tw-contain-paint:  ;
  --tw-contain-style:  ;
}
.\\!container {
  width: 100% !important;
}
.container {
  width: 100%;
}
@media (min-width: 640px) {

  .\\!container {
    max-width: 640px !important;
  }

  .container {
    max-width: 640px;
  }
}
@media (min-width: 768px) {

  .\\!container {
    max-width: 768px !important;
  }

  .container {
    max-width: 768px;
  }
}
@media (min-width: 1024px) {

  .\\!container {
    max-width: 1024px !important;
  }

  .container {
    max-width: 1024px;
  }
}
@media (min-width: 1280px) {

  .\\!container {
    max-width: 1280px !important;
  }

  .container {
    max-width: 1280px;
  }
}
@media (min-width: 1536px) {

  .\\!container {
    max-width: 1536px !important;
  }

  .container {
    max-width: 1536px;
  }
}
.\\!link {
  color: var(--atomic-primary);
}
.\\!link:hover {
  color: var(--atomic-primary-light);
  text-decoration-line: underline;
}
.\\!link.focus-visible.js-focus-visible, .js-focus-visible .\\!link.focus-visible {
  color: var(--atomic-primary-light);
  text-decoration-line: underline;
}
.\\!link:focus-visible {
  color: var(--atomic-primary-light);
  text-decoration-line: underline;
}
.link {
  color: var(--atomic-primary);
}
.link:hover {
  color: var(--atomic-primary-light);
  text-decoration-line: underline;
}
.link.focus-visible.js-focus-visible, .js-focus-visible .link.focus-visible {
  color: var(--atomic-primary-light);
  text-decoration-line: underline;
}
.link:focus-visible {
  color: var(--atomic-primary-light);
  text-decoration-line: underline;
}
.input-primary {
  border-radius: var(--atomic-border-radius);
  border-width: 1px;
  border-color: var(--atomic-neutral);
  background-color: var(--atomic-background);
}
.input-primary.focus-visible.js-focus-visible, .js-focus-visible .input-primary.focus-visible {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.input-primary:focus-visible {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.input-primary:hover {
  border-color: var(--atomic-primary-light);
}
.input-primary.focus-visible.js-focus-visible, .js-focus-visible .input-primary.focus-visible {
  border-color: var(--atomic-primary);
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
  --tw-ring-color: var(--atomic-ring-primary);
}
.input-primary:focus-visible {
  border-color: var(--atomic-primary);
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
  --tw-ring-color: var(--atomic-ring-primary);
}
.btn-radio {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
.btn-radio::before {
  --tw-content: attr(value);
  content: var(--tw-content);
}
.btn-primary {
  border-radius: var(--atomic-border-radius);
  background-color: var(--atomic-primary);
  color: var(--atomic-on-primary);
}
.btn-primary.focus-visible.js-focus-visible, .js-focus-visible .btn-primary.focus-visible {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.btn-primary:focus-visible {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.btn-primary:hover {
  background-color: var(--atomic-primary-light);
}
.btn-primary.focus-visible.js-focus-visible, .js-focus-visible .btn-primary.focus-visible {
  background-color: var(--atomic-primary-light);
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
  --tw-ring-color: var(--atomic-ring-primary);
}
.btn-primary:focus-visible {
  background-color: var(--atomic-primary-light);
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
  --tw-ring-color: var(--atomic-ring-primary);
}
.btn-primary:disabled {
  cursor: not-allowed;
  background-color: var(--atomic-disabled);
}
.btn-outline-primary {
  border-radius: var(--atomic-border-radius);
  border-width: 1px;
  border-color: var(--atomic-neutral);
  background-color: var(--atomic-background);
  color: var(--atomic-primary);
}
.btn-outline-primary.focus-visible.js-focus-visible, .js-focus-visible .btn-outline-primary.focus-visible {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.btn-outline-primary:focus-visible {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.btn-outline-primary:hover {
  border-color: var(--atomic-primary-light);
  color: var(--atomic-primary-light);
}
.btn-outline-primary.focus-visible.js-focus-visible, .js-focus-visible .btn-outline-primary.focus-visible {
  border-color: var(--atomic-primary);
  color: var(--atomic-primary);
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
  --tw-ring-color: var(--atomic-ring-primary);
}
.btn-outline-primary:focus-visible {
  border-color: var(--atomic-primary);
  color: var(--atomic-primary);
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
  --tw-ring-color: var(--atomic-ring-primary);
}
.btn-outline-primary:disabled {
  cursor: not-allowed;
  border-color: var(--atomic-neutral);
  color: var(--atomic-neutral);
}
.btn-text-primary {
  border-radius: var(--atomic-border-radius);
  background-color: var(--atomic-background);
  color: var(--atomic-primary);
}
.btn-text-primary.focus-visible.js-focus-visible, .js-focus-visible .btn-text-primary.focus-visible {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.btn-text-primary:focus-visible {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.btn-text-primary:hover {
  background-color: var(--atomic-neutral-light);
}
.btn-text-primary.focus-visible.js-focus-visible, .js-focus-visible .btn-text-primary.focus-visible {
  background-color: var(--atomic-neutral-light);
}
.btn-text-primary:focus-visible {
  background-color: var(--atomic-neutral-light);
}
.btn-outline-neutral {
  border-radius: var(--atomic-border-radius);
  border-width: 1px;
  border-color: var(--atomic-neutral);
  background-color: var(--atomic-background);
  color: var(--atomic-on-background);
}
.btn-outline-neutral.focus-visible.js-focus-visible, .js-focus-visible .btn-outline-neutral.focus-visible {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.btn-outline-neutral:focus-visible {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.btn-outline-neutral:hover {
  border-color: var(--atomic-primary);
  color: var(--atomic-primary);
}
.btn-outline-neutral.focus-visible.js-focus-visible, .js-focus-visible .btn-outline-neutral.focus-visible {
  border-color: var(--atomic-primary);
  color: var(--atomic-primary);
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
  --tw-ring-color: var(--atomic-ring-primary);
}
.btn-outline-neutral:focus-visible {
  border-color: var(--atomic-primary);
  color: var(--atomic-primary);
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
  --tw-ring-color: var(--atomic-ring-primary);
}
.btn-outline-neutral:disabled {
  cursor: not-allowed;
  border-color: var(--atomic-neutral);
  color: var(--atomic-on-background);
  opacity: 0.5;
}
.btn-outline-error {
  border-radius: var(--atomic-border-radius);
  border-width: 1px;
  border-color: var(--atomic-neutral);
  background-color: var(--atomic-background);
  color: var(--atomic-on-background);
}
.btn-outline-error.focus-visible.js-focus-visible, .js-focus-visible .btn-outline-error.focus-visible {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.btn-outline-error:focus-visible {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.btn-outline-error:hover {
  border-color: var(--atomic-error);
  color: var(--atomic-error);
}
.btn-outline-error.focus-visible.js-focus-visible, .js-focus-visible .btn-outline-error.focus-visible {
  border-color: var(--atomic-error);
  color: var(--atomic-error);
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
  --tw-ring-color: var(--atomic-ring-primary);
}
.btn-outline-error:focus-visible {
  border-color: var(--atomic-error);
  color: var(--atomic-error);
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
  --tw-ring-color: var(--atomic-ring-primary);
}
.btn-outline-error:disabled {
  cursor: not-allowed;
  border-color: var(--atomic-neutral);
  color: var(--atomic-on-background);
  opacity: 0.5;
}
.btn-outline-bg-neutral {
  border-radius: var(--atomic-border-radius);
  border-width: 1px;
  border-color: var(--atomic-neutral);
  background-color: var(--atomic-background);
  color: var(--atomic-on-background);
}
.btn-outline-bg-neutral.focus-visible.js-focus-visible, .js-focus-visible .btn-outline-bg-neutral.focus-visible {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.btn-outline-bg-neutral:focus-visible {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.btn-outline-bg-neutral:hover {
  border-color: var(--atomic-primary);
  color: var(--atomic-primary);
}
.btn-outline-bg-neutral.focus-visible.js-focus-visible, .js-focus-visible .btn-outline-bg-neutral.focus-visible {
  border-color: var(--atomic-primary);
  color: var(--atomic-primary);
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
  --tw-ring-color: var(--atomic-ring-primary);
}
.btn-outline-bg-neutral:focus-visible {
  border-color: var(--atomic-primary);
  color: var(--atomic-primary);
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
  --tw-ring-color: var(--atomic-ring-primary);
}
.btn-outline-bg-neutral:disabled {
  cursor: not-allowed;
  border-color: var(--atomic-neutral);
  color: var(--atomic-on-background);
  opacity: 0.5;
}
.btn-outline-bg-neutral:hover {
  background-color: var(--atomic-neutral-light);
}
.btn-outline-bg-neutral.focus-visible.js-focus-visible, .js-focus-visible .btn-outline-bg-neutral.focus-visible {
  background-color: var(--atomic-neutral-light);
}
.btn-outline-bg-neutral:focus-visible {
  background-color: var(--atomic-neutral-light);
}
.btn-outline-bg-error {
  border-radius: var(--atomic-border-radius);
  border-width: 1px;
  border-color: var(--atomic-neutral);
  background-color: var(--atomic-background);
  color: var(--atomic-on-background);
}
.btn-outline-bg-error.focus-visible.js-focus-visible, .js-focus-visible .btn-outline-bg-error.focus-visible {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.btn-outline-bg-error:focus-visible {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.btn-outline-bg-error:hover {
  border-color: var(--atomic-error);
  color: var(--atomic-error);
}
.btn-outline-bg-error.focus-visible.js-focus-visible, .js-focus-visible .btn-outline-bg-error.focus-visible {
  border-color: var(--atomic-error);
  color: var(--atomic-error);
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
  --tw-ring-color: var(--atomic-ring-primary);
}
.btn-outline-bg-error:focus-visible {
  border-color: var(--atomic-error);
  color: var(--atomic-error);
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
  --tw-ring-color: var(--atomic-ring-primary);
}
.btn-outline-bg-error:disabled {
  cursor: not-allowed;
  border-color: var(--atomic-neutral);
  color: var(--atomic-on-background);
  opacity: 0.5;
}
.btn-outline-bg-error:hover {
  background-color: var(--atomic-neutral-light);
}
.btn-outline-bg-error.focus-visible.js-focus-visible, .js-focus-visible .btn-outline-bg-error.focus-visible {
  background-color: var(--atomic-neutral-light);
}
.btn-outline-bg-error:focus-visible {
  background-color: var(--atomic-neutral-light);
}
.btn-text-neutral {
  border-radius: var(--atomic-border-radius);
  background-color: var(--atomic-background);
  color: var(--atomic-on-background);
}
.btn-text-neutral.focus-visible.js-focus-visible, .js-focus-visible .btn-text-neutral.focus-visible {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.btn-text-neutral:focus-visible {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.btn-text-neutral:hover {
  background-color: var(--atomic-neutral-light);
  color: var(--atomic-primary);
}
.btn-text-neutral.focus-visible.js-focus-visible, .js-focus-visible .btn-text-neutral.focus-visible {
  background-color: var(--atomic-neutral-light);
  color: var(--atomic-primary);
}
.btn-text-neutral:focus-visible {
  background-color: var(--atomic-neutral-light);
  color: var(--atomic-primary);
}
.btn-text-transparent {
  color: var(--atomic-on-background);
}
.btn-text-transparent.focus-visible.js-focus-visible, .js-focus-visible .btn-text-transparent.focus-visible {
  outline-color: var(--atomic-primary-light);
}
.btn-text-transparent:focus-visible {
  outline-color: var(--atomic-primary-light);
}
.btn-text-transparent:hover {
  color: var(--atomic-primary-light);
}
.btn-text-transparent.focus-visible.js-focus-visible, .js-focus-visible .btn-text-transparent.focus-visible {
  color: var(--atomic-primary-light);
}
.btn-text-transparent:focus-visible {
  color: var(--atomic-primary-light);
}
.btn-square-neutral {
  border-width: 1px;
  border-color: var(--atomic-neutral);
  background-color: var(--atomic-background);
  color: var(--atomic-on-background);
}
.btn-square-neutral.focus-visible.js-focus-visible, .js-focus-visible .btn-square-neutral.focus-visible {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.btn-square-neutral:focus-visible {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.btn-square-neutral:hover {
  background-color: var(--atomic-neutral-light);
}
.btn-square-neutral.focus-visible.js-focus-visible, .js-focus-visible .btn-square-neutral.focus-visible {
  background-color: var(--atomic-neutral-light);
}
.btn-square-neutral:focus-visible {
  background-color: var(--atomic-neutral-light);
}
.btn-pill {
  border-radius: var(--atomic-border-radius-xl);
}
.btn-page {
  display: grid;
  place-items: center;
  border-width: 0px;
  font-size: var(--atomic-text-lg);
}
.btn-page:hover {
  border-width: 1px;
}
.btn-page.focus-visible.js-focus-visible, .js-focus-visible .btn-page.focus-visible {
  border-width: 1px;
}
.btn-page:focus-visible {
  border-width: 1px;
}
.btn-page.selected {
  border-width: 2px;
  border-color: var(--atomic-primary);
  font-weight: var(--atomic-font-bold);
}
.pointer-events-none {
  pointer-events: none;
}
.pointer-events-auto {
  pointer-events: auto;
}
.visible {
  visibility: visible;
}
.invisible {
  visibility: hidden;
}
.collapse {
  visibility: collapse;
}
.static {
  position: static;
}
.fixed {
  position: fixed;
}
.absolute {
  position: absolute;
}
.relative {
  position: relative;
}
.-right-2 {
  right: -0.5rem;
}
.-top-2 {
  top: -0.5rem;
}
.bottom-0 {
  bottom: 0px;
}
.bottom-2 {
  bottom: 0.5rem;
}
.bottom-px {
  bottom: 1px;
}
.left-0 {
  left: 0px;
}
.right-0 {
  right: 0px;
}
.right-20 {
  right: 5rem;
}
.right-6 {
  right: 1.5rem;
}
.right-px {
  right: 1px;
}
.top-0 {
  top: 0px;
}
.top-6 {
  top: 1.5rem;
}
.top-\\[50\\%\\] {
  top: 50%;
}
.top-full {
  top: 100%;
}
.top-px {
  top: 1px;
}
.z-0 {
  z-index: 0;
}
.z-1 {
  z-index: 1;
}
.z-10 {
  z-index: 10;
}
.z-\\[9998\\] {
  z-index: 9998;
}
.z-\\[9999\\] {
  z-index: 9999;
}
.order-last {
  order: 9999;
}
.col-span-2 {
  grid-column: span 2 / span 2;
}
.m-0 {
  margin: 0px;
}
.m-2 {
  margin: 0.5rem;
}
.-my-px {
  margin-top: -1px;
  margin-bottom: -1px;
}
.mx-0\\.5 {
  margin-left: 0.125rem;
  margin-right: 0.125rem;
}
.mx-1 {
  margin-left: 0.25rem;
  margin-right: 0.25rem;
}
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
.my-2 {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
.my-3 {
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
}
.my-4 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.my-6 {
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}
.my-auto {
  margin-top: auto;
  margin-bottom: auto;
}
.-mr-px {
  margin-right: -1px;
}
.mb-0 {
  margin-bottom: 0px;
}
.mb-1 {
  margin-bottom: 0.25rem;
}
.mb-2 {
  margin-bottom: 0.5rem;
}
.mb-3 {
  margin-bottom: 0.75rem;
}
.mb-4 {
  margin-bottom: 1rem;
}
.mb-6 {
  margin-bottom: 1.5rem;
}
.ml-0\\.5 {
  margin-left: 0.125rem;
}
.ml-1 {
  margin-left: 0.25rem;
}
.ml-2 {
  margin-left: 0.5rem;
}
.ml-4 {
  margin-left: 1rem;
}
.ml-6 {
  margin-left: 1.5rem;
}
.ml-auto {
  margin-left: auto;
}
.mr-0 {
  margin-right: 0px;
}
.mr-0\\.5 {
  margin-right: 0.125rem;
}
.mr-1 {
  margin-right: 0.25rem;
}
.mr-1\\.5 {
  margin-right: 0.375rem;
}
.mr-2 {
  margin-right: 0.5rem;
}
.mr-3 {
  margin-right: 0.75rem;
}
.mr-6 {
  margin-right: 1.5rem;
}
.mt-0 {
  margin-top: 0px;
}
.mt-1 {
  margin-top: 0.25rem;
}
.mt-1\\.5 {
  margin-top: 0.375rem;
}
.mt-10 {
  margin-top: 2.5rem;
}
.mt-2 {
  margin-top: 0.5rem;
}
.mt-2\\.5 {
  margin-top: 0.625rem;
}
.mt-3 {
  margin-top: 0.75rem;
}
.mt-4 {
  margin-top: 1rem;
}
.mt-6 {
  margin-top: 1.5rem;
}
.mt-7 {
  margin-top: 1.75rem;
}
.mt-8 {
  margin-top: 2rem;
}
.mt-px {
  margin-top: 1px;
}
.box-border {
  box-sizing: border-box;
}
.line-clamp-1 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.line-clamp-3 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
.line-clamp-4 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
}
.line-clamp-none {
  overflow: visible;
  display: block;
  -webkit-box-orient: horizontal;
  -webkit-line-clamp: none;
}
.block {
  display: block;
}
.inline-block {
  display: inline-block;
}
.inline {
  display: inline;
}
.flex {
  display: flex;
}
.inline-flex {
  display: inline-flex;
}
.table {
  display: table;
}
.grid {
  display: grid;
}
.contents {
  display: contents;
}
.hidden {
  display: none;
}
.aspect-square {
  aspect-ratio: 1 / 1;
}
.h-1 {
  height: 0.25rem;
}
.h-10 {
  height: 2.5rem;
}
.h-12 {
  height: 3rem;
}
.h-2 {
  height: 0.5rem;
}
.h-2\\.5 {
  height: 0.625rem;
}
.h-3 {
  height: 0.75rem;
}
.h-4 {
  height: 1rem;
}
.h-5 {
  height: 1.25rem;
}
.h-6 {
  height: 1.5rem;
}
.h-7 {
  height: 1.75rem;
}
.h-8 {
  height: 2rem;
}
.h-9 {
  height: 2.25rem;
}
.h-\\[2\\.6rem\\] {
  height: 2.6rem;
}
.h-auto {
  height: auto;
}
.h-full {
  height: 100%;
}
.min-h-\\[2\\.5rem\\] {
  min-height: 2.5rem;
}
.min-h-\\[40px\\] {
  min-height: 40px;
}
.w-0 {
  width: 0px;
}
.w-1 {
  width: 0.25rem;
}
.w-1\\/2 {
  width: 50%;
}
.w-10 {
  width: 2.5rem;
}
.w-12 {
  width: 3rem;
}
.w-2 {
  width: 0.5rem;
}
.w-2\\.5 {
  width: 0.625rem;
}
.w-20 {
  width: 5rem;
}
.w-28 {
  width: 7rem;
}
.w-3 {
  width: 0.75rem;
}
.w-3\\.5 {
  width: 0.875rem;
}
.w-3\\/5 {
  width: 60%;
}
.w-32 {
  width: 8rem;
}
.w-4 {
  width: 1rem;
}
.w-44 {
  width: 11rem;
}
.w-48 {
  width: 12rem;
}
.w-5 {
  width: 1.25rem;
}
.w-6 {
  width: 1.5rem;
}
.w-60 {
  width: 15rem;
}
.w-7 {
  width: 1.75rem;
}
.w-72 {
  width: 18rem;
}
.w-8 {
  width: 2rem;
}
.w-9 {
  width: 2.25rem;
}
.w-\\[2\\.6rem\\] {
  width: 2.6rem;
}
.w-auto {
  width: auto;
}
.w-fit {
  width: -moz-fit-content;
  width: fit-content;
}
.w-full {
  width: 100%;
}
.w-max {
  width: -moz-max-content;
  width: max-content;
}
.min-w-0 {
  min-width: 0px;
}
.min-w-20 {
  min-width: 5rem;
}
.min-w-\\[2\\.5rem\\] {
  min-width: 2.5rem;
}
.min-w-\\[6rem\\] {
  min-width: 6rem;
}
.min-w-full {
  min-width: 100%;
}
.max-w-\\[15rem\\] {
  max-width: 15rem;
}
.max-w-\\[80\\%\\] {
  max-width: 80%;
}
.max-w-full {
  max-width: 100%;
}
.max-w-lg {
  max-width: 32rem;
}
.max-w-max {
  max-width: -moz-max-content;
  max-width: max-content;
}
.flex-1 {
  flex: 1 1 0%;
}
.flex-none {
  flex: none;
}
.shrink-0 {
  flex-shrink: 0;
}
.flex-grow {
  flex-grow: 1;
}
.grow {
  flex-grow: 1;
}
.basis-1\\/2 {
  flex-basis: 50%;
}
.basis-8 {
  flex-basis: 2rem;
}
.-translate-x-1\\/2 {
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.-translate-y-1\\/2 {
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.translate-x-1\\/2 {
  --tw-translate-x: 50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.rotate-180 {
  --tw-rotate: 180deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.scale-100 {
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.scale-75 {
  --tw-scale-x: .75;
  --tw-scale-y: .75;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.transform {
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
@keyframes pulse {

  50% {
    opacity: .5;
  }
}
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes scaleUp {

  0% {
    transform: scale(0.7) translateY(150vh);
    opacity: 0.7;
  }

  100% {
    transform: scale(1) translateY(0px);
    opacity: 1;
  }
}
.animate-scaleUpModal {
  animation: scaleUp .5s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards;
}
@keyframes slideDown {

  0% {
    transform: translateY(0px);
    opacity: 1;
  }

  100% {
    transform: translateY(150vh);
    opacity: 0.7;
  }
}
.animate-slideDownModal {
  animation: slideDown .5s linear forwards;
}
@keyframes spin {

  to {
    transform: rotate(360deg);
  }
}
.animate-spin {
  animation: spin 1s linear infinite;
}
.cursor-pointer {
  cursor: pointer;
}
.resize-none {
  resize: none;
}
.list-none {
  list-style-type: none;
}
.appearance-none {
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
}
.grid-cols-\\[min-content_auto\\] {
  grid-template-columns: min-content auto;
}
.grid-cols-min-1fr {
  grid-template-columns: min-content 1fr;
}
.flex-row {
  flex-direction: row;
}
.flex-col {
  flex-direction: column;
}
.flex-wrap {
  flex-wrap: wrap;
}
.flex-nowrap {
  flex-wrap: nowrap;
}
.place-items-center {
  place-items: center;
}
.items-start {
  align-items: flex-start;
}
.items-center {
  align-items: center;
}
.items-baseline {
  align-items: baseline;
}
.justify-end {
  justify-content: flex-end;
}
.justify-center {
  justify-content: center;
}
.justify-between {
  justify-content: space-between;
}
.gap-0\\.5 {
  gap: 0.125rem;
}
.gap-1 {
  gap: 0.25rem;
}
.gap-2 {
  gap: 0.5rem;
}
.gap-3 {
  gap: 0.75rem;
}
.gap-4 {
  gap: 1rem;
}
.gap-8 {
  gap: 2rem;
}
.gap-x-1\\.5 {
  -moz-column-gap: 0.375rem;
       column-gap: 0.375rem;
}
.gap-x-2 {
  -moz-column-gap: 0.5rem;
       column-gap: 0.5rem;
}
.gap-x-4 {
  -moz-column-gap: 1rem;
       column-gap: 1rem;
}
.gap-y-0\\.5 {
  row-gap: 0.125rem;
}
.space-x-1\\.5 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.375rem * var(--tw-space-x-reverse));
  margin-left: calc(0.375rem * calc(1 - var(--tw-space-x-reverse)));
}
.divide-y > :not([hidden]) ~ :not([hidden]) {
  --tw-divide-y-reverse: 0;
  border-top-width: calc(1px * calc(1 - var(--tw-divide-y-reverse)));
  border-bottom-width: calc(1px * var(--tw-divide-y-reverse));
}
.divide-neutral > :not([hidden]) ~ :not([hidden]) {
  border-color: var(--atomic-neutral);
}
.self-start {
  align-self: flex-start;
}
.self-center {
  align-self: center;
}
.overflow-auto {
  overflow: auto;
}
.overflow-hidden {
  overflow: hidden;
}
.overflow-x-auto {
  overflow-x: auto;
}
.overflow-y-auto {
  overflow-y: auto;
}
.overflow-x-scroll {
  overflow-x: scroll;
}
.scroll-smooth {
  scroll-behavior: smooth;
}
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.whitespace-normal {
  white-space: normal;
}
.whitespace-nowrap {
  white-space: nowrap;
}
.whitespace-pre-wrap {
  white-space: pre-wrap;
}
.break-all {
  word-break: break-all;
}
.break-keep {
  word-break: keep-all;
}
.rounded {
  border-radius: var(--atomic-border-radius);
}
.rounded-\\[100\\%\\] {
  border-radius: 100%;
}
.rounded-full {
  border-radius: 9999px;
}
.rounded-lg {
  border-radius: var(--atomic-border-radius-lg);
}
.rounded-md {
  border-radius: var(--atomic-border-radius-md);
}
.rounded-none {
  border-radius: 0px;
}
.rounded-l-none {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}
.rounded-r-md {
  border-top-right-radius: var(--atomic-border-radius-md);
  border-bottom-right-radius: var(--atomic-border-radius-md);
}
.border {
  border-width: 1px;
}
.border-0 {
  border-width: 0px;
}
.border-b {
  border-bottom-width: 1px;
}
.border-l {
  border-left-width: 1px;
}
.border-r {
  border-right-width: 1px;
}
.border-t {
  border-top-width: 1px;
}
.border-solid {
  border-style: solid;
}
.border-neutral {
  border-color: var(--atomic-neutral);
}
.border-neutral-dark {
  border-color: var(--atomic-neutral-dark);
}
.border-primary {
  border-color: var(--atomic-primary);
}
.bg-\\[\\#F1F2FF\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(241 242 255 / var(--tw-bg-opacity));
}
.bg-background {
  background-color: var(--atomic-background);
}
.bg-error {
  background-color: var(--atomic-error);
}
.bg-neutral {
  background-color: var(--atomic-neutral);
}
.bg-neutral-dark {
  background-color: var(--atomic-neutral-dark);
}
.bg-neutral-light {
  background-color: var(--atomic-neutral-light);
}
.bg-primary {
  background-color: var(--atomic-primary);
}
.bg-transparent {
  background-color: transparent;
}
.bg-white {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}
.bg-gradient-to-l {
  background-image: linear-gradient(to left, var(--tw-gradient-stops));
}
.bg-gradient-to-r {
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}
.from-background-60 {
  --tw-gradient-from: var(--atomic-background) 60% var(--tw-gradient-from-position);
  --tw-gradient-to: rgb(255 255 255 / 0) var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}
.fill-current {
  fill: currentColor;
}
.stroke-\\[1\\.25\\] {
  stroke-width: 1.25;
}
.p-1 {
  padding: 0.25rem;
}
.p-2 {
  padding: 0.5rem;
}
.p-2\\.5 {
  padding: 0.625rem;
}
.p-3 {
  padding: 0.75rem;
}
.p-4 {
  padding: 1rem;
}
.p-6 {
  padding: 1.5rem;
}
.p-7 {
  padding: 1.75rem;
}
.p-8 {
  padding: 2rem;
}
.px-2 {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.px-2\\.5 {
  padding-left: 0.625rem;
  padding-right: 0.625rem;
}
.px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}
.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}
.px-6 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}
.px-9 {
  padding-left: 2.25rem;
  padding-right: 2.25rem;
}
.py-1 {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}
.py-1\\.5 {
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
}
.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.py-2\\.5 {
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
}
.py-3 {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}
.py-3\\.5 {
  padding-top: 0.875rem;
  padding-bottom: 0.875rem;
}
.py-4 {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.py-5 {
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
}
.py-\\[0\\.625rem\\] {
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
}
.pb-1 {
  padding-bottom: 0.25rem;
}
.pb-3 {
  padding-bottom: 0.75rem;
}
.pb-4 {
  padding-bottom: 1rem;
}
.pb-6 {
  padding-bottom: 1.5rem;
}
.pl-0 {
  padding-left: 0px;
}
.pl-1 {
  padding-left: 0.25rem;
}
.pl-10 {
  padding-left: 2.5rem;
}
.pl-3 {
  padding-left: 0.75rem;
}
.pl-9 {
  padding-left: 2.25rem;
}
.pr-2 {
  padding-right: 0.5rem;
}
.pr-24 {
  padding-right: 6rem;
}
.pr-6 {
  padding-right: 1.5rem;
}
.pt-0\\.5 {
  padding-top: 0.125rem;
}
.text-left {
  text-align: left;
}
.text-center {
  text-align: center;
}
.align-baseline {
  vertical-align: baseline;
}
.align-middle {
  vertical-align: middle;
}
.align-bottom {
  vertical-align: bottom;
}
.text-2xl {
  font-size: var(--atomic-text-2xl);
}
.text-base {
  font-size: var(--atomic-text-base);
}
.text-lg {
  font-size: var(--atomic-text-lg);
}
.text-sm {
  font-size: var(--atomic-text-sm);
}
.text-xl {
  font-size: var(--atomic-text-xl);
}
.text-xs {
  font-size: 0.75rem;
  line-height: 1rem;
}
.font-bold {
  font-weight: var(--atomic-font-bold);
}
.font-light {
  font-weight: 300;
}
.font-medium {
  font-weight: 500;
}
.font-normal {
  font-weight: var(--atomic-font-normal);
}
.font-semibold {
  font-weight: 600;
}
.italic {
  font-style: italic;
}
.leading-10 {
  line-height: 2.5rem;
}
.leading-4 {
  line-height: 1rem;
}
.leading-5 {
  line-height: 1.25rem;
}
.leading-6 {
  line-height: 1.5rem;
}
.leading-8 {
  line-height: 2rem;
}
.text-\\[\\#54698D\\] {
  --tw-text-opacity: 1;
  color: rgb(84 105 141 / var(--tw-text-opacity));
}
.text-error {
  color: var(--atomic-error);
}
.text-inherit {
  color: inherit;
}
.text-neutral {
  color: var(--atomic-neutral);
}
.text-neutral-dark {
  color: var(--atomic-neutral-dark);
}
.text-on-background {
  color: var(--atomic-on-background);
}
.text-on-primary {
  color: var(--atomic-on-primary);
}
.text-primary {
  color: var(--atomic-primary);
}
.text-success {
  color: var(--atomic-success);
}
.text-transparent {
  color: transparent;
}
.line-through {
  text-decoration-line: line-through;
}
.placeholder-neutral-dark::-moz-placeholder {
  color: var(--atomic-neutral-dark);
}
.placeholder-neutral-dark::placeholder {
  color: var(--atomic-neutral-dark);
}
.opacity-0 {
  opacity: 0;
}
.opacity-50 {
  opacity: 0.5;
}
.opacity-80 {
  opacity: 0.8;
}
.shadow {
  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.shadow-inner-primary {
  --tw-shadow: inset 0 0 0 1px var(--atomic-primary);
  --tw-shadow-colored: inset 0 0 0 1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.shadow-lg {
  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.outline-none {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.outline {
  outline-style: solid;
}
.outline-error {
  outline-color: var(--atomic-error);
}
.outline-neutral {
  outline-color: var(--atomic-neutral);
}
.outline-primary {
  outline-color: var(--atomic-primary);
}
.ring {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.ring-primary {
  --tw-ring-color: var(--atomic-primary);
}
.ring-ring-primary {
  --tw-ring-color: var(--atomic-ring-primary);
}
.filter {
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}
.transition {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.transition-opacity {
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.transition-visi-opacity {
  transition-property: visibility, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.duration-200 {
  transition-duration: 200ms;
}
.duration-300 {
  transition-duration: 300ms;
}
.ease-in-out {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
.no-outline.focus-visible.js-focus-visible, .js-focus-visible .no-outline.focus-visible {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.no-outline:focus-visible {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.accessibility-only {
    position: absolute;
    display: block;
    height: 0;
    overflow: hidden;
    margin: 0;
  }
.text-inherit {
    font-size: inherit;
  }
.cursor-inherit {
    cursor: inherit;
  }
.shadow-lg {
  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
    --tw-shadow: 0px 2px 8px rgba(229, 232, 232, 0.75);
}
.text-bg-primary {
    color: var(--atomic-primary);
    background: var(--atomic-primary-background);
  }
/*
 * \`line-clamp\` isn't supported yet, but \`-webkit-line-clamp\` is supported by all major browsers.
 */
/**
 * aspect-ratio doesn't work on Safari prior to v15.
 */
.ripple {
  position: absolute;
  pointer-events: none;
  transform: scale(0);
  border-radius: 50%;
  animation: ripple var(--animation-duration) linear;
}
.ripple-relative {
  position: relative;
}
.ripple-parent {
  overflow: hidden;
}
@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
/*
 * Sets a font size & its line height relative to it
 */
[part='generated-text'] {
  --font-size: var(--atomic-text-lg);
  font-size: var(--font-size);
  --line-height: calc(var(--font-size) * var(--atomic-line-height-ratio));
  line-height: var(--line-height);
}
[part='generated-text'].cursor::after {
    content: '';
    width: 8px;
    height: 1em;
    margin-left: 0.1em;
    background: var(--atomic-neutral-dark);
    display: inline-block;
    animation: cursor-blink 1.5s steps(2) infinite;
    vertical-align: text-bottom;
  }
[part='generated-text'] [part='answer-heading-1'] {
    font-size: var(--atomic-text-2xl);
  }
[part='generated-text'] [part='answer-heading-2'] {
    font-size: var(--atomic-text-xl);
  }
[part='generated-text'] [part='answer-heading-3'],
  [part='generated-text'] [part='answer-heading-4'],
  [part='generated-text'] [part='answer-heading-5'],
  [part='generated-text'] [part='answer-heading-6'] {
    font-size: var(--atomic-text-lg);
  }
[part='generated-text'] [part='answer-heading-1'],
  [part='generated-text'] [part='answer-heading-2'],
  [part='generated-text'] [part='answer-heading-3'],
  [part='generated-text'] [part='answer-heading-4'],
  [part='generated-text'] [part='answer-heading-5'],
  [part='generated-text'] [part='answer-heading-6'] {
  margin-bottom: 0.5rem;
  margin-top: 1rem;
    font-weight: var(--atomic-font-bold);
}
[part='generated-text'] [part='answer-paragraph'] {
  margin-bottom: 1.5rem;
}
[part='generated-text'] [part='answer-list-item'],
  [part='generated-text'] [part='answer-paragraph'],
  [part='generated-text'] [part='answer-quote-block'],
  [part='generated-text'] [part='answer-table-header'],
  [part='generated-text'] [part='answer-table-content'] {
  line-height: 1.5rem;
}
[part='generated-text'] [part='answer-strong'] {
    font-weight: var(--atomic-font-bold);
  }
[part='generated-text'] [part='answer-ordered-list'] {
  margin-bottom: 0.5rem;
  list-style-type: decimal;
  padding-inline-start: 2rem;
}
[part='generated-text'] [part='answer-unordered-list'] {
  margin-bottom: 0.5rem;
  list-style-type: disc;
  padding-inline-start: 2rem;
}
[part='generated-text'] [part='answer-inline-code'] {
  border-width: 1px;
  border-style: solid;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  padding-top: 0.125rem;
  padding-bottom: 0.125rem;
    color: var(--atomic-inline-code);
    font-size: var(--atomic-text-sm);
    background-color: var(--atomic-neutral-light);
    border-color: var(--atomic-neutral);
    border-radius: var(--atomic-border-radius);
}
[part='generated-text'] [part='answer-code-block'] {
  margin-top: 1rem;
  margin-bottom: 1rem;
  max-height: 24rem;
  overflow: auto;
  border-width: 1px;
  border-style: solid;
  padding: 0.5rem;
    background-color: var(--atomic-neutral-light);
    border-color: var(--atomic-neutral);
    border-radius: var(--atomic-border-radius-md);
    scrollbar-color: var(--atomic-neutral);

    color: var(--atomic-on-background);
    font-size: var(--atomic-text-sm);
}
[part='generated-text'] [part='answer-quote-block'] {
  margin-left: 4rem;
  margin-right: 4rem;
  font-style: italic;
}
[part='generated-text'] [part='answer-table-container'] {
  margin-bottom: 1.5rem;
  display: inline-block;
  max-height: 24rem;
  overflow: auto;
  border-width: 1px;
  border-style: solid;
    border-color: var(--atomic-neutral-dim);
    border-radius: var(--atomic-border-radius-md);
}
[part='generated-text'] [part='answer-table-container'] [part='answer-table-header'] {
  position: sticky;
  top: 0px;
}
[part='generated-text'] [part='answer-table'] {
    font-size: var(--atomic-text-base);
  }
[part='generated-text'] [part='answer-table'] thead [part='answer-table-header'] {
  padding: 1rem;
  text-align: left;
        background-color: var(--atomic-neutral);
        font-weight: var(--atomic-font-bold);
        border-bottom: solid 2px var(--atomic-neutral-dim);
        border-left: solid 1px var(--atomic-neutral-dim);
}
[part='generated-text'] [part='answer-table'] thead [part='answer-table-header']:first-of-type {
        border-left: none;
      }
[part='generated-text'] [part='answer-table'] tbody tr:nth-child(even) {
          background-color: var(--atomic-neutral-light);
        }
[part='generated-text'] [part='answer-table'] tbody tr [part='answer-table-content'] {
  padding: 1rem;
          border-left: solid 1px var(--atomic-neutral-dim);
          border-bottom: solid 1px var(--atomic-neutral-dim);
}
[part='generated-text'] [part='answer-table'] tbody tr [part='answer-table-content']:first-of-type {
          border-left: none;
        }
[part='generated-text'] [part='answer-table'] tbody tr:last-of-type [part='answer-table-content'] {
          border-bottom: unset;
        }
.feedback-buttons [part='feedback-button'] {
    width: 2.2rem;
    height: 2.2rem;
  }
.feedback-buttons [part='feedback-button'] atomic-icon {
    color: var(--atomic-neutral-dark);
  }
.feedback-buttons [part='feedback-button'].dislike {
      rotate: 180deg;
    }
.feedback-buttons [part='feedback-button']:hover.like atomic-icon, .feedback-buttons [part='feedback-button'].active.like atomic-icon {
    color: var(--atomic-success);
  }
.feedback-buttons [part='feedback-button']:hover.dislike atomic-icon, .feedback-buttons [part='feedback-button'].active.dislike atomic-icon {
    color: var(--atomic-error);
  }
.rephrase-with-text {
  padding: 0 8px;
  width: unset;
}
.rephrase-with-text [part='rephrase-button-label'] {
  margin-left: 0.5rem;
}
.rephrase-with-text:hover [part='rephrase-button-label'] {
  color: var(--atomic-primary);
}
.rephrase-with-text.active [part='rephrase-button-label'] {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}
[part='rephrase-button'] {
  --height: 1.5em;
  --icon-height: 1.1em;

  height: var(--height);
  width: var(--height);
  position: relative;
}
[part='rephrase-button'] .icon-container {
    width: var(--icon-height);
  }
[part='rephrase-button'] .icon-container atomic-icon {
      height: var(--icon-height);
      width: var(--icon-height);
      margin: 0;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
[part='rephrase-button']:hover .icon-container,
    [part='rephrase-button']:hover [part='rephrase-button-label'],
    [part='rephrase-button'].active .icon-container,
    [part='rephrase-button'].active [part='rephrase-button-label'] {
  color: inherit;
    font-size: inherit;
}
[part='rephrase-button']:hover {
  color: var(--atomic-primary);
}
[part='rephrase-button'].active {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
    background-color: var(--atomic-primary);
}
[part='rephrase-buttons'] > div {
  border-color: var(--atomic-neutral);
}
.typing-indicator {
  background-color: var(--atomic-primary-background);
  will-change: transform;
  width: auto;
  border-radius: 50px;
  padding: 8px 4px;
  display: table;
  margin: 0 auto;
  position: relative;
  animation: 2s bulge infinite ease-out;
}
.typing-indicator span {
  height: 8px;
  width: 8px;
  float: left;
  margin: 0 4px;
  background-color: var(--atomic-primary);
  display: block;
  border-radius: 50%;
  opacity: 0.4;
}
.typing-indicator span:nth-of-type(1) {
  animation: 1s blink infinite 0.3333s;
}
.typing-indicator span:nth-of-type(2) {
  animation: 1s blink infinite 0.6666s;
}
.typing-indicator span:nth-of-type(3) {
  animation: 1s blink infinite 0.9999s;
}
@keyframes blink {
  50% {
    opacity: 1;
  }
}
@keyframes bulge {
  50% {
    transform: scale(1.05);
  }
}
[part='copy-button'] .icon-container atomic-icon:hover {
        color: var(--atomic-primary);
      }
[part='copy-button'].copied .icon-container atomic-icon {
        color: var(--atomic-success);
      }
[part='copy-button'].error .icon-container atomic-icon {
        color: var(--atomic-error);
      }
@keyframes cursor-blink {
  0% {
    opacity: 0;
  }
}
[part='container'] {
  container-type: inline-size;
  contain: layout;
}
.footer {
  display: flex;
}
.footer .source-citations {
  margin-right: 0.5rem;
}
.footer [part='rephrase-buttons'] {
  margin-left: auto;
}
@container (max-width: 37.5rem) {
    .footer {
    flex-direction: column;
    gap: 1rem;
  }
    .footer .source-citations {
    margin-right: 0px;
  }
    .footer [part='rephrase-buttons'] {
    margin-left: 0px;
  }
    .footer [part='rephrase-button'] {
    flex: 1 1 auto;
    justify-content: center;
  padding: 0 8px;
  width: unset;
  }
    .footer [part='rephrase-button'] [part='rephrase-button-label'] {
    margin-left: 0.5rem;
  }
    .footer [part='rephrase-button']:hover [part='rephrase-button-label'] {
    color: var(--atomic-primary);
  }
    .footer [part='rephrase-button'].active [part='rephrase-button-label'] {
    --tw-text-opacity: 1;
    color: rgb(255 255 255 / var(--tw-text-opacity));
  }
    .footer [part='rephrase-button'] .icon-container {
    margin-left: 0px;
    margin-right: 0px;
  }
    .footer [part='rephrase-button-label'] {
    display: block;
  }
  }
@media not all and (min-width: 1024px) {
    .footer {
    flex-direction: column;
    gap: 1rem;
  }
    .footer .source-citations {
    margin-right: 0px;
  }
    .footer [part='rephrase-buttons'] {
    margin-left: 0px;
  }
    .footer [part='rephrase-button'] {
    flex: 1 1 auto;
    justify-content: center;
  padding: 0 8px;
  width: unset;
  }
    .footer [part='rephrase-button'] [part='rephrase-button-label'] {
    margin-left: 0.5rem;
  }
    .footer [part='rephrase-button']:hover [part='rephrase-button-label'] {
    color: var(--atomic-primary);
  }
    .footer [part='rephrase-button'].active [part='rephrase-button-label'] {
    --tw-text-opacity: 1;
    color: rgb(255 255 255 / var(--tw-text-opacity));
  }
    .footer [part='rephrase-button'] .icon-container {
    margin-left: 0px;
    margin-right: 0px;
  }
    .footer [part='rephrase-button-label'] {
    display: block;
  }
  }
@container (max-width: 25rem) {
    .footer {
    margin-top: 1rem;
  }
    .footer [part='rephrase-button-label'] {
    display: none;
  }
    .footer .feedback-buttons {
    position: relative;
    right: 0px;
    top: 0px;
  }
  }
@container (max-width: 37.5rem) {
    [part='generated-answer-footer'] {
    flex-direction: column;
    gap: 0.25rem;
  }
  }
@media not all and (min-width: 1024px) {
    [part='generated-answer-footer'] {
    flex-direction: column;
    gap: 0.25rem;
  }
  }
[part='generated-container'].answer-collapsed {
  position: relative;
  max-height: 16rem;
  overflow: hidden;
  --tw-content: '';
  content: var(--tw-content);
}
[part='generated-container'].answer-collapsed .feedback-buttons {
  display: none;
}
[part='generated-container'].answer-collapsed:before {
  position: absolute;
  left: 0px;
  top: 0px;
  height: 100%;
  width: 100%;
  --tw-content: '';
  content: var(--tw-content);
    background: linear-gradient(transparent 11.25rem, var(--atomic-background));
}
.is-collapsible {
  justify-content: space-between;
}
.is-collapsible [part='answer-show-button'] {
  display: flex;
}
.generating-label-visible [part='is-generating'] {
  display: flex;
}
.after\\:absolute::after {
  content: var(--tw-content);
  position: absolute;
}
.after\\:-bottom-0\\.5::after {
  content: var(--tw-content);
  bottom: -0.125rem;
}
.after\\:block::after {
  content: var(--tw-content);
  display: block;
}
.after\\:h-1::after {
  content: var(--tw-content);
  height: 0.25rem;
}
.after\\:w-full::after {
  content: var(--tw-content);
  width: 100%;
}
.after\\:rounded::after {
  content: var(--tw-content);
  border-radius: var(--atomic-border-radius);
}
.after\\:bg-primary::after {
  content: var(--tw-content);
  background-color: var(--atomic-primary);
}
.after\\:content-\\[\\'\\'\\]::after {
  --tw-content: '';
  content: var(--tw-content);
}
.focus-within\\:border-disabled:focus-within {
  border-color: var(--atomic-disabled);
}
.focus-within\\:border-primary:focus-within {
  border-color: var(--atomic-primary);
}
.focus-within\\:ring:focus-within {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.focus-within\\:ring-neutral:focus-within {
  --tw-ring-color: var(--atomic-neutral);
}
.focus-within\\:ring-ring-primary:focus-within {
  --tw-ring-color: var(--atomic-ring-primary);
}
.hover\\:border-error:hover {
  border-color: var(--atomic-error);
}
.hover\\:border-primary-light:hover {
  border-color: var(--atomic-primary-light);
}
.hover\\:bg-error:hover {
  background-color: var(--atomic-error);
}
.hover\\:bg-primary-light:hover {
  background-color: var(--atomic-primary-light);
}
.hover\\:bg-transparent:hover {
  background-color: transparent;
}
.hover\\:fill-white:hover {
  fill: #fff;
}
.hover\\:underline:hover {
  text-decoration-line: underline;
}
.hover\\:opacity-100:hover {
  opacity: 1;
}
.hover\\:shadow:hover {
  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.focus\\:opacity-100:focus {
  opacity: 1;
}
.focus\\:outline-none:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.focus-visible\\:border-error.focus-visible.js-focus-visible, .js-focus-visible .focus-visible\\:border-error.focus-visible {
  border-color: var(--atomic-error);
}
.focus-visible\\:border-error:focus-visible {
  border-color: var(--atomic-error);
}
.focus-visible\\:border-primary.focus-visible.js-focus-visible, .js-focus-visible .focus-visible\\:border-primary.focus-visible {
  border-color: var(--atomic-primary);
}
.focus-visible\\:border-primary:focus-visible {
  border-color: var(--atomic-primary);
}
.focus-visible\\:border-primary-light.focus-visible.js-focus-visible, .js-focus-visible .focus-visible\\:border-primary-light.focus-visible {
  border-color: var(--atomic-primary-light);
}
.focus-visible\\:border-primary-light:focus-visible {
  border-color: var(--atomic-primary-light);
}
.focus-visible\\:bg-error.focus-visible.js-focus-visible, .js-focus-visible .focus-visible\\:bg-error.focus-visible {
  background-color: var(--atomic-error);
}
.focus-visible\\:bg-error:focus-visible {
  background-color: var(--atomic-error);
}
.focus-visible\\:bg-neutral-light.focus-visible.js-focus-visible, .js-focus-visible .focus-visible\\:bg-neutral-light.focus-visible {
  background-color: var(--atomic-neutral-light);
}
.focus-visible\\:bg-neutral-light:focus-visible {
  background-color: var(--atomic-neutral-light);
}
.focus-visible\\:bg-primary-light.focus-visible.js-focus-visible, .js-focus-visible .focus-visible\\:bg-primary-light.focus-visible {
  background-color: var(--atomic-primary-light);
}
.focus-visible\\:bg-primary-light:focus-visible {
  background-color: var(--atomic-primary-light);
}
.focus-visible\\:ring-2.focus-visible.js-focus-visible, .js-focus-visible .focus-visible\\:ring-2.focus-visible {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.focus-visible\\:ring-2:focus-visible {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.group:hover .group-hover\\:visible {
  visibility: visible;
}
.group:hover .group-hover\\:text-primary {
  color: var(--atomic-primary);
}
.group:hover .group-hover\\:text-primary-light {
  color: var(--atomic-primary-light);
}
.group:focus .group-focus\\:text-primary {
  color: var(--atomic-primary);
}
.group:focus .group-focus\\:text-primary-light {
  color: var(--atomic-primary-light);
}
.peer:hover ~ .peer-hover\\:text-error {
  color: var(--atomic-error);
}
@media (min-width: 1024px) {

  .desktop-only\\:flex {
    display: flex;
  }
}
@media not all and (min-width: 1024px) {

  .mobile-only\\:hidden {
    display: none;
  }

  .mobile-only\\:h-10 {
    height: 2.5rem;
  }

  .mobile-only\\:h-2 {
    height: 0.5rem;
  }

  .mobile-only\\:h-3 {
    height: 0.75rem;
  }

  .mobile-only\\:w-10 {
    width: 2.5rem;
  }

  .mobile-only\\:w-2 {
    width: 0.5rem;
  }

  .mobile-only\\:w-3 {
    width: 0.75rem;
  }
}
`,d=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},f=class{constructor(t){e(this,t),this.copied=!1,this.copyError=!1,this.answerStyle=`default`,this.maxCollapsedHeight=250,this.onGeneratedAnswerStateUpdate=()=>{this.generatedAnswerState.isVisible!==this.generatedAnswerCommon?.data?.isVisible&&(this.generatedAnswerCommon.data={...this.generatedAnswerCommon.data,isVisible:this.generatedAnswerState.isVisible},this.generatedAnswerCommon.writeStoredData(this.generatedAnswerCommon.data)),this.setAriaMessage(this.generatedAnswerCommon.getGeneratedAnswerStatus())},this.setCopied=e=>{this.copied=e},this.setCopyError=e=>{this.copyError=e},this.setAriaMessage=e=>{this.ariaMessage=e},this.generatedAnswerState=void 0,this.searchStatusState=void 0,this.error=void 0,this.copied=!1,this.copyError=!1,this.answerStyle=`default`,this.withToggle=void 0,this.collapsible=void 0,this.withRephraseButtons=void 0,this.answerConfigurationId=void 0}initialize(){if(this.generatedAnswerCommon=new l({host:this.host,withToggle:this.withToggle,collapsible:this.collapsible,withRephraseButtons:this.withRephraseButtons,getGeneratedAnswer:()=>this.generatedAnswer,getGeneratedAnswerState:()=>this.generatedAnswerState,getSearchStatusState:()=>this.searchStatusState,getBindings:()=>this.bindings,getCopied:()=>this.copied,setCopied:this.setCopied,getCopyError:()=>this.copyError,setCopyError:this.setCopyError,setAriaMessage:this.setAriaMessage,buildInteractiveCitation:e=>c(this.bindings.engine,e)}),this.generatedAnswer=s(this.bindings.engine,{initialState:{isVisible:this.generatedAnswerCommon.data.isVisible,responseFormat:{answerStyle:this.answerStyle,contentFormat:[`text/markdown`,`text/plain`]}},...this.answerConfigurationId&&{answerConfigurationId:this.answerConfigurationId}}),this.searchStatus=o(this.bindings.engine),this.generatedAnswerCommon.insertFeedbackModal(),window.ResizeObserver&&this.collapsible){let e=n(()=>this.adaptAnswerHeight(),100);this.resizeObserver=new ResizeObserver(e),this.resizeObserver.observe(this.host)}}updateAnswerCollapsed(e,t){let n=e.expanded;if(n!==(t?t.expanded:void 0)){let e=this.getAnswerContainer();if(!e)return;this.toggleClass(e,`answer-collapsed`,!n)}}disconnectedCallback(){var e;(e=this.resizeObserver)==null||e.disconnect()}toggleClass(e,t,n){e.classList.toggle(t,n)}adaptAnswerHeight(){this.fullAnswerHeight=((this.host?.shadowRoot)?.querySelector(`[part="generated-text"]`))?.getBoundingClientRect().height,this.updateAnswerHeight()}getAnswerContainer(){return(this.host?.shadowRoot)?.querySelector(`[part="generated-container"]`)}getAnswerFooter(){return(this.host?.shadowRoot)?.querySelector(`[part="generated-answer-footer"]`)}updateAnswerHeight(){let e=this.getAnswerContainer(),t=this.getAnswerFooter();!e||!t||(this.fullAnswerHeight>this.maxCollapsedHeight?(this.toggleClass(e,`answer-collapsed`,!this.generatedAnswerState.expanded),this.toggleClass(t,`is-collapsible`,!0),this.toggleClass(t,`generating-label-visible`,this.generatedAnswerState.isStreaming)):(this.toggleClass(e,`answer-collapsed`,!1),this.toggleClass(t,`is-collapsible`,!1),this.toggleClass(t,`generating-label-visible`,!1)))}render(){return this.generatedAnswerCommon.render()}get host(){return t(this)}static get watchers(){return{generatedAnswerState:[`updateAnswerCollapsed`]}}};d([i()],f.prototype,`bindings`,void 0),d([a(`generatedAnswer`,{onUpdateCallbackMethod:`onGeneratedAnswerStateUpdate`})],f.prototype,`generatedAnswerState`,void 0),d([a(`searchStatus`)],f.prototype,`searchStatusState`,void 0),d([r(`generated-answer`)],f.prototype,`ariaMessage`,void 0),f.style=u;export{f as atomic_generated_answer};