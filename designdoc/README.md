# Pre-development

1. Started by stating out requirements for the UI:
    - Login
    - Each event:
      - name
      - event type
      - start & end time
      - description (truncated)
      - Show more (expand):
        - extended description
        - speakers
        - related events
    - Sorting:
      - by time
      - Bonus: search for name
      - Bonus: by event type
      - Bonus: event reordering, persist across refresh
2. Research existing solutions:
    - Luma (very cutesy, modular, notion vibes)
    - Eventbrite (basic, kinda ugly)
    - Meetup (eventbrite copy, but cuter, more sketchy)
3. Synthesize themes:
    - I want something that has the "sketching" aesthetics Meetup features, but a cooler, modern vibe like Luma.
    - Sharp rectangular sketched frames for each event
    - Doodly but still readable font
    - White/paper background, pops of color, not too colorful though
    - Bonus: bubbly color animation on hover
4. Design!

    Initial sketches:</br>

    **Styles:**</br>
    ![alt text](image.png)

    Figma prototypes:</br>
    ![alt text](image-1.png)![alt text](image-2.png)![alt text](image-3.png)![alt text](image-4.png)

# Initial Setup

I decided to use React + Tailwind.

**Create standard classes for easy Tailwind**
```css
  --white: #FFF6EF;
  --black: #1C1C1C;
  --gray-1: #5F5F5F;
  --gray-2: #A2A298;
  --blue: #7D97FF;
  --red: #FFAFAF;
  --yellow: #FFDB5C;
  --green: #87EEAE;

  .hero-title {
    font-family: "Londrina Solid", sans-serif;
    font-weight: 900;
    font-size: 8rem;
  }

  .title {
    font-family: "Londrina Solid", sans-serif;
    font-size: 3rem;
  }

  .big-text {
    font-family: "Patrick Hand", cursive;
    font-size: 2rem;
  }

  .normal-text {
    font-family: "Patrick Hand", cursive;
    font-size: 1.5rem;
  }

  .small-text {
    font-family: "Patrick Hand", cursive;
    font-size: 1rem;
  }
```

# Development

I started by creating a basic skeleton of the site using AI, feeding it my Figma designs as a reference. I was able to get this:
![alt text](image-5.png)

This was far from what I envisioned for this site. Here's what I needed to work on next:
1. Fix the styling for each of the cards
2. Allow collapse & expand
3. Separate by date

Some things I also wanted to optimize were:
1. Minimize GraphQL re-fetch on reload
2. Persistent login across reload

## Component Development
### Event cards!
![alt text](image-6.png)

Putting it all together:
![alt text](image-7.png)

After staring at it for a bit, the round edges became a more appealing idea:
![alt text](image-10.png)

### Login Page

I started by hardcoding the login credentials and used a "useAuth" hook to validate login status. It started off by being really simple comparison: "does the username & password matching hardcoded values?" The login was a simple button at top right, where it pops up a window on click.

![alt text](image-8.png)

I also added error checking & disabled the button if the input is not filled.

### Hero Page
![alt text](image-9.png)

I wanted something simple and clutter free. Also, I'm a fan of the scroll hinting animations a lot of sites so I implemented that with the bottom arrow using Motion.

## Problems I Came Across

### Related Events Scrolling
When clicking on "related events" and scrolling up to them, the header would appear and obstruct the view. I ended up having to suppress the header and adding idle frames when scrolling using the eventCards.

However, this also felt unatrual when scrolling down. It made more sense to hide the header on down scroll and keep it hidden on up scroll. The solution was to use `id` as a comparison for up vs. down scroll and setting idle frames accordingly. 

Initially, the related event would animate a "pop" after arriving. But this looked awkward. Instead, I decided to simply expand the box after landing. This meant passing in an argument into `EventCard.jsx` to forcibly expand it.

### Hero Doodle Placements
Since the doodles are placed absolutely, it's very hard to get it placed responsively along with the text. I decided to disable it on smaller screens for the time being because it would be a lot of work. There are definitely more important priorities, but it's worth coming back to if given more time...

## Responsiveness

### Text
Only the hero text really had to be resized. I split it into 3 different sizes:
```css
@media (max-width: 640px) {
  .hero-title {
    font-size: 7rem;
  }
  .hero-text {
    font-size: 4rem;
  }
}

@media (max-width: 580px) {
  .hero-title {
    font-size: 5.75rem;
  }
  .hero-text {
    font-size: 3.5rem;
  }
}
```

![alt text](image-11.png)

For all other text, I made them somewhat smaller to decrease clutter on smaller screens. For large screens, I added max-width to the cards. This was the only necessary change since everything was already centered.

## Bonuses

Other fun functionalities I added :)

### Event Type Filtering
Since the fetch & sorting happens in `App.jsx`, I added a dropdown to also filter events by type in addition to permissions. 

Keeping scalability in mind, the event types in the dropdown are generated dynamically from the data.

![alt text](image-12.png)

I also realized private-only filtering might also be useful, so I implemented that as well.

### Event Calendar
Huge fan of seeing timelines visually displayed on actual calendars to see overlaps, so I knew I had to implement a calendar! Since this is a 2-day hackathon, the default time window was 2 days displayed over 24 hours. I chose to use the [FullCalendar](https://fullcalendar.io/) library to simplify creating this from scratch. The view had to be locked onto just the 2 days unfortunately because the way the data is in the endpoint, there's a huge gap between the 2 days and then the rest of the events.

Something cool I learned while working on this is React Fragments.

Initial iteration:
![alt text](image-13.png)
![alt text](image-14.png)

Clearly a lot of work to be done on the UI.

![alt text](image-16.png)

Combined with the event list:
![alt text](image-17.png)

I also wanted the function to export events onto Google & Outlook calendars. Decided to display this in the expanded list view as 2 different buttons:
![alt text](image-18.png)

