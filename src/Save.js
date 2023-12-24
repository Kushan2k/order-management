import { useContext, useEffect, useState } from "react"
import { Context } from "./context"
import { Spinner } from "react-bootstrap"
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer"
import PDF from "./PDF"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

function Save() {
  const navigation = useNavigate()
  const { stocks, name } = useContext(Context)

  const [items, setitems] = useState([])

  const [loading, setloading] = useState(false)

  useEffect(() => {
    const l = stocks.filter((item) => item.selected)
    setitems(l)

    // fetch("http://localhost:8080/api/save.php", {
    //   method: "get",
    //   mode: "no-cors",
    // })
    //   .then((res) => res.blob())
    //   .then((data) => {
    //     const d = data

    //     const uri = window.URL.createObjectURL(new Blob(d))
    //     const a = document.createElement("a")
    //     a.href = uri
    //     a.setAttribute("download", "test.pdf")
    //     document.body.appendChild(a)
    //     a.click()
    //   })
    //   .catch((er) => {
    //     console.log(er)
    //   })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function getPDF() {
    const view = document.getElementById("stock")

    html2canvas(view).then((canvas) => {
      const uri = canvas.toDataURL("image/png", 1)
      const doc = new jsPDF()
      const w = doc.internal.pageSize.getWidth()
      const h = doc.internal.pageSize.getHeight()
      doc.addImage(uri, "PNG", 0, 0, w, h)
      doc.save(`${new Date().toISOString().split("T")[0]}.pdf`)
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
        className="btn btn-warning position-absolute"
      >
        Back
      </button>
      <button
        onClick={() => getPDF()}
        style={{ bottom: 20, right: 100, zIndex: 100 }}
        className="btn btn-warning position-absolute"
      >
        Download
      </button>

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
            className="d-flexflex-column justify-content-center align-items-center"
          >
            {items.map((item, index) => (
              <div className="card my-2" key={index}>
                <div className="card-body">
                  <p>{item.name}</p>
                  <p>{item.qty}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* <PDFViewer height={window.innerHeight - 30}>
          <PDF name={name} items={items} loading={setloading} />
        </PDFViewer> */}

        {/* <div className="col-6 mx-auto d-flex justify-content-center align-items-center">
          {loading ? (
            <Spinner animation="grow" variant="success" />
          ) : (
            <PDFDownloadLink
              // onClick={() => navigation("/")}
              document={<PDF name={name} items={items} loading={setloading} />}
              fileName={`${name}-${new Date().toISOString()}.pdf`}
              style={{ borderRadius: "50%", height: 70, width: 70 }}
              className="btn btn-success p-3 d-flex justify-content-center align-items-center"
            >
              {({ blob, url, loading, error }) => {
                return loading ? (
                  <Spinner variant="light" animation="border" />
                ) : (
                  "Save"
                )
              }}
            </PDFDownloadLink>
          )}
        </div> */}
      </div>
    </div>
  )
}

export default Save
