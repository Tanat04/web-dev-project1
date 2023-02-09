import * as React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Button, Container, Badge, Modal } from "react-bootstrap"

function ShowInfo({ clearData, badge, totalCredit }) {
  return (
    <div>
      <Container>
        <Button
          variant="outline-danger"
          onClick={clearData}
          style={{ marginRight: "0.6em" }}
        >
          Clear Data
        </Button>{" "}
        <Button variant="secondary" className="float-right">
          Accumulated GPA{" "}
          <Badge
            id="gpa-badge"
            bg="dark"
            style={{ paddingTop: "0.5em", paddingBottom: "0.5em" }}
          >
            {badge}
          </Badge>
        </Button>
        <Button variant="secondary" className="float-right">
          Total Credits{" "}
          <Badge
            id="credit-badge"
            bg="dark"
            style={{ paddingTop: "0.5em", paddingBottom: "0.5em" }}
          >
            {totalCredit}
          </Badge>
        </Button>
      </Container>
    </div>
  )
}

export default ShowInfo
