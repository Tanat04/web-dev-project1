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
        <Button variant="secondary" className="float-right" size="lg">
          Accumulated GPA{" "}
          <Badge id="gpa-badge" bg="dark">
            {badge}
          </Badge>
        </Button>
        <Button variant="secondary" className="float-right" size="lg">
          Total Credits{" "}
          <Badge id="credit-badge" bg="dark">
            {totalCredit}
          </Badge>
        </Button>
      </Container>
    </div>
  )
}

export default ShowInfo
