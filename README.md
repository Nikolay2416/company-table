<h1 align="center">Company Table</h1>

## Modular architecture

React Module Architecture to break down the project into independent modules for easier development and maintenance.

<pre>
├── app/
    └── App.tsx                 # ReactJS App
├── data/                       # Global data
├── hooks/                      # Custom hooks
├── modules/                    # Modules
    └── SampleModule/
        ├── api
        ├── components
        ├── constants
        ├── enums
        ├── store               # Module store
        ├── styles
        ├── types
        ├── utils
        └── index.ts
├── store/                      # Global store
├── .eslintrc                   # ESLint configuration
├── .prettierrc                 # Prettier configuration
└── README.md                   # Project description file (you are reading it right now)
</pre>

Typical structure of a component on the example of a conditional `SampleComponent`.

The directory name is the same as the component name.

#### Entry Point

- `components/SampleComponent/index.ts`
- `pages/SamplePage/index.ts`

File `index.ts` contains only the necessary exports.

```tsx
export { SampleComponent } from './SampleComponent'
export { SampleComponentProps } from './SampleComponent/SampleComponent.types'
```

### Function naming inside

Custom event function names (onClick, onChange, etc.) must start with
with the prefix `handle`, for example `handleClick`, `handleOutsideClick`, `handleChange`.

```tsx
  <Button onClick={handleButtonClick} />
  <Input onChange={handleInputChange} />
```

If the function is not a custom event, then prefixes must be used in the name
function descriptions: `set`, `get`, `update`, etc., for example: `getSampleParams()`, `normalizeSampleName()`.

### Order of imports (blocks are separated by an empty line)

- React, {hooks}, libs
- components
- utils/helpers/hooks/constants/redux/mocks
- types/interface's
- styles
- images
