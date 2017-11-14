const calcScheduleData = (node) => {
  let scheduleData = []
  for(let monthItem of node.childNodes) {
    let newItem = {}
    let monthItemDataArr = monthItem.id.split('-')
    newItem.year = monthItemDataArr[1]
    newItem.month = monthItemDataArr[3]

    newItem.courseSchedules = []
    let courseSchedules = monthItem.getElementsByClassName('minor-problem')
    for(let courseShedule of courseSchedules) {
      let newProblem = {}
      let dataArr = courseShedule.id.split('-')
      newProblem.problemId = dataArr[1]
      newProblem.id = dataArr[3]
      newProblem.selected = courseShedule.classList.contains('selected')
      newItem.courseSchedules.push(newProblem)
    }
    scheduleData.push(newItem)
  }
  return scheduleData
}

export { calcScheduleData }
