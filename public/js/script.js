document.addEventListener("DOMContentLoaded", () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(el => {
      el.addEventListener("click", () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }

  const calendars = bulmaCalendar.attach('[type="date"]');

  // Workaround to avoid submit form when click clear button
  document
    .querySelectorAll("button.datetimepicker-clear-button")
    .forEach(button => {
      button.setAttribute("type", "button");
    });

  // // Loop on each calendar initialized
  // for (var i = 0; i < calendars.length; i++) {
  //   // Add listener to date:selected event calendars[i].on('date:selected',
  //   date => {
  //     console.log(date);
  //   };
  // }
  window.calendars = calendars;
});
