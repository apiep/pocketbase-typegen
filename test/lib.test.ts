import { CollectionRecord, FieldSchema } from "../src/types"
import { createRecordType, createResponseType, generate } from "../src/lib"

describe("generate", () => {
  it("generates correct output given db input", () => {
    const collections: Array<CollectionRecord> = [
      {
        createRule: null,
        deleteRule: null,
        id: "123",
        listRule: null,
        name: "books",
        fields: [
          {
            id: "xyz",
            name: "title",
            required: false,
            system: false,
            type: "text",
            unique: false,
          },
        ],
        system: false,
        type: "base",
        updateRule: null,
        viewRule: null,
      },
    ]
    const result = generate(collections, { sdk: true })
    expect(result).toMatchSnapshot()
  })

  it("skips generatic sdk if told not to", () => {
    const collections: Array<CollectionRecord> = [
      {
        createRule: null,
        deleteRule: null,
        id: "123",
        listRule: null,
        name: "books",
        fields: [
          {
            id: "xyz",
            name: "title",
            required: false,
            system: false,
            type: "text",
            unique: false,
          },
        ],
        system: false,
        type: "base",
        updateRule: null,
        viewRule: null,
      },
    ]
    const result = generate(collections, { sdk: false })
    expect(result).not.toMatch(/import .* from 'pocketbase'/)
  })
})

describe("createRecordType", () => {
  it("creates type definition for a record", () => {
    const name = "books"
    const schema: FieldSchema[] = [
      {
        id: "hhnwjkke",
        name: "title",
        max: null,
        min: null,
        pattern: "",
        required: false,
        system: false,
        type: "text",
        unique: false,
      },
    ]
    const result = createRecordType(name, schema)
    expect(result).toMatchSnapshot()
  })

  it("handles file fields with multiple files", () => {
    const name = "books"
    const schema: FieldSchema[] = [
      {
        id: "hhnwjkke",
        name: "avatars",
        maxSelect: 2,
        required: false,
        system: false,
        type: "file",
        unique: false,
      },
    ]
    const result = createRecordType(name, schema)
    expect(result).toMatchSnapshot()
  })

  it("sorts fields alphabetically", () => {
    const name = "books"
    const schema: FieldSchema[] = [
      {
        id: "1",
        name: "banana",
        required: false,
        system: false,
        type: "text",
        unique: false,
      },
      {
        id: "1",
        name: "apple",
        required: false,
        system: false,
        type: "text",
        unique: false,
      },
    ]
    const result = createRecordType(name, schema)
    const aIndex = result.indexOf("apple")
    const bIndex = result.indexOf("banana")
    expect(aIndex).toBeGreaterThan(0)
    expect(bIndex).toBeGreaterThan(0)
    expect(aIndex).toBeLessThan(bIndex)
  })
})

describe("createResponseType", () => {
  it("creates type definition for a response", () => {
    const row: CollectionRecord = {
      createRule: null,
      deleteRule: null,
      id: "123",
      listRule: null,
      name: "books",
      fields: [
        {
          id: "hhnwjkke",
          name: "title",
          max: null,
          min: null,
          pattern: "",
          required: false,
          system: false,
          type: "text",
          unique: false,
        },
      ],
      system: false,
      type: "base",
      updateRule: null,
      viewRule: null,
    }

    const result = createResponseType(row)
    expect(result).toMatchSnapshot()
  })

  it("handles file fields with multiple files", () => {
    const name = "books"
    const schema: FieldSchema[] = [
      {
        id: "hhnwjkke",
        name: "avatars",
        maxSelect: 2,
        required: false,
        system: false,
        type: "file",
        unique: false,
      },
    ]
    const result = createRecordType(name, schema)
    expect(result).toMatchSnapshot()
  })
})
