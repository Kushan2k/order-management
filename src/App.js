import "./App.css"
import { useState, useEffect } from "react"
import img from "./Cluck new.png"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import { Form, Spinner } from "react-bootstrap"
import {
  Document,
  Font,
  Image,
  PDFDownloadLink,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer"

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
  const [code, setCode] = useState(0)
  const [login, setLogin] = useState(0)
  const [show, setShow] = useState(false)
  const [serachtxt, setsearch] = useState("")

  const [genrate, setgenarate] = useState(false)
  const [loading, setloading] = useState(0)

  const [selecteditem, setselectedItem] = useState([])

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [isadmin, setAdmin] = useState(false)
  const [name, setName] = useState("")
  const [stocks, setstocks] = useState(data)
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
        <div
          className="position-fixed"
          style={{
            borderRadius: "50%",

            bottom: 20,
            right: 20,
            zIndex: 100,
          }}
        >
          {loading === 1 ? (
            <PDFDownloadLink
              onClick={() => {
                setloading(0)
              }}
              document={
                <PDF
                  name={name}
                  items={stocks}
                  close={setgenarate}
                  loading={setloading}
                />
              }
              fileName={`${name}-${new Date().toISOString()}.pdf`}
              style={{ borderRadius: "50%", height: 70, width: 70 }}
              className="btn btn-outline-success p-3 d-flex justify-content-center align-items-center"
            >
              {({ blob, url, loading, error }) =>
                loading ? (
                  <Spinner variant="success" animation="border" />
                ) : (
                  "Save"
                )
              }
            </PDFDownloadLink>
          ) : (
            <Button
              variant="success"
              className="rounded"
              onClick={() => {
                setloading(1)
                setgenarate(true)
              }}
            >
              Genarate
            </Button>
          )}
        </div>
        {login === 1 ? (
          <>
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

            {loading === 1 ? (
              <div className="container mt-5 h-75 flex-column d-flex justify-content-center align-items-center">
                <div className="d-flex gap-1">
                  <Spinner animation="grow" variant="success" />
                </div>
                <p>Generating....</p>
              </div>
            ) : (
              <Main setstock={setstocks} stock={stocks} />
            )}
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
    <div className="container">
      {er ? (
        <div className="row">
          <p className="alert mx-auto w-75 alert-danger text-center">
            Code is invalid!
          </p>
        </div>
      ) : null}
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
                              parseInt(e.target.value) > 0 ? e.target.value : 0,
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

function PDF({ name, items, close, loading }) {
  const [pdfitems, setitems] = useState([])
  Font.register({
    family: "Oswald",
    src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
  })

  const styles = StyleSheet.create({
    logo: {
      width: 70,
      height: 70,
    },
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    title: {
      fontSize: 24,
      textAlign: "center",
      fontFamily: "Oswald",
    },
    date: {
      fontSize: 12,
      textAlign: "center",
      marginBottom: 40,
    },
    subtitle: {
      fontSize: 18,
      margin: 12,
      fontFamily: "Oswald",
    },
    text: {
      margin: 12,
      fontSize: 14,
      textAlign: "justify",
      fontFamily: "Oswald",
    },
    image: {
      marginVertical: 15,
      marginHorizontal: 100,
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: "center",
      color: "grey",
    },
    pageNumber: {
      position: "absolute",
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: "center",
      color: "grey",
    },
  })

  useEffect(() => {
    setitems(items.filter((item) => item.selected))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Document onRender={() => null}>
      <Page style={styles.body} size="A4">
        <Text style={styles.header} fixed>
          ~ Cluck PVT Ltd ~
        </Text>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 10,
          }}
        >
          <Image style={styles.logo} src={img} />
          <View>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.date}>
              {new Date().toISOString().split("T")[0]}
            </Text>
          </View>
        </View>

        <Text style={styles.text}>Items</Text>
        <View style={{ borderBottom: "1px solid black", height: 10 }}></View>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 10,
              marginVertical: 10,
              flexDirection: "row",
              width: "80%",
            }}
          >
            <Text>Item</Text>
            <Text>QTY</Text>
          </View>
          {pdfitems.length > 0 &&
            pdfitems.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    marginTop: 10,
                    width: "80%",
                    paddingHorizontal: 10,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Text style={styles.date}>{item.name}</Text>
                  <Text style={styles.date}>{item.qty}</Text>
                </View>
              )
            })}
        </View>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  )
}

export default App
