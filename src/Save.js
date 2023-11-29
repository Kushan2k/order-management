import { useContext, useEffect, useState } from "react"
import { Context } from "./context"
import { Spinner } from "react-bootstrap"
import { PDFDownloadLink } from "@react-pdf/renderer"
import PDF from "./PDF"
import { useNavigate } from "react-router-dom"

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

  return (
    <div
      className="container mt-5 d-flex justify-content-center align-items-center position-relative"
      style={{ height: "90vh" }}
    >
      <button
        onClick={() => navigation("/")}
        style={{ bottom: 20, right: 30 }}
        className="btn btn-warning position-absolute"
      >
        Back
      </button>

      <div className="row">
        <p className="text-center">Genarating please wait..</p>
        <div className="col-6 mx-auto d-flex justify-content-center align-items-center">
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
                const b = URL.createObjectURL(blob)
                return (
                  <a href={b} download>
                    download
                  </a>
                )
                return loading ? (
                  <Spinner variant="light" animation="border" />
                ) : (
                  "Save"
                )
              }}
            </PDFDownloadLink>
          )}
        </div>
      </div>
    </div>
  )
}

export default Save
