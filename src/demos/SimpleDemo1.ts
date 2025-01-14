import { fetchGet, GenerateLoremIpsumText } from "@/utils"


export default [
  {
    label: 'Field types example',
    value: {
      title: "Demo of field types",
      gridSize: "8",
      fieldSize: "8 md:4",
      fields: [
        {
          key: "text",
          label: "Text",
          type: "text",
          required: true,
          placeholder: "Your placeholder"
        },
        {
          key: "textarea",
          label: "Textarea",
          type: "textarea",
          required: true
        },
        {
          key: "number",
          label: "Number",
          type: "number",
          required: true
        },
        {
          key: "password",
          label: "Password",
          type: "password",
        },
        {
          key: "slider",
          label: "Slider",
          type: "slider",
          required: true,
          fieldParams: {
            min: 175, max: 252, step: 1
          }
        },
        {
          type: "select",
          key: "select",
          label: "Select",
          options: () => Array.from({ length: 49}, (_, i) => ({ label: `Option ${i + 1}`, value: i + 1 })),
        },
        {
          type: "radio",
          key: "radio",
          label: "Radio",
          options: () => Array.from({ length: 12}, (_, i) => ({ label: `Option ${i + 1}`, value: i + 1 })),
          size: 8
        },
        {
          type: "date",
          key: "date",
          label: "Date",
        },
        {
          key: "time",
          label: "Time",
          type: "time",
        },
        {
          key: "datetime",
          label: "Date time",
          type: "datetime",
        },
        {
          key: "datetimeRange",
          label: "Date time range",
          type: "datetimerange",
        },
        {
          key: "object",
          label: "Object",
          type: "object",
          required: true,
          gridSize: "8",
          size: "8",
          fields: [
            {
              key: "string",
              label: "String",
              type: "text",
              size: "8 md:4",
              required: true
            },
            {
              key: "number",
              label: "Number",
              type: "text",
              size: "8 md:4",
              required: true
            },
            {
              key: "slider",
              label: "Slider",
              type: "slider",
              size: "8",
              required: true
            }
          ]
        },
        {
          key: "array",
          label: "Array",
          type: "array",
          size: "8",
          fields: [
            {
              key: "string",
              label: "String",
              type: "text",
              size: "8 md:4",
              required: true
            },
            {
              key: "number",
              label: "Number",
              type: "text",
              size: "8 md:4",
              required: true
            },
            {
              key: "slider",
              label: "Slider",
              type: "slider",
              size: "8",
              required: true
            }
          ]
        }
      ]
    }

  },
  {
    label: "Multi-steps form example",
    value: {
      gridSize: 8,
      fieldSize: 8,
      steps: [
        {
          title: "Step 1",
          fields: [
            {
              key: "text",
              label: "Text",
              type: "textarea",
              required: true
            }
          ]
        },
        {
          title: "Step 2",
          fields: [
            {
              key: "tedzqqdzxt",
              label: "Text",
              type: "textarea",
              required: true
            }
          ]
        },
        {
          title: "Step 3",
          fields: [
            {
              key: "texdqzt",
              label: "Text",
              type: "textarea",
              required: true
            }
          ]
        },
        {
          title: "Step 4",
          fields: [
            {
              key: "text2",
              label: "Text",
              type: "textarea",
              required: true
            }
          ]
        }
      ]
    }
  },
  {
    label: "Fields with description",
    value: {
      title: "Click icon to open description",
      gridSize: 8,
      fieldSize: "8 md:4",
      fields: [
        {
          key: "descr1",
          label: "Text",
          type: "text",
          required: true,
          description: "This is a simple description"
        },
        {
          key: "descr2",
          label: "Description with title",
          type: "textarea",
          required: true,
          description: {
            title: "Description title",
            content: "This is a description with a title"
          }
        },
        {
          key: "descr2",
          label: "Description with html",
          type: "textarea",
          required: true,
          description: {
            title: "Description title",
            content: "This is a <b style='color: red;'>description</b> with a HTML content rendered"
          }
        },
      ]
    }
  },
  {
    label: "Field dependencies",
    value: {
      title: "Field dependencies + async options fetch",
      gridSize: "8",
      fieldSize: "8",
      fields: [
        { 
          key: "dogBreed", 
          type: "select", 
          label: "Dog breed", 
          placeholder: "Select a breed", 
          options: async () => await fetchGet('https://dog.ceo/api/breeds/list/all').then(response => Object.keys(response.message).map(item => ({ label: item, value: item }))).catch(_ => [])
        },
        { 
          key: "dogSubBreed", 
          type: "select", 
          label: "Dog sub-breed", 
          placeholder: "Select a sub-breed", 
          description: "This field depends on dogBreed. When DogBreen changes, the async function will be re-executed to get the updated options.",
          dependencies: ['dogBreed'], 
          options: async ({ dogBreed }) => !dogBreed ? [] : await fetchGet(`https://dog.ceo/api/breed/${dogBreed}/list`).then(response => response.message.map(item => ({ label: item, value: item }))).catch(err => []) 
        },
        {
          label: "Dependencies works also with objects",
          type: "object",
          key: "object",
          fields: [
            {
              key: "objectField",
              label: "Set me to 'dog'",
              type: "select",
              options: () => [{ label: 'dog', value: 'dog' }, { label: 'cat', value: 'cat' }],
            }
          ]
        },
        {
          type: "text",
          key: "text",
          label: "Text",
          dependencies: ['object.objectField'],
          condition: ({ 'object.objectField': objectField }) => objectField === 'dog'
        }
      ]
    }
  }
]