import * as React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
// import {
//   Container,
//   ButtonGroup,
//   Dropdown,
//   DropdownButton,
//   Badge,
//   Button,
//   Row,
//   Col,
//   Modal,
//   Form,
//   Nav,
//   Navbar,
//   NavDropdown,
//   Table,
// } from "react-bootstrap"
import { useLocalStorage } from "react-use"
import "./index.css"
import NavBar from "../../components/NavBar"
import ShowInfo from "../../components/ShowInfo"
import SelectAndAdd from "../../components/SelectAndAdd"
import SelectedList from "../../components/SelectedList"

function Main() {
  let [curriculum, setCurriculum] = React.useState([])
  let [selectedMajor, setSelectedMajor] = React.useState("CS")
  let [selectedGroup, setSelectedGroup] = React.useState({})
  let [selectedSubject, setSelectedSubject] = React.useState({})
  let [grade, setGrade] = React.useState([])
  let [totalGpa, setTotalGpa] = useLocalStorage("totalGPA", 0.0)
  let [selectedData, setSelectedData] = useLocalStorage("data", [])
  let [badge, setbadge] = React.useState(0.0)
  let [totalCredit, settotalCredit] = useLocalStorage("totalCredit", 0)
  let [year, setYear] = React.useState("2023")
  let [sem, setSem] = React.useState("1")

  const years = [2023, 2022, 2021, 2020, 2019, 2018]
  const sems = [1, 2]
  const grades = ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "F", "W"]

  React.useEffect(() => {
    const res = async () => {
      const data = await import(`./${selectedMajor.toLowerCase()}-2019.json`)
      setCurriculum(data.curriculum)
    }

    res()
    // const previousValue = selectedMajor// This doesn't work coz previous value change as soon as setselecteMajor coz it rerender..
    // console.log(previousValue, selectedMajor)
    // if (previousValue !== selectedMajor) {
    //   setTotalGpa(0.0)
    //   setSelectedData([])
    //   settotalCredit(0)
    // }
    // localStorage.removeItem("data") //This one remove data from localStorage after reload and if reload again everything gone
    // localStorage.removeItem("totalGPA")
    // localStorage.removeItem("totalCredit")

    // setTotalGpa(0.0) //This one setvalue to 0 after every reload
    // setSelectedData([])
    // settotalCredit(0)
    // console.log("am here")
  }, [selectedMajor])

  React.useEffect(() => {
    if (curriculum.courses) {
      setSelectedGroup(curriculum.courses[0])
      setGrade(grades[0])
    }
  }, [curriculum])

  React.useEffect(() => {
    if (selectedGroup.subjects) {
      setSelectedSubject(selectedGroup.subjects[0])
    }
  }, [selectedGroup])

  React.useEffect(() => {
    setbadge(totalGpa)
  }, [totalGpa])

  function handleAdd(year, sem, group, code, subject, credit, grade) {
    let subjectExists = selectedData.some(data => data[4] === subject)
    if (subjectExists) {
      alert(
        `Subject "${subject}" already exists, please delete the subject first or add other subject!!`
      )
    } else {
      selectedData.push([year, sem, group, code, subject, credit, grade])
      console.table(selectedData)
      setSelectedData([...selectedData])
      calculateGPA()
    }
  }

  function calculateGPA() {
    let getData = JSON.parse(localStorage.getItem("data"))
    let totalPoints = 0
    let totalCredits = 0
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

    getData.forEach(item => {
      let grade = item[6]
      let credits = item[5]
      if (grade === "W") {
        return
      }
      totalPoints += gradeValues[grade] * credits
      totalCredits += credits
    })

    let gpa = (totalPoints / totalCredits).toFixed(2)
    setTotalGpa(gpa)
    settotalCredit(totalCredits)
  }

  function clearData() {
    localStorage.removeItem("data")
    localStorage.removeItem("totalGPA")
    localStorage.removeItem("totalCredit")
    window.location.reload(false)
  }

  function removeRow(code) {
    let newData = [...selectedData]
    let index = selectedData.findIndex(data => data[3] === code)
    if (index === -1) {
      return
    }
    newData.splice(index, 1)
    setSelectedData(newData)
    calculateGPA()
  }

  if (totalGpa === "NaN") {
    setTotalGpa(0.0)
  }

  return (
    <>
      <div>
        <NavBar setSelectedMajor={setSelectedMajor} />
      </div>
      <br></br>
      <div>
        <ShowInfo
          clearData={clearData}
          badge={badge}
          totalCredit={totalCredit}
        />
      </div>
      <br></br>
      <div>
        <SelectAndAdd
          curriculum={curriculum}
          setSelectedGroup={setSelectedGroup}
          selectedGroup={selectedGroup}
          setSelectedSubject={setSelectedSubject}
          selectedSubject={selectedSubject}
          setGrade={setGrade}
          grade={grade}
          years={years}
          setYear={setYear}
          year={year}
          sems={sems}
          sem={sem}
          setSem={setSem}
          grades={grades}
          handleAdd={handleAdd}
        />
      </div>
      <br></br>
      <div>
        <SelectedList selectedData={selectedData} removeRow={removeRow} />
      </div>
    </>
  )
}

export default Main

// function calculateGPA() {
//   let getData = JSON.parse(localStorage.getItem("data"))
//   let totalPoints = 0
//   let totalCredits = 0
//   for (let i = 0; i < getData.length; i++) {
//     let grade = getData[i][4]
//     let credits = getData[i][3]
//     if (grade === "W") {
//       continue
//     }
//     switch (grade) {
//       case "A":
//         totalPoints += 4 * credits
//         totalCredits += credits
//         break
//       case "A-":
//         totalPoints += 3.75 * credits
//         totalCredits += credits
//         break
//       case "B+":
//         totalPoints += 3.25 * credits
//         totalCredits += credits
//         break
//       case "B":
//         totalPoints += 3 * credits
//         totalCredits += credits
//         break
//       case "B-":
//         totalPoints += 2.75 * credits
//         totalCredits += credits
//         break
//       case "C+":
//         totalPoints += 2.25 * credits
//         totalCredits += credits
//         break
//       case "C":
//         totalPoints += 2 * credits
//         totalCredits += credits
//         break
//       case "C-":
//         totalPoints += 1.75 * credits
//         totalCredits += credits
//         break
//       case "D":
//         totalPoints += 1 * credits
//         totalCredits += credits
//         break
//       case "F":
//         totalPoints += 0 * credits
//         totalCredits += credits
//         break
//     }
//   }
//   let gpa = (totalPoints / totalCredits).toFixed(2)
//   setTotalGpa(gpa)
//   settotalCredit(totalCredits)
// }

{
  /* <div>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">Grade Tracker</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <NavDropdown title="Curriculum" id="basic-nav-dropdown">
                <NavDropdown.Item
                  href="#home"
                  onClick={() => {
                    setSelectedMajor("cs")
                  }}
                >
                  CS
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="#home"
                  onClick={() => {
                    setSelectedMajor("it")
                  }}
                >
                  IT
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Container>
        </Navbar>
      </div> */
}

{
  /* <div>
        <Container>
          <Button
            variant="outline-danger"
            style={{ marginLeft: "2.4em" }}
            onClick={clearData}
          >
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
      </div> */
}

{
  /* <div>
        <Container>
          <Row>
            <Col sm={11}>
              <Table striped bordered hover className="HeaderRow">
                <thead>
                  <tr>
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
      </div> */
}

{
  /* <div>
        <Container>
          <Table striped bordered hover style={{ marginLeft: "2.4em" }}>
            <thead>
              <tr>
                <th>Subject Group</th>
                <th>Subject Code</th>
                <th>Subject Name</th>
                <th>Credit</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {selectedData.map((data, index) => (
                <tr key={index}>
                  <td>{data[0]}</td>
                  <td>{data[1]}</td>
                  <td>{data[2]}</td>
                  <td>{data[3]}</td>
                  <td>{data[4]}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div> */
}
