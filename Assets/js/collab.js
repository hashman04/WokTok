let eventList = [];

// Function to display events in the dashboard
function displayEvents() {
  const eventListElement = document.getElementById('eventList');
  eventListElement.innerHTML = '';
  eventList.forEach(event => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${event.name} - ${event.date} - ${event.location}</span>
      <img src="${event.banner}" alt="Event Banner" style="max-width: 100px; max-height: 100px;">
    `;
    eventListElement.appendChild(li);
  });
}

// Function to add event
function addEvent(name, date, location, banner) {
  eventList.push({ name: name, date: date, location:location, banner: URL.createObjectURL(banner) });
  displayEvents();
  saveEventsToLocalStorage();
}

// Function to remove event
function removeEvent(name) {
  eventList = eventList.filter(event => event.name !== name);
  displayEvents();
  saveEventsToLocalStorage();
}

// Function to update event
function updateEvent(name, newDate, newLocation, newBanner) {
  eventList.forEach(event => {
    if (event.name === name) {
      event.date = newDate,
      event.location = newLocation,
      event.banner = newBanner ? URL.createObjectURL(newBanner) : event.banner;
    }
  });
  displayEvents();
  saveEventsToLocalStorage();
}

function saveEventsToLocalStorage() {
  localStorage.setItem('events', JSON.stringify(eventList));
}

// Function to load events from Local Storage
function loadEventsFromLocalStorage() {
  const storedEvents = localStorage.getItem('events');
  if (storedEvents) {
    eventList = JSON.parse(storedEvents);
    displayEvents();
  }
}

// Load events from Local Storage when the page loads
window.addEventListener('load', loadEventsFromLocalStorage);

// Event listener for add event form submission
document.getElementById('addEventForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const eventName = document.getElementById('eventName').value;
  const eventDate = document.getElementById('eventDate').value;
  const eventLocation = document.getElementById('eventLocation').value;
  const eventBanner = document.getElementById('eventBanner').files[0];
  if (eventBanner && eventBanner.size > 2 * 1024 * 1024) {
      alert('Banner size should be less than 2MB');
      return;
    }
  addEvent(eventName, eventDate,eventLocation, eventBanner);
  this.reset();
});

// Event listener for remove event form submission
document.getElementById('removeEventForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const eventName = document.getElementById('removeEventName').value;
  removeEvent(eventName);
  this.reset();
});

// Event listener for update event form submission
document.getElementById('updateEventForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const eventName = document.getElementById('updateEventName').value;
  const newDate = document.getElementById('newEventDate').value;
  const newLocation = document.getElementById('neweventLocation').value;
  const newBanner = document.getElementById('neweventBanner').files[0];
  if (eventBanner && eventBanner.size > 2 * 1024 * 1024) {
      alert('Banner size should be less than 2MB');
      return;
    }
  updateEvent(eventName, newDate, newLocation, newBanner);
  this.reset();
});

// Initially display events in the dashboard
displayEvents();
    const navItems = document.querySelectorAll('.nav-item');
    const contents = document.querySelectorAll('.content');

    navItems.forEach(item => {
      item.addEventListener('click', function() {
        // Remove active class from all nav items
        navItems.forEach(navItem => {
          navItem.classList.remove('active');
        });
        
        // Add active class to clicked nav item
        this.classList.add('active');

        // Hide all content
        contents.forEach(content => {
          content.classList.remove('active');
        });
        
        // Show content corresponding to clicked nav item
        const contentId = this.getAttribute('id') + 'Content';
        const content = document.getElementById(contentId);
        content.classList.add('active');
      });
    });