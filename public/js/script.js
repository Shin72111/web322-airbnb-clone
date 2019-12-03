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

  const rememberLogin = document.querySelector("#remember-text");
  if (rememberLogin !== null) {
    rememberLogin.addEventListener("click", () => {
      document
        .querySelector('input[name="remember"]')
        .toggleAttribute("checked");
    });
  }
});

const configGuestBtn = () => {
  const update_display = () => {
    const adult_no = parseInt(document.querySelector(`#adult-num`).innerHTML);
    const children_no = parseInt(
      document.querySelector(`#children-num`).innerHTML
    );

    let display;
    if (adult_no > 0) {
      display = `${adult_no} adults`;
      if (children_no > 1) {
        display += `, ${children_no} children`;
      } else if (children_no == 1) {
        display += `, 1 child`;
      }
    } else {
      display = "Guests";
    }

    document.querySelector("#guest-display").innerHTML = display;
  };

  const change_no = (no_id, no_input_id, change) => {
    const no_el = document.querySelector(`#${no_id}`);
    let no = parseInt(no_el.innerHTML) + change;
    no = no < 0 ? 0 : no;
    document.querySelector(`#${no_input_id}`).value = no;
    no_el.innerHTML = no;
    update_display();
    return no;
  };

  const minus_adults_btn = document.querySelector("#minus-adult-btn");
  const minus_children_btn = document.querySelector("#minus-children-btn");

  minus_adults_btn.addEventListener("click", () => {
    const no = change_no("adult-num", "adults", -1);
    if (no == 0) {
      minus_adults_btn.setAttribute("disabled", "");
      minus_children_btn.setAttribute("disabled", "");
      while (change_no("children-num", "children", -1) != 0);
    }
  });

  document.querySelector("#plus-adult-btn").addEventListener("click", () => {
    change_no("adult-num", "adults", 1);
    minus_adults_btn.removeAttribute("disabled");
  });

  minus_children_btn.addEventListener("click", () => {
    const no = change_no("children-num", "children", -1);
    if (no == 0) {
      minus_children_btn.setAttribute("disabled", "");
    }
  });
  document.querySelector("#plus-children-btn").addEventListener("click", () => {
    const adult_no = change_no("adult-num", "adults", 0);
    if (adult_no == 0) {
      change_no("adult-num", "adults", 1);
      minus_adults_btn.removeAttribute("disabled");
    }
    change_no("children-num", "children", 1);
    minus_children_btn.removeAttribute("disabled");
  });
};

const configGuestDropDown = () => {
  const dropdown = document.querySelector(".dropdown-trigger.book-dropdown");
  if (dropdown !== null) {
    configGuestBtn();
    dropdown.addEventListener("click", () => {
      // Get the target from the "data-target" attribute
      const target = document.querySelector(".dropdown.book-dropdown");
      target.classList.toggle("is-active");
    });
  }
};

configGuestDropDown();

const fileInput = document.querySelector("input[type=file]");
if (fileInput) {
  fileInput.onchange = () => {
    if (fileInput.files.length > 0) {
      const fileName = document.querySelector(".file-name");
      fileName.textContent = fileInput.files[0].name;
    }
  };
}

const searchRoom = document.querySelector("#searchRoom");

if (searchRoom) {
  const select = document.querySelector("#searchRoom select");
  select.addEventListener("change", () => {
    if (select.value == "select") {
      select.value = "";
    }
    searchRoom.submit();
  });
}
