import "./App.css"
import { useState, useEffect, useContext } from "react"
import img from "./Cluck new.png"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import { Form } from "react-bootstrap"

import { useNavigate } from "react-router-dom"
import { Context } from "./context"

const users = {
  manager: {
    code: 9876,
  },
  admin: {
    code: 1234,
  },
}

const data = [
  {
    id: Math.random() * 1000,
    name: "sdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsd34sdf sdfsd fsd fsdf sdfsdds fsdf dsf sdfs dfsd fd",
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
  {
    id: Math.random() * 1000,
    name: "sdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsd23",
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
    name: "sdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsd23",
    qty: 0,
    selected: false,
  },
]

function App() {
  const { login, setLogin, name, setName, stocks, setstocks } =
    useContext(Context)

  const navigation = useNavigate()
  const [code, setCode] = useState(0)
  // const [login, setLogin] = useState(0)
  const [show, setShow] = useState(false)
  const [serachtxt, setsearch] = useState("")

  const [selecteditem, setselectedItem] = useState([])
  // const [name, setName] = useState("")
  // const [stocks, setstocks] = useState(data)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [isadmin, setAdmin] = useState(false)

  useEffect(function () {
    if (localStorage.getItem("login")) {
      if (
        localStorage.getItem("type") &&
        parseInt(localStorage.getItem("type")) === users.admin.code
      ) {
        setAdmin(true)
      }
      setLogin(1)
    } else {
      setLogin(0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const selected = stocks.filter((item) => item.selected)
    setselectedItem(selected)

    if (serachtxt === "") {
      let nd = data.map((i) => {
        if (selecteditem.includes(i.id)) {
          return {
            ...selecteditem.find((l) => l.id === i.id),
          }
        }
        return i
      })

      setstocks(nd)
      return
    }

    const newl = stocks.filter((item) =>
      item.name.toLowerCase().includes(serachtxt.toLowerCase())
    )
    setstocks(newl)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serachtxt])

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
          <>
            <div
              className="position-fixed"
              style={{
                borderRadius: "50%",

                bottom: 20,
                right: 20,
                zIndex: 100,
              }}
            >
              <Button
                variant="success"
                className="rounded"
                onClick={() => {
                  // setloading(true)
                  // setgenarate(true)
                  navigation("/save")
                }}
              >
                Genarate
              </Button>
            </div>
            <div className="container-fluid d-flex align-items-end justify-content-end">
              {isadmin && (
                <button
                  onClick={handleShow}
                  className="btn btn-sm btn-success me-2"
                >
                  Add
                </button>
              )}
              <button
                onClick={() => {
                  localStorage.removeItem("login")
                  localStorage.removeItem("type")
                  setLogin(0)
                  setAdmin(false)
                }}
                className="btn btn-sm btn-warning"
              >
                Logout
              </button>
            </div>
            <PopUpModel show={show} handleClose={handleClose} />
            <div className="container my-3 ">
              <div className="row">
                <div className="col-10 mx-auto">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Company Name"
                    type="text"
                    className="form-control my-2 form-control-sm border border-primary border-1"
                  />
                  <input
                    value={serachtxt}
                    onChange={(e) => setsearch(e.target.value)}
                    placeholder="Search Here"
                    type="text"
                    className="form-control my-2 form-control-sm border border-primary border-1"
                  />
                </div>
              </div>
            </div>

            <Main setstock={setstocks} stock={stocks} />
          </>
        ) : (
          <LoginForm
            setAdmin={setAdmin}
            code={code}
            setcode={setCode}
            setLogin={setLogin}
          />
        )}
      </div>
    </div>
  )
}

function LoginForm(props) {
  const [er, seter] = useState(false)

  useEffect(() => {
    function clear() {
      seter(false)
    }

    setTimeout(clear, 2000)
    clearInterval()
  }, [er])

  function login(e) {
    e.preventDefault()
    props.setcode(0)

    if (
      !parseInt(props.code) === users.admin.code ||
      !parseInt(props.code) === users.manager.code
    ) {
      seter(true)
      return
    }

    if (localStorage.getItem("login")) {
      if (parseInt(localStorage.getItem("type")) === users.admin.code) {
        props.setAdmin(true)
      }
      props.setLogin(1)
      return
    }

    if (parseInt(props.code) === users.admin.code) {
      localStorage.setItem("type", users.admin.code)
      props.setAdmin(true)
    } else if (parseInt(props.code) === users.manager.code) {
      localStorage.setItem("type", users.manager.code)
    } else {
      seter(true)
      return
    }

    localStorage.setItem("login", 1)

    props.setLogin(1)
  }
  return (
    <div
      className="container d-flex flex-column justify-content-center align-items-center"
      style={{ height: "70vh" }}
    >
      {er ? (
        <div className="row w-100">
          <p className="alert mx-auto w-75 alert-danger text-center">
            Code is invalid!
          </p>
        </div>
      ) : null}
      <div className="row w-100">
        <p className="text-center">Cluck pvt ltd stock management.</p>
        <div className="col-10 col-md-6 mx-auto border border-1 p-4 ">
          <form onSubmit={login}>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Login Code
              </label>
              <input
                onChange={(e) => props.setcode(e.target.value)}
                value={props.code}
                type="text"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ borderRadius: 0 }}
            >
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
      <div className="container-fluid" key={index}>
        <Item item={item} stock={stock} setitem={setstock} index={index} />
      </div>
    )
  })
}

function Item(props) {
  return (
    <div className="row">
      <div className="col-11 mx-auto">
        {/*card here*/}
        <div className="card w-100 mx-auto my-2">
          <div className="card-body ">
            {/* <h5 class="card-title">Card title</h5> */}
            <div className="card-title">
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
                          qty: e.target.checked ? 1 : 0,
                        }
                      }
                      return i
                    })

                    return nd
                  })
                }}
              />
            </div>

            <label
              className="form-check-label text-capitalize text-wrap card-text my-2"
              htmlFor={"flexCheckChecked" + props.index}
            >
              {props.item.name}
            </label>
            <input
              style={{ right: 10, bottom: 10 }}
              readOnly={!props.item.selected}
              type="number"
              value={props.item.qty}
              onChange={(e) =>
                props.setitem((pre) => {
                  let nd = pre.map((i) => {
                    if (i.id === props.item.id) {
                      return {
                        ...i,
                        qty: parseInt(e.target.value) > 0 ? e.target.value : "",
                      }
                    }
                    return i
                  })

                  return nd
                })
              }
              className="form-control w-25 form-control-sm  text-center border border-primary border-2 position-absolute"
            />
          </div>
        </div>

        {/* <div className="card my-2">
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
                          qty: e.target.checked ? 1 : 0,
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
                  className="form-check-label text-wrap"
                  htmlFor={"flexCheckChecked" + props.index}
                >
                  {props.item.name}
                </label>
                <input
                  style={{ width: "20%" }}
                  readOnly={!props.item.selected}
                  type="number"
                  value={props.item.qty}
                  onChange={(e) =>
                    props.setitem((pre) => {
                      let nd = pre.map((i) => {
                        if (i.id === props.item.id) {
                          return {
                            ...i,
                            qty:
                              parseInt(e.target.value) > 0
                                ? e.target.value
                                : "",
                          }
                        }
                        return i
                      })

                      return nd
                    })
                  }
                  className="form-control form-control-sm ms-2 text-center border border-primary border-2"
                />
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}

function PopUpModel({ show, handleClose }) {
  function save(e) {
    e.preventDefault()
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Item</Modal.Title>
        </Modal.Header>
        <Form onSubmit={save}>
          <Modal.Body>
            <div className="mb-3">
              <label htmlFor="formGroupExampleInput" className="form-label">
                Item Name
              </label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                placeholder="Example input placeholder"
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default App
