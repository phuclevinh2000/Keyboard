# Coding challenge for Frontend Developer position

## Overview

In this assignment, you'll be creating a frontend application that integrates with a provided backend service. 
The backend implements a T9 word-matching service that converts numeric input (like on old mobile phone keypads) into possible word matches.

![T9 Keypad](t9-keypad.png "T9 Keypad") 

## Backend Service

We've provided a complete backend implementation, which provides 2 API endpoints for T9 word searching functionality (see example requests in `api.http`).
The backend service operates a dictionary of about 10.000 words, which you can find in `backend/src/words.txt`.
It can be launched with `docker compose up`.

The business logic behind those endpoints is as follows: 

For instance, imagine you have the following words in your vocabulary:
"gone", "hoof" and "inoffensive". The characters in these three words,
when translated through the T9 keypad layout, would give the decimal
sequences "4663", "4663" and "46633367483", respectively.

Then,
- In strict matching mode, the endpoint `http://localhost:3001/search/exact/4663` yields the word list "gone", "hoof".
- In prefix matching mode, the endpoint `http://localhost:3001/search/prefix/4663` yields the word list "gone", "hoof",
  and "inoffensive".

## Assignment Part #1: Frontend service implementation

Create a web UI that integrates with the provided backend service and has the following features:

  - A text input field that accepts only digits
  - Supports both strict and prefix matching modes:
    - Default (prefix matching): Show all words that start with the T9 encoded sequence
    - Strict matching (triggered by adding '0' at the end): Show only words that exactly match the T9 encoded sequence
  - Displays the list of words matching any non-empty sequence of digits typed into the textbox

Create a Dockerfile for your application and update `docker-compose.yml`, so that `docker compose up` starts both apps.

## Part #2: User experience

Ensure that your application
- Is user-friendly and responsive, displaying correctly on a mobile and desktop browser
- Handles negative scenarios well: performs input validation, has loading state and error handling
  - Our backend intentionally produces some errors, which the UI should handle gracefully. 
    You can find out more about them in the backend source code or just by querying the API repeatedly.

## Part #3: Best practices & optional features

We would love to see you applying best practices in software engineering and frontend development:
- Use a modern frontend framework (React, Vue, Angular, or similar)
- Have unit tests for key functionality
- Implement clean component architecture, use proper state management

And optionally, you may add some of the following features or even come up with your own ideas:
- Add an interactive old-school keypad to the UI
- Use a component library (such as Mantine, Material UI, etc.)
- Dark/light mode toggle with persistent user preference

## Submission Guidelines

- Do *not* deploy this to anywhere, and do *not* put your source files
  to any public service, e.g. GitHub.
- Submit your solution as an archive containing all source files
  - Please ensure the `node_modules` and `backend/target` directories are excluded
- Include a README.md with:
  - Setup and run instructions
  - Explanation of your technical choices and architecture
  - Any assumptions or trade-offs you made
  - List of implemented bonus features (if any)
