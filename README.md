# Hello, I'm Tanat! 👋

# Grade Tracker

The purpose of this web page is to provide a tool for calculating one's cumulative GPA and semester GPA based on the coursework completed in the fields of Computer Science or Information Technology at Assumption University. Additionally, the web page offers a graphical representation of an individual's academic GPA journey through the utilization of a line chart.

- [Project's Source Code](https://github.com/Tanat04/web-dev-project1)

## Project Desciption

By default, the selected major on this web page is set to Computer Science. However, yopu may switch to Information Technology as their chosen major by making the necessary adjustments in the navigation bar.

![App Screenshot](https://github.com/Tanat04/Tanat04.github.io/blob/main/screenshots/chooseMajor.png?raw=true)

This web page provides the ability to select a specific academic year, semester, subject group, subject name, grade and click add button to add the subject.

![App Screenshot](https://github.com/Tanat04/Tanat04.github.io/blob/main/screenshots/selectSubjects.png?raw=true)

By clicking the "Add" button, the selected subject details are added to the specific semester table, which displays the corresponding semester GPA and total credit. In the case of accidental selection of the wrong subject, the user may delete the subject from the table by clicking the delete icon.

![App Screenshot](https://github.com/Tanat04/Tanat04.github.io/blob/main/screenshots/displaySubject.png?raw=true)

The web page is designed to prevent the addition of duplicate subjects and will display an alert if an attempt is made to add a subject that already exists.

![App Screenshot](https://github.com/Tanat04/Tanat04.github.io/blob/main/screenshots/duplicatedSubject.png?raw=true)

Heres the example of how the subject will be shown and seperated into specific semester.

![App Screenshot](https://github.com/Tanat04/Tanat04.github.io/blob/main/screenshots/displaySubject2.png?raw=true)

The "Clear Data" button provides the option to remove all selected data and start over.

![App Screenshot](https://github.com/Tanat04/Tanat04.github.io/blob/main/screenshots/clearData.png?raw=true)

As subjects are added, the accumulated GPA and total credit hours are continuously updated.

![App Screenshot](https://github.com/Tanat04/Tanat04.github.io/blob/main/screenshots/cumGpaAndCredit.png?raw=true)

The line chart button allows for a graphical representation of an individual's academic journey through the display of the semester GPA in a modal window.

![App Screenshot](https://github.com/Tanat04/Tanat04.github.io/blob/main/screenshots/lineChartButton.png?raw=true)

Here's an example of how the line chart are shown.

![App Screenshot](https://github.com/Tanat04/Tanat04.github.io/blob/main/screenshots/lineChart.png?raw=true)

## To Run The Project Locally

Clone the project

```bash
  git clone https://github.com/Tanat04/web-dev-project1.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm i react-use
```

```bash
  npm install react-bootstrap bootstrap
```

Start the server

```bash
  npm run develop
```

## Authors

- [@Tanat Arora](https://github.com/Tanat04)

## Tech Stack

**Client:** React, BootStrap, Chart.js
