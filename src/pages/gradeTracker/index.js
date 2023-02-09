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
  let [year, setYear] = React.useState("2020")
  let [sem, setSem] = React.useState("1")

  const years = [2020, 2021, 2022, 2023, 2024]
  const sems = [1, 2]
  const grades = ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "F", "W"]

  React.useEffect(() => {
    const res = async () => {
      const data = await import(`./${selectedMajor.toLowerCase()}-2019.json`)
      setCurriculum(data.curriculum)
    }

    res()
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
