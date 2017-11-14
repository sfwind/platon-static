const calcScheduleData = (node) => {
  let scheduleData = []
  for(let monthItem of node.childNodes) {
    let newItem = {}
    let monthItemDataArr = monthItem.id.split('-')
    newItem.year = monthItemDataArr[1]
    newItem.month = monthItemDataArr[3]

    newItem.courseSchedules = []
    let courseSchedules = monthItem.getElementsByClassName('minor-problem')

    for(let i = 0; i < courseSchedules.length; i++) {
      let courseSchedule = courseSchedules[i]
      let newProblem = {}
      let dataArr = courseSchedule.id.split('-')
      newProblem.problemId = dataArr[1]
      newProblem.id = dataArr[3]
      newProblem.selected = courseSchedule.classList.contains('selected')
      newItem.courseSchedules.push(newProblem)
    }

    scheduleData.push(newItem)
  }
  return scheduleData
}

export { calcScheduleData }
