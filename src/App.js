import "./App.css"
import { useState, useEffect } from "react"
import img from "./Cluck new.png"

const items = [
  "sdfsdfsdfsdfsdfsdfsdfsd",
  "sdfsdfsdfsdfsdfsdfsdfsd",
  "sdfsdfsdfsdfsdfsdfsdfsdfs",
  "sdfsdfsdfsdfsdfsdfsdfsd",
  "sdfsdfsdfsdfsdfsdfsdfsdfs",
  "sdfsdfsdfsdfsdfsdfsdfsd",
  "sdfsdfsdfsdfsdfsdfsdfsdfs",
  "sdfsdfsdfsdfsdfsdfsdfsd",
  "sdfsdfsdfsdfsdfsdfsdfsdfs",
  "sdfsdfsdfsdfsdfsdfsdfsd",
  "sdfsdfsdfsdfsdfsdfsdfsdfs",
  "sdfsdfsdfsdfsdfsdfsdfsd",
  "sdfsdfsdfsdfsdfsdfsdfsdfs",
  "sdfsdfsdfsdfsdfsdfsdfsdfs",
  "sdfsdfsdfsdfsdfsdfsdfsd",
  "sdfsdfsdfsdfsdfsdfsdfsdfs",
  "sdfsdfsdfsdfsdfsdfsdfsdfs",
  "sdfsdfsdfsdfsdfsdfsdfsd",
  "sdfsdfsdfsdfsdfsdfsdfsdfs",
  "sdfsdfsdfsdfsdfsdfsdfsdfs",
  "sdfsdfsdfsdfsdfsdfsdfsd",
  "sdfsdfsdfsdfsdfsdfsdfsdfs",
  "sdfsdfsdfsdfsdfsdfsdfsdfs",
  "sdfsdfsdfsdfsdfsdfsdfsd",
  "sdfsdfsdfsdfsdfsdfsdfsdfs",
  "sdfsdfsdfsdfsdfsdfsdfsdfs",
  "sdfsdfsdfsdfsdfsdfsdfsd",
  "sdfsdfsdfsdfsdfsdfsdfsdfs",
]

function App() {
  const [code, setCode] = useState(0)
  const [login, setLogin] = useState(0)

  useEffect(function () {
    if (localStorage.getItem("login")) {
      setLogin(1)
    } else {
      setLogin(0)
    }
  }, [])

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednsday",
    "Thursday",
    "Friday",
    "Saturday",
  ]

  return (
    <div
      className="App"
      style={{
        flex: 1,
        flexDirection: "column",
        display: "flex",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 10,
          paddingLeft: 20,
          paddingRight: 20,
          width: "100%",
        }}
      >
        <img src={img} alt="logo" width={80} height={80} />
        <p className="text-end ">
          {new Date().toISOString().split("T")[0]}
          <br />
          {days[new Date().getDay()]}
        </p>
      </div>
      <div
        style={{
          flexDirection: "column",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          marginTop: 15,
          paddingTop: 10,
        }}
      >
        {login === 1 ? (
          <Main />
        ) : (
          <LoginForm code={code} setcode={setCode} setLogin={setLogin} />
        )}
      </div>
    </div>
  )
}

function LoginForm(props) {
  function login(e) {
    e.preventDefault()

    if (localStorage.getItem("login")) {
      props.setLogin(1)
      return
    }
    localStorage.setItem("login", 1)

    props.setLogin(1)
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-10 col-md-6 mx-auto border border-2 p-4 ">
          <form onSubmit={login}>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Login Code
              </label>
              <input
                onChange={(e) => props.setcode(e.target.value)}
                value={props.code}
                type="number"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

// function Main() {
//   return (
//     <div className="container">
//       <div className="mb-3">
//         <label htmlFor="exampleFormControlInput1" className="form-label">
//           Email address
//         </label>
//         <input
//           type="email"
//           className="form-control"
//           id="exampleFormControlInput1"
//           placeholder="name@example.com"
//         />
//       </div>
//       {items.map((item, index) => {
//         return (
//           <div key={index}>
//             <Item item={item} />
//           </div>
//         )
//       })}
//     </div>
//   )
// }
function Main() {
  return items.map((item, index) => {
    return (
      <div className="container" key={index}>
        <Item item={item} />
      </div>
    )
  })
}
// items.map((item, index) => {
//   return (
//     <div className="container" key={index}>
//       <Item item={item} />
//     </div>
//   )
// })

function Item(props) {
  return (
    <div className="row">
      <div className="col-10 mx-auto">
        <div className="card my-2">
          <div className="card-body">
            <div className="form-check ">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckChecked"
              />
              <label className="form-check-label" htmlFor="flexCheckChecked">
                {props.item}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
