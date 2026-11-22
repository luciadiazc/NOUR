"use strict";

(() => {

  const RESERVATION_KEY =
    "nourReservation";

  const PENDING_EVENT_KEY =
    "nourPendingEvent";

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
        "NOUR"

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
        "NOUR"

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
        "NOUR"

    }

  };

  const DEFAULT_EVENT_ID =
    "sostener-la-calma";

  const dateElement =
    document.querySelector(
      "#confirmed-event-date"
    );

  const dayElement =
    document.querySelector(
      "#confirmed-event-day"
    );

  const monthElement =
    document.querySelector(
      "#confirmed-event-month"
    );

  const typeElement =
    document.querySelector(
      "#confirmed-event-type"
    );

  const titleElement =
    document.querySelector(
      "#confirmed-event-title"
    );

  const timeElement =
    document.querySelector(
      "#confirmed-event-time"
    );

  const placeElement =
    document.querySelector(
      "#confirmed-event-place"
    );

  const seatsElement =
    document.querySelector(
      "#confirmed-event-seats"
    );

  function readStorage(
    storage,
    key
  ) {

    try {

      const stored =
        storage.getItem(key);

      if (!stored) {
        return null;
      }

      const parsed =
        JSON.parse(stored);

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

  const reservation =
    readStorage(
      sessionStorage,
      RESERVATION_KEY
    );

  const pendingEvent =
    readStorage(
      localStorage,
      PENDING_EVENT_KEY
    );

  function getConfirmedEvent() {

    if (
      reservation?.event?.id &&
      events[
        reservation.event.id
      ]
    ) {

      return {
        ...events[
          reservation.event.id
        ],
        ...reservation.event,
        titleLines:
          events[
            reservation.event.id
          ].titleLines
      };

    }

    if (
      pendingEvent?.id &&
      events[pendingEvent.id]
    ) {

      return {
        ...events[
          pendingEvent.id
        ],
        ...pendingEvent,
        titleLines:
          events[
            pendingEvent.id
          ].titleLines
      };

    }

    return events[
      DEFAULT_EVENT_ID
    ];

  }

  const confirmedEvent =
    getConfirmedEvent();

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
      getDateParts(date);

    return `${year}-${month}-${day}`;

  }

  function renderTitle() {

    if (!titleElement) {
      return;
    }

    const lines =
      Array.isArray(
        confirmedEvent.titleLines
      ) &&
      confirmedEvent.titleLines.length === 2
        ? confirmedEvent.titleLines
        : [
            confirmedEvent.title,
            ""
          ];

    titleElement.replaceChildren();

    lines.forEach(
      (line, index) => {

        if (index > 0) {
          titleElement.append(" ");
        }

        const span =
          document.createElement(
            "span"
          );

        span.className =
          "confirmation-event__title-line";

        span.textContent =
          line;

        titleElement.appendChild(
          span
        );

      }
    );

  }

  function getReservedSeats() {

    const seats =
      Number.parseInt(
        reservation?.seats,
        10
      );

    if (
      Number.isInteger(seats) &&
      seats > 0
    ) {
      return seats;
    }

    return 1;

  }

  function renderConfirmation() {

    const {
      day,
      month
    } =
      getDateParts(
        confirmedEvent.date
      );

    document.title =
      `Reserva confirmada — ${confirmedEvent.title} — NOUR`;

    if (dateElement) {

      dateElement.dateTime =
        getIsoDate(
          confirmedEvent.date
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
        String(
          confirmedEvent.type || ""
        ).toUpperCase();

    }

    renderTitle();

    if (timeElement) {
      timeElement.textContent =
        confirmedEvent.time || "—";
    }

    if (placeElement) {
      placeElement.textContent =
        confirmedEvent.place ||
        "NOUR";
    }

    if (seatsElement) {

      seatsElement.textContent =
        String(
          getReservedSeats()
        );

    }

  }

  renderConfirmation();

})();