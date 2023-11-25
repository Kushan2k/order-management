import "./App.css"
import { useState, useEffect } from "react"
import img from "./Cluck new.png"

function App() {
  const [code, setCode] = useState(0)
  const [login, setLogin] = useState(0)
  const [stocks, setstocks] = useState([
    {
      id: Math.random() * 1000,
      name: "sdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsd34",
      qty: 0,
      selected: false,
    },
    {
      id: Math.random() * 1000,
      name: "sdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsd23",
      qty: 0,
      selected: false,
    },
    {
      id: Math.random() * 1000,
      name: "sdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsd56",
      qty: 0,
      selected: false,
    },
    {
      id: Math.random() * 1000,
      name: "sdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsd23",
      qty: 0,
      selected: false,
    },
  ])
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
        <div
          className="position-absolute"
          style={{
            borderRadius: "50%",

            bottom: 20,
            right: 20,
          }}
        >
          <button
            onClick={() => {
              const l = stocks.filter((sto) => sto.selected)
              console.log(l)
            }}
            style={{ borderRadius: "50%", height: 70, width: 70 }}
            className="btn btn-success p-3"
          >
            Save
          </button>
        </div>
        {login === 1 ? (
          <>
            <h3>Search bar goes here</h3>
            <Main setstock={setstocks} stock={stocks} />
          </>
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

function Main({ setstock, stock }) {
  return stock.map((item, index) => {
    return (
      <div className="container" key={index}>
        <Item item={item} stock={stock} setitem={setstock} index={index} />
      </div>
    )
  })
}

function Item(props) {
  return (
    <div className="row">
      <div className="col-10 mx-auto">
        <div className="card my-2">
          <div className="card-body">
            <div className="form-check d-flex justify-content-between">
              <input
                className="form-check-input border border-primary border-2"
                type="checkbox"
                id={"flexCheckChecked" + props.index}
                checked={props.item.selected}
                onChange={(e) => {
                  props.setitem((pre) => {
                    let nd = pre.map((i) => {
                      if (i.id === props.item.id) {
                        return {
                          ...i,
                          selected: e.target.checked,
                        }
                      }
                      return i
                    })

                    return nd
                  })
                }}
              />
              <div className="d-flex align-content-center justify-content-end">
                <label
                  className="form-check-label"
                  htmlFor={"flexCheckChecked" + props.index}
                >
                  {props.item.name}
                </label>
                <input
                  readOnly={!props.item.selected}
                  type="number"
                  value={props.item.qty}
                  onChange={(e) =>
                    props.setitem((pre) => {
                      let nd = pre.map((i) => {
                        if (i.id === props.item.id) {
                          return {
                            ...i,
                            qty: e.target.value,
                          }
                        }
                        return i
                      })

                      return nd
                    })
                  }
                  className="form-control form-control-sm w-25 ms-2 text-center border border-primary border-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
