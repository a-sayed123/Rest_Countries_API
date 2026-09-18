import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import Controls from "./Controls";
import { useState } from "react";

test("displays the current search query", () => {
  render(
    <Controls
      query="Egypt"
      onQueryChange={vi.fn()}
      region=""
      onRegionChange={vi.fn()}
    />,
  );

  const input = screen.getByRole("textbox", {
    name: /search for a country/i,
  });

  expect(input).toHaveValue("Egypt");
});

test("calls onQueryChange when the user types", async () => {
  const user = userEvent.setup();
  const onQueryChange = vi.fn();

  function TestWrapper() {
    const [query, setQuery] = useState("");

    return (
      <Controls
        query={query}
        onQueryChange={(value) => {
          onQueryChange(value);
          setQuery(value);
        }}
        region=""
        onRegionChange={vi.fn()}
      />
    );
  }

  render(<TestWrapper />);

  const input = screen.getByRole("textbox", {
    name: /search for a country/i,
  });

  await user.type(input, "Egypt");

  expect(onQueryChange).toHaveBeenLastCalledWith("Egypt");
});

test("opens the region selector when clicked", async () => {
  const user = userEvent.setup();

  render(
    <Controls
      query=""
      onQueryChange={vi.fn()}
      region=""
      onRegionChange={vi.fn()}
    />,
  );

  const button = screen.getByRole("button", {
    name: /filter by region/i,
  });

  expect(button).toHaveAttribute("aria-expanded", "false");

  await user.click(button);

  expect(button).toHaveAttribute("aria-expanded", "true");
});

test("selects a region", async () => {
  const user = userEvent.setup();
  const onRegionChange = vi.fn();

  function TestWrapper() {
    const [region, setRegion] = useState("");

    return (
      <Controls
        query=""
        onQueryChange={vi.fn()}
        region={region}
        onRegionChange={(value) => {
          onRegionChange(value);
          setRegion(value);
        }}
      />
    );
  }

  render(<TestWrapper />);

  const trigger = screen.getByRole("button", {
    name: /filter by region/i,
  });

  await user.click(trigger);

  const option = screen.getByRole("option", {
    name: "Africa",
  });

  await user.click(option);

  expect(onRegionChange).toHaveBeenCalledWith("Africa");
  expect(trigger).toHaveTextContent("Africa");
  expect(trigger).toHaveAttribute("aria-expanded", "false");
});

test("closes the region selector with Escape", async () => {
  const user = userEvent.setup();

  render(
    <Controls
      query=""
      onQueryChange={vi.fn()}
      region=""
      onRegionChange={vi.fn()}
    />,
  );

  const trigger = screen.getByRole("button", {
    name: /filter by region/i,
  });

  await user.click(trigger);

  expect(trigger).toHaveAttribute("aria-expanded", "true");

  await user.keyboard("{Escape}");

  expect(trigger).toHaveAttribute("aria-expanded", "false");
});

test("moves focus to the first region with ArrowDown", async () => {
  const user = userEvent.setup();

  render(
    <Controls
      query=""
      onQueryChange={vi.fn()}
      region=""
      onRegionChange={vi.fn()}
    />,
  );

  const trigger = screen.getByRole("button", {
    name: /filter by region/i,
  });

  await user.click(trigger);
  await user.keyboard("{ArrowDown}");

  const firstOption = screen.getByRole("option", {
    name: "Africa",
  });

  expect(firstOption).toHaveFocus();
});

test("moves focus to the next region with ArrowDown", async () => {
  const user = userEvent.setup();

  render(
    <Controls
      query=""
      onQueryChange={vi.fn()}
      region=""
      onRegionChange={vi.fn()}
    />,
  );

  const trigger = screen.getByRole("button", {
    name: /filter by region/i,
  });

  await user.click(trigger);

  await user.keyboard("{ArrowDown}");
  await user.keyboard("{ArrowDown}");

  const secondOption = screen.getByRole("option", {
    name: "Americas",
  });

  expect(secondOption).toHaveFocus();
});

test("moves focus to the previous region with ArrowUp", async () => {
  const user = userEvent.setup();

  render(
    <Controls
      query=""
      onQueryChange={vi.fn()}
      region=""
      onRegionChange={vi.fn()}
    />,
  );

  const trigger = screen.getByRole("button", {
    name: /filter by region/i,
  });

  await user.click(trigger);

  await user.keyboard("{ArrowDown}");
  await user.keyboard("{ArrowDown}");
  await user.keyboard("{ArrowUp}");

  const firstOption = screen.getByRole("option", {
    name: "Africa",
  });

  expect(firstOption).toHaveFocus();
});

test("moves focus to the first region with Home", async () => {
  const user = userEvent.setup();

  render(
    <Controls
      query=""
      onQueryChange={vi.fn()}
      region=""
      onRegionChange={vi.fn()}
    />,
  );

  const trigger = screen.getByRole("button", {
    name: /filter by region/i,
  });

  await user.click(trigger);

  await user.keyboard("{ArrowDown}");
  await user.keyboard("{ArrowDown}");
  await user.keyboard("{Home}");

  const firstOption = screen.getByRole("option", {
    name: "Africa",
  });

  expect(firstOption).toHaveFocus();
});

test("moves focus to the last region with End", async () => {
  const user = userEvent.setup();

  render(
    <Controls
      query=""
      onQueryChange={vi.fn()}
      region=""
      onRegionChange={vi.fn()}
    />,
  );

  const trigger = screen.getByRole("button", {
    name: /filter by region/i,
  });

  await user.click(trigger);

  await user.keyboard("{ArrowDown}");
  await user.keyboard("{End}");

  const lastOption = screen.getByRole("option", {
    name: "All",
  });

  expect(lastOption).toHaveFocus();
});

test("wraps focus to the last region with ArrowUp", async () => {
  const user = userEvent.setup();

  render(
    <Controls
      query=""
      onQueryChange={vi.fn()}
      region=""
      onRegionChange={vi.fn()}
    />,
  );

  const trigger = screen.getByRole("button", {
    name: /filter by region/i,
  });

  await user.click(trigger);

  await user.keyboard("{ArrowDown}");
  await user.keyboard("{ArrowUp}");

  const lastOption = screen.getByRole("option", {
    name: "All",
  });

  expect(lastOption).toHaveFocus();
});

test("wraps focus to the first region with ArrowDown", async () => {
  const user = userEvent.setup();

  render(
    <Controls
      query=""
      onQueryChange={vi.fn()}
      region=""
      onRegionChange={vi.fn()}
    />,
  );

  const trigger = screen.getByRole("button", {
    name: /filter by region/i,
  });

  await user.click(trigger);

  await user.keyboard("{End}");
  await user.keyboard("{ArrowDown}");

  const firstOption = screen.getByRole("option", {
    name: "Africa",
  });

  expect(firstOption).toHaveFocus();
});

test("selects a region with Enter", async () => {
  const user = userEvent.setup();
  const onRegionChange = vi.fn();

  render(
    <Controls
      query=""
      onQueryChange={vi.fn()}
      region=""
      onRegionChange={onRegionChange}
    />,
  );

  const trigger = screen.getByRole("button", {
    name: /filter by region/i,
  });

  await user.click(trigger);

  await user.keyboard("{ArrowDown}");
  await user.keyboard("{Enter}");

  expect(onRegionChange).toHaveBeenCalledWith("Africa");
  expect(trigger).toHaveAttribute("aria-expanded", "false");
});

test("selects a region with Space", async () => {
  const user = userEvent.setup();
  const onRegionChange = vi.fn();

  render(
    <Controls
      query=""
      onQueryChange={vi.fn()}
      region=""
      onRegionChange={onRegionChange}
    />,
  );

  const trigger = screen.getByRole("button", {
    name: /filter by region/i,
  });

  await user.click(trigger);

  await user.keyboard("{ArrowDown}");
  await user.keyboard(" ");

  expect(onRegionChange).toHaveBeenCalledWith("Africa");
  expect(trigger).toHaveAttribute("aria-expanded", "false");
});

test("focuses the search input when pressing /", async () => {
  const user = userEvent.setup();

  render(
    <Controls
      query=""
      onQueryChange={vi.fn()}
      region=""
      onRegionChange={vi.fn()}
    />,
  );

  const input = screen.getByRole("textbox", {
    name: /search for a country/i,
  });

  await user.keyboard("/");

  expect(input).toHaveFocus();
});

test("updates aria-expanded when the region selector opens and closes", async () => {
  const user = userEvent.setup();

  render(
    <Controls
      query=""
      onQueryChange={() => {}}
      region=""
      onRegionChange={() => {}}
    />,
  );

  const trigger = screen.getByRole("button", {
    name: "Filter by Region",
  });

  expect(trigger).toHaveAttribute("aria-expanded", "false");

  await user.click(trigger);

  expect(trigger).toHaveAttribute("aria-expanded", "true");

  await user.click(trigger);

  expect(trigger).toHaveAttribute("aria-expanded", "false");
});

test("updates aria-selected when a region is selected", async () => {
  const user = userEvent.setup();

  function TestWrapper() {
    const [region, setRegion] = useState("");

    return (
      <Controls
        query=""
        onQueryChange={() => {}}
        region={region}
        onRegionChange={setRegion}
      />
    );
  }

  render(<TestWrapper />);

  const trigger = screen.getByRole("button", {
    name: "Filter by Region",
  });

  await user.click(trigger);

  const africa = screen.getByRole("option", {
    name: "Africa",
  });

  expect(africa).toHaveAttribute("aria-selected", "false");

  await user.click(africa);

  // The parent state changed, so Controls receives region="Africa".
  expect(screen.getByRole("button", { name: "Africa" })).toBeInTheDocument();

  // Open the selector again.
  await user.click(screen.getByRole("button", { name: "Africa" }));

  expect(screen.getByRole("option", { name: "Africa" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
});
