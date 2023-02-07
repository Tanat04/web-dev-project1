import * as React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Button, Container, Badge } from "react-bootstrap"

function ShowInfo({ clearData, badge, totalCredit }) {
  return (
    <div>
      <Container>
        <Button variant="outline-danger" onClick={clearData}>
          Clear Data
        </Button>{" "}
        <Button variant="dark" className="float-right">
          Accumulated GPA{" "}
          <Badge id="gpa-badge" bg="secondary">
            {badge}
          </Badge>
        </Button>
        <Button variant="dark" className="float-right">
          Total Credits{" "}
          <Badge id="credit-badge" bg="secondary">
            {totalCredit}
          </Badge>
        </Button>
      </Container>
    </div>
  )
}

export default ShowInfo
