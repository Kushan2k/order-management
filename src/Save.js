import { useContext, useEffect, useState } from "react"
import { Context } from "./context"
import { Spinner } from "react-bootstrap"

import { useNavigate } from "react-router-dom"

import html2canvas from "html2canvas"
// import jsPDF from "jspdf"
import logo from "./Cluck new.png"
import jsPDF from "jspdf"

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
        // const uri = canvas.toDataURL("image/png", 1.0)

        // const imguri = URL.createObjectURL(dataURItoBlob(uri))

        // const a = document.createElement("a")
        // a.href = imguri
        // a.download = `${name}-${new Date().toISOString().split("T")[0]}.png`
        // document.body.appendChild(a)

        // a.click()
        const doc = new jsPDF({ orientation: "p", unit: "px" })
        const w = doc.internal.pageSize.getWidth()
        doc.addImage(logo, "PNG", w / 2 - 25, 10, 50, 50)
        doc.setFontSize(13)
        doc.text("Cluck Pvt Ltd.", w / 2, 75, null, null, "center")
        doc.text("cluckpvtltd@gmail.com", w / 2, 90, null, null, "center")
        doc.text("Pallewela , udubaddwa", w / 2, 105, null, null, "center")
        doc.text("0775550255", w / 2, 120, null, null, "center")

        doc.setFontSize(15)
        doc.text(name ? name : "Undifined!", 20, 145)
        doc.text(new Date().toISOString().split("T")[0], 20, 160)

        let line = 190
        doc.setFontSize(16)

        doc.text("Item", 20, line, { align: "left" })
        doc.text("QTY", w / 2, line, {
          align: "right",
        })
        doc.setFontSize(15)
        line += 35
        items.forEach((item, index) => {
          doc.text(item.name.toString(), 20, line)
          doc.text(item.qty.toString(), w / 2, line, {
            align: "right",
          })
          line += 20
        })
        doc.save(`${name}-${new Date().toISOString().split("T")[0]}.pdf`)

        setloading(false)
      })
      .catch((er) => {
        alert(er)
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
