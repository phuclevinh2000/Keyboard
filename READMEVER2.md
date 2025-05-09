# Submittion for coding challenge IQM - Phuc

# T(ype)9 — T9 Word Search Application

An interactive T9 keyboard word search tool inspired by classic mobile keypads and mechanical stream deck keyboards. This app allows users to search for words using a virtual T9 layout — styled differently for desktop and mobile experiences.

# Overview

T(ype)9 is a frontend project developed for the IQM coding challenge. It features a custom virtual keyboard UI and implements T9-style input logic. The desktop version mimics a mechanical keyboard, while the mobile version provides a digital keypad interface.

# Set up

- The app can be launched with `docker compose up`. and then using `http://localhost:5173/`
- After the app is lauched, more infomation of how to use it can be see when pressing the "?" button next to the title of the application
- If you want to develope the front end part, you can access to front end, and then run `npm install`

# Testing

Testing can be done in the frontend directory by `cd frontend` => `npm run test`.

🧰 Tech Stack

- React – UI framework
- Material UI – Components and design system
- React-Toastify – Toast notifications
- Sass (SCSS) – Styling
- Axios – API communication
- Lodash – Utility functions
- React-Spinners – Loading indicators
- Jest, React Testing - Testing
- Docker

# Architecture

├── components/ # Core UI components and logic
├── assets/ # Icons, images, and media assets
├── styles/ # Global SCSS variables
├── utils/ # Function
├── hooks/ # Keyboard handler hook

Styling is mostly colocated with components for ease of maintenance.
Shared components (e.g., Error, Loading) are currently inline but can be modularized if the app scales.

# Trade-offs

- Spent more time optimizing for large screens; mobile UI could be improved further.
- Mouse interactions on the keyboard are disabled by design — this might feel limiting for some users, but it's intentional to stay true to the typing-only concept.
- CSS could benefit from further optimization and modularity due to its complexity.
- I think the testing can be better.

# Features

- Dark Mode: Theme preference is saved in localStorage to persist across sessions.
- Error Handling & Reload: Toast messages for known/unknown errors and a reload button.
- Interactive T9 Keyboard: Custom-built, inspired by this video.
- Input Validation: Max input length: 50 characters (to match backend limits), input cannot start with 0 (invalid for backend, maybe I should do same for the number 1)

# What can be better

- If we implement the way that user knows exact what character has been matched, for example if they wrote 466, then the character "gon" from "gone" will be highlight, that would be great (Just like in Iphone keypad)

# Final words

- Thank you IQM for giving me a chance to test my skills, I am really appreciate this oppotunities and your time
- The whole coding progress was from about 17:00 14/4/2025 until about 15:20 17/4/2025.

# Reference

- Thank you a lot for the good instruction video of merchanical keyboard ui, it give me some idea of how I will do the assignment: https://youtube.com/shorts/PAfmNtdbIjg?si=pbieLO7g0I-hMBch
- Very good document from the libraries that I used, help me save a lot of times
- Thank you ChatGPT that has help me answering some logic related to code, and help me choosing the color palete of the app
- Docker set up for vite instruction: https://thedkpatel.medium.com/dockerizing-react-application-built-with-vite-a-simple-guide-4c41eb09defa
- Jest set up for Vite: https://dev.to/teyim/effortless-testing-setup-for-react-with-vite-typescript-jest-and-react-testing-library-1c48
