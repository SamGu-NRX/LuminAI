import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Dashboard from "../Dashboard";
import Sidebar from "../Sidebar";
import TodoList from "../TodoList";

/**
 * Snapshot regression guards for the three placeholder Dashboard components.
 *
 * These components are presentational mocks with hardcoded data, so the
 * rendered markup IS the contract: any DOM change (structure, classes, text)
 * should surface as a deliberate snapshot update, not a silent drift.
 *
 * Style: toMatchInlineSnapshot everywhere (the one style chosen for this
 * suite — inline snapshots fail right at the diffing line and never need a
 * sidecar file).
 *
 * Sidebar scoping: the snapshot intentionally covers ONLY the menu list
 * region, not the avatar block. The avatar's placeholder `src` is owned by
 * a parallel fix; pinning the avatar here would guarantee a snapshot/source
 * conflict at merge time. Everything else in the aside is pinned.
 */
describe("Dashboard placeholder snapshots", () => {
  it("Dashboard renders stable markup", () => {
    const { container } = render(<Dashboard />);
    expect(container.firstElementChild).toMatchInlineSnapshot(`
      <div>
        <h1
          class="text-2xl font-bold mb-6"
        >
          Dashboard
        </h1>
        <div
          class="bg-gray-800 rounded-lg p-4 mb-6"
        >
          <div
            class="flex justify-between items-center mb-4"
          >
            <div>
              <h2
                class="text-xl font-semibold"
              >
                LuminAI Innovate Scholars (Summer 2024)
              </h2>
              <p>
                LIS Summer 24
              </p>
            </div>
            <svg
              aria-hidden="true"
              class="h-6 w-6"
              data-slot="icon"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                fill-rule="evenodd"
              />
            </svg>
          </div>
          <div
            class="w-full bg-gray-700 rounded-full h-2.5"
          >
            <div
              class="bg-blue-600 h-2.5 rounded-full"
              style="width: 93%;"
            />
          </div>
          <p
            class="text-right mt-2"
          >
            93%
          </p>
        </div>
        <div>
          <h2
            class="text-xl font-semibold mb-4"
          >
            Due
          </h2>
          <div
            class="flex justify-between items-center mb-2"
          >
            <span>
              Unit 4 Test
            </span>
            <span
              class="text-gray-400"
            >
              in 
              2d
            </span>
          </div>
          <div
            class="flex justify-between items-center mb-2"
          >
            <span>
              Discussion: Fail-Safe Recovery
            </span>
            <span
              class="text-gray-400"
            >
              in 
              2d
            </span>
          </div>
          <div
            class="flex justify-between items-center mb-2"
          >
            <span>
              Activity: Hardware Security Guidelines
            </span>
            <span
              class="text-gray-400"
            >
              in 
              2d
            </span>
          </div>
          <div
            class="flex justify-between items-center mb-2"
          >
            <span>
              Lab: Asymmetric Practice
            </span>
            <span
              class="text-gray-400"
            >
              in 
              2d
            </span>
          </div>
        </div>
      </div>
    `);
  });

  it("Sidebar menu list renders stable markup (avatar block excluded — owned by a parallel fix)", () => {
    const { container } = render(<Sidebar />);
    const aside = container.querySelector("aside");
    expect(aside).not.toBeNull();

    // Clone the aside and drop the avatar block so the snapshot pins the
    // menu list only. The avatar is identified structurally (the one
    // top-level block containing an <img>), so repositioning it or changing
    // its src never leaks into — or conflicts with — this snapshot.
    const menuRegion = aside!.cloneNode(true) as HTMLElement;
    Array.from(menuRegion.children).forEach((child) => {
      if (child.querySelector("img")) {
        child.remove();
      }
    });

    // Guard the scoping itself: the pinned region must never contain an
    // image, otherwise the avatar has leaked back into the snapshot.
    expect(menuRegion.querySelector("img")).toBeNull();

    expect(menuRegion).toMatchInlineSnapshot(`
      <aside
        class="w-20 bg-gray-800 p-4"
      >
        <div
          class="mb-6 text-center"
        >
          <svg
            aria-hidden="true"
            class="h-6 w-6 mx-auto mb-1"
            data-slot="icon"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z"
            />
            <path
              d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z"
            />
          </svg>
          <span
            class="text-xs"
          >
            Dashboard
          </span>
        </div>
        <div
          class="mb-6 text-center"
        >
          <svg
            aria-hidden="true"
            class="h-6 w-6 mx-auto mb-1"
            data-slot="icon"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z"
            />
          </svg>
          <span
            class="text-xs"
          >
            Courses
          </span>
        </div>
        <div
          class="mb-6 text-center"
        >
          <svg
            aria-hidden="true"
            class="h-6 w-6 mx-auto mb-1"
            data-slot="icon"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clip-rule="evenodd"
              d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
              fill-rule="evenodd"
            />
          </svg>
          <span
            class="text-xs"
          >
            Calendar
          </span>
        </div>
        <div
          class="mb-6 text-center"
        >
          <svg
            aria-hidden="true"
            class="h-6 w-6 mx-auto mb-1"
            data-slot="icon"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clip-rule="evenodd"
              d="M6.912 3a3 3 0 0 0-2.868 2.118l-2.411 7.838a3 3 0 0 0-.133.882V18a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-4.162c0-.299-.045-.596-.133-.882l-2.412-7.838A3 3 0 0 0 17.088 3H6.912Zm13.823 9.75-2.213-7.191A1.5 1.5 0 0 0 17.088 4.5H6.912a1.5 1.5 0 0 0-1.434 1.059L3.265 12.75H6.11a3 3 0 0 1 2.684 1.658l.256.513a1.5 1.5 0 0 0 1.342.829h3.218a1.5 1.5 0 0 0 1.342-.83l.256-.512a3 3 0 0 1 2.684-1.658h2.844Z"
              fill-rule="evenodd"
            />
          </svg>
          <span
            class="text-xs"
          >
            Inbox
          </span>
        </div>
        <div
          class="mb-6 text-center"
        >
          <svg
            aria-hidden="true"
            class="h-6 w-6 mx-auto mb-1"
            data-slot="icon"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clip-rule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
              fill-rule="evenodd"
            />
          </svg>
          <span
            class="text-xs"
          >
            History
          </span>
        </div>
        <div
          class="mb-6 text-center"
        >
          <svg
            aria-hidden="true"
            class="h-6 w-6 mx-auto mb-1"
            data-slot="icon"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clip-rule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
              fill-rule="evenodd"
            />
          </svg>
          <span
            class="text-xs"
          >
            Help
          </span>
        </div>
      </aside>
    `);
  });

  it("TodoList renders stable markup", () => {
    const { container } = render(<TodoList />);
    expect(container.firstElementChild).toMatchInlineSnapshot(`
      <aside
        class="w-80 bg-gray-800 p-4 overflow-y-auto"
      >
        <div
          class="flex justify-between items-center mb-4"
        >
          <h2
            class="text-xl font-semibold"
          >
            To Do
          </h2>
          <button
            class="bg-blue-500 p-1 rounded-full"
          >
            <svg
              aria-hidden="true"
              class="h-5 w-5"
              data-slot="icon"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                fill-rule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div
          class="mb-4 bg-gray-700 p-3 rounded-lg"
        >
          <h3
            class="font-semibold"
          >
            Unit 3 Test
          </h3>
          <p
            class="text-sm text-gray-400"
          >
            LIS Summer 24
          </p>
          <p
            class="text-sm text-red-400"
          >
            Jun 27 at 18:00 (5 days ago)
          </p>
        </div>
        <div
          class="mb-4 bg-gray-700 p-3 rounded-lg"
        >
          <h3
            class="font-semibold"
          >
            Discussion: Physical and Tactical Controls
          </h3>
          <p
            class="text-sm text-gray-400"
          >
            LIS Summer 24
          </p>
          <p
            class="text-sm text-red-400"
          >
            July 2 at 18:00 (5 days ago)
          </p>
        </div>
        <div
          class="mt-6"
        >
          <h2
            class="text-xl font-semibold mb-4"
          >
            Announcements
          </h2>
          <div
            class="bg-gray-700 p-3 rounded-lg"
          >
            <h3
              class="font-semibold"
            >
              WEEK 6 (7/1 - 7/3) ANNOUNCEMENT
            </h3>
            <p
              class="text-sm text-gray-400"
            >
              LIS Summer 24
            </p>
            <p
              class="text-sm text-gray-400"
            >
              Jul 1 at 9:07 (3 days ago)
            </p>
          </div>
        </div>
        <div
          class="mt-6"
        >
          <h2
            class="text-xl font-semibold mb-4"
          >
            Recent Feedback
          </h2>
          <p
            class="text-blue-400"
          >
            Activity: Something
          </p>
        </div>
      </aside>
    `);
  });
});
