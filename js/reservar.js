"use strict";

(() => {

  const PENDING_EVENT_KEY =
    "nourPendingEvent";

  const RESERVATION_KEY =
    "nourReservation";

  const events = {

    "sostener-la-calma": {

      id:
        "sostener-la-calma",

      title:
        "Sostener la calma",

      titleLines: [
        "Sostener",
        "la calma"
      ],

      type:
        "Club de lectura",

      date:
        "23/09/2026",

      time:
        "19:00",

      place:
        "NOUR",

      capacity:
        12,

      price:
        "GRATUITO",

      description:
        "Una conversación alrededor del tiempo, la atención " +
        "y las maneras de resistir a la velocidad cotidiana."

    },

    "de-donde-vienen-las-ideas": {

      id:
        "de-donde-vienen-las-ideas",

      title:
        "¿De dónde vienen las ideas?",

      titleLines: [
        "¿De dónde vienen",
        "las ideas?"
      ],

      type:
        "Micro abierto",

      date:
        "30/09/2026",

      time:
        "19:30",

      place:
        "NOUR",

      capacity:
        24,

      price:
        "GRATUITO",

      description:
        "Una conversación sobre los lugares, procesos y momentos desde los que empiezan las ideas."

    },

    "cafe-origen-y-proceso": {

      id:
        "cafe-origen-y-proceso",

      title:
        "Café, origen y proceso",

      titleLines: [
        "Café, origen",
        "y proceso"
      ],

      type:
        "Taller",

      date:
        "07/10/2026",

      time:
        "18:30",

      place:
        "NOUR",

      capacity:
        10,

      price:
        "GRATUITO",

      description:
        "Una sesión para acercarse al café desde el origen hasta la taza " +
        "y comprender lo que sucede antes del primer sorbo."

    }

  };

  const DEFAULT_EVENT_ID =
    "sostener-la-calma";

  const dateElement =
    document.querySelector(
      "#reservation-event-date"
    );

  const dayElement =
    document.querySelector(
      "#reservation-event-day"
    );

  const monthElement =
    document.querySelector(
      "#reservation-event-month"
    );

  const typeElement =
    document.querySelector(
      "#reservation-event-type"
    );

  const titleElement =
    document.querySelector(
      "#reservation-event-title"
    );

  const descriptionElement =
    document.querySelector(
      "#reservation-event-description"
    );

  const timeElement =
    document.querySelector(
      "#reservation-event-time"
    );

  const capacityElement =
    document.querySelector(
      "#reservation-event-capacity"
    );

  const priceElement =
    document.querySelector(
      "#reservation-event-price"
    );

  const formEventTitle =
    document.querySelector(
      "#reservation-form-event-title"
    );

  const form =
    document.querySelector(
      "#reservation-form"
    );

  const seatsInput =
    document.querySelector(
      "#reservation-seats"
    );

  const confirmButton =
    document.querySelector(
      ".reservation-form__submit"
    );

  function readPendingEvent() {

    try {

      const stored =
        localStorage.getItem(
          PENDING_EVENT_KEY
        );

      if (!stored) {
        return null;
      }

      const parsed =
        JSON.parse(
          stored
        );

      if (
        !parsed ||
        typeof parsed !== "object"
      ) {
        return null;
      }

      return parsed;

    } catch {

      return null;

    }

  }

  function savePendingEvent(event) {

    try {

      localStorage.setItem(
        PENDING_EVENT_KEY,
        JSON.stringify({
          id: event.id,
          title: event.title,
          type: event.type,
          date: event.date,
          time: event.time,
          capacity: event.capacity
        })
      );

    } catch {

      /* La página continúa funcionando. */

    }

  }

  function getEventFromUrl() {

    const params =
      new URLSearchParams(
        window.location.search
      );

    const eventId =
      params.get(
        "evento"
      );

    if (
      eventId &&
      events[eventId]
    ) {
      return events[eventId];
    }

    return null;

  }

  function getSelectedEvent() {

    const urlEvent =
      getEventFromUrl();

    if (urlEvent) {
      return urlEvent;
    }

    const pendingEvent =
      readPendingEvent();

    if (
      pendingEvent?.id &&
      events[pendingEvent.id]
    ) {

      return {
        ...events[pendingEvent.id],
        ...pendingEvent,

        titleLines:
          events[pendingEvent.id]
            .titleLines,

        description:
          events[pendingEvent.id]
            .description,

        place:
          events[pendingEvent.id]
            .place,

        price:
          events[pendingEvent.id]
            .price
      };

    }

    return events[
      DEFAULT_EVENT_ID
    ];

  }

  const selectedEvent =
    getSelectedEvent();

  function getDateParts(date) {

    const parts =
      String(
        date || ""
      ).split("/");

    return {
      day:
        parts[0] || "23",

      month:
        parts[1] || "09",

      year:
        parts[2] || "2026"
    };

  }

  function getIsoDate(date) {

    const {
      day,
      month,
      year
    } =
      getDateParts(
        date
      );

    return `${year}-${month}-${day}`;

  }

  function createFallbackTitleLines(
    title
  ) {

    const words =
      String(
        title
      )
        .trim()
        .split(/\s+/);

    if (
      words.length <= 1
    ) {
      return [
        title,
        ""
      ];
    }

    const middle =
      Math.ceil(
        words.length / 2
      );

    return [
      words
        .slice(
          0,
          middle
        )
        .join(" "),

      words
        .slice(
          middle
        )
        .join(" ")
    ];

  }

  function renderTwoLineTitle(
    element,
    event
  ) {

    if (!element) {
      return;
    }

    const lines =
      Array.isArray(
        event.titleLines
      ) &&
      event.titleLines.length === 2
        ? event.titleLines
        : createFallbackTitleLines(
            event.title
          );

    element.replaceChildren();

    lines.forEach(
      line => {

        const span =
          document.createElement(
            "span"
          );

        span.className =
          "reservation-event__title-line";

        span.textContent =
          line;

        element.appendChild(
          span
        );

      }
    );

  }

  function renderEvent() {

    if (!selectedEvent) {
      return;
    }

    const {
      day,
      month
    } =
      getDateParts(
        selectedEvent.date
      );

    document.title =
      `${selectedEvent.title} — Reserva — NOUR`;

    if (dateElement) {

      dateElement.dateTime =
        getIsoDate(
          selectedEvent.date
        );

    }

    if (dayElement) {

      dayElement.textContent =
        day;

    }

    if (monthElement) {

      monthElement.textContent =
        month;

    }

    if (typeElement) {

      typeElement.textContent =
        selectedEvent.type
          .toUpperCase();

    }

    renderTwoLineTitle(
      titleElement,
      selectedEvent
    );

    if (descriptionElement) {

      descriptionElement.textContent =
        selectedEvent.description;

    }

    if (timeElement) {

      timeElement.textContent =
        selectedEvent.time;

    }

    if (capacityElement) {

      capacityElement.textContent =
        String(
          selectedEvent.capacity
        );

    }

    if (priceElement) {

      priceElement.textContent =
        selectedEvent.price;

    }

    if (formEventTitle) {

      formEventTitle.textContent =
        selectedEvent.title;

    }

    if (seatsInput) {

      seatsInput.max =
        String(
          selectedEvent.capacity
        );

    }

    savePendingEvent(
      selectedEvent
    );

  }

  function normalizeSeats(value) {

    const seats =
      Number.parseInt(
        value,
        10
      );

    if (
      !Number.isInteger(seats)
    ) {
      return 1;
    }

    const capacity =
      Math.max(
        Number(
          selectedEvent.capacity
        ) || 1,
        1
      );

    return Math.min(
      Math.max(
        seats,
        1
      ),
      capacity
    );

  }

  seatsInput?.addEventListener(
    "change",
    () => {

      seatsInput.value =
        String(
          normalizeSeats(
            seatsInput.value
          )
        );

    }
  );

  function getFieldValue(
    selector
  ) {

    const element =
      document.querySelector(
        selector
      );

    return String(
      element?.value || ""
    ).trim();

  }

  function createReservation() {

    return {

      event: {

        id:
          selectedEvent.id,

        title:
          selectedEvent.title,

        type:
          selectedEvent.type,

        date:
          selectedEvent.date,

        time:
          selectedEvent.time,

        place:
          selectedEvent.place,

        capacity:
          selectedEvent.capacity,

        price:
          selectedEvent.price

      },

      attendee: {

        name:
          getFieldValue(
            "#reservation-name"
          ),

        surname:
          getFieldValue(
            "#reservation-surname"
          ),

        email:
          getFieldValue(
            "#reservation-email"
          ),

        phone:
          getFieldValue(
            "#reservation-phone"
          )

      },

      seats:
        normalizeSeats(
          seatsInput?.value
        ),

      notes:
        getFieldValue(
          "#reservation-notes"
        ),

      createdAt:
        new Date()
          .toISOString()

    };

  }

  function saveReservation(
    reservation
  ) {

    try {

      sessionStorage.setItem(
        RESERVATION_KEY,
        JSON.stringify(
          reservation
        )
      );

    } catch {

      /* La navegación puede continuar. */

    }

  }

  function confirmReservation() {

    const reservation =
      createReservation();

    saveReservation(
      reservation
    );

    window.location.href =
      "confirmacion-reserva.html";

  }

  confirmButton?.addEventListener(
    "click",
    event => {

      event.preventDefault();

      confirmReservation();

    }
  );

  form?.addEventListener(
    "submit",
    event => {

      event.preventDefault();

      confirmReservation();

    }
  );

  renderEvent();

})();