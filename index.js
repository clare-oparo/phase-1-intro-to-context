// Your code here
const createEmployeeRecord = function(field){
    return {
        firstName: field[0],
        familyName: field[1],
        title: field[2],
        payPerHour: field[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = function(employeeData) {
    return employeeData.map(function(field){
        return createEmployeeRecord(field)
    })
}

const createTimeInEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

const createTimeOutEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

let hoursWorkedOnDate = function(employee, exactDate){
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === exactDate
    })
    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === exactDate
    })
    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(employee, dateMatch){
    let grossWage = hoursWorkedOnDate(employee, dateMatch)
        * employee.payPerHour
    return parseFloat(grossWage.toString())
}

let allWagesFor = function(employee){
    let correctDates = employee.timeInEvents.map(function(e){
        return e.date
    })
    let payable = correctDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)
    return payable
}

let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}