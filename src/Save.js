import { useContext, useEffect, useState } from "react"
import { Context } from "./context"
import { Spinner } from "react-bootstrap"

import { useNavigate } from "react-router-dom"

import html2canvas from "html2canvas"
// import jsPDF from "jspdf"
import logo from "./Cluck new.png"

function Save() {
  const navigation = useNavigate()
  const { stocks, name } = useContext(Context)

  const [items, setitems] = useState([])

  const [loading, setloading] = useState(false)

  useEffect(() => {
    const l = stocks.filter((item) => item.selected)
    setitems(l)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function dataURItoBlob(dataURI) {
    var binary = atob(dataURI.split(",")[1])
    var array = []
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i))
    }
    return new Blob([new Uint8Array(array)], { type: "image/png" })
  }

  async function getPDF() {
    const view = document.getElementById("stock")
    setloading(true)

    html2canvas(view)
      .then((canvas) => {
        const uri = canvas.toDataURL("image/png", 1.0)

        const imguri = URL.createObjectURL(dataURItoBlob(uri))

        const a = document.createElement("a")
        a.href = imguri
        a.download = `${name}-${new Date().toISOString().split("T")[0]}.png`
        document.body.appendChild(a)
        a.click()
        // const doc = new jsPDF()
        // const w = doc.internal.pageSize.getWidth()
        // const h = doc.internal.pageSize.getHeight()
        // doc.addImage(uri, "png", 0, 0, w, h)
        // doc.save(`${name}-${new Date().toISOString().split("T")[0]}.pdf`)
        setloading(false)
      })
      .catch((er) => {
        alert("Could not generate PDF please try again!")
        setloading(false)
      })
  }

  return (
    <div
      className="container flex-column mt-5 position-relative"
      style={{ height: "90vh" }}
    >
      <button
        onClick={() => navigation("/")}
        style={{ bottom: 20, right: 30, zIndex: 100 }}
        className="btn btn-warning position-fixed"
      >
        Back
      </button>
      {!loading && (
        <button
          onClick={() => getPDF()}
          style={{ bottom: 20, right: 100, zIndex: 100 }}
          className="btn btn-warning position-fixed"
        >
          Download
        </button>
      )}

      <div className="row">
        {loading && (
          <div
            className="container p-4 d-flex justify-content-center align-items-center flex-column
          "
          >
            <p className="text-center">Genarating please wait..</p>
            <Spinner variant="success" animation="grow" />
          </div>
        )}

        {!loading && (
          <div
            id="stock"
            className="container-fluid d-flexflex-column justify-content-center align-items-center"
          >
            <div className="row my-3">
              <div className="col-12 d-flex justify-content-between align-items-center">
                <img src={logo} width={70} height={70} alt="logo" />
                <div className="text-end pe-4">
                  <p className="fw-bold">{name}</p>
                  <p className="fw-bold">
                    {new Date().toISOString().split("T")[0]}
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Qty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.qty}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Save
