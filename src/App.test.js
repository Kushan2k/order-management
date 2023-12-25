import { render, screen } from "@testing-library/react"
import App from "./App"

test("creates the ui for the list", () => {
  render(<App />)

  const ele = screen.getAllByText("stock")

  expect(typeof ele).toBe(Array)
})
