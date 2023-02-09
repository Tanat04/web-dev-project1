import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Container, Table, Button, Badge, Modal } from "react-bootstrap"
import remove from "../images/delete.png"
import LineChart from "./LineChart"

function SelectedList({ selectedData, removeRow }) {
  const tableData = {}

  selectedData.forEach(data => {
    const key = `${data[0]}-${data[1]}`

    if (!tableData[key]) {
      tableData[key] = []
    }
    tableData[key].push(data)
  })

  function semGpaAndCredit(tableData) {
    let semCredit = 0
    let totalPoints = 0
    const gradeValues = {
      A: 4,
      "A-": 3.75,
      "B+": 3.25,
      B: 3,
      "B-": 2.75,
      "C+": 2.25,
      C: 2,
      "C-": 1.75,
      D: 1,
      F: 0,
    }

    tableData.forEach(data => {
      let grade = data[6]
      let credit = data[5]

      if (grade === "W") {
        return
      }
      totalPoints += gradeValues[grade] * credit
      semCredit += credit
    })

    let semGpa = (totalPoints / semCredit).toFixed(2)

    return [semGpa, semCredit]
  }

  const [show, setShow] = React.useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const labels = []
  const semGpas = []
  Object.keys(tableData).forEach(key => {
    labels.push(key)
    semGpas.push(semGpaAndCredit(tableData[key])[0])
  })
  const sortedLabels = labels.slice().sort()
  const sortedSemGpas = sortedLabels.map(
    label => semGpas[labels.indexOf(label)]
  )

  return (
    <div>
      <Container
        style={{
          marginBottom: "1.5em",
        }}
      >
        <Button variant="secondary" onClick={handleShow}>
          Show Line Chart
        </Button>
        <Modal
          show={show}
          onHide={handleClose}
          animation={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Semester GPA Line Chart</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <LineChart
              sortedLabels={sortedLabels}
              sortedSemGpas={sortedSemGpas}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-dark" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
      {Object.keys(tableData).map(key => (
        <Container key={key}>
          <div className="tableDiv">
            <h4 className="heading">
              {`Year: ${key.split("-")[0]} - Semester: ${key.split("-")[1]}`}
            </h4>
            <Badge bg="secondary" className="semGpa">
              GPA: {semGpaAndCredit(tableData[key])[0]}
            </Badge>
            <Badge bg="secondary" className="semCredit">
              Credits: {semGpaAndCredit(tableData[key])[1]}
            </Badge>
          </div>
          <Table striped>
            <thead>
              <tr>
                <th style={{ width: "25%" }}>Subject Code</th>
                <th style={{ width: "40%" }}>Subject Name</th>
                <th style={{ width: "18%" }}>Credit</th>
                <th style={{ width: "25%" }}>Grade</th>
              </tr>
            </thead>
            <tbody>
              {tableData[key].map(data => (
                <tr key={data[3]}>
                  <td>
                    <img
                      className="deleteImg"
                      src={remove}
                      alt="delete"
                      onClick={() => removeRow(data[3])}
                    />
                    &nbsp;&nbsp;
                    {data[3]}
                  </td>
                  <td>{data[4]}</td>
                  <td>{data[5]}</td>
                  <td>{data[6]}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <br />
        </Container>
      ))}
    </div>
  )
}

export default SelectedList
