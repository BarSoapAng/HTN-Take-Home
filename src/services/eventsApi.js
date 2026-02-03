const ENDPOINT = "https://api.hackthenorth.com/v3/frontend-challenge";

const ALL_EVENTS_QUERY = `
  query {
    sampleEvents {
      id
      name
      event_type
      permission
      start_time
      end_time
      description
      speakers { name }
      public_url
      private_url
      related_events
    }
  }
`;

/**
 * Fetches all events via GraphQL.
 * Returns: { ok: boolean, data?: array, error?: string }
 */
export async function fetchAllEvents() {
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: ALL_EVENTS_QUERY }),
    });

    if (!res.ok) {
      return { ok: false, error: `Request failed (${res.status})` };
    }

    const json = await res.json();

    if (json.errors?.length) {
      return { ok: false, error: json.errors[0]?.message || "GraphQL error" };
    }

    const events = json?.data?.sampleEvents;
    if (!Array.isArray(events)) {
      return { ok: false, error: "Unexpected response shape" };
    }

    return { ok: true, data: events };
  } catch (err) {
    return { ok: false, error: err?.message || "Network error" };
  }
}
