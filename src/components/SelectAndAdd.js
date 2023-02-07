import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Container, Row, Col, Table, Form, Button } from "react-bootstrap"

function SelectAndAdd({
  curriculum,
  setSelectedGroup,
  selectedGroup,
  setSelectedSubject,
  selectedSubject,
  setGrade,
  grade,
  years,
  setYear,
  year,
  sems,
  setSem,
  sem,
  grades,
  handleAdd,
}) {
  return (
    <div>
      <Container>
        <Row>
          <Col sm={11}>
            <Table striped bordered hover className="HeaderRow">
              <thead>
                <tr>
                  <th>
                    <Form.Select
                      aria-label="Year Select"
                      value={year}
                      onChange={e => setYear(e.target.value)}
                    >
                      {years.map(yearOption => (
                        <option key={yearOption} value={yearOption}>
                          {yearOption}
                        </option>
                      ))}
                    </Form.Select>
                  </th>
                  <th>
                    <Form.Select
                      aria-label="sem Select"
                      value={sem}
                      onChange={e => setSem(e.target.value)}
                    >
                      {sems.map(semOption => (
                        <option key={semOption} value={semOption}>
                          {semOption}
                        </option>
                      ))}
                    </Form.Select>
                  </th>
                  <th>
                    <div>
                      <Form.Select
                        aria-label="Default select example"
                        value={selectedGroup.groupName}
                        onChange={e =>
                          setSelectedGroup(
                            curriculum.courses.find(
                              group => group.groupName === e.target.value
                            )
                          )
                        }
                      >
                        {curriculum && curriculum.courses
                          ? curriculum.courses.map(group => (
                              <option
                                key={group.groupName}
                                value={group.groupName}
                              >
                                {group.groupName}
                              </option>
                            ))
                          : null}
                      </Form.Select>
                    </div>
                  </th>
                  <th>
                    <div>
                      <Form.Select
                        aria-label="Default select example"
                        value={selectedSubject.name}
                        onChange={e =>
                          setSelectedSubject(
                            selectedGroup.subjects.find(
                              subject => subject.name === e.target.value
                            )
                          )
                        }
                      >
                        {selectedGroup && selectedGroup.subjects
                          ? selectedGroup.subjects.map(subject => (
                              <option key={subject.code} value={subject.name}>
                                {subject.name}
                              </option>
                            ))
                          : null}
                      </Form.Select>
                    </div>
                  </th>
                  <th>
                    <Form.Select
                      aria-label="Grade Select"
                      value={grade}
                      onChange={e => setGrade(e.target.value)}
                    >
                      {grades.map(gradeOption => (
                        <option key={gradeOption} value={gradeOption}>
                          {gradeOption}
                        </option>
                      ))}
                    </Form.Select>
                  </th>
                </tr>
              </thead>
            </Table>
          </Col>
          <Col sm={1}>
            <th>
              <Button
                variant="secondary"
                style={{ width: "5rem" }}
                onClick={() =>
                  handleAdd(
                    year,
                    sem,
                    selectedGroup.groupName,
                    selectedSubject.code,
                    selectedSubject.name,
                    selectedSubject.credit,
                    grade
                  )
                }
                className="addData"
              >
                Add
              </Button>
            </th>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default SelectAndAdd
