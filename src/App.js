import "./App.css"
import { useState, useEffect, useContext } from "react"
import img from "./Cluck new.png"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import { Form } from "react-bootstrap"

import { useNavigate } from "react-router-dom"
import { Context } from "./context"
import data from "./data"

const users = {
  manager: {
    code: 9876,
  },
  admin: {
    code: 5467,
  },
}

function App() {
  const { login, setLogin, name, setName, stocks, setstocks } =
    useContext(Context)

  const navigation = useNavigate()
  const [code, setCode] = useState(0)

  const [show, setShow] = useState(false)
  const [serachtxt, setsearch] = useState("")

  const [selecteditem, setselectedItem] = useState([])

  const handleClose = () => setShow(false)
  const handleShow = () => {
    setShow(true)
  }
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
            ...i,
            selected: true,
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
              <button
                style={{ borderRadius: 0 }}
                className="btn btn-success"
                onClick={() => {
                  // setloading(true)
                  // setgenarate(true)
                  navigation("/save")
                }}
              >
                Genarate
              </button>
            </div>
            <div className="container-fluid d-flex align-items-end justify-content-end">
              {isadmin && (
                <button
                  onClick={handleShow}
                  style={{ borderRadius: 0 }}
                  className="btn btn-sm btn-success me-2"
                >
                  Add
                </button>
              )}
              <button
                style={{ borderRadius: 0 }}
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
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Company Name"
                    required
                    type="text"
                    className="form-control my-2 form-control-sm border border-primary border-1"
                  />
                </div>
              </div>
            </div>

            <div id="stock" className="w-100">
              <Main setstock={setstocks} stock={stocks} />
            </div>
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
  return (
    <div className="container-fluid">
      <div className="container">
        <input
          id="search"
          value={""}
          onChange={(e) => null}
          placeholder="Development in progress.."
          type="text"
          className="form-control my-2 form-control-sm border border-primary border-1"
        />
      </div>
      {stock.map((item, index) => {
        return (
          <div className="container-fluid items-container my-1" key={index}>
            <Item item={item} stock={stock} setitem={setstock} index={index} />
          </div>
        )
      })}
    </div>
  )
}

function Item(props) {
  const [itemq, setItemq] = useState(props.item.qty)

  return (
    <div className="row">
      <div className="col-11 mx-auto">
        {/*card here*/}
        <div className="card w-100 mx-auto mt-1" style={{ borderRadius: 0 }}>
          <div className="card-body ">
            {/* <h5 class="card-title">Card title</h5> */}
            <div className="card-title d-flex justify-content-between px-2">
              <div className="w-75">
                <input
                  style={{ borderRadius: 0 }}
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
                <label
                  className="form-check-label text-capitalize text-wrap card-text ms-2"
                  htmlFor={"flexCheckChecked" + props.index}
                >
                  {props.item.name}
                </label>
              </div>
              <div className="d-flex flex-row gap-1 justify-content-end">
                <button
                  disabled={!props.item.selected}
                  className="btn btn-sm btn-success fw-bolder"
                  onClick={() => {
                    setItemq(itemq + 1)
                    props.setitem((pre) => {
                      let nd = pre.map((i) => {
                        if (i.id === props.item.id) {
                          return {
                            ...i,
                            qty: parseInt(itemq) > 0 ? itemq : "",
                          }
                        }
                        return i
                      })

                      return nd
                    })
                  }}
                >
                  +
                </button>

                <input
                  style={{ borderRadius: 0 }}
                  readOnly={!props.item.selected}
                  type="number"
                  value={itemq >= 0 ? itemq : 0}
                  onChange={(e) => {
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
                  }}
                  className="form-control w-50 form-control-sm  text-center border border-primary border-2 fw-bold"
                />
                <button
                  disabled={!props.item.selected}
                  className="btn btn-sm btn-success fw-bolder"
                  onClick={() => {
                    setItemq(itemq - 1)
                    props.setitem((pre) => {
                      let nd = pre.map((i) => {
                        if (i.id === props.item.id) {
                          return {
                            ...i,
                            qty: parseInt(itemq) > 0 ? itemq : "",
                          }
                        }
                        return i
                      })

                      return nd
                    })
                  }}
                >
                  -
                </button>
              </div>
            </div>
          </div>
        </div>
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
              {/* <label htmlFor="formGroupExampleInput" className="form-label">
                Item Name
              </label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                placeholder="Example input placeholder"
              /> */}

              <p className="alert text-center alert-danger">
                Under Development
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              style={{ borderRadius: 0 }}
              onClick={handleClose}
            >
              Close
            </Button>
            <Button style={{ borderRadius: 0 }} type="submit" variant="primary">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default App
