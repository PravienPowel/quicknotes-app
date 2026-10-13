# QuickNotes

QuickNotes is a small note-taking web app I built with plain HTML, CSS and JavaScript. You type a note, pick a category (Personal, Work or Study), and it shows up as a card. Your notes are saved in the browser, so they are still there after a refresh.

## Features

- Add notes with a category
- Delete notes
- Search notes as you type (capital letters don't matter)
- Error messages for empty notes and notes over 200 characters
- Note count that says "no notes", "1 note" or "N notes" correctly
- Notes are saved in localStorage
- Each category has its own coloured border
- Works on small screens

## How to run it

There is nothing to install.

1. Download the project (green **Code** button, then **Download ZIP**) and unzip it, or clone it with git.
2. Open the folder and double-click `index.html`.
3. The app opens in your browser.

## What I learned

- How to select elements and change the page with JavaScript (`querySelector`, `createElement`, `textContent`).
- Why I should use `textContent` and not `innerHTML` for text the user types.
- How to keep data in an array and redraw the list with one `render()` function every time it changes.
- How to save and load data with `localStorage`, `JSON.stringify` and `JSON.parse`.
- How to use Flexbox for the form and a media query to stack it on small screens.
