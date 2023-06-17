import getUserHasSessionAndPublished from "./get-user-has-session-and-published"
import { SIGNED_IN_ERROR_MESSAGE, ACCESS_DENIED_ERROR_MESSAGE } from "../../constants/api-constants"

function generateMockResponseObject() {
  const res = {};
  res.json = jest.fn();
  res.status = jest.fn(() => res);

  return res
}

describe("getHasSessionAndPublished", () => {
  test("should return 403 and an error message if there is no session", async () => {
    const mockResponse = generateMockResponseObject()

    const result = await getUserHasSessionAndPublished(false, mockResponse)

    expect(result).toBe(false)

    expect(mockResponse.status).toHaveBeenCalledWith(403)
    expect(mockResponse.json).toHaveBeenCalledWith({ "error": SIGNED_IN_ERROR_MESSAGE })
  })

  test('should return 403 and an error message if the user is not published', async () => {
    const mockResponse = generateMockResponseObject()

    const result = await getUserHasSessionAndPublished({ session: { user: { published: false } } }, mockResponse)

    expect(result).toBe(false)

    expect(mockResponse.status).toHaveBeenCalledWith(403)
    expect(mockResponse.json).toHaveBeenCalledWith({ "error": ACCESS_DENIED_ERROR_MESSAGE })
  })

  test('should return true if there is a session and the user is published', async () => {
    const mockResponse = generateMockResponseObject()

    const result = await getUserHasSessionAndPublished({ user: { published: true } }, mockResponse)

    expect(result).toBe(true)
  })
})