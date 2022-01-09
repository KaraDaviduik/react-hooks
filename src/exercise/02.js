// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

// GENERIC CUSTOM HOOK
import * as React from 'react'

function useLocalStorageState(
  key,
  defaultValue = '',
  {serialize = JSON.stringify, deserialize = JSON.parse} = {},
) {
  const [state, setState] = React.useState(() => {
    const valInLocalStorage = window.localStorage.getItem(key)
    if (valInLocalStorage) {
      return deserialize(valInLocalStorage)
    }
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue
  })

  const prevKeyRef = React.useRef(key) // Object we can mutate without triggering re-renders

  React.useEffect(() => {
    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key
    window.localStorage.setItem(key, serialize(state))
  }, [key, serialize, state])

  return [state, setState]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState('name', initialName)

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName="Kara" />
}

export default App

// CUSTOM HOOKS
// import * as React from 'react'

// function useLocalStorageState(key, defaultValue = '') {
//   const [state, setState] = React.useState(
//     window.localStorage.getItem(key) ?? defaultValue,
//   )

//   React.useEffect(() => {
//     window.localStorage.setItem(key, state)
//   }, [key, state])

//   return [state, setState]
// }

// function Greeting({initialName = ''}) {
//   const [name, setName] = useLocalStorageState('name', initialName)

//   function handleChange(event) {
//     setName(event.target.value)
//   }

//   return (
//     <div>
//       <form>
//         <label htmlFor="name">Name: </label>
//         <input value={name} onChange={handleChange} id="name" />
//       </form>
//       {name ? <strong>Hello {name}</strong> : 'Please type your name'}
//     </div>
//   )
// }

// function App() {
//   return <Greeting initialName="Kara" />
// }

// export default App

// EFFECT DEPENDENCIES
// import * as React from 'react'

// function Greeting({initialName = ''}) {
//   const [name, setName] = React.useState(
//     window.localStorage.getItem('name') ?? initialName,
//   )

//   React.useEffect(() => {
//     window.localStorage.setItem('name', name)
//   }, [name])  // Values compared like === or Object.is

//   function handleChange(event) {
//     setName(event.target.value)
//   }
//   return (
//     <div>
//       <form>
//         <label htmlFor="name">Name: </label>
//         <input value={name} onChange={handleChange} id="name" />
//       </form>
//       {name ? <strong>Hello {name}</strong> : 'Please type your name'}
//     </div>
//   )
// }

// function App() {
//   return <Greeting initialName="Kara" />
// }

// export default App

// LAZY SOLUTION
// import * as React from 'react'

// function Greeting({initialName = ''}) {
//   const [name, setName] = React.useState(
//     window.localStorage.getItem('name') ?? initialName,
//   )

//   React.useEffect(() => {
//     window.localStorage.setItem('name', name)
//   })

//   function handleChange(event) {
//     setName(event.target.value)
//   }
//   return (
//     <div>
//       <form>
//         <label htmlFor="name">Name: </label>
//         <input value={name} onChange={handleChange} id="name" />
//       </form>
//       {name ? <strong>Hello {name}</strong> : 'Please type your name'}
//     </div>
//   )
// }

// function App() {
//   return <Greeting initialName="Kara" />
// }

// export default App

// SOLUTION
// import * as React from 'react'

// function Greeting({initialName = ''}) {
//   const [name, setName] = React.useState(
//     window.localStorage.getItem('name') ?? initialName,
//   )

//   React.useEffect(() => {
//     window.localStorage.setItem('name', name)
//   })

//   function handleChange(event) {
//     setName(event.target.value)
//   }
//   return (
//     <div>
//       <form>
//         <label htmlFor="name">Name: </label>
//         <input value={name} onChange={handleChange} id="name" />
//       </form>
//       {name ? <strong>Hello {name}</strong> : 'Please type your name'}
//     </div>
//   )
// }

// function App() {
//   return <Greeting initialName="Kara" />
// }

// export default App
